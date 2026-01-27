import { SignJWT, jwtVerify } from 'jose';

// Secret key for JWT signing (should be in environment variables)
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

/**
 * Generate a JWT token for email verification
 * @param email - User's email address
 * @param name - User's name
 * @returns JWT token string
 */
export async function generateEmailVerificationToken(email: string, name: string): Promise<string> {
  try {
    const token = await new SignJWT({ 
      email, 
      name,
      type: 'email_verification'
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h') // Token expires in 1 hour
      .sign(JWT_SECRET);
    
    return token;
  } catch (error) {
    console.error('Error generating JWT token:', error);
    throw new Error('Failed to generate verification token');
  }
}

/**
 * Verify a JWT token
 * @param token - JWT token to verify
 * @returns Decoded token payload
 */
export async function verifyToken(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    console.error('Error verifying JWT token:', error);
    throw new Error('Invalid or expired token');
  }
}

/**
 * Generate a JWT token for authenticated sessions
 * @param email - User's email address
 * @param name - User's name
 * @returns JWT token string
 */
export async function generateSessionToken(email: string, name: string): Promise<string> {
  try {
    const token = await new SignJWT({ 
      email, 
      name,
      type: 'session'
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30d') // Session expires in 30 days
      .sign(JWT_SECRET);
    
    return token;
  } catch (error) {
    console.error('Error generating session token:', error);
    throw new Error('Failed to generate session token');
  }
}
