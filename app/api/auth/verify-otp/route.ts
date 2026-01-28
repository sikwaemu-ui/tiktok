import { NextRequest, NextResponse } from 'next/server';
import { verifyOTP } from '@/lib/otp';

export async function POST(request: NextRequest) {
  try {
    const { sessionId, otp, username, email, password } = await request.json();

    // Validate required fields
    if (!sessionId || !otp) {
      return NextResponse.json(
        { error: 'Session ID and OTP are required' },
        { status: 400 }
      );
    }

    // Verify OTP
    const result = verifyOTP(sessionId, otp);

    if (!result.valid) {
      return NextResponse.json(
        { error: 'Invalid or expired OTP' },
        { status: 400 }
      );
    }

    // At this point, OTP is valid
    // You can proceed with user authentication/registration
    
    // For login flow - authenticate user
    if (username && password) {
      // TODO: Implement actual user authentication
      // const user = await authenticateUser(username, password);
      // if (!user) {
      //   return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      // }
      
      return NextResponse.json({
        success: true,
        message: 'Login successful',
        user: {
          username,
          phoneNumber: result.phoneNumber,
          // Add other user data as needed
        }
      });
    }

    // For signup flow - create new user
    if (username && email && password) {
      // TODO: Implement actual user creation
      // const newUser = await createUser({
      //   username,
      //   email,
      //   password: await hashPassword(password),
      //   phoneNumber: result.phoneNumber
      // });
      
      return NextResponse.json({
        success: true,
        message: 'Account created successfully',
        user: {
          username,
          email,
          phoneNumber: result.phoneNumber,
        }
      });
    }

    // Just OTP verification (for phone verification)
    return NextResponse.json({
      success: true,
      message: 'OTP verified successfully',
      phoneNumber: result.phoneNumber
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
