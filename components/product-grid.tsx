import Link from 'next/link'
import type { SiteProduct } from '@/lib/site'

export function ProductGrid({ products }: { products: SiteProduct[] }) {
  return (
    <section className="hq-catalog">
      <div className="hq-catalog-head">
        <h1>Product Center</h1>
        <p>Private-label makeup manufactured by SYSRYB. Ask for samples, shades, and packaging options.</p>
      </div>
      <div className="hq-grid">
        {products.map((product) => (
          <Link key={product.slug} href={`/products/${product.slug}/`} className="hq-card">
            <span className="hq-card-media">
              {product.image ? <img src={product.image} alt={product.title} /> : null}
            </span>
            <span className="hq-card-body">
              <strong>{product.title}</strong>
              {product.sku ? <em>{product.sku}</em> : null}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
