import Link from 'next/link'
import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

import { formatDate } from '@/lib/utils'
import { ArrowIcon } from '@/ui/icons'

export const metadata = {
  title: 'Blog',
  description:
    'Writing on engineering leadership, front-end architecture and the unglamorous parts of shipping software.',
}

export default async function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  return (
    <div className="dark-band band-page bleed-x">
      <div className="mx-auto max-w-5xl px-6 pb-24">
        <header className="pt-6">
          <p className="text-xs uppercase tracking-[0.34em] text-[var(--band-muted)]">
            Portfolio / Writing
          </p>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Blog
          </h1>
          <p className="mt-6 max-w-2xl text-[var(--band-muted)]">
            Dive into My Adventures: A Collection of Explorations and
            Discoveries.
          </p>
        </header>

        {posts?.length ? (
          <ul className="mt-16 grid gap-8 sm:grid-cols-2">
            {posts.map((post) => (
              <li
                key={post._id}
                className="group relative flex flex-col border border-[var(--band-line)] p-6 transition-colors hover:border-[var(--band-line-strong)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-display text-xl font-semibold">
                    {post.title}
                  </h2>
                  <ArrowIcon />
                </div>
                {post.description && (
                  <p className="mt-3 text-[var(--band-muted)]">
                    {post.description}
                  </p>
                )}
                {post.date && (
                  <p className="mt-4 text-sm text-[var(--band-muted)]">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </p>
                )}
                {/*
                  The whole card is the link. The `<span>` inside carries the accessible name,
                  so the title and description are not read out as link text.
                */}
                <Link
                  href={post.slug}
                  className="absolute inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--band-fg)]"
                >
                  <span className="sr-only">Read {post.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-16 text-[var(--band-muted)]">
            Nothing published yet — check back soon.
          </p>
        )}
      </div>
    </div>
  )
}
