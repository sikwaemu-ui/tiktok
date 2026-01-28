/**
 * AppLayout Component
 * Renders the main application layout with Sidebar and TopNav
 * Used for authenticated app routes
 */

import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen w-screen bg-gray-50">
      {/* Persistent Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Persistent TopNav */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 flex-shrink-0">
          <TopNav />
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
