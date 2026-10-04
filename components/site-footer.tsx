import Link from 'next/link'
import { BRAND, COMPANY_EN, CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE, LOGO, NAV } from '@/lib/site'

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="hq-footer">
      <div className="hq-footer-grid">
        <div>
          <Link href="/" className="hq-footer-logo" aria-label={`${BRAND} home`}>
            <img src={LOGO} alt={BRAND} />
          </Link>
          <p>OEM and ODM cosmetics manufacturing for private-label beauty brands.</p>
        </div>
        <div>
          <h2>Explore</h2>
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li><Link href="/news/">News</Link></li>
            <li><Link href="/privacy-policy-2/">Privacy Policy</Link></li>
            <li><Link href="/shipping-policy/">Shipping Policy</Link></li>
          </ul>
        </div>
        <div>
          <h2>Contact</h2>
          <p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
          <p><a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`}>{CONTACT_PHONE}</a></p>
          <p>{CONTACT_ADDRESS}</p>
        </div>
      </div>
      <p className="hq-copy">© {year} {COMPANY_EN}. All rights reserved.</p>
    </footer>
  )
}
