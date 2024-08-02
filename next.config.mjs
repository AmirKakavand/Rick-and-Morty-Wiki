/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "rickandmortyapi.com"
            }
        ]
    }
};

// https://rickandmortyapi.com/api/character/avatar/1.jpeg
export default nextConfig;
