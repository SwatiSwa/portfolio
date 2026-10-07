/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    scrollRestoration: true,
    /*
     * `lib/content.ts` reads `content/` off the filesystem at module scope. Every route that
     * imports it is prerendered, so today the read happens at build time, where the directory is
     * plainly present. This is insurance: a route that later renders on demand resolves
     * `process.cwd()` to `/var/task` on Vercel, where `content/` exists only if the build traced
     * it — and an untraced read 500s on the deployed site while `next start` passes locally.
     */
    outputFileTracingIncludes: {
      '/blog/[...slug]': ['./content/**/*'],
      '/blog': ['./content/**/*'],
      '/': ['./content/**/*'],
    },
  },
}

export default nextConfig
