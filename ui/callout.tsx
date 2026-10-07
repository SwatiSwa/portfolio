import { cn } from '@/lib/utils'

interface CalloutProps {
  icon?: string
  children?: React.ReactNode
  type?: 'default' | 'warning' | 'danger'
}

/**
 * Callout surfaces sit on the dark article band, so the light theme's `bg-red-50` /
 * `bg-yellow-50` fills are replaced with a low-alpha wash of the same hue. The alpha lets the
 * band read through the block, and the border carries the hue at a strength the text still
 * sits on top of.
 */
export function Callout({
  children,
  icon,
  type = 'default',
  ...props
}: CalloutProps) {
  return (
    <div
      className={cn(
        'my-6 flex items-start rounded-md border border-l-4 p-4',
        {
          'border-[var(--band-line)] border-l-[var(--band-line-strong)]':
            type === 'default',
          'border-red-500/35 border-l-red-400 bg-red-500/10':
            type === 'danger',
          'border-amber-500/35 border-l-amber-400 bg-amber-500/10':
            type === 'warning',
        }
      )}
      {...props}
    >
      {icon && <span className="mr-4 text-2xl">{icon}</span>}
      <div>{children}</div>
    </div>
  )
}
