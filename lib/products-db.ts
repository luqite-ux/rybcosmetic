import { getSupabase, tenantId } from '@/lib/supabase'
import { fallbackProducts, type SiteProduct } from '@/lib/site'

type ProductRow = {
  slug: string
  name: string | null
  name_i18n: Record<string, string> | null
  description: string | null
  description_i18n: Record<string, string> | null
  overview: string | null
  overview_i18n: Record<string, string> | null
  image_url: string | null
  extra_data: { sku?: string } | null
  sort_order: number | null
}

function pick(i18n: Record<string, string> | null | undefined, plain: string | null) {
  return i18n?.en || i18n?.zh || plain || ''
}

function mapRow(row: ProductRow): SiteProduct {
  const description = pick(row.description_i18n, row.description)
  const overview = pick(row.overview_i18n, row.overview)
  return {
    slug: row.slug,
    title: pick(row.name_i18n, row.name),
    excerpt: description,
    html: overview || description,
    image: row.image_url || '',
    sku: row.extra_data?.sku || '',
  }
}

export async function fetchProducts(): Promise<SiteProduct[]> {
  const supabase = getSupabase()
  const id = tenantId()
  if (!supabase || !id) return fallbackProducts()
  const { data, error } = await supabase
    .from('products')
    .select('slug, name, name_i18n, description, description_i18n, overview, overview_i18n, image_url, extra_data, sort_order')
    .eq('tenant_id', id)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
  if (error || !data?.length) return fallbackProducts()
  return (data as ProductRow[]).map(mapRow)
}

export async function fetchProduct(slug: string): Promise<SiteProduct | null> {
  const products = await fetchProducts()
  return products.find((product) => product.slug === slug) ?? null
}
