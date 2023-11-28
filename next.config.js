/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "assets.resonite.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

module.exports = nextConfig;
