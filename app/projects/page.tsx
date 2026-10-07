import type { Metadata } from 'next'
import Link from 'next/link'

import { projects } from '@/lib/career'
import { ArrowIcon } from '@/ui/icons'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Open-source projects built outside of work — form tooling, order management and a canvas toy.',
}

export default function ProjectsPage() {
  return (
    <div className="dark-band band-page bleed-x">
      <div className="mx-auto max-w-5xl px-6 pb-24">
        <header className="pt-6">
          <p className="text-xs uppercase tracking-[0.34em] text-[var(--band-muted)]">
            Portfolio / Code
          </p>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Projects
          </h1>
          <p className="mt-6 max-w-2xl text-[var(--band-muted)]">
            Creations between playtime with my small one.
          </p>
        </header>

        {projects.length === 0 ? (
          <p className="mt-16 text-[var(--band-muted)]">
            Nothing published yet — check back soon.
          </p>
        ) : (
          <ul className="mt-16 grid gap-8 sm:grid-cols-2">
            {projects.map((project) => (
              <li
                key={project.href}
                className="group relative flex flex-col border border-[var(--band-line)] p-6 transition-colors hover:border-[var(--band-line-strong)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-display text-xl font-semibold">
                    {project.title}
                  </h2>
                  <ArrowIcon />
                </div>
                <p className="mt-3 text-[var(--band-muted)]">
                  {project.description}
                </p>
                {/*
                  The whole card is the link. The `<span>` inside carries the accessible name,
                  so the title and description are not read out as link text.
                */}
                <Link
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--band-fg)]"
                >
                  <span className="sr-only">
                    View {project.title} on GitHub (opens in a new tab)
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
