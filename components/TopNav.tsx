"use client";

import Link from "next/link";
import { useDarkMode } from "@/contexts/DarkModeContext";

export default function TopNav() {
  const { isDarkMode } = useDarkMode();

  return (
    <header className={`hidden md:flex md:w-full items-center justify-end px-2 py-2 sm:px-4 lg:px-6 ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className={`flex items-center gap-3 rounded-full px-3 py-2 ${
        isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
      }`}>
        <Link
          href="/coins"
          className="rounded-full bg-[var(--zm-orange)] px-4 py-2 text-sm text-white font-semibold hover:bg-[var(--zm-red)] transition-colors"
        >
          Get Coins
        </Link>

        <Link
          href="/login"
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            isDarkMode 
              ? 'bg-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white' 
              : 'bg-[var(--zm-green)] text-white hover:bg-[var(--zm-red)]'
          }`}
        >
          Log In
        </Link>

        <Link
          href="/signup"
          className="rounded-full bg-[var(--zm-green)] px-4 py-2 text-sm text-white font-semibold hover:bg-[var(--zm-red)] transition-colors hidden sm:block"
        >
          Sign Up
        </Link>

        <Link
          href="/download"
          className="rounded-full bg-[var(--zm-red)] px-4 py-2 text-sm text-white font-semibold hover:bg-[var(--zm-orange)] transition-colors hidden lg:block"
        >
          Get App
        </Link>
      </div>
    </header>
  );
}
