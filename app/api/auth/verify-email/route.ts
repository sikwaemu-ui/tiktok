import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

/**
 * API endpoint for email verification
 * Handles JWT token verification and marks user email as verified
 * HTTP Method: POST
 * Body: { token: string }
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const { token } = await request.json();

    // Validate token
    if (!token) {
      return NextResponse.json(
        { error: "Verification token is required" },
        { status: 400 }
      );
    }

    // Verify JWT token
    let decodedToken;
    try {
      decodedToken = await verifyToken(token);
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid or expired verification token" },
        { status: 400 }
      );
    }

    // Check if token is for email verification
    if (decodedToken.type !== 'email_verification') {
      return NextResponse.json(
        { error: "Invalid token type" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Find user by email
    const user = await User.findOne({ email: decodedToken.email });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if email is already verified
    if (user.emailVerified) {
      return NextResponse.json(
        { message: "Email is already verified" },
        { status: 200 }
      );
    }

    // Mark email as verified
    await User.updateOne(
      { _id: user._id },
      { emailVerified: true }
    );

    return NextResponse.json(
      { 
        message: "Email verified successfully! You can now log in.",
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Email verification error:", error);
    
    // Handle different types of errors
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "Email verification failed" },
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
    { error: "Method not allowed. Use POST for email verification." },
    { status: 405 }
  );
}
