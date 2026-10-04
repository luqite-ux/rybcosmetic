import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getPublishedArticles } from '@/lib/articles-db'
import { COMPANY_EN, SITE_URL } from '@/lib/site'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const articles = await getPublishedArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return { title: 'News' }
  const description = article.excerpt.replace(/<[^>]+>/g, '').slice(0, 160)
  return {
    title: article.title,
    description,
    alternates: { canonical: `/news/${article.slug}/` },
    openGraph: {
      title: article.title,
      description,
      type: 'article',
      url: `/news/${article.slug}/`,
      images: article.image ? [article.image] : undefined,
    },
  }
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    datePublished: article.publishedAt,
    image: article.image || undefined,
    author: { '@type': 'Organization', name: COMPANY_EN },
    mainEntityOfPage: `${SITE_URL}/news/${article.slug}/`,
  }
  return (
    <article className="hq-article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {article.publishedAt ? <time dateTime={article.publishedAt}>{article.publishedAt.slice(0, 10)}</time> : null}
      <h1>{article.title}</h1>
      {article.image ? <img src={article.image} alt="" /> : null}
      <div className="article-prose" dangerouslySetInnerHTML={{ __html: article.content }} />
    </article>
  )
}
