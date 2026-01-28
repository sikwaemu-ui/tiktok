/**
 * Main Route Group Layout
 * Wraps all main app routes with Sidebar and TopNav
 * Used for all authenticated/main pages
 */

import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen w-screen bg-gray-50">
      {/* Persistent Sidebar - 10% width, visible on all screen sizes */}
      <div className="w-[10%] min-w-[50px] max-w-[180px] bg-white border-r border-gray-200 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area - 90% width or full width on mobile */}
      <div className="flex-1 sm:w-[90%] flex flex-col overflow-hidden">
        {/* Persistent TopNav */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 flex-shrink-0">
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
