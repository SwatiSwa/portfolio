'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

/**
 * The only client component in the navbar. `usePathname` is what makes the current page
 * visible in the nav, and it cannot be read on the server for a statically prerendered
 * route — so the link list is client while the navbar shell around it stays a Server
 * Component.
 *
 * The active state is underline + weight rather than colour alone: the accent pink that
 * works on the dark band only reaches 2.6:1 on white, so colour could not carry this in
 * both themes anyway.
 */
export default function NavLinks() {
  const pathname = usePathname()

  return (
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-8">
      {LINKS.map((link) => {
        const active =
          pathname === link.href || pathname.startsWith(`${link.href}/`)

        return (
          <li
            key={link.href}
            className="text-sm font-medium uppercase tracking-wider"
          >
            <Link
              href={link.href}
              aria-current={active ? 'page' : undefined}
              className={
                active
                  ? 'font-semibold underline decoration-2 underline-offset-[6px]'
                  : 'underline-offset-[6px] hover:underline'
              }
            >
              {link.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
