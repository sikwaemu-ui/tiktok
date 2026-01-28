import { NextRequest, NextResponse } from 'next/server';
import { generateOTP, storeOTP, sendSMSOTP, validatePhoneNumber, formatPhoneNumber, generateSessionId } from '@/lib/otp';

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, username, email } = await request.json();

    // Validate required fields
    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Validate phone number format
    const formattedPhone = formatPhoneNumber(phoneNumber);
    if (!validatePhoneNumber(formattedPhone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Generate OTP
    const otp = generateOTP(6);
    const sessionId = generateSessionId();

    // Store OTP with session
    storeOTP(sessionId, otp, formattedPhone);

    // Send OTP via SMS
    const smsResult = await sendSMSOTP(formattedPhone, otp);
    
    if (!smsResult.success) {
      return NextResponse.json(
        { error: smsResult.error || 'Failed to send OTP' },
        { status: 500 }
      );
    }

    // Return session ID to client (don't return the actual OTP)
    return NextResponse.json({
      success: true,
      sessionId,
      message: 'OTP sent successfully',
      // For demo purposes only, include OTP in response
      // Remove this in production!
      ...(process.env.NODE_ENV === 'development' && { demoOTP: otp })
    });

  } catch (error) {
    console.error('Generate OTP error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle rate limiting (optional but recommended)
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
