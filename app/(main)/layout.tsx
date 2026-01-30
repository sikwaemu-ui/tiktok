"use client";
/**
 * Main Route Group Layout
 * Wraps all main app routes with Sidebar and TopNav
 * Used for all authenticated/main pages
 */


import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";
import { useDarkMode } from "@/contexts/DarkModeContext";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`flex h-screen w-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Persistent Sidebar - 15% width, visible on all screen sizes */}
      <div className={`w-[15%] min-w-[50px] max-w-[220px] ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r flex-shrink-0 overflow-y-auto scrollbar-hide`}>
        <Sidebar />
      </div>

      {/* Main Content Area - 85% width or full width on mobile */}
      <div className="flex-1 sm:w-[85%] flex flex-col overflow-hidden">
        {/* Persistent TopNav */}
        <div className={`sticky top-0 z-30 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b flex-shrink-0`}>
          <TopNav />
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="w-full h-full px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
