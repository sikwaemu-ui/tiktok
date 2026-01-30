"use client";

import { useDarkMode } from "@/contexts/DarkModeContext";

export default function MyVideosPage() {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="p-6 pt-20 lg:pt-6">
      <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        My Videos
      </h1>
      
      <div className={`rounded-xl p-6 shadow-sm ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg text-center ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className="text-2xl font-bold text-[var(--zm-green)]">0</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Videos
              </div>
            </div>
            <div className={`p-4 rounded-lg text-center ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className="text-2xl font-bold text-[var(--zm-red)]">0</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Views
              </div>
            </div>
            <div className={`p-4 rounded-lg text-center ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className="text-2xl font-bold text-[var(--zm-orange)]">0</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Likes
              </div>
            </div>
          </div>

          {/* Upload Button */}
          <div className="text-center">
            <button className="px-6 py-3 bg-[var(--zm-green)] text-white font-semibold rounded-lg hover:bg-[var(--zm-red)] transition-colors">
              Upload Your First Video
            </button>
          </div>

          {/* Empty State */}
          <div className={`text-center py-12 rounded-lg ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="text-6xl mb-4">📹</div>
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              No videos yet
            </h3>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Start creating and uploading your videos to see them here
            </p>
          </div>

          {/* Video Grid Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`aspect-9/16 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
