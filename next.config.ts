import type { NextConfig } from "next";

const imageHosts = [
  "sjc.microlink.io",
  "hebbkx1anhila5yf.public.blob.vercel-storage.com",
  "cdn.dribbble.com",
  "miro.medium.com",
  "asset.cloudinary.com",
  "innova-ms.com",
  "avatar.vercel.sh",
  "randomuser.me",
  "images.unsplash.com",
  "4006992.fs1.hubspotusercontent-na1.net",
  "acropolium.com",
  "r2.spurnow.com",
  "res.cloudinary.com",
];

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: imageHosts.map((hostname) => ({ protocol: "https", hostname })),
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
