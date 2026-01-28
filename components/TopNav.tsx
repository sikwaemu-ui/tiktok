import Link from "next/link";

export default function TopNav() {
  return (
    <header className="hidden md:flex md:w-full items-center justify-between bg-white px-2 py-2 sm:px-4 lg:px-6">
      <Link href="/" className="font-bold text-lg text-[var(--zm-green)]">
       Tik <span className="text-[var(--zm-red)]">Tok</span> 
      </Link>

      <div className="flex items-center gap-3 rounded-full bg-gray-100 px-3 py-2">
        <Link
          href="/coins"
          className="rounded-full bg-[var(--zm-orange)] px-4 py-2 text-sm text-white font-semibold hover:bg-[var(--zm-red)] transition-colors"
        >
          Get Coins
        </Link>

        <Link
          href="/login"
          className="rounded-full border border-[var(--zm-green)] text-[var(--zm-green)] px-4 py-2 text-sm font-semibold hover:bg-[var(--zm-green)] hover:text-white transition-colors"
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
