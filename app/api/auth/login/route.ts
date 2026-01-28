import { NextRequest, NextResponse } from "next/server";
import { generateSessionToken } from "@/lib/jwt";
import User from "@/models/User";

/**
 * API endpoint for user login
 * Authenticates user with email/password and returns JWT session token
 * HTTP Method: POST
 * Body: { email: string, password: string }
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const { email, password } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if email is verified
    if (!user.emailVerified) {
      return NextResponse.json(
        { error: "Please verify your email before logging in" },
        { status: 403 }
      );
    }

    // Verify password (in production, use bcrypt for hashed passwords)
    // For now, we'll do simple string comparison (NOT RECOMMENDED FOR PRODUCTION)
    if (user.password !== password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT session token
    const sessionToken = await generateSessionToken(user.email, user.name);

    // Return success response with token and user info
    return NextResponse.json(
      {
        message: "Login successful",
        token: sessionToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Login error:", error);
    
    // Handle different types of errors
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "Login failed" },
        { status: 500 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * Handle unsupported HTTP methods
 */
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST for login." },
    { status: 405 }
  );
}
