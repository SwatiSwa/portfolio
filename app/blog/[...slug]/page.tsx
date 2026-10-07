import { notFound } from 'next/navigation'
import { allAuthors, allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import { ArrowIcon } from 'ui/icons'
import Image from 'next/image'
import { Mdx } from '@/ui/mdx-components'
import { Metadata } from 'next'
import { absoluteUrl, formatDate } from '@/lib/utils'

interface PostPageProps {
  params: {
    slug: string[]
  }
}

async function getPostFromParams(params) {
  const slug = params?.slug?.join('/')
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    null
  }

  return post
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  const url = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set('heading', post.title)
  ogUrl.searchParams.set('type', 'Blog Post')
  ogUrl.searchParams.set('mode', 'dark')

  return {
    title: post.title,
    description: post.description,
    authors: post.authors.map((author) => ({
      name: author,
    })),
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: absoluteUrl(post.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogUrl.toString()],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  const authors = post.authors.map((author) =>
    allAuthors.find(({ slug }) => slug === `/authors/${author}`)
  )

  return (
    /*
     * The article shares the site rail so its heading starts on the same left edge as every
     * other page's, but is capped at a measure rather than the rail's full width — 1024px of
     * body text runs to roughly 94 characters a line, well past the ~70 a reader tracks
     * without losing their place. `max-w-prose` is the 65ch cap the work page already uses.
     */
    <div className="dark-band band-page bleed-x">
      <div className="mx-auto max-w-5xl px-6 pb-24">
        <article className="max-w-prose pt-6">
          <div>
            {post.date && (
              <time
                dateTime={post.date}
                className="block text-sm text-[var(--band-muted)]"
              >
                Published on {formatDate(post.date)}
              </time>
            )}
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {post.title}
            </h1>
            {authors?.length ? (
              <div className="mt-6 flex space-x-4">
                {authors.map((author) =>
                  author ? (
                    <Link
                      key={author._id}
                      href={`https://twitter.com/${author.twitter}`}
                      className="flex items-center space-x-3 text-sm underline-offset-4 hover:underline"
                    >
                      <Image
                        src={author.avatar}
                        alt={author.title}
                        width={42}
                        height={42}
                        className="rounded-full bg-[var(--band-line)]"
                      />
                      <div className="flex-1 text-left leading-tight">
                        <p className="font-medium">{author.title}</p>
                        <p className="text-xs text-[var(--band-muted)]">
                          @{author.twitter}
                        </p>
                      </div>
                    </Link>
                  ) : null
                )}
              </div>
            ) : null}
          </div>
          {post.image && (
            /*
             * `public/blog/post-1.png` is 218×200. Declaring it at 720×405 told Next to
             * upscale it 3.3× — which is where the blur came from — and, because Tailwind's
             * preflight sets `height: auto`, the wrong ratio also stretched it to 660px tall.
             * These are the real pixel dimensions, so it renders once at its own resolution.
             */
            <Image
              src={post.image}
              alt={post.title}
              width={218}
              height={200}
              className="my-8 rounded-md border border-[var(--band-line)]"
              priority
            />
          )}
          <Mdx code={post.body.code} />
          <hr className="mt-12 border-[var(--band-line)]" />
          <div className="flex justify-center py-6 lg:py-10">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-[var(--band-muted)] underline-offset-4 hover:text-[var(--band-fg)] hover:underline"
            >
              <ArrowIcon />
              <span>See all posts</span>
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}
