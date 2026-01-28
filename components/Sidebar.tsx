"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `flex items-center gap-3 rounded px-3 py-2 text-sm transition ${
      pathname === path
        ? "bg-[var(--zm-green)] text-white font-semibold"
        : "hover:bg-white hover:text-gray-900"
    }`;

  return (
    <aside
      className="
        h-screen
        w-[50px]
        sm:w-[60px]
        md:w-[160px]
        lg:w-[180px]
        bg-white
        px-2 sm:px-4 py-8
        overflow-y-auto
      "
    >
      {/* Logo */}
      <h1 className="mb-6 hidden md:block text-xl font-bold text-[var(--zm-green)]">
         Tik <span className="text-[var(--zm-red)]">Tok</span> 
      </h1>

      {/* Search (hide on very small screens) */}
      <input
        placeholder="Search"
        className="mb-6 hidden w-full rounded-full text-black bg-gray-100 px-4 py-2 text-sm md:block focus:outline-none focus:ring-2 focus:ring-[var(--zm-green)]"
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
          <span className="hidden md:inline text-black">For You</span>
        </Link>

        <Link className={linkClass("/explore")} href="/explore">
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
          <span className="hidden md:inline text-black">Explore</span>
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
          <span className="hidden md:inline text-black">LIVE</span>
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

        <Link className={linkClass("/dashboard")} href="/dashboard">
          <span className="text-black">
            .....
          </span>
          <span className="hidden md:inline text-black ">more</span>
        </Link>
      </nav>

      {/* Company rights */}
      <div className="mt-12 hidden text-left text-gray-500 text-xs md:block">
        <div className="space-y-1">
          <a href="#" className="block hover:text-gray-700">Company</a>
          <a href="#" className="block hover:text-gray-700">Program</a>
          <a href="#" className="block hover:text-gray-700">Terms & Policies</a>
          <div className="pt-2">© 2026 TikTok</div>
        </div>
      </div>
    </aside>
  );
}
