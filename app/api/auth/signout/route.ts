import { signOut } from "@/auth";
import { NextResponse } from "next/server";

/**
 * POST /api/auth/signout
 * Sign out the current user
 */
export async function POST() {
  try {
    await signOut({ redirect: false });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sign out error:", error);
    return NextResponse.json(
      { error: "Failed to sign out" },
      { status: 500 }
    );
  }
}
