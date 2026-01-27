import mongoose, { Schema, Model } from "mongoose";

// Interface defining the structure of an OTP document in MongoDB
// This ensures type safety and better code completion
export interface IOTP {
  email: string;        // User's email address for OTP verification
  code: string;         // 6-digit verification code
  expiresAt: Date;      // When the OTP code expires (auto-deleted)
  used: boolean;        // Whether the OTP has been used
  createdAt: Date;      // When the OTP was created
}

// Schema definition for OTP documents in MongoDB
// This defines the rules and validation for OTP data
const OTPSchema = new Schema<IOTP>({
  email: {
    type: String,        // Data type is string
    required: true,      // This field is mandatory
    lowercase: true,     // Automatically convert to lowercase
    index: true,        // Create database index for faster queries
  },
  code: {
    type: String,        // Data type is string
    required: true,      // This field is mandatory
  },
  expiresAt: {
    type: Date,         // Data type is date
    required: true,     // This field is mandatory
  },
  used: {
    type: Boolean,      // Data type is boolean
    default: false,     // Default value is false (not used)
    index: true,        // Create index for faster queries
  },
  createdAt: {
    type: Date,         // Data type is date
    default: Date.now,  // Automatically set to current time
  },
});

// Create compound index for efficient queries
// This makes searching by email and code combination much faster
OTPSchema.index({ email: 1, code: 1 });

// Create TTL (Time-To-Live) index to automatically delete expired documents
// MongoDB will automatically remove documents when expiresAt time is reached
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Create or retrieve the OTP model
// This pattern prevents overwriting the model during hot reloads in development
const OTP: Model<IOTP> =
  (mongoose.models && mongoose.models.OTP) || mongoose.model<IOTP>("OTP", OTPSchema);

export default OTP;
