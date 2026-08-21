import type { NextConfig } from "next";
 
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  allowedDevOrigins:['192.168.100.2'],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: 'wgsj17do',
      },
    ],
  },

  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
}
 
 
export default nextConfig
