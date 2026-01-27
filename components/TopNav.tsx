import Link from "next/link";

export default function TopNav() {
  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between bg-white px-4 py-2  sm:px-6 hidden sm:flex">
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
          href="/download"
          className="rounded-full bg-[var(--zm-red)] px-4 py-2 text-sm text-white font-semibold hover:bg-[var(--zm-orange)] transition-colors hidden sm:block"
        >
          Get App
        </Link>

        <Link
          href="/login"
          className="rounded-full bg-[var(--zm-green)] px-4 py-2 text-white text-sm font-semibold hover:bg-[var(--zm-black)] transition-colors"
        >
          Log in
        </Link>

        <Link
          href="/signup"
          className="rounded-full bg-[var(--zm-orange)] px-4 py-2 text-white text-sm font-semibold hover:bg-[var(--zm-red)] transition-colors"
        >
          Sign up
        </Link>
      </div>
    </header>
  );
}
