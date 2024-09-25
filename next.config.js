const withPlugins = require('next-compose-plugins');
const runtimeCaching = require('next-pwa/cache');
const { withContentlayer } = require('next-contentlayer2');

import("./env.mjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'out',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  }
};

const withPWA = require('next-pwa')({
  dest: 'public',
  runtimeCaching,
  disable: process.env.NODE_ENV === 'development',
  skipWaiting: true,
  register: true
})


module.exports = withPlugins([
  [withPWA],
  [withContentlayer]
], nextConfig);