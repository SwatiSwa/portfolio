import '../styles/global.css'

import React from 'react'
import { Providers } from './providers'
import Navbar from 'ui/navbar'
import SiteFooter from 'ui/site-footer'
import { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'

/**
 * Display face for the hero. Purely additive — body copy keeps the default sans stack, and
 * `font-display` is opt-in per element.
 */
const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  // Without this, og:image resolves relative and the blog's generated share cards never
  // render — Next needs an absolute base to build the URL from.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  ),
  title: {
    default: 'Swati Gupta',
    template: '%s | Swati Gupta',
  },
  description:
    'Engineering Manager and Full Stack Developer with 10+ years building scalable web applications across MERN, PERN and AWS.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // `overflow-x-clip` lives on <html>, never on <body>: the hero band escapes the body width
  // with negative margins, so clipping at the body box would cut it back to 1024px. `clip`
  // rather than `hidden` because it does not create a scroll container, which would break the
  // hero's `position: sticky` stage, and it can coexist with `overflow-y: visible`.
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} overflow-x-clip`}
    >
      <head />
      <body className="mx-auto max-w-5xl">
        <Providers>
          <Navbar />
          {children}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  )
}
