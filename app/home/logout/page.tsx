"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import HomeLayout from "@/components/HomeLayout";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Simulate logout process
    const timer = setTimeout(() => {
      router.push('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Logging out...</h1>
          <p className="text-gray-600">You will be redirected to the login page</p>
        </div>
      </div>
    </HomeLayout>
  );
}
