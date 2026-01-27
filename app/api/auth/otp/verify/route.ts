import { NextResponse } from "next/server";
import { signIn } from "@/auth";

/**
 * POST /api/auth/otp/verify
 * Verify OTP code and sign in the user
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, code } = body;

    // Validate inputs
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "OTP code is required" },
        { status: 400 }
      );
    }

    // Attempt sign in with credentials (OTP verification happens in authorize callback)
    try {
      const result = await signIn("Email OTP", {
        email,
        code,
        redirect: false,
      });

      // Handle error case
      if (result && "error" in result && result.error) {
        return NextResponse.json(
          { error: "Invalid or expired OTP code" },
          { status: 401 }
        );
      }

      // Success - return success response
      // The session cookie is set automatically by NextAuth
      return NextResponse.json({
        success: true,
        message: "Authentication successful",
      });
    } catch (error) {
      console.error("Sign in error:", error);
      // Check if it's an authorization error
      if (error instanceof Error && error.message.includes("CredentialsSignin")) {
        return NextResponse.json(
          { error: "Invalid or expired OTP code" },
          { status: 401 }
        );
      }
      return NextResponse.json(
        { error: "Invalid or expired OTP code" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("OTP verify error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
