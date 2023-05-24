import RecentPosts from './recent-posts'
import Projects from './projects'
import SocialLinks from './social-links'

export default function page() {
  return (
    <>
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">Hello, I&apos;m Swati Gupta</h1>
        <h4 className="text-lg text-gray-600">
          Full Stack Developer & Engineering Manager hailing from India.
        </h4>
        <p className="max-w-2xl text-gray-500">
          Crafting web apps is my game. Currently slinging code at{' '}
          <a
            href="https://www.epam.com/"
            target="_blank"
            rel="noreferrer"
            className="text-pink-500 underline"
          >
            EPAM
          </a>
          , previously conquering challenges at{' '}
          <a
            href="https://www.byjus.com/"
            target="_blank"
            rel="noreferrer"
            className="text-pink-500 underline"
          >
            BYJU&apos;s
          </a>
        </p>
        <SocialLinks />
      </section>
      <RecentPosts />
      <Projects />
    </>
  )
}
