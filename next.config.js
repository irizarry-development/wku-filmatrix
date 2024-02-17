/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["images.ctfassets.net"]
    },
    experimental: {
        serverComponentsExternalPackages: ["@prisma/client", "bcrypt"]
    }
};

module.exports = nextConfig;
