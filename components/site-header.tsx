import Link from 'next/link'
import { LOGO, NAV, BRAND } from '@/lib/site'

export function SiteHeader() {
  return (
    <header className="hq-header">
      <div className="hq-header-inner">
        <Link href="/" className="hq-logo" aria-label={`${BRAND} home`}>
          <img src={LOGO} alt={BRAND} />
        </Link>
        <nav className="hq-nav" aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact/" className="hq-quote">
          Get a Quote
        </Link>
      </div>
    </header>
  )
}
