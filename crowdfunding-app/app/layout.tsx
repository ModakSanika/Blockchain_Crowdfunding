import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Web3Provider } from './context/Web3Context';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Crowdfunding DApp',
  description: 'A decentralized crowdfunding platform built with Next.js and Ethereum',
};

function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🚀</span>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              CrowdFund
            </span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className={`text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/' ? 'text-purple-600' : ''
              }`}
            >
              🏠 Home
            </Link>
            <Link
              href="/create"
              className={`text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/create' ? 'text-purple-600' : ''
              }`}
            >
              ✨ Create Project
            </Link>
            <Link
              href="/explore"
              className={`text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/explore' ? 'text-purple-600' : ''
              }`}
            >
              🔍 Explore
            </Link>
            <Link
              href="/funded"
              className={`text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/funded' ? 'text-purple-600' : ''
              }`}
            >
              💫 Funded Projects
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider>
          <Navigation />
          <main className="pt-16 min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-pink-100">
            {children}
          </main>
          <footer className="bg-white/80 backdrop-blur-md py-4 text-center text-gray-600">
            <p className="text-sm">
              Made with <span className="animate-pulse">❤️</span> by Sanika Modak
            </p>
          </footer>
          <Toaster position="bottom-right" />
        </Web3Provider>
      </body>
    </html>
  );
} 