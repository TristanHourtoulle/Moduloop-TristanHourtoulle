/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "*.public.blob.vercel-storage.com" }],
  },
  // Turbopack is now the default bundler in Next.js 16
  // To use webpack instead, run: next build --webpack

  // Enable cache components for better performance (moved out of experimental)
  // Disabled temporarily due to incompatibility with React Query's Date.now() usage
  cacheComponents: false,
};

export default nextConfig;
