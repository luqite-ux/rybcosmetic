import type { Metadata } from 'next'
import { WpBody } from '@/components/wp-body'
import { readWpHtml } from '@/lib/wp-html'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'About',
  description: 'SYSRYB is an OEM and ODM cosmetics manufacturer in Lanxi, Zhejiang, with in-house R&D and private-label production.',
  alternates: { canonical: '/about/' },
}

export default function AboutPage() {
  return <WpBody html={readWpHtml('about')} />
}
