/*
 * Imported for its side effect: it makes `next build` fail loudly if a client component ever
 * reaches this module, rather than the mistake surfacing later as an unexplained `fs` error.
 * Nothing here is browser-safe — it reads the filesystem.
 */
import 'server-only'

import fs from 'node:fs'
import path from 'node:path'

import matter from 'gray-matter'

/**
 * The content layer, in place of contentlayer.
 *
 * contentlayer 0.3 was replaced rather than upgraded because it cannot run on Node 22 or
 * later at all: the ESM it generates imports its JSON with `assert { type: 'json' }`, the
 * import-assertion form that Node 22 removed in favour of `with`, so the generated index
 * throws `SyntaxError: Unexpected identifier 'assert'` before any of this runs. The project
 * has been unmaintained since 2023, so there is no fixed release to move to. Vercel
 * discontinued Node 18 and disabled Node 20 in October 2026, which left no version to pin
 * back to.
 *
 * What replaces it is deliberately small: these are four MDX files, and the whole reason the
 * old stack needed a codegen step was to precompile MDX into a JS string. `next-mdx-remote`
 * does that compilation at render time instead, so this module only has to read frontmatter
 * and hand the raw body on.
 *
 * The field names below are not free choices — three routes read them, and two of them use
 * `slug` directly as an `href`. See the shape notes on each field.
 */

const CONTENT_DIR = path.join(process.cwd(), 'content')

export type Post = {
  /** Only ever used as a React key, so the file path is as good an identity as any. */
  _id: string
  title: string
  description?: string
  /** ISO string. Feeds both `new Date(date)` for sorting and a `<time dateTime>` attribute. */
  date: string
  published: boolean
  image: string
  /** Raw author ids (`swatiswa`), not slugs — the post page builds `/authors/${id}` itself. */
  authors: string[]
  /** Full path, leading slash: `/blog/post1`. Used as an `href`. */
  slug: string
  /** Just the URL segment: `post1`. This is what the catch-all route matches against. */
  slugAsParams: string
  /** Raw MDX, frontmatter stripped. Compiled by `Mdx`. */
  body: string
}

export type Author = {
  _id: string
  title: string
  description?: string
  avatar: string
  twitter: string
  /** `/authors/swatiswa`. Matched against `/authors/${authorId}` on the post page. */
  slug: string
  slugAsParams: string
  body: string
}

/**
 * Reads one directory of MDX and hands back its frontmatter plus body, keyed by filename.
 *
 * Read synchronously at module scope on purpose: this runs on the server during the build,
 * the four files are tiny, and it means `allPosts` is a plain array rather than a promise —
 * which is what the three call sites already expect (they call `.filter` and `.sort` on it
 * directly).
 *
 * Non-recursive, unlike the recursive glob contentlayer used: a post in a subdirectory is
 * silently skipped rather than picked up. Harmless while the four files sit flat.
 */
function readCollection(dir: string) {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const id = file.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(dir, file), 'utf8')
      const { data, content } = matter(raw)

      return { id, data, content }
    })
}

export const allPosts: Post[] = readCollection(
  path.join(CONTENT_DIR, 'blog')
).map(({ id, data, content }) => ({
  _id: `blog/${id}`,
  title: data.title,
  description: data.description,
  /*
   * Normalised to ISO rather than passed through as-is. `gray-matter` returns whatever YAML
   * parsed: a quoted date is a string, but an unquoted one becomes a `Date`, and a `Date`
   * interpolated into `<time dateTime>` renders as a locale string instead of a valid
   * datetime. `toISOString()` gives both call sites the format they expect.
   */
  date: new Date(data.date).toISOString(),
  // contentlayer defaulted this to `true`, and post1.mdx relies on that by omitting the key.
  published: data.published ?? true,
  image: data.image,
  authors: data.authors ?? [],
  slug: `/blog/${id}`,
  slugAsParams: id,
  body: content,
}))

export const allAuthors: Author[] = readCollection(
  path.join(CONTENT_DIR, 'authors')
).map(({ id, data, content }) => ({
  _id: `authors/${id}`,
  title: data.title,
  description: data.description,
  avatar: data.avatar,
  twitter: data.twitter,
  slug: `/authors/${id}`,
  slugAsParams: id,
  body: content,
}))
