import { getSupabase, tenantId } from '@/lib/supabase'

export type Article = {
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  publishedAt: string | null
}

type ArticleRow = {
  slug: string
  title: string | null
  title_i18n: Record<string, string> | null
  excerpt: string | null
  excerpt_i18n: Record<string, string> | null
  content: string | null
  content_i18n: Record<string, string> | null
  featured_image: string | null
  published_at: string | null
}

function pick(i18n: Record<string, string> | null | undefined, plain: string | null) {
  return i18n?.en || i18n?.zh || plain || ''
}

function mapRow(row: ArticleRow): Article {
  return {
    slug: row.slug,
    title: pick(row.title_i18n, row.title),
    excerpt: pick(row.excerpt_i18n, row.excerpt),
    content: pick(row.content_i18n, row.content),
    image: row.featured_image || '',
    publishedAt: row.published_at,
  }
}

export async function getPublishedArticles(): Promise<Article[]> {
  const supabase = getSupabase()
  const id = tenantId()
  if (!supabase || !id) return []
  const { data, error } = await supabase
    .from('articles')
    .select('slug, title, title_i18n, excerpt, excerpt_i18n, content, content_i18n, featured_image, published_at')
    .eq('tenant_id', id)
    .eq('is_published', true)
    .order('published_at', { ascending: false })
  if (error || !data) return []
  return (data as ArticleRow[]).map(mapRow)
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getPublishedArticles()
  return articles.find((article) => article.slug === slug) ?? null
}
