import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Proxy configuration using the new Next.js proxy convention
export default auth((req) => {
  // Proxy can be used to protect routes if needed
  // For now, individual pages handle their own auth checks
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
