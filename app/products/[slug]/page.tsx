import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { InquiryForm } from '@/components/inquiry-form'
import { fetchProduct, fetchProducts } from '@/lib/products-db'
import { BRAND, SITE_URL } from '@/lib/site'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const products = await fetchProducts()
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = await fetchProduct(slug)
  if (!product) return { title: 'Product' }
  const description = product.excerpt.replace(/<[^>]+>/g, '').slice(0, 160)
  return {
    title: product.title,
    description,
    alternates: { canonical: `/products/${product.slug}/` },
    openGraph: {
      title: product.title,
      description,
      url: `/products/${product.slug}/`,
      images: product.image ? [product.image.startsWith('http') ? product.image : `${SITE_URL}${product.image}`] : undefined,
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await fetchProduct(slug)
  if (!product) notFound()
  const image = product.image.startsWith('http') ? product.image : `${SITE_URL}${product.image}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.excerpt.replace(/<[^>]+>/g, ''),
    image: product.image ? image : undefined,
    sku: product.sku || undefined,
    brand: { '@type': 'Brand', name: BRAND },
  }
  return (
    <article className="hq-product">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="hq-product-media">
        {product.image ? <img src={product.image} alt={product.title} /> : null}
      </div>
      <div>
        <h1>{product.title}</h1>
        {product.sku ? <p>SKU {product.sku}</p> : null}
        <div className="article-prose" dangerouslySetInnerHTML={{ __html: product.html }} />
        <InquiryForm product={product.title} scopeLabel={`product-${product.slug}`} />
      </div>
    </article>
  )
}
