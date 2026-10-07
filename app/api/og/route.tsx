import { ImageResponse } from '@vercel/og'

import { ogImageSchema } from '@/lib/validations/og'

export const runtime = 'edge'

/**
 * Social share card for blog posts.
 *
 * This route was inherited from the shadcn/taxonomy template and used to draw *that*
 * project's wordmark and badge across the top of every card, and to print its domain and
 * repo in the footer. Both are replaced here with this site's own.
 *
 * The `fontFamily: 'Inter' | 'Cal Sans'` declarations that used to sit on these nodes are
 * gone: neither font was ever loaded into `ImageResponse`, so they resolved to nothing and
 * the card silently fell back to the default face either way.
 */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const values = ogImageSchema.parse(Object.fromEntries(url.searchParams))
    const heading =
      values.heading.length > 140
        ? `${values.heading.substring(0, 140)}...`
        : values.heading

    const { mode } = values
    const paint = mode === 'dark' ? '#fff' : '#000'

    const fontSize = heading.length > 100 ? '70px' : '100px'

    return new ImageResponse(
      (
        <div
          tw="flex relative flex-col p-12 w-full h-full items-start"
          style={{
            color: paint,
            background:
              mode === 'dark'
                ? 'linear-gradient(90deg, #000 0%, #111 100%)'
                : 'white',
          }}
        >
          <div
            tw="flex text-2xl uppercase font-bold"
            style={{ letterSpacing: '0.16em' }}
          >
            Swati Gupta
          </div>
          <div tw="flex flex-col flex-1 py-10">
            <div tw="flex text-xl uppercase font-bold tracking-tight">
              {values.type}
            </div>
            <div
              tw="flex leading-[1.1] text-[80px] font-bold"
              style={{ marginLeft: '-3px', fontSize }}
            >
              {heading}
            </div>
          </div>
          <div tw="flex items-center w-full">
            <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
              <path
                d="M30 44v-8a9.6 9.6 0 0 0-2-7c6 0 12-4 12-11 .16-2.5-.54-4.96-2-7 .56-2.3.56-4.7 0-7 0 0-2 0-6 3-5.28-1-10.72-1-16 0-4-3-6-3-6-3-.6 2.3-.6 4.7 0 7a10.806 10.806 0 0 0-2 7c0 7 6 11 12 11a9.43 9.43 0 0 0-1.7 3.3c-.34 1.2-.44 2.46-.3 3.7v8"
                stroke={paint}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 36c-9.02 4-10-4-14-4"
                stroke={paint}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div tw="flex ml-2 text-xl">github.com/SwatiSwa</div>
          </div>
        </div>
      )
    )
  } catch (error) {
    return new Response(`Failed to generate image`, {
      status: 500,
    })
  }
}
