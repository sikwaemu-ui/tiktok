"use client";

import { useDarkMode } from "@/contexts/DarkModeContext";

export default function ExplorePage() {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="p-6 pt-20 lg:pt-6">
      <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Explore
      </h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`aspect-9/16 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
