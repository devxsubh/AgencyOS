import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['sjc.microlink.io','hebbkx1anhila5yf.public.blob.vercel-storage.com','cdn.dribbble.com', 'miro.medium.com', 'asset.cloudinary.com', 'innova-ms.com', 'avatar.vercel.sh', 'randomuser.me', 'images.unsplash.com', '4006992.fs1.hubspotusercontent-na1.net', 'acropolium.com', 'r2.spurnow.com'], // Add the external image domain here
  },
};

export default nextConfig;
