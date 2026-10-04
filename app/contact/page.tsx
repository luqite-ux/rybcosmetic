import type { Metadata } from 'next'
import { WpBody } from '@/components/wp-body'
import { readWpHtml } from '@/lib/wp-html'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact SYSRYB for private-label makeup quotes, samples, and OEM production.',
  alternates: { canonical: '/contact/' },
}

export default function ContactPage() {
  return <WpBody html={readWpHtml('contact')} />
}
