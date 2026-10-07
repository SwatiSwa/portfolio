import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

import portraitImage from '../../public/avatars/portrait.jpg'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Swati Gupta is an engineering manager and full-stack engineer based in Bengaluru, currently a technical lead at EPAM Systems.',
}

/**
 * Now on the dark band, like every other route. The page keeps its own opening — a statement
 * rather than a one-word title, so it takes the site's eyebrow-and-display-heading header
 * without also gaining a redundant "About" above it.
 *
 * The portrait sits in a fixed right-hand column at `lg` and stacks beneath the copy below
 * that. Its backdrop is a band token rather than the old `bg-zinc-100`, which painted a bright
 * block behind the image while it decoded.
 */
export default function About() {
  return (
    <div className="dark-band band-page bleed-x">
      <div className="mx-auto max-w-5xl px-6 pb-24">
        <header className="pt-6">
          <p className="text-xs uppercase tracking-[0.34em] text-[var(--band-muted)]">
            Portfolio / About
          </p>
        </header>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-16">
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              I’m Swati Gupta, an engineering manager and full-stack engineer in
              Bengaluru.
            </h1>
            <div className="mt-8 max-w-prose space-y-6 text-[var(--band-muted)]">
              <p>
                I lead engineering teams and still write code. Over the past decade
                I’ve gone from building JavaScript front ends at Tata Consultancy
                Services, to leading teams of engineers at BYJU&apos;S, to my current
                role as a technical lead on the Atlassian Jira team at EPAM Systems.
              </p>
              <p>
                My background is full-stack — the MERN and PERN stacks, with enough
                AWS to run what I build: EC2, S3, IAM and VPC. I’ve worked across
                supply chain, digital finance and sales, which mostly taught me that
                the hard part is rarely the code.
              </p>
              <p>
                As a manager I care about the unglamorous things: a clear strategy, a
                healthy team, and engineers who grow. I’ve set up infrastructure from
                scratch, run OKRs and roadmaps, led cross-functional delivery, and
                mentored developers into more senior roles.
              </p>
              <p>
                Outside of work I write on{' '}
                <Link
                  href="/blog"
                  className="text-[var(--band-accent)] underline underline-offset-4"
                >
                  the blog
                </Link>{' '}
                and build small projects —{' '}
                <Link
                  href="/projects"
                  className="text-[var(--band-accent)] underline underline-offset-4"
                >
                  some of them are here
                </Link>
                . The full career record is on{' '}
                <Link
                  href="/work"
                  className="text-[var(--band-accent)] underline underline-offset-4"
                >
                  the work page
                </Link>
                .
              </p>
            </div>
          </div>

          <div>
            <Image
              src={portraitImage}
              alt="Portrait of Swati Gupta"
              sizes="(min-width: 1024px) 18rem, 20rem"
              className="aspect-square w-full max-w-xs rotate-3 rounded-2xl bg-[var(--band-panel)] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
