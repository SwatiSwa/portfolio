import Link from 'next/link'

import InteractiveHero from 'ui/interactive-hero'
import { companies, skills } from '@/lib/career'
import { formatMonthYear } from '@/lib/utils'

import RecentPosts from './recent-posts'
import Projects from './projects'
import SocialLinks from './social-links'

/**
 * Flattened company → role pairs, newest first. Roles are nested under their company in
 * `lib/career.ts` because that is how a career reads, but the homepage preview wants a flat
 * "what has she been doing lately" list.
 */
const recentRoles = companies
  .flatMap((company) =>
    company.roles.map((role) => ({ company: company.name, ...role }))
  )
  .sort((a, b) => b.start.localeCompare(a.start))
  .slice(0, 3)

export default function page() {
  return (
    <>
      {/*
        The hero owns the page's <h1> (the name) and the roles line, so the old intro
        heading and subtitle are gone rather than duplicated. The paragraph below is kept —
        it carries the outbound EPAM/BYJU'S links, which are real content.
      */}
      <InteractiveHero />

      {/*
        Everything below the hero continues the same full-bleed dark surface, so the homepage
        reads as one continuous field. `band-page` marks the whole route as dark, which is
        what paints the body and hands the navbar its dark chrome. The negative margins break
        out of body's `max-w-5xl`; the inner div re-establishes it so the sections stay on the
        site's rail.
      */}
      <div className="dark-band band-page bleed-x">
        <div className="mx-auto max-w-5xl px-6 pb-24">
          <section className="space-y-2 pt-4">
            <p className="max-w-2xl text-[var(--band-muted)]">
              Crafting web apps is my game. Currently slinging code at{' '}
              <a
                href="https://www.epam.com/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--band-accent)] underline"
              >
                EPAM
              </a>
              , previously conquering challenges at{' '}
              <a
                href="https://www.byjus.com/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--band-accent)] underline"
              >
                BYJU&apos;s
              </a>
            </p>
            <SocialLinks />
          </section>

          <section className="my-10">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-2xl font-semibold">
                Experience
              </h2>
              <Link
                href="/work"
                className="text-sm text-[var(--band-muted)] underline-offset-4 hover:text-[var(--band-fg)] hover:underline"
              >
                Full career
              </Link>
            </div>

            <ol className="mt-5">
              {recentRoles.map((role) => (
                <li
                  key={`${role.company}-${role.title}-${role.start}`}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-[var(--band-line)] py-5"
                >
                  <div>
                    <h3 className="font-display text-lg font-medium">
                      {role.title}
                    </h3>
                    <p className="text-[var(--band-muted)]">{role.company}</p>
                  </div>
                  <p className="text-sm text-[var(--band-muted)]">
                    <time dateTime={role.start}>
                      {formatMonthYear(role.start)}
                    </time>
                    <span aria-hidden="true"> — </span>
                    {role.end ? (
                      <time dateTime={role.end}>
                        {formatMonthYear(role.end)}
                      </time>
                    ) : (
                      'Present'
                    )}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <RecentPosts />
          <Projects />

          <section className="my-10">
            <h2 className="font-display text-2xl font-semibold">Skills</h2>
            <div className="mt-5 grid gap-8 sm:grid-cols-3">
              {skills.map((group) => (
                <div key={group.group}>
                  <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--band-muted)]">
                    {group.group}
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-sm">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="border border-[var(--band-line)] px-3 py-1 text-[var(--band-muted)]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
