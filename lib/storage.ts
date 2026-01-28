/**
 * Local file-based storage system to replace MongoDB
 * Stores data in JSON files for development/testing
 */

import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".data");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

/**
 * Generic storage class for file-based data persistence
 */
export class FileStorage<T extends { id?: string; email?: string }> {
  private filePath: string;
  private data: T[] = [];

  constructor(fileName: string) {
    this.filePath = path.join(DATA_DIR, `${fileName}.json`);
    this.loadData();
  }

  /**
   * Load data from file
   */
  private loadData() {
    try {
      if (fs.existsSync(this.filePath)) {
        const content = fs.readFileSync(this.filePath, "utf-8");
        this.data = JSON.parse(content);
      } else {
        this.data = [];
      }
    } catch (error) {
      console.error(`Error loading data from ${this.filePath}:`, error);
      this.data = [];
    }
  }

  /**
   * Save data to file
   */
  private saveData() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), "utf-8");
    } catch (error) {
      console.error(`Error saving data to ${this.filePath}:`, error);
    }
  }

  /**
   * Create a new record
   */
  create(record: T): T {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const newRecord = { ...record, id } as T;
    this.data.push(newRecord);
    this.saveData();
    return newRecord;
  }

  /**
   * Find one record by filter
   */
  findOne(filter: Partial<T>): T | null {
    return this.data.find((item) => this.matchesFilter(item, filter)) || null;
  }

  /**
   * Find all records matching filter
   */
  find(filter: Partial<T>): T[] {
    return this.data.filter((item) => this.matchesFilter(item, filter));
  }

  /**
   * Update one record
   */
  updateOne(filter: Partial<T>, update: Partial<T>): boolean {
    const index = this.data.findIndex((item) => this.matchesFilter(item, filter));
    if (index === -1) return false;

    this.data[index] = { ...this.data[index], ...update };
    this.saveData();
    return true;
  }

  /**
   * Delete many records
   */
  deleteMany(filter: Partial<T>): number {
    const initialLength = this.data.length;
    this.data = this.data.filter((item) => !this.matchesFilter(item, filter));
    this.saveData();
    return initialLength - this.data.length;
  }

  /**
   * Delete one record
   */
  deleteOne(filter: Partial<T>): boolean {
    const index = this.data.findIndex((item) => this.matchesFilter(item, filter));
    if (index === -1) return false;

    this.data.splice(index, 1);
    this.saveData();
    return true;
  }

  /**
   * Helper to match filter criteria
   */
  private matchesFilter(item: T, filter: Partial<T>): boolean {
    return Object.entries(filter).every(([key, value]) => {
      const itemValue = item[key as keyof T];
      if (typeof value === "string" && typeof itemValue === "string") {
        return itemValue.toLowerCase() === value.toLowerCase();
      }
      return itemValue === value;
    });
  }

  /**
   * Clear all data
   */
  clear() {
    this.data = [];
    this.saveData();
  }

  /**
   * Get all records
   */
  getAll(): T[] {
    return [...this.data];
  }
}

/**
 * OTP Storage
 */
export interface OTPRecord {
  id?: string;
  email: string;
  code: string;
  expiresAt: string; // ISO date string
  used: boolean;
  createdAt?: string;
}

export const otpStorage = new FileStorage<OTPRecord>("otps");

/**
 * User Storage
 */
export interface UserRecord {
  id?: string;
  name: string;
  email: string;
  password: string;
  emailVerified: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const userStorage = new FileStorage<UserRecord>("users");

/**
 * Clean up expired OTPs
 */
export function cleanupExpiredOTPs() {
  const otps = otpStorage.getAll();
  const now = new Date();

  otps.forEach((otp) => {
    if (new Date(otp.expiresAt) < now) {
      otpStorage.deleteOne({ email: otp.email, code: otp.code });
    }
  });
}

// Clean up expired OTPs periodically
setInterval(cleanupExpiredOTPs, 60000); // Every minute
