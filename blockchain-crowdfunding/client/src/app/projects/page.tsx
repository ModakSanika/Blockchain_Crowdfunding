'use client';
import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-purple-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Crowdfunding Projects</h1>
        
        <div className="space-y-6">
          {/* Project 1 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              🐾 Animal shelter
            </h2>
            <div className="flex flex-wrap gap-4 text-sm">
              <span>🏷️ Animal shelter</span>
              <span>📈 Progress</span>
              <span className="text-green-500">✅ 100%</span>
              <span>💰 2.0 ETH raised</span>
              <span>🎯 of 2.0 ETH</span>
            </div>
          </div>

          {/* Project 2 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              📚 Education
            </h2>
            <div className="flex flex-wrap gap-4 text-sm">
              <span>🏷️ Education</span>
              <span>📈 Progress</span>
              <span>20%</span>
            </div>
          </div>

          <Link 
            href="/projects/create"
            className="block bg-purple-600 text-white p-4 rounded-lg text-center font-medium flex items-center justify-center gap-2"
          >
            ✨ Create Project
          </Link>

          <div className="text-sm text-gray-500 text-center flex items-center justify-center gap-1">
            🔗 0x6031...7f22
          </div>
        </div>
      </div>
    </div>
  );
}