import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * Month and year only. `formatDate` includes the day, which would be false precision on a
 * role or project range — nobody started a job on the 1st because the 1st is all we know.
 */
export function formatMonthYear(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

/**
 * Falls back to localhost rather than interpolating `undefined` into the URL — an unset
 * `NEXT_PUBLIC_APP_URL` used to produce canonical and og:url tags reading `undefined/blog/…`.
 */
export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}${path}`
}
