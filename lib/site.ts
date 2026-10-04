import { readFileSync } from 'node:fs'
import path from 'node:path'

export type SiteProduct = {
  id?: number
  slug: string
  title: string
  excerpt: string
  html: string
  image: string
  sku: string
}

export type SitePage = {
  slug: string
  title: string
  path: string
  file: string
}

type SiteFile = {
  logo: string
  emails: string[]
  phones: string[]
  pages: SitePage[]
  products: SiteProduct[]
}

const site = JSON.parse(
  readFileSync(path.join(process.cwd(), 'data', 'site.json'), 'utf8'),
) as SiteFile

export const COMPANY_EN = 'Zhejiang Three Primary Colors Cosmetics Co., Ltd.'
export const COMPANY_ZH = '浙江三原色化妆品有限公司'
export const BRAND = 'SYSRYB'
export const SITE_URL = 'https://rybcosmetic.com'
export const LOGO = site.logo
export const CONTACT_EMAIL = 'rybcosmetic2@rybcosmetic.com'
export const CONTACT_PHONE = '+86 158 5897 8677'
export const CONTACT_ADDRESS = 'No. 525 Jixiang Road, Lanjiang Street, Lanxi Economic Development Zone, Zhejiang, China'
export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/services/', label: 'Services' },
  { href: '/product-center/', label: 'Product Center' },
  { href: '/contact/', label: 'Contact' },
]

export function fallbackProducts(): SiteProduct[] {
  return site.products
}

export function pageMeta(slug: string) {
  return site.pages.find((page) => page.slug === slug)
}
