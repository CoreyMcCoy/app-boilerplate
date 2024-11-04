import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { NextAuthProvider } from './Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SaaS Boilerplate',
  description: 'Generated with love by Corey McCoy',
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="light" lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Navbar />
          <main className="container mx-auto">
            <div className="flex items-start justify-center min-h-screen">
              <div className="mt-20">{children}</div>
            </div>
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
