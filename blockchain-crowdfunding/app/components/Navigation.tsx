import React from 'react';
import Link from 'next/link';
import { useWeb3 } from '../context/Web3Context';

export default function Navigation() {
  const { isConnected, connect, address } = useWeb3();

  return (
    <nav className="bg-purple-900/80 backdrop-blur-sm border-b border-purple-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-white text-3xl font-bold flex items-center space-x-3">
                <span className="text-4xl text-white">🕊️</span>
                <span className="text-5xl bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 bg-clip-text text-transparent font-['Noto Sans Devanagari']">उड़ान</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/projects"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
              >
                <span className="text-xl">🔍</span>
                <span>All Projects</span>
              </Link>
              <Link
                href="/projects/funded"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
              >
                <span className="text-xl">✨</span>
                <span>Funded Projects</span>
              </Link>
              <Link
                href="/projects/create"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
              >
                <span className="text-xl">🎯</span>
                <span>Create Project</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {isConnected ? (
              <span className="text-gray-300 flex items-center space-x-2">
                <span className="text-3xl bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">👤</span>
                <span>{address?.slice(0, 6)}...{address?.slice(-4)}</span>
              </span>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-3xl bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">👩</span>
                <button
                  onClick={connect}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2"
                >
                  <span className="text-xl">🔗</span>
                  <span>Connect Wallet</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 