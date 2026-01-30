"use client";

import { useSession } from "next-auth/react";
import HomeTopNav from "./HomeTopNav";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { ReactNode } from "react";

interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { data: session } = useSession();

  // Extract username from email or use fallback
  const getUsername = () => {
    if (session?.user?.email) {
      // Convert email to username format (remove @domain)
      const email = session.user.email;
      const username = email.split('@')[0];
      return `@${username}`;
    }
    return "@username"; // Fallback
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-[#FE2C55]/5 to-[#25F4EE]/5'}`}>
      {/* Top Navigation */}
      <HomeTopNav />

      <div className="flex">
        {/* Sidebar */}
        <div className={`w-64 h-screen sticky top-10 border-r ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="p-4">
            {/* Logo */}
            <div className="mb-8 flex justify-center items-center">
              <img 
                src="/LogO/landing page.png" 
                alt="Skult" 
                className="h-16 w-auto max-w-full object-contain"
              />
            </div>

            {/* Navigation Items */}
            <div className="space-y-2">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className={`w-full px-4 py-2 pl-10 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#FE2C55] ${
                    isDarkMode 
                      ? 'bg-gray-700 text-white placeholder-gray-400' 
                      : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                  }`}
                />
                <svg className={`w-4 h-4 absolute left-3 top-2.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Main Navigation */}
              <a href="/home/for-you" className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-[#008751] text-white' 
                  : 'hover:bg-[#008751] text-white'
              }`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="font-medium">For You</span>
              </a>

              <a href="/home/discover" className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-[#008751] text-white' 
                  : 'hover:bg-[#008751] text-white'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
                <span className="font-medium">Discover</span>
              </a>

              <a href="/home/following" className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-[#008751] text-white' 
                  : 'hover:bg-[#008751] text-white'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="font-medium">Following</span>
              </a>

              <a href="/home/upload" className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-[#008751] text-white' 
                  : 'hover:bg-[#008751] text-white'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="font-medium">Upload</span>
              </a>

              <a href="/home/live" className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-[#008751] text-white' 
                  : 'hover:bg-[#008751] text-white'
              }`}>
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="font-medium">Go Live</span>
              </a>

              <a href="/home/wallet" className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-[#008751] text-white' 
                  : 'hover:bg-[#008751] text-white'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span className="font-medium">Wallet</span>
              </a>

              <a href="/home/profile" className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-[#008751] text-white' 
                  : 'hover:bg-[#008751] text-white'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-medium">Profile</span>
              </a>

              <a href="/home/my-videos" className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-[#008751] text-white' 
                  : 'hover:bg-[#008751] text-white'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">My Videos</span>
              </a>

              <a href="/home/notifications" className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-[#008751] text-white' 
                  : 'hover:bg-[#008751] text-white'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="font-medium">Notifications</span>
              </a>

              <a href="/home/settings" className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-[#008751] text-white' 
                  : 'hover:bg-[#008751] text-white'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium">Settings</span>
              </a>

              <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} pt-2 mt-2`}>
                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between px-4 py-2">
                  <div className="flex items-center gap-3">
                    {isDarkMode ? (
                      <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    )}
                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={isDarkMode}
                      onChange={toggleDarkMode}
                    />
                    <div className={`w-9 h-5 rounded-full peer peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-300 transition-all ${
                      isDarkMode 
                        ? 'bg-blue-600 peer-checked:after:translate-x-full' 
                        : 'bg-gray-200 peer-checked:after:translate-x-full'
                    } peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all`}></div>
                  </label>
                </div>

                {/* Username Display */}
                <div className="flex items-center gap-3 px-4 py-2">
                  <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {getUsername()}
                  </span>
                </div>
              </div>
              </div>


            {/* Footer */}
            <div className={`mt-8 space-y-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <div className="space-y-1">
                <a href="/company" className={`hover:${isDarkMode ? 'text-gray-200' : 'text-gray-700'} transition-colors`}>Company</a>
                <a href="/program" className={`hover:${isDarkMode ? 'text-gray-200' : 'text-gray-700'} transition-colors block`}>Program</a>
                <a href="/terms" className={`hover:${isDarkMode ? 'text-gray-200' : 'text-gray-700'} transition-colors block`}>Terms & Policies</a>
              </div>
              <div className={`pt-2 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                © 2026 Skult
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
