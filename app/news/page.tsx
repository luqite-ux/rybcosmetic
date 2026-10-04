import type { Metadata } from 'next'
import Link from 'next/link'
import { getPublishedArticles } from '@/lib/articles-db'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'News',
  description: 'Updates from SYSRYB cosmetics manufacturing.',
  alternates: { canonical: '/news/' },
}

export default async function NewsPage() {
  const articles = await getPublishedArticles()
  return (
    <section className="hq-news">
      <h1>News</h1>
      {articles.length === 0 ? (
        <p className="hq-empty">No news has been published yet.</p>
      ) : (
        <div className="hq-news-list">
          {articles.map((article) => (
            <Link key={article.slug} href={`/news/${article.slug}/`} className="hq-news-card">
              {article.image ? <img src={article.image} alt="" /> : <span />}
              <div>
                {article.publishedAt ? <time dateTime={article.publishedAt}>{article.publishedAt.slice(0, 10)}</time> : null}
                <h2>{article.title}</h2>
                {article.excerpt ? <p>{article.excerpt.replace(/<[^>]+>/g, '')}</p> : null}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
