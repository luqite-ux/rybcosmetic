import type { Metadata } from 'next'
import { ProductGrid } from '@/components/product-grid'
import { fetchProducts } from '@/lib/products-db'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse SYSRYB private-label makeup, palettes, lip sets, and promotional beauty products.',
  alternates: { canonical: '/products/' },
}

export default async function ProductsPage() {
  const products = await fetchProducts()
  return <ProductGrid products={products} />
}
