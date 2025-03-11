import type { NextConfig } from "next";
import fs from 'fs';
import path from 'path';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
  // HTTPS 설정
  server: {
    https: {
      key: fs.readFileSync(path.join(process.cwd(), 'public/certs/key.base64')),
      cert: fs.readFileSync(path.join(process.cwd(), 'public/certs/fullchain.cer.base64')),
      ca: fs.readFileSync(path.join(process.cwd(), 'public/certs/ca.cer.base64')),
    },
  },
};

export default nextConfig;
