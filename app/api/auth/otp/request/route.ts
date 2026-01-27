import { NextResponse } from "next/server";
import { generateOTP, storeOTP } from "@/auth";
import { sendOTPEmail } from "@/lib/email";

/**
 * POST /api/auth/otp/request
 * Request an OTP code to be sent to the provided email
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Generate and store OTP
    const code = generateOTP();
    await storeOTP(email, code);

    // Send email
    try {
      await sendOTPEmail(email, code);
    } catch (error) {
      console.error("Failed to send OTP email:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      
      // Provide more helpful error messages to the client
      // Don't expose sensitive details in production
      const isDevelopment = process.env.NODE_ENV === "development";
      const clientMessage = isDevelopment
        ? errorMessage
        : "Failed to send email. Please check your SMTP configuration and try again.";
      
      return NextResponse.json(
        { error: clientMessage },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "OTP code sent to your email",
    });
  } catch (error) {
    console.error("OTP request error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
