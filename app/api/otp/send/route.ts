import { NextRequest, NextResponse } from 'next/server';
import { generateOTP, storeOTP, sendSMSOTP, validatePhoneNumber, formatPhoneNumber, generateSessionId } from '@/lib/otp';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone_number } = body;

    // Validate required field
    if (!phone_number) {
      return NextResponse.json(
        { error: 'phone_number is required' },
        { status: 400 }
      );
    }

    // Validate phone number format
    const cleanedPhone = phone_number.replace(/\D/g, '');
    
    if (!validatePhoneNumber(cleanedPhone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format. Must be 12-13 digits starting with 260 (e.g., 2600776061217)' },
        { status: 400 }
      );
    }

    // Format for storage (add + prefix)
    const formattedPhone = `+${cleanedPhone}`;

    // Generate 6-digit OTP
    const otp = generateOTP(6);
    const sessionId = generateSessionId();

    // Store OTP with session (5 minutes expiration)
    storeOTP(sessionId, otp, formattedPhone);

    // Send OTP via SMS
    const smsResult = await sendSMSOTP(formattedPhone, otp);
    
    if (!smsResult.success) {
      return NextResponse.json(
        { error: smsResult.error || 'Failed to send OTP' },
        { status: 500 }
      );
    }

    // Return response matching Swagger specification
    return NextResponse.json({
      response: {
        sessionId,
        message: 'OTP sent successfully',
        // For demo purposes only, include OTP in development
        // Remove this in production!
        ...(process.env.NODE_ENV === 'development' && { demoOTP: otp })
      },
      success: true
    });

  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
