import { otpStorage, OTPRecord } from "@/lib/storage";

// Interface defining the structure of an OTP document
// This ensures type safety and better code completion
export interface IOTP {
  email: string;        // User's email address for OTP verification
  code: string;         // 6-digit verification code
  expiresAt: Date;      // When the OTP code expires (auto-deleted)
  used: boolean;        // Whether the OTP has been used
  createdAt: Date;      // When the OTP was created
  _id?: string;         // Unique identifier
}

/**
 * OTP Model - File-based storage adapter
 * Provides MongoDB-like interface using local file storage
 */
const OTPModel = {
  /**
   * Create a new OTP record
   */
  create: async (data: {
    email: string;
    code: string;
    expiresAt: Date;
    used: boolean;
  }): Promise<IOTP> => {
    const record = otpStorage.create({
      email: data.email.toLowerCase(),
      code: data.code,
      expiresAt: data.expiresAt.toISOString(),
      used: data.used,
      createdAt: new Date().toISOString(),
    });
    return {
      ...record,
      expiresAt: new Date(record.expiresAt),
      createdAt: new Date(record.createdAt || new Date().toISOString()),
      _id: record.id,
    };
  },

  /**
   * Find one OTP record
   */
  findOne: async (filter: any): Promise<IOTP | null> => {
    const record = otpStorage.findOne({
      email: filter.email?.toLowerCase?.() || filter.email,
      code: filter.code,
      used: filter.used,
    });

    if (!record) return null;

    return {
      ...record,
      expiresAt: new Date(record.expiresAt),
      createdAt: new Date(record.createdAt || new Date().toISOString()),
      _id: record.id,
    };
  },

  /**
   * Delete many OTP records
   */
  deleteMany: async (filter: any): Promise<any> => {
    return otpStorage.deleteMany({
      email: filter.email?.toLowerCase?.() || filter.email,
    });
  },

  /**
   * Update one OTP record
   */
  updateOne: async (filter: any, update: any): Promise<any> => {
    return otpStorage.updateOne(
      { id: filter._id || filter.id },
      { ...update, updatedAt: new Date().toISOString() }
    );
  },

  /**
   * Delete one OTP record
   */
  deleteOne: async (filter: any): Promise<any> => {
    return otpStorage.deleteOne({ id: filter._id || filter.id });
  },
};

export default OTPModel;
