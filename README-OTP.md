# OTP Authentication Implementation

This document outlines the complete OTP-based authentication system implemented for the TikTok clone.

## 🏗️ Architecture Overview

### 1. OTP Utilities (`/lib/otp.ts`)
- **generateOTP()**: Creates 6-digit OTP codes
- **storeOTP()**: Stores OTP with expiration (5 minutes)
- **verifyOTP()**: Validates OTP and handles expiration
- **sendSMSOTP()**: Mock SMS service (replace with real SMS provider)
- **validatePhoneNumber()**: Phone number format validation
- **formatPhoneNumber()**: International phone number formatting

### 2. API Routes

#### Generate OTP (`/api/auth/generate-otp`)
```
POST /api/auth/generate-otp
Content-Type: application/json

{
  "phoneNumber": "+1234567890",
  "username": "username",
  "email": "user@example.com" // optional for signup
}
```

Response:
```json
{
  "success": true,
  "sessionId": "abc123...",
  "message": "OTP sent successfully",
  "demoOTP": "123456" // Only in development
}
```

#### Verify OTP (`/api/auth/verify-otp`)
```
POST /api/auth/verify-otp
Content-Type: application/json

{
  "sessionId": "abc123...",
  "otp": "123456",
  "username": "username",
  "password": "password",
  "email": "user@example.com" // for signup
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "username": "username",
    "phoneNumber": "+1234567890"
  }
}
```

## 🔐 Security Features

1. **OTP Expiration**: 5-minute expiry for all OTP codes
2. **Session Management**: Unique session IDs for each OTP request
3. **Rate Limiting**: Ready for implementation (commented in code)
4. **Phone Validation**: International phone number format validation
5. **Secure Storage**: In-memory storage with automatic cleanup

## 📱 Authentication Flow

### Login Flow:
1. User enters username/password
2. System validates credentials
3. OTP generated and sent to registered phone
4. User enters OTP
5. System verifies OTP and completes login

### Signup Flow:
1. Step 1: Basic info (username, email)
2. Step 2: Security (phone, password, confirm password)
3. Step 3: OTP verification
4. Account created and user logged in

## 🧪 Testing

### Development Mode:
- OTP codes are logged to console
- Demo OTP included in API response
- Mock SMS service (logs to console)

### Testing Steps:
1. Start development server: `npm run dev`
2. Navigate to `/login` or `/signup`
3. Fill in the form fields
4. Check browser console for demo OTP
5. Enter OTP to complete authentication

## 🚀 Production Setup

### SMS Service Integration:
Replace the mock SMS service in `/lib/otp.ts` with a real provider:

```typescript
// Example with Twilio
import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function sendSMSOTP(phoneNumber: string, otp: string) {
  await client.messages.create({
    body: `Your TikTok verification code is: ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber
  });
}
```

### Environment Variables:
```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_number
```

### Database Integration:
Replace in-memory storage with Redis or database:

```typescript
// Example with Redis
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export async function storeOTP(sessionId: string, otp: string, phoneNumber: string) {
  await redis.setex(`otp:${sessionId}`, 300, JSON.stringify({ otp, phoneNumber }));
}
```

## 🔧 API Error Handling

### Common Error Responses:
- `400`: Invalid phone number, missing fields
- `401`: Invalid OTP, expired OTP
- `500`: Server error, SMS service failure

### Error Format:
```json
{
  "error": "Error message description"
}
```

## 📊 Monitoring & Analytics

### Recommended Metrics:
- OTP generation success rate
- OTP verification success rate
- SMS delivery rates
- Failed login attempts
- User signup completion rate

## 🛡️ Security Best Practices

1. **Never log OTPs in production**
2. **Implement rate limiting** (max 3 attempts per minute)
3. **Use HTTPS** for all API endpoints
4. **Validate phone numbers** before sending OTP
5. **Clean up expired OTPs** automatically
6. **Monitor for suspicious activity**

## 🔄 Next Steps

1. Integrate with real SMS service
2. Add rate limiting middleware
3. Implement user database integration
4. Add email verification option
5. Implement backup authentication methods
6. Add analytics and monitoring
