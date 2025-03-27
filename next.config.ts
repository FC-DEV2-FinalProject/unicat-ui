import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // webpack: (config, { isServer, dev }) => {
  //   // 개발 환경에서 MSW 서버 시작
  //   if (isServer && dev) {
  //     require('./src/mocks/server.ts');
  //     console.log('🚀 MSW Server started with Next.js');
  //   }
  //   return config;
  // },
};

export default nextConfig;