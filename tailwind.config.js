const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './ui/**/*.{ts,tsx}', './content/**/*.mdx'],
  darkMode: 'class',
  theme: {
    fontSize: {
      xs: ['0.8125rem', { lineHeight: '1.5rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.75rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    extend: {
      // `extend` (not a top-level key) so the default sans/serif/mono families survive —
      // preflight reads theme.fontFamily.sans for the base document font.
      fontFamily: {
        display: ['var(--font-display)', ...defaultTheme.fontFamily.sans],
        // `font-heading` is used by the blog pages and the MDX components but was never
        // defined, so those headings silently fell back to the body face. Same variable.
        heading: ['var(--font-display)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // `text-muted-foreground` and `bg-muted` are shadcn template leftovers that were
        // never defined either — the blog rendered those elements unstyled. #71717a on
        // white measures 4.81:1, clearing the 4.5:1 body-text requirement.
        muted: {
          DEFAULT: '#f4f4f5',
          foreground: '#71717a',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
