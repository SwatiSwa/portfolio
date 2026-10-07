import Link from 'next/link'

import { projects } from '@/lib/career'
import { ArrowIcon } from '@/ui/icons'

/**
 * The homepage's condensed project grid. The full list lives on /projects; both read from
 * `lib/career.ts` so a project is only ever added in one place.
 */
export default function Projects() {
  return (
    <section className="my-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-2xl font-semibold">Projects</h2>
        <Link
          href="/projects"
          className="text-sm text-[var(--band-muted)] underline-offset-4 hover:text-[var(--band-fg)] hover:underline"
        >
          All projects
        </Link>
      </div>
      <p className="text-[var(--band-muted)]">
        Creations between playtime with my small one.
      </p>
      <div className="mt-5">
        <div className="grid gap-10 sm:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.href}
              className="group relative flex flex-col space-y-2 border border-[var(--band-line)] p-4"
            >
              <div className="flex items-center space-x-3">
                <h3 className="text-2xl font-extrabold">{project.title}</h3>
                <ArrowIcon />
              </div>
              <p className="text-[var(--band-muted)]">{project.description}</p>
              <Link
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0"
              >
                <span className="sr-only">
                  View {project.title} on GitHub (opens in a new tab)
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
