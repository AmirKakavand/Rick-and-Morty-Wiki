/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "rickandmortyapi.com"
            }
        ]
    },
    experimental: {
        fontLoaders: [
          { loader: '@next/font/google', options: { subsets: ['latin'] } },
        ],
      },
      assetPrefix: process.env.NODE_ENV === 'production' ? '/Rick-and-Morty-Wiki/' : '',
};

// https://rickandmortyapi.com/api/character/avatar/1.jpeg
export default nextConfig;
