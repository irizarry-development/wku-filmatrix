/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'images.ctfassets.net' },
      { hostname: 'www.wku.edu' },
    ]
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"]
  }
}

module.exports = nextConfig
