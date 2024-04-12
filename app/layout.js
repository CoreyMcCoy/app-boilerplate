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
    <html data-theme="dark" lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Navbar />
          <main className="px-8 py-20 max-w-xl flex flex-col items-center mx-auto text-center text-black">
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
