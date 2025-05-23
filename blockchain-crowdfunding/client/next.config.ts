/** @type {import('next').NextConfig} */
interface WebpackConfig {
  resolve: {
    fallback: {
      fs: boolean;
      net: boolean;
      tls: boolean;
    };
  };
}

interface NextConfig {
  reactStrictMode: boolean;
  webpack: (config: WebpackConfig) => WebpackConfig;
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  }
};

module.exports = nextConfig;