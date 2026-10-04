import type { Metadata } from 'next'
import { WpBody } from '@/components/wp-body'
import { readWpHtml } from '@/lib/wp-html'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Services',
  description: 'Private-label cosmetics services from formula development and sampling to packaging and production.',
  alternates: { canonical: '/services/' },
}

export default function ServicesPage() {
  return <WpBody html={readWpHtml('services')} />
}
