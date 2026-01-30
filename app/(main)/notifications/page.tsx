"use client";

import { useDarkMode } from "@/contexts/DarkModeContext";

export default function NotificationsPage() {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="p-6 pt-20 lg:pt-6">
      <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Notifications
      </h1>
      
      <div className={`rounded-xl p-6 shadow-sm ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="space-y-4">
          {/* Notification Settings */}
          <div className={`p-4 rounded-lg ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Notification Settings
            </h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                  Push Notifications
                </span>
                <input type="checkbox" className="w-4 h-4" />
              </label>
              <label className="flex items-center justify-between">
                <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                  Email Notifications
                </span>
                <input type="checkbox" className="w-4 h-4" />
              </label>
              <label className="flex items-center justify-between">
                <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                  Like Notifications
                </span>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </label>
              <label className="flex items-center justify-between">
                <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                  Comment Notifications
                </span>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </label>
              <label className="flex items-center justify-between">
                <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                  New Follower Notifications
                </span>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </label>
            </div>
          </div>

          {/* Recent Notifications */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Notifications
            </h3>
            <div className={`text-center py-8 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className="text-4xl mb-4">🔔</div>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                No new notifications
              </p>
              <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                We'll notify you when something happens
              </p>
            </div>
          </div>

          {/* Notification Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">❤️</span>
                <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Likes
                </h4>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                When someone likes your videos
              </p>
            </div>
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">💬</span>
                <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Comments
                </h4>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                When someone comments on your videos
              </p>
            </div>
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">👥</span>
                <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  New Followers
                </h4>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                When someone follows you
              </p>
            </div>
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🎯</span>
                <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Mentions
                </h4>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                When someone mentions you
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
