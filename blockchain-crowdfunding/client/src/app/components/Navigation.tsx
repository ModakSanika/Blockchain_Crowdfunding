'use client';

import Link from "next/link";
import { useWeb3 } from "../../context/Web3Context";

export default function Navigation() {
  const { account, connectWallet } = useWeb3();

  console.log("Connected Account:", account);

  return (
    <>
      <nav className="bg-purple-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-4">
            <span className="text-4xl animate-bounce">🕊️</span>
            <span className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
              उड़ान
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link href="/projects/all-projects" className="hover:underline flex items-center gap-2 text-lg">
              ✨ All Projects
            </Link>
            <Link href="/projects/funded" className="hover:underline flex items-center gap-2 text-lg">
              ✨ Funded Projects
            </Link>
            <Link href="/projects/create" className="hover:underline flex items-center gap-2 text-lg">
              🎯 Create Project
            </Link>
          </div>

          {/* Wallet Connection */}
          <div>
            {account ? (
              <span className="bg-pink-600 px-4 py-2 rounded-full flex items-center gap-3 text-lg">
                <span className="text-white text-lg">👤</span>
                {`${account.substring(0, 6)}...${account.slice(-4)}`}
              </span>
            ) : (
              <button
                onClick={connectWallet}
                className="bg-pink-600 hover:bg-pink-700 px-6 py-2 rounded-lg text-xl"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}