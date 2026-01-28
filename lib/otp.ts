import crypto from 'crypto';

// In-memory storage for demo purposes (use Redis/DB in production)
const otpStore = new Map<string, { otp: string; expiresAt: number; phoneNumber: string }>();

export function generateOTP(length: number = 6): string {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

export function storeOTP(sessionId: string, otp: string, phoneNumber: string): void {
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
  otpStore.set(sessionId, { otp, expiresAt, phoneNumber });
}

export function verifyOTP(sessionId: string, userOTP: string): { valid: boolean; phoneNumber?: string } {
  const storedData = otpStore.get(sessionId);
  
  if (!storedData) {
    return { valid: false };
  }

  if (Date.now() > storedData.expiresAt) {
    otpStore.delete(sessionId);
    return { valid: false };
  }

  if (storedData.otp === userOTP) {
    const phoneNumber = storedData.phoneNumber;
    otpStore.delete(sessionId); // Clean up after successful verification
    return { valid: true, phoneNumber };
  }

  return { valid: false };
}

// Find OTP by phone number for verification flow
export function findOTPByPhone(phoneNumber: string, userOTP: string): { valid: boolean; phoneNumber?: string; sessionId?: string } {
  // Search through all stored OTPs for matching phone number
  for (const [sessionId, storedData] of otpStore.entries()) {
    if (storedData.phoneNumber === phoneNumber && storedData.otp === userOTP) {
      // Check if expired
      if (Date.now() > storedData.expiresAt) {
        otpStore.delete(sessionId);
        return { valid: false };
      }
      
      // Valid OTP found
      otpStore.delete(sessionId); // Clean up after successful verification
      return { 
        valid: true, 
        phoneNumber: storedData.phoneNumber,
        sessionId 
      };
    }
  }
  
  return { valid: false };
}

export function generateSessionId(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Mock SMS service for development/demo purposes
// In production, replace with actual SMS provider integration
export async function sendSMSOTP(phoneNumber: string, otp: string): Promise<{ success: boolean; error?: string }> {
  try {
    console.log(`📱 Mock SMS OTP for ${phoneNumber}: ${otp}`);
    
    // Simulate SMS sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`✅ Mock SMS sent successfully to ${phoneNumber}`);
    
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending mock SMS:', error);
    return { success: false, error: 'Failed to send SMS' };
  }
}

export function validatePhoneNumber(phoneNumber: string): boolean {
  // Zambian phone number validation - must start with 260
  // Total length should be 12-13 digits (260 + 9-10 digits)
  const zambianPhoneRegex = /^260\d{9,10}$/;
  
  return zambianPhoneRegex.test(phoneNumber);
}

export function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Ensure it starts with 260 and has valid length (12-13 digits)
  if (cleaned.startsWith('260') && (cleaned.length === 12 || cleaned.length === 13)) {
    return `+${cleaned}`;
  }
  
  // Return cleaned version for validation (will fail validation if invalid)
  return cleaned;
}
