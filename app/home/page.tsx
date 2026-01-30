"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to for-you page immediately
    router.replace('/home/for-you');
  }, [router]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FE2C55]/5 to-[#25F4EE]/5] flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-[#FE2C55] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
