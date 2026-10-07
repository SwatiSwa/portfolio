import Link from 'next/link'
import { compareDesc } from 'date-fns'
import { allPosts } from '@/lib/content'
import { formatDate } from '@/lib/utils'

export default function RecentPosts() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })
  const recentPosts = posts.slice(0, 3)

  return (
    <section className="my-10">
      <h2 className="text-2xl font-semibold">Recent Posts</h2>
      <p className="text-[var(--band-muted)]">
        Dive into My Adventures: A Collection of Explorations and Discoveries..
      </p>
      <div className="mt-5">
        {recentPosts?.length ? (
          <div className="grid gap-10 sm:grid-cols-3">
            {recentPosts.map((post) => (
              <article
                key={post._id}
                className="group relative flex flex-col space-y-2 border border-[var(--band-line)] p-4"
              >
                <h2 className="text-2xl font-extrabold">{post.title}</h2>
                {post.description && (
                  <p className="text-[var(--band-muted)]">{post.description}</p>
                )}
                {post.date && (
                  <p className="text-sm text-[var(--band-muted)]">
                    {formatDate(post.date)}
                  </p>
                )}
                <Link href={post.slug} className="absolute inset-0">
                  <span className="sr-only">View Article</span>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p>No posts published.</p>
        )}
      </div>
    </section>
  )
}
