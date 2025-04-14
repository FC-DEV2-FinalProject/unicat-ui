import { NextConfig } from 'next';

const config: NextConfig = {
  webpack: (config, { isServer }) => {
    // MSW 설정
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default config;