import type { Metadata } from 'next'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { BRAND, COMPANY_EN, CONTACT_EMAIL, CONTACT_PHONE, SITE_URL } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND} | OEM/ODM Cosmetics Manufacturer`,
    template: `%s | ${BRAND}`,
  },
  description: `${COMPANY_EN} manufactures private-label makeup, including lipstick, eyeshadow, and promotional beauty sets.`,
  icons: { icon: '/icon.png' },
}

const palette = `:root{--ast-global-color-0:#c2a59a;--ast-global-color-1:#8f5138;--ast-global-color-2:#3a3a3a;--ast-global-color-3:#4B4F58;--ast-global-color-4:#f5f5f5;--ast-global-color-5:#ffffff;--ast-global-color-6:#F2F5F7;--ast-global-color-7:#424242;--ast-global-color-8:#000000;}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: COMPANY_EN,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    logo: `${SITE_URL}/icon.png`,
  }
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap" />
        <link rel="stylesheet" href="/styles/astra.css" />
        <link rel="stylesheet" href="/styles/customizer.css" />
        <link rel="stylesheet" href="/styles/spectra-blocks.css" />
        <link rel="stylesheet" href="/styles/spectra-custom.css" />
        <link rel="stylesheet" href="/styles/site.css" />
        <style dangerouslySetInnerHTML={{ __html: palette }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      </head>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
