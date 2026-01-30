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
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-600/20 blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] translate-x-[-50%] w-[30%] h-[30%] rounded-full bg-blue-600/10 blur-[100px]" />
      </div>

      <div className="w-full max-w-[480px] px-4 z-10">
        {children}
      </div>
    </div>
  );
}
