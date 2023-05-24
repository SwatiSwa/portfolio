import Link from 'next/link'
import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
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
      <h1 className="text-2xl font-semibold">Recent Posts</h1>
      <p className="text-gray-600">
        Dive into My Adventures: A Collection of Explorations and Discoveries..
      </p>
      <div className="mt-5">
        {recentPosts?.length ? (
          <div className="grid gap-10 sm:grid-cols-3">
            {recentPosts.map((post) => (
              <article
                key={post._id}
                className="group relative flex flex-col space-y-2 border border-gray-300 p-4"
              >
                <h2 className="text-2xl font-extrabold">{post.title}</h2>
                {post.description && (
                  <p className="text-muted-foreground">{post.description}</p>
                )}
                {post.date && (
                  <p className="text-muted-foreground text-sm">
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
