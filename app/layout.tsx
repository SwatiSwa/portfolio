import '../styles/global.css'

import React from 'react'
import { Providers } from './providers'
import Navbar from 'ui/navbar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Swati Gupta',
    template: '%s | Swati Gupta',
  },
  description: 'Developer, Engineering Manager, and Mom.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <head />
      <body className="mx-auto max-w-5xl">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
