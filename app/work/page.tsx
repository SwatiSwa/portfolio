import type { Metadata } from 'next'

import {
  awards,
  certifications,
  companies,
  education,
  profile,
  skills,
  testimonials,
} from '@/lib/career'
import type { Company } from '@/lib/career'
import { formatMonthYear } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'The career record: engineering leadership and full-stack delivery at EPAM Systems, BYJU’S and Tata Consultancy Services.',
}

/**
 * Anchor ids for the career index. Company names carry spaces and apostrophes ("BYJU'S"), none
 * of which are legal in a fragment, so everything that is not alphanumeric collapses to a dash.
 */
function anchorId(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

/**
 * The years a company is read as in the index. Year only — the index is a glance, and months
 * there would be noise. Read as UTC so a first-of-the-month ISO date cannot slide into the
 * previous year for a reader behind UTC.
 */
function yearOf(iso: string) {
  return new Date(iso).getUTCFullYear()
}

/**
 * The span of a whole tenure: earliest role start to latest role end. Fewer role ends than
 * roles means at least one role is still open, so the tenure is open too.
 */
function tenureOf(company: Company) {
  const starts = company.roles.map((role) => role.start).sort()
  const ends = company.roles
    .map((role) => role.end)
    .filter((end): end is string => end !== null)
    .sort()

  return {
    start: starts[0],
    end: ends.length === company.roles.length ? ends[ends.length - 1] : null,
  }
}

/**
 * The career index, derived rather than hand-listed so a role added to `lib/career.ts` cannot
 * leave the index stale. `companies` is already newest-first, so this needs no sort.
 */
const careerIndex = companies.map((company) => ({
  name: company.name,
  id: anchorId(company.name),
  ...tenureOf(company),
}))

/**
 * A role's dates. `end: null` means current, and reads as "Present" rather than as a missing
 * value. Both ends are wrapped in `<time>` so the range is machine-readable.
 */
function Range({ start, end }: { start: string; end: string | null }) {
  return (
    <p className="text-sm text-[var(--band-muted)]">
      <time dateTime={start}>{formatMonthYear(start)}</time>
      <span aria-hidden="true"> — </span>
      {end ? <time dateTime={end}>{formatMonthYear(end)}</time> : 'Present'}
    </p>
  )
}

function SectionHeading({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) {
  // A step above the chapter headings below it. At `text-2xl` the section heading and the
  // company name rendered at the same size, so "Experience" and "EPAM Systems" read as
  // siblings and the page flattened into a list of same-weight headings.
  return (
    <h2
      id={id}
      className="font-display text-2xl font-semibold tracking-tight sm:text-3xl"
    >
      {children}
    </h2>
  )
}

/**
 * `/work` is a document page: one long chronological record. Three treatments carry it, each
 * matched to the shape of its content rather than applied uniformly —
 *
 *   - the experience chapters are a *sequence*, so they get the rail (`.career-entry`);
 *   - education and credentials are *records*, so they get hairline rows;
 *   - skills are *tags*, so they get the chips the homepage already uses.
 *
 * The career index at the top exists because the page runs to several screens; without it the
 * only way to reach a past employer is to scroll past the present one.
 */
export default function Work() {
  return (
    <div className="dark-band band-page bleed-x">
      <div className="mx-auto max-w-5xl px-6 pb-24">
        <header className="pt-6">
          <p className="text-xs uppercase tracking-[0.34em] text-[var(--band-muted)]">
            Portfolio / Career
          </p>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Work
          </h1>
          <p className="mt-6 max-w-2xl text-[var(--band-muted)]">
            {profile.summary}
          </p>
        </header>

        {/*
          Unlabelled on purpose — the rows name themselves, and an "Index" heading above four
          company names would be a label doing no work. `aria-label` supplies the structure
          that the visible heading would have.

          Set a step below the chapter headings and given tighter rows, because it is made of
          the same two parts they are (a name and a range, over a rule). At equal weight the two
          were indistinguishable and this read as content rather than as navigation.
        */}
        <nav aria-label="Companies" className="mt-14 border-t border-[var(--band-line)]">
          <ul>
            {careerIndex.map((company) => (
              <li
                key={company.id}
                className="border-b border-[var(--band-line)]"
              >
                <a
                  href={`#${company.id}`}
                  className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--band-fg)]"
                >
                  <span className="font-medium group-hover:underline">
                    {company.name}
                  </span>
                  <span className="text-sm text-[var(--band-muted)]">
                    {yearOf(company.start)}
                    <span aria-hidden="true"> — </span>
                    {company.end ? yearOf(company.end) : 'Present'}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section aria-labelledby="experience" className="mt-20">
          <SectionHeading id="experience">Experience</SectionHeading>

          <div className="mt-12 space-y-16">
            {companies.map((company) => {
              const tenure = tenureOf(company)

              return (
                <div key={company.name} id={anchorId(company.name)}>
                  {/* The chapter break. The rail stops here and picks up with the first role,
                      which is what keeps four employers legible as four chapters rather than
                      one undifferentiated line. */}
                  <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-[var(--band-line)] pb-4">
                    <h3 className="font-display text-2xl font-semibold">
                      {company.name}
                    </h3>
                    <Range start={tenure.start} end={tenure.end} />
                  </header>

                  <ol className="mt-8">
                    {company.roles.map((role) => (
                      <li
                        key={`${role.title}-${role.start}`}
                        className={`career-entry grid gap-x-4 pb-10 last:pb-0 lg:grid-cols-[13rem_1fr] lg:gap-x-10 ${
                          role.end === null ? 'career-entry--current' : ''
                        }`}
                      >
                        <div>
                          <Range start={role.start} end={role.end} />
                          <p className="mt-1 text-sm text-[var(--band-muted)]">
                            {role.location}
                          </p>
                        </div>

                        <div className="mt-4 lg:mt-0">
                          <h4 className="font-display text-lg font-medium">
                            {role.title}
                          </h4>
                          {role.highlights.length > 0 && (
                            <ul className="mt-3 max-w-prose list-disc space-y-2 pl-5 text-[var(--band-muted)] marker:text-[var(--band-line-strong)]">
                              {role.highlights.map((highlight) => (
                                <li key={highlight}>{highlight}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )
            })}
          </div>
        </section>

        <section aria-labelledby="education" className="mt-20">
          <SectionHeading id="education">Education</SectionHeading>
          <ul className="mt-10 border-t border-[var(--band-line)]">
            {education.map((entry) => (
              <li
                key={entry.school}
                className="border-b border-[var(--band-line)] py-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="font-display text-lg font-medium">
                    {entry.school}
                  </h3>
                  <p className="text-sm text-[var(--band-muted)]">
                    {entry.period}
                  </p>
                </div>
                <p className="mt-1 text-[var(--band-muted)]">
                  {entry.credential}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="credentials" className="mt-20">
          <SectionHeading id="credentials">
            Certifications &amp; awards
          </SectionHeading>

          <div className="mt-10 grid gap-x-16 gap-y-12 sm:grid-cols-2">
            <div>
              <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--band-muted)]">
                Certifications
              </h3>
              <ul className="mt-4 border-t border-[var(--band-line)]">
                {certifications.map((certification) => (
                  <li
                    key={certification}
                    className="border-b border-[var(--band-line)] py-3 text-[var(--band-muted)]"
                  >
                    {certification}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--band-muted)]">
                Awards
              </h3>
              <ul className="mt-4 border-t border-[var(--band-line)]">
                {awards.map((award) => (
                  <li
                    key={award}
                    className="border-b border-[var(--band-line)] py-3 text-[var(--band-muted)]"
                  >
                    {award}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="skills" className="mt-20">
          <SectionHeading id="skills">Skills</SectionHeading>
          {/* Chips, matching the homepage — the same data read the same way on both surfaces. */}
          <div className="mt-10 grid gap-x-16 gap-y-10 sm:grid-cols-3">
            {skills.map((group) => (
              <div key={group.group}>
                <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--band-muted)]">
                  {group.group}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-sm">
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

        {/*
          Rendered only once `testimonials` in lib/career.ts has real entries. It ships empty
          on purpose — see the note there on why a paraphrase is not a quotation.
        */}
        {testimonials.length > 0 && (
          <section aria-labelledby="testimonials" className="mt-20">
            <SectionHeading id="testimonials">Testimonials</SectionHeading>
            <ul className="mt-10 grid gap-x-16 gap-y-8 border-t border-[var(--band-line)] sm:grid-cols-2">
              {testimonials.map((testimonial) => (
                <li
                  key={testimonial.name}
                  className="border-b border-[var(--band-line)] pb-6 pt-6"
                >
                  <blockquote className="max-w-prose">
                    <p className="font-display text-lg leading-snug">
                      “{testimonial.quote}”
                    </p>
                    <footer className="mt-4 text-sm text-[var(--band-muted)]">
                      {testimonial.name} — {testimonial.title}
                    </footer>
                  </blockquote>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
