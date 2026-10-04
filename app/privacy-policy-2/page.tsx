import type { Metadata } from 'next'
import { WpBody } from '@/components/wp-body'
import { readWpHtml } from '@/lib/wp-html'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Zhejiang Three Primary Colors Cosmetics Co., Ltd. handles personal information submitted on this website.',
  alternates: { canonical: '/privacy-policy-2/' },
}

export default function PrivacyPage() {
  return <WpBody html={readWpHtml('privacy-policy-2')} />
}
