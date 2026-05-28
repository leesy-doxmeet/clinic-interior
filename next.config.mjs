/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/register",
        destination: "/interior/register",
        permanent: true,
      },
      {
        source: "/quote",
        destination: "/interior/quote",
        permanent: true,
      },
      {
        source: "/sitemap-page",
        destination: "/interior/sitemap-page",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
