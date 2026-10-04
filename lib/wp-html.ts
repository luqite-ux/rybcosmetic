import { readFileSync } from 'node:fs'
import path from 'node:path'

export function readWpHtml(slug: string) {
  const file = path.join(process.cwd(), 'content', 'pages', `${slug}.html`)
  return readFileSync(file, 'utf8').replace(/<img[^>]+websitedemos\.net[^>]*>/g, '')
}
