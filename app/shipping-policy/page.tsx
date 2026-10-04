import type { Metadata } from 'next'
import { WpBody } from '@/components/wp-body'
import { readWpHtml } from '@/lib/wp-html'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Shipping Policy',
  description: 'How SYSRYB handles order fulfillment and international shipping for private-label cosmetics.',
  alternates: { canonical: '/shipping-policy/' },
}

export default function ShippingPage() {
  return <WpBody html={readWpHtml('shipping-policy')} />
}
