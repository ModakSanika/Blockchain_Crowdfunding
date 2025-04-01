import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Noto_Sans_Devanagari } from 'next/font/google';
import './globals.css';
import { Web3Provider } from './context/Web3Context';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });
const notoSansDevanagari = Noto_Sans_Devanagari({ 
  weight: ['400', '700'],
  subsets: ['devanagari'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Blockchain Crowdfunding',
  description: 'A decentralized crowdfunding platform built on blockchain',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${notoSansDevanagari.className}`}>
        <Web3Provider>
          {children}
          <Toaster position="bottom-right" />
        </Web3Provider>
      </body>
    </html>
  );
} 