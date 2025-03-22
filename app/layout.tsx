import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import SideNav from './components/SideNav';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'World Games - Play Free Online Games',
  description: 'Enjoy free online games directly in your browser. No downloads, no installs - just instant fun!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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