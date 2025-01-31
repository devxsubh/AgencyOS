import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['sjc.microlink.io','hebbkx1anhila5yf.public.blob.vercel-storage.com','cdn.dribbble.com', 'miro.medium.com', 'asset.cloudinary.com', 'innova-ms.com', 'avatar.vercel.sh', 'randomuser.me'], // Add the external image domain here
  },
};

export default nextConfig;
