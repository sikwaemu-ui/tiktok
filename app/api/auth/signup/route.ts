import { NextRequest, NextResponse } from "next/server";
import { generateEmailVerificationToken } from "@/lib/jwt";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

/**
 * API endpoint for user signup
 * Handles user registration and creates JWT verification token
 * HTTP Method: POST
 * Body: { name: string, email: string, password: string }
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const { name, email, password } = await request.json();

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, and password" },
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

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Create new user (password should be hashed in production)
    // For now, we'll store it as-is (NOT RECOMMENDED FOR PRODUCTION)
    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: password, // TODO: Hash this password using bcrypt
      emailVerified: false,
    });

    // Generate JWT verification token
    const verificationToken = await generateEmailVerificationToken(
      newUser.email, 
      newUser.name
    );

    // Create verification URL
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}`;

    // Log verification URL for development (in production, send this via email)
    console.log(`Verification URL for ${newUser.email}: ${verificationUrl}`);
    console.log(`Verification Token: ${verificationToken}`);

    // Return success response
    return NextResponse.json(
      { 
        message: "Account created successfully. Please check your email for verification link.",
        // For development only - remove in production
        debug: { 
          verificationUrl,
          verificationToken,
          userId: newUser._id 
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Signup error:", error);
    
    // Handle different types of errors
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "Failed to create account" },
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
    { error: "Method not allowed. Use POST for signup." },
    { status: 405 }
  );
}
