'use client';
export default function ProjectPage() {
  return (
    <div className="min-h-screen bg-purple-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">📋 About this project</h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              📚 Education
            </h2>
            <p className="text-gray-600 flex items-center gap-2">
              📈 Progress
            </p>
          </div>

          <div className="border-t border-b border-gray-200 py-4">
            <p className="text-lg flex items-center gap-2">
              💰 2.0 ETH raised
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2">
              👥 Backers
            </h3>
            <div className="space-y-1 text-sm">
              <p className="flex items-center gap-2">
                👤 06/031...772
              </p>
              <p className="flex items-center gap-2">
                👤 06/031...792
              </p>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              💸 Fund this project
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-1 flex items-center gap-2">
                  💰 Amount in ETH
                </label>
                <input 
                  type="number" 
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="0.00"
                />
              </div>

              <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2">
                🚀 Fund Project
              </button>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p className="flex items-center justify-center gap-2">
              📊 20%
            </p>
            <p className="flex items-center justify-center gap-2">
              🎯 of 100 ETH
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}