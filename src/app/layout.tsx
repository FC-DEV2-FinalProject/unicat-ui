import "@/src/styles/tailwind.css";
import "@/src/styles/globals.css";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

// 개발 환경에서만 MSW 실행
if (process.env.NODE_ENV === 'development') {
  require('../mocks');
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
