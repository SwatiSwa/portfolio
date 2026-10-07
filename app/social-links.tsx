import { GitHubIcon, LinkedInIcon, TwitterIcon } from 'ui/icons'

/**
 * Icon-only links, so each carries its own accessible name — the SVG itself is hidden from
 * the accessibility tree by the icon components, leaving the `<a>` to supply the label.
 */
const LINKS = [
  {
    href: 'https://www.github.com/swatiswa',
    label: 'GitHub',
    Icon: GitHubIcon,
  },
  {
    href: 'https://www.twitter.com/swatigu11',
    label: 'Twitter',
    Icon: TwitterIcon,
  },
  {
    href: 'https://www.linkedin.com/in/swati-thiru/',
    label: 'LinkedIn',
    Icon: LinkedInIcon,
  },
]

export default function SocialLinks() {
  return (
    <ul className="flex items-center space-x-3 pt-5 text-[var(--band-muted)]">
      {LINKS.map(({ href, label, Icon }) => (
        <li key={href}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="inline-block transition-colors hover:text-[var(--band-fg)]"
          >
            {/* `LinkedInIcon` takes no intrinsic size, so it is sized here. */}
            <Icon className="h-5 w-5" />
          </a>
        </li>
      ))}
    </ul>
  )
}
