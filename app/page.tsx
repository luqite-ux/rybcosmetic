import type { Metadata } from 'next'
import { WpBody } from '@/components/wp-body'
import { readWpHtml } from '@/lib/wp-html'

export const revalidate = 60

export const metadata: Metadata = {
  title: { absolute: 'SYSRYB | OEM/ODM Cosmetics Manufacturer' },
  description: 'High-performance private-label makeup formulas, manufactured in Zhejiang for global beauty brands.',
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return <WpBody html={readWpHtml('home')} />
}
