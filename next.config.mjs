/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["juuzskjgczlmyqxijkud.supabase.co", "files.stripe.com"],
  },
  ignoreDuringBuilds: true,
};

export default nextConfig;
