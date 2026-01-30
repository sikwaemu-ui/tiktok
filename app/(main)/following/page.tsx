"use client";

import { useDarkMode } from "@/contexts/DarkModeContext";

export default function FollowingPage() {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="p-6 pt-20 lg:pt-6">
      <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Following
      </h1>
      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
        Videos from accounts you follow will appear here.
      </p>
    </div>
  );
}
