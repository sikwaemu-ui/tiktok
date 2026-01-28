/**
 * AuthLayout Component
 * Renders minimal layout for authentication pages
 * No Sidebar or TopNav - just page content
 */

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        {children}
      </div>
    </div>
  );
}
