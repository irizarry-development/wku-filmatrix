/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.ctfassets.net", "www.wku.edu"]
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"]
  }
}

module.exports = nextConfig
