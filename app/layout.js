import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SaaS Boilerplate',
  description: 'Generated with love by Corey McCoy',
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="night" lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="px-8 py-20 max-w-6xl mx-auto ">{children}</main>
      </body>
    </html>
  );
}
