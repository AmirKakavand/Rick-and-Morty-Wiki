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
      assetPrefix: '/Rick-and-Morty-Wiki',
      // basePath: '/Rick-and-Morty-Wiki',
};

// https://rickandmortyapi.com/api/character/avatar/1.jpeg
export default nextConfig;
