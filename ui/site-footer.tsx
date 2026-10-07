import Link from 'next/link'

import { profile, socials } from '@/lib/career'

const NAV = [
  { href: '/work', label: 'Work' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

/**
 * Always rendered on the dark band, regardless of the page above it. The homepage and the
 * new inner pages are already dark, so this reads as their natural end; on the light pages
 * it closes the page with the site's own surface instead of stopping abruptly at white.
 *
 * That is why it carries `.dark-band` itself rather than inheriting one — a footer that
 * only looked right on dark pages would be a conditional we would have to remember.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="dark-band bleed-x border-t border-[var(--band-line)]">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold">{profile.name}</p>
            <p className="mt-2 max-w-sm text-sm text-[var(--band-muted)]">
              {profile.headline}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-xs uppercase tracking-[0.18em] text-[var(--band-muted)]">
              Elsewhere
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[var(--band-fg)] underline-offset-4 hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[var(--band-line)] pt-6 text-sm text-[var(--band-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="underline-offset-4 hover:text-[var(--band-fg)] hover:underline"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
