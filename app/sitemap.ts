import type { MetadataRoute } from 'next'
import { getPublishedArticles } from '@/lib/articles-db'
import { fetchProducts } from '@/lib/products-db'
import { SITE_URL } from '@/lib/site'

export const revalidate = 60

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, articles] = await Promise.all([fetchProducts(), getPublishedArticles()])
  const staticPaths = ['/', '/about/', '/services/', '/product-center/', '/products/', '/contact/', '/news/', '/privacy-policy-2/', '/shipping-policy/']
  return [
    ...staticPaths.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...products.map((product) => ({ url: `${SITE_URL}/products/${product.slug}/` })),
    ...articles.map((article) => ({ url: `${SITE_URL}/news/${article.slug}/` })),
  ]
}
