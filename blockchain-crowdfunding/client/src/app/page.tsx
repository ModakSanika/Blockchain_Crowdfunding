'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-purple-100 flex flex-col">
      {/* Hero Section */}
      <section className="bg-purple-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">
            ✨ Fund Your Dreams with Blockchain ✨
          </h1>
          <p className="text-2xl mb-8">
            Create and fund innovative projects using the power of blockchain technology. 🚀
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/projects/create"
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-4 text-2xl"
            >
              Create Project 🎯
            </Link>
            <Link
              href="/projects"
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-4 text-2xl"
            >
              Explore Projects 🔍
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            A better way to crowdfund 🌟
          </h2>
          <p className="text-2xl text-gray-600 mb-8">
            Built on blockchain technology for transparency and security. 🔒
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-purple-900 text-white py-8 mt-auto">
        <div className="text-center">
          <p className="text-3xl flex items-center justify-center gap-2">
            Made with <span className="text-4xl animate-pulse">❤️</span> by{' '}
            <span className="font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
              Sanika Modak
            </span>
          </p>
          <div className="mt-2 flex justify-center gap-5">
            <span className="text-2xl hover:text-yellow-400 transition-transform transform hover:scale-110 animate-bounce">
              🚀
            </span>
            <span className="text-2xl hover:text-blue-400 transition-transform transform hover:scale-110 animate-bounce">
              🌟
            </span>
            <span className="text-2xl hover:text-blue-600 transition-transform transform hover:scale-110 animate-bounce">
              🔗
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}