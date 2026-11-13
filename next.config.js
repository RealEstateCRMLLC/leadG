/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Mounted under /leadg/ on the production domain (nginx reverse proxy).
  // basePath makes Next emit prefix-correct asset URLs, Link/router paths,
  // and auth redirects; without it /_next assets and the /login redirect
  // resolve to the domain root (the main CRM) and 404.
  basePath: '/leadg',
}

module.exports = nextConfig
