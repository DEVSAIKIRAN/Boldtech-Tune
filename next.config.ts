// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'tpytccxrxskrbhairxqm.supabase.co'
      // Add this line
      // ... any other domains you might have
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    // USE WITH CAUTION! It's much better to fix the errors.
    ignoreDuringBuilds: true,
  },
  // ... any other Next.js configurations
};

module.exports = nextConfig;