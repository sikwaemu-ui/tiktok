import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import OTP from "@/models/OTP";

/**
 * Generate a secure 6-digit OTP (One-Time Password) code
 * Uses Math.random() to create a number between 100000 and 999999
 * @returns 6-digit string OTP code
 */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Store OTP with 10-minute expiration
 * This function saves the OTP code to local storage so users can verify their email
 * @param email - User's email address
 * @param code - 6-digit OTP code to store
 */
export async function storeOTP(email: string, code: string): Promise<void> {
  // Set expiration time to 10 minutes from now
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  // Delete any existing OTPs for this email to prevent confusion
  // Users should only have one active OTP at a time
  await OTP.deleteMany({ email: email.toLowerCase() });

  // Create new OTP in local storage
  await OTP.create({
    email: email.toLowerCase(),  // Store email in lowercase for consistency
    code,                        // The 6-digit verification code
    expiresAt,                   // When the code expires
    used: false,                 // Mark as not used yet
  });
}

/**
 * Verify OTP code and mark as used if valid
 * Checks if the provided code matches the stored one and hasn't expired
 * @param email - User's email address
 * @param code - 6-digit OTP code to verify
 * @returns true if OTP is valid, false otherwise
 */
export async function verifyOTP(email: string, code: string): Promise<boolean> {
  // Find OTP matching email, code, and not used yet
  const stored = await OTP.findOne({
    email: email.toLowerCase(),
    code,
    used: false,
  });

  // If no matching OTP found, return false
  if (!stored) {
    return false;
  }

  // Check if OTP has expired
  if (new Date() > stored.expiresAt) {
    // Delete expired OTP and return false
    await OTP.deleteOne({ _id: stored._id });
    return false;
  }

  // Mark OTP as used to prevent reuse
  await OTP.updateOne(
    { _id: stored._id },
    { used: true }
  );

  // Delete the OTP after successful verification for cleanup
  await OTP.deleteOne({ _id: stored._id });

  return true;
}

/**
 * NextAuth configuration object
 * Defines how authentication works in the application
 */
export const authConfig = {
  // Authentication providers - we use email/OTP instead of password
  providers: [
    CredentialsProvider({
      name: "Email OTP",  // Display name for this provider
      credentials: {
        email: { label: "Email", type: "email" },     // Email input field
        code: { label: "OTP Code", type: "text" },    // OTP code input field
      },
      /**
       * Authorize function - validates user credentials
       * Called when user submits login form
       */
      async authorize(credentials) {
        // Check if both email and code are provided
        if (!credentials?.email || !credentials?.code) {
          return null;  // Return null if missing credentials
        }

        const email = credentials.email as string;
        const code = credentials.code as string;

        // Verify the OTP code using our verifyOTP function
        const isValid = await verifyOTP(email, code);
        if (!isValid) {
          return null;  // Return null if OTP is invalid
        }

        // Return user object if authentication successful
        // This will be encoded in the JWT token
        return {
          id: email,      // Use email as user ID
          email: email,   // Store email
        };
      },
    }),
  ],
  // Custom pages - override default NextAuth pages
  pages: {
    signIn: "/login",  // Use our custom login page
  },
  // Callbacks - customize NextAuth behavior
  callbacks: {
    /**
     * JWT callback - called when JWT is created or updated
     * Adds user info to the JWT token
     */
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;  // Add email to token
        token.id = user.id;        // Add user ID to token
      }
      return token;
    },
    /**
     * Session callback - called when session is accessed
     * Makes user info available in the session
     */
    async session({ session, token }) {
      if (session.user && token.email) {
        session.user.email = token.email as string;  // Add email to session
        session.user.id = token.id as string;        // Add user ID to session
      }
      return session;
    },
  },
  // Session configuration
  session: {
    strategy: "jwt",        // Use JWT strategy for sessions
    maxAge: 30 * 24 * 60 * 60, // Session expires after 30 days
  },
  secret: process.env.AUTH_SECRET,  // Secret for signing JWT tokens
} satisfies NextAuthConfig;

// Export NextAuth helpers
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
