import { NextRequest, NextResponse } from 'next/server';
import { verifyOTP, findOTPByPhone } from '@/lib/otp';
import { SignJWT } from 'jose';
import crypto from 'crypto';

// JWT secret key (should be in environment variables)
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

// Create a mock user with the structure from Swagger spec
function createMockUser(phoneNumber: string, fcmToken?: string) {
  const now = new Date().toISOString();
  const userId = Math.floor(Math.random() * 1000);
  
  return {
    id: userId,
    username: `user_${userId}`,
    email: `user${userId}@example.com`,
    phone_number: phoneNumber,
    full_name: `User ${userId}`,
    bio: "Welcome to my profile!",
    avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
    cover_url: `https://picsum.photos/800/200?random=${userId}`,
    website: `https://example.com/user${userId}`,
    birthday: "1990-01-01",
    gender: "other",
    account_type: "personal",
    is_private: false,
    is_verified: false,
    two_factor_enabled: false,
    fcm_token: fcmToken || null,
    password_hash: "hashed_password_placeholder",
    created_at: now,
    updated_at: now,
    category_id: 1,
    location_id: 1,
    category: {
      id: 1,
      name: "Entertainment",
      created_at: now,
      updated_at: now,
      users: [`user_${userId}`]
    },
    location: {
      id: 1,
      name: "New York",
      latitude: 40.7128,
      longitude: -74.0060,
      type: "city",
      parent: null,
      parent_id: null,
      created_at: now,
      updated_at: now
    },
    videos: [],
    comments: [],
    likes: [],
    followers: [],
    following: [],
    saved_videos: [],
    liked_videos: [],
    liked_comments: [],
    user_interests: []
  };
}

// Generate JWT token
async function generateToken(userId: number, phoneNumber: string): Promise<string> {
  const payload = {
    userId,
    phoneNumber,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60), // 30 days
  };

  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(JWT_SECRET);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { otp, phone_number, fcm_token } = body;

    // Validate required fields
    if (!otp || !phone_number) {
      return NextResponse.json(
        { error: 'OTP and phone_number are required' },
        { status: 400 }
      );
    }

    // Format phone number
    const formattedPhone = phone_number.startsWith('+') ? phone_number : `+${phone_number}`;

    // Find OTP by phone number (since we don't have sessionId in this flow)
    const otpData = findOTPByPhone(formattedPhone, otp);
    
    if (!otpData.valid) {
      return NextResponse.json(
        { message: 'Invalid or expired OTP', verified: false },
        { status: 401 }
      );
    }

    // Create mock user
    const user = createMockUser(formattedPhone, fcm_token);

    // Generate JWT token
    const token = await generateToken(user.id, formattedPhone);

    // Return response matching Swagger specification
    return NextResponse.json({
      token,
      user,
      verified: true
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
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
