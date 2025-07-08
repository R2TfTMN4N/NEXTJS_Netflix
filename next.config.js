/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: '**', // chấp nhận tất cả hostname (domain)
    }, ],
  },
};

module.exports = nextConfig;
