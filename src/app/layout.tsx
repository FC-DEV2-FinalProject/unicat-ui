import "@/src/styles/tailwind.css";
import "@/src/styles/globals.css";
import { useEffect } from 'react';

if (process.env.NODE_ENV === 'development') {
    require('../mocks/browser').worker.start({
        onUnhandledRequest: 'bypass',
    });
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
