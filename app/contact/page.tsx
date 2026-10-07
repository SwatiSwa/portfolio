import type { Metadata } from 'next'

import { profile, socials } from '@/lib/career'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Swati Gupta by email, LinkedIn or GitHub.',
}

/**
 * Email and social profiles only. The LinkedIn export also carries a mobile number, which is
 * deliberately not published here or anywhere else in this repository.
 */
export default function Contact() {
  return (
    <div className="dark-band band-page bleed-x">
      <div className="mx-auto max-w-5xl px-6 pb-24">
        <header className="pt-6">
          <p className="text-xs uppercase tracking-[0.34em] text-[var(--band-muted)]">
            Portfolio / Contact
          </p>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Contact
          </h1>
          <p className="mt-6 max-w-2xl text-[var(--band-muted)]">
            Happy to talk about engineering leadership, full-stack work, or
            building teams. Email is the surest way to reach me.
          </p>
        </header>

        <section aria-labelledby="reach" className="mt-16">
          <h2
            id="reach"
            className="text-xs uppercase tracking-[0.18em] text-[var(--band-muted)]"
          >
            Email
          </h2>
          <p className="mt-4">
            <a
              href={`mailto:${profile.email}`}
              className="font-display text-2xl font-medium underline-offset-4 hover:underline sm:text-3xl"
            >
              {profile.email}
            </a>
          </p>
        </section>

        <section aria-labelledby="elsewhere" className="mt-16">
          <h2
            id="elsewhere"
            className="text-xs uppercase tracking-[0.18em] text-[var(--band-muted)]"
          >
            Elsewhere
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            {socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-lg font-medium underline-offset-4 hover:underline"
                >
                  {social.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="based" className="mt-16">
          <h2
            id="based"
            className="text-xs uppercase tracking-[0.18em] text-[var(--band-muted)]"
          >
            Based in
          </h2>
          <p className="mt-4 text-[var(--band-muted)]">{profile.location}</p>
        </section>
      </div>
    </div>
  )
}
