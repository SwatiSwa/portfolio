import Link from 'next/link'

import NavLinks from './nav-links'

export default function Navbar() {
  return (
    // Full-width so the background can bleed to the viewport edges; the inner div keeps the
    // contents on the same `max-w-5xl` rail as the rest of the site. `nav-chrome` supplies no
    // background by default — it only joins the dark band on pages that have one.
    <nav className="nav-chrome bleed-x">
      {/* `px-6` matches the padding every page applies inside its own `max-w-5xl`, so the
          wordmark lines up with the content beneath it instead of sitting 24px to its left. */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 py-8 sm:py-10">
          <div className="text-base font-semibold uppercase tracking-wider text-pink-400">
            <Link href="/">Swati</Link>
          </div>
          <NavLinks />
        </div>
      </div>
    </nav>
  )
}
