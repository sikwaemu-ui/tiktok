"use client";

import { useDarkMode } from "@/contexts/DarkModeContext";

export default function SettingsPage() {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="p-6 pt-20 lg:pt-6">
      <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Settings
      </h1>
      
      <div className={`rounded-xl p-6 shadow-sm ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="space-y-6">
          {/* Profile Settings */}
          <div className={`p-4 rounded-lg ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Profile Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter username"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Bio
                </label>
                <textarea
                  placeholder="Tell us about yourself"
                  rows={3}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className={`p-4 rounded-lg ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Privacy Settings
            </h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                  Private Account
                </span>
                <input type="checkbox" className="w-4 h-4" />
              </label>
              <label className="flex items-center justify-between">
                <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                  Show Activity Status
                </span>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </label>
              <label className="flex items-center justify-between">
                <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                  Allow Comments
                </span>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </label>
              <label className="flex items-center justify-between">
                <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                  Allow Duets
                </span>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </label>
            </div>
          </div>

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
                  In-App Notifications
                </span>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </label>
            </div>
          </div>

          {/* Account Actions */}
          <div className={`p-4 rounded-lg ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Account Actions
            </h3>
            <div className="space-y-3">
              <button className={`w-full px-4 py-2 rounded-lg font-semibold transition-colors ${
                isDarkMode 
                  ? 'bg-gray-600 text-white hover:bg-gray-500' 
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}>
                Clear Cache
              </button>
              <button className={`w-full px-4 py-2 rounded-lg font-semibold transition-colors ${
                isDarkMode 
                  ? 'bg-gray-600 text-white hover:bg-gray-500' 
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}>
                Download Data
              </button>
              <button className="w-full px-4 py-2 rounded-lg font-semibold transition-colors bg-red-600 text-white hover:bg-red-700">
                Delete Account
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="px-6 py-2 bg-[var(--zm-green)] text-white font-semibold rounded-lg hover:bg-[var(--zm-red)] transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
