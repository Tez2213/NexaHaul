/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Allow ESLint warnings during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Improve stability of builds
  swcMinify: false,
  // Prevent build errors from React.forwardRef warning
  reactStrictMode: false
}

module.exports = nextConfig