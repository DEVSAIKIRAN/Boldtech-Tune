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
  // ... any other Next.js configurations
};

module.exports = nextConfig;