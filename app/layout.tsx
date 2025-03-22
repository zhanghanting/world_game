import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import SideNav from './components/SideNav';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Relax Games - Play Free Online Games',
  description: 'Enjoy free online games directly in your browser. No downloads, no installs - just instant fun!',
  icons: {
    icon: [
      {
        url: '/images/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/images/favicon.png',
        type: 'image/png',
        sizes: '512x512'
      },
      {
        url: '/images/favicon-32x32.png',
        type: 'image/png',
        sizes: '32x32'
      },
      {
        url: '/images/favicon-16x16.png',
        type: 'image/png',
        sizes: '16x16'
      }
    ],
    shortcut: '/images/favicon.svg',
    apple: [
      {
        url: '/images/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/images/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
      </head>
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <Providers>
          <Navbar />
          <SideNav />
          <div className="md:ml-64 min-h-screen">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
} 