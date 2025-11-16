/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages will handle the build output
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

