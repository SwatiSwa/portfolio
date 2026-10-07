import * as React from 'react'
import Image from 'next/image'
import { useMDXComponent } from 'next-contentlayer/hooks'

import { cn } from '@/lib/utils'
import { Callout } from '@/ui/callout'
import { MdxCard } from '@/ui/mdx-card'

/**
 * The article body. Written against the dark band's tokens rather than Tailwind's defaults:
 * an unqualified `border` resolves to `gray.200`, which reads as a bright wire on #0b0b0c, and
 * `bg-muted` / `text-muted-foreground` are light-theme values that go invisible here.
 *
 * Headings take `font-display` so the body's section headings match the page's h1 and the rest
 * of the site, rather than falling back to the body face.
 */
const components = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        'mt-2 scroll-m-20 font-display text-4xl font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        'mt-10 scroll-m-20 border-b border-[var(--band-line)] pb-2 font-display text-3xl font-semibold tracking-tight first:mt-0',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        'mt-8 scroll-m-20 font-display text-2xl font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn(
        'mt-8 scroll-m-20 font-display text-xl font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }) => (
    <h5
      className={cn(
        'mt-8 scroll-m-20 font-display text-lg font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }) => (
    <h6
      className={cn(
        'mt-8 scroll-m-20 font-display text-base font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  // The accent, as on the homepage prose — the one colour that reads as "this goes somewhere".
  a: ({ className, ...props }) => (
    <a
      className={cn(
        'font-medium text-[var(--band-accent)] underline underline-offset-4',
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        'my-6 ml-6 list-disc marker:text-[var(--band-line-strong)]',
        className
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        'my-6 ml-6 list-decimal marker:text-[var(--band-line-strong)]',
        className
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn('mt-2', className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        '[&>*]:text-[var(--band-muted)] mt-6 border-l-2 border-[var(--band-line-strong)] pl-6 italic',
        className
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn(
        'rounded-md border border-[var(--band-line)]',
        className
      )}
      alt={alt}
      {...props}
    />
  ),
  hr: ({ ...props }) => (
    <hr className="my-4 border-[var(--band-line)] md:my-8" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn('w-full', className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn(
        'even:bg-[var(--band-panel)] m-0 border-t border-[var(--band-line)] p-0',
        className
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        'border border-[var(--band-line)] px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        'border border-[var(--band-line)] px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  // A block sits a shade *off* the band rather than at `bg-black`, which is darker than the
  // page it is on and reads as a hole. The nested-code overrides strip the inline chip styling
  // from the `<code>` that a fenced block wraps, which would otherwise draw a second box.
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        'mb-4 mt-6 overflow-x-auto rounded-lg border border-[var(--band-line)] bg-[var(--band-panel)] py-4 [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0',
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        'relative rounded border border-[var(--band-line)] bg-[var(--band-panel)] px-[0.3rem] py-[0.2rem] font-mono text-sm',
        className
      )}
      {...props}
    />
  ),
  Image,
  Callout,
  Card: MdxCard,
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  )
}
