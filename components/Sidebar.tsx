"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDarkMode } from "@/contexts/DarkModeContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const linkClass = (path: string) =>
    `flex items-center gap-3 rounded px-3 py-2 text-sm transition ${
      pathname === path
        ? "bg-[var(--zm-green)] text-white font-semibold"
        : isDarkMode 
          ? "hover:bg-gray-800 hover:text-white" 
          : "hover:bg-white hover:text-gray-900"
    }`;

  return (
    <aside
      className={`
        h-screen
        w-[50px]
        sm:w-[60px]
        md:w-[160px]
        lg:w-[180px]
        ${isDarkMode ? 'bg-gray-900' : 'bg-white'}
        px-2 sm:px-4 py-8
        overflow-y-auto
      `}
    >
      {/* Logo */}
      <h1 className="mb-6 hidden md:block text-xl font-bold text-[var(--zm-green)]">
         Tik <span className="text-[var(--zm-red)]">Tok</span> 
      </h1>

      {/* Search (hide on very small screens) */}
      <input
        placeholder="Search"
        className={`mb-6 hidden w-full rounded-full text-black bg-gray-100 px-4 py-2 text-sm md:block focus:outline-none focus:ring-2 focus:ring-[var(--zm-green)] ${
          isDarkMode ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-gray-100 text-black placeholder-gray-600'
        }`}
      />

      <nav className="flex flex-col gap-1">
        <Link className={linkClass("/for-you")} href="/for-you">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1.5em"
              height="1.5em"
            >
              <path
                fill="black"
                d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1"
              ></path>
            </svg>
          </span>
          <span className={`hidden md:inline ${isDarkMode ? 'text-white' : 'text-black'}`}>For You</span>
        </Link>

        <Link className={linkClass("/discover")} href="/discover">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1.5em"
              height="1.5em"
            >
              <path
                fill="black"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m-5.5-2.5l7.51-3.49L17.5 6.5L9.99 9.99zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1s-1.1-.49-1.1-1.1s.49-1.1 1.1-1.1"
              ></path>
            </svg>
          </span>
          <span className="hidden md:inline text-black">Discover</span>
        </Link>

        <Link className={linkClass("/following")} href="/following">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14"
              width="1.5em"
              height="1.5em"
            >
              <g
                fill="none"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="5" cy="3.75" r="2.25"></circle>
                <path d="M6.5 13.5h-6V12a4.5 4.5 0 0 1 7.39-3.45m.61 2.95h5"></path>
              </g>
            </svg>
          </span>
          <span className="hidden md:inline text-black">Following</span>
        </Link>

        <Link className={linkClass("/upload")} href="/upload">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14"
              width="1.5em"
              height="1.5em"
            >
              <g
                fill="none"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 4v6M4 7h6"></path>
                <rect width="13" height="13" x=".5" y=".5" rx="3"></rect>
              </g>
            </svg>
          </span>
          <span className="hidden md:inline text-black">Upload</span>
        </Link>

        <Link className={linkClass("/live")} href="/live">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1.5em"
              height="1.5em"
            >
              <path
                fill="black"
                d="M21 6h-7.59l3.29-3.29L16 2l-4 4l-4-4l-.71.71L10.59 6H3a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8a2 2 0 0 0-2-2m0 14H3V8h18zM9 10v8l7-4z"
              ></path>
            </svg>
          </span>
          <span className="hidden md:inline text-black">Go Live</span>
        </Link>

        <Link className={linkClass("/wallet")} href="/wallet">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1.5em"
              height="1.5em"
            >
              <path
                fill="black"
                d="M21 18v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1h-9a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2zm-9-2h10V8H12zm4-2.5a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5"
              ></path>
            </svg>
          </span>
          <span className="hidden md:inline text-black">Wallet</span>
        </Link>

        <Link className={linkClass("/profile")} href="/profile">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1.5em"
              height="1.5em"
            >
              <path
                fill="black"
                d="M12 11a4 4 0 1 0-4-4a4 4 0 0 0 4 4m0-6a2 2 0 1 1-2 2a2 2 0 0 1 2-2m0 8a7 7 0 0 0-7 7a1 1 0 0 0 2 0a5 5 0 0 1 10 0a1 1 0 0 0 2 0a7 7 0 0 0-7-7"
              ></path>
            </svg>
          </span>
          <span className="hidden md:inline text-black">Profile</span>
        </Link>

        <Link className={linkClass("/my-videos")} href="/my-videos">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1.5em"
              height="1.5em"
            >
              <path
                fill="black"
                d="M4 6.47L5.76 10H20v8H4zm0-2L2 6v12h20V6H4m2 6h12v2H6z"
              ></path>
            </svg>
          </span>
          <span className="hidden md:inline text-black">My Videos</span>
        </Link>

        <Link className={linkClass("/notifications")} href="/notifications">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1.5em"
              height="1.5em"
            >
              <path
                fill="black"
                d="M21 19v1H3v-1l2-2v-6c0-3.1 2.03-5.83 5-6.71V4a2 2 0 0 1 4 0v.29c2.97.88 5 3.61 5 6.71v6zm-7 2a2 2 0 0 1-2-2h4a2 2 0 0 1-2 2"
              ></path>
            </svg>
          </span>
          <span className="hidden md:inline text-black">Notifications</span>
        </Link>

        <Link className={linkClass("/settings")} href="/settings">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1.5em"
              height="1.5em"
            >
              <path
                fill="black"
                d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.08-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64z"
              ></path>
            </svg>
          </span>
          <span className="hidden md:inline text-black">Settings</span>
        </Link>

       
      </nav>

      {/* User Section */}
      <div className={`mt-auto pt-8 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex flex-col gap-2">
           {/* Dark Mode Toggle */}
        <div className={`flex items-center justify-between px-3 py-2 text-sm transition rounded ${
          isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-white hover:text-gray-900'
        }`}>
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
          <div className={`flex items-center gap-3 rounded px-3 py-2 text-sm ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="1.5em"
                height="1.5em"
              >
                <path
                  fill={isDarkMode ? 'white' : 'black'}
                  d="M12 11a4 4 0 1 0-4-4a4 4 0 0 0 4 4m0-6a2 2 0 1 1-2 2a2 2 0 0 1 2-2m0 8a7 7 0 0 0-7 7a1 1 0 0 0 2 0a5 5 0 0 1 10 0a1 1 0 0 0 2 0a7 7 0 0 0-7-7"
                ></path>
              </svg>
            </span>
            <span className={`hidden md:inline font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>JD</span>
          </div>
          
          <Link className={linkClass("/login")} href="/login">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="1.5em"
                height="1.5em"
              >
                <path
                  fill="black"
                  d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1l2-2h6l2 2zm-6 2a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4"
                ></path>
              </svg>
            </span>
            <span className="hidden md:inline text-black">Sign in to continue</span>
          </Link>
        </div>
      </div>

      {/* Company rights */}
      <div className={`mt-12 hidden text-left text-xs md:block ${
        isDarkMode ? 'text-gray-400' : 'text-gray-500'
      }`}>
        <div className="space-y-1">
          <a href="#" className={`block hover:${isDarkMode ? 'text-gray-200' : 'text-gray-700'} transition-colors`}>Company</a>
          <a href="#" className={`block hover:${isDarkMode ? 'text-gray-200' : 'text-gray-700'} transition-colors`}>Program</a>
          <a href="#" className={`block hover:${isDarkMode ? 'text-gray-200' : 'text-gray-700'} transition-colors`}>Terms & Policies</a>
          <div className="pt-2">© 2026 TikTok</div>
        </div>
      </div>
    </aside>
  );
}
