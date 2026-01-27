import mongoose, { Schema, Model } from "mongoose";

// Interface defining the structure of a User document in MongoDB
export interface IUser {
  name: string;           // User's full name
  email: string;          // User's email address (unique)
  password: string;       // Hashed password
  emailVerified: boolean; // Whether email has been verified
  createdAt: Date;        // When the user account was created
  updatedAt: Date;        // When the user account was last updated
}

// Schema definition for User documents in MongoDB
const UserSchema = new Schema<IUser>({
  name: {
    type: String,        // Data type is string
    required: true,      // This field is mandatory
    trim: true,          // Remove whitespace from both ends
  },
  email: {
    type: String,        // Data type is string
    required: true,      // This field is mandatory
    unique: true,         // Email must be unique across all users
    lowercase: true,     // Automatically convert to lowercase
    trim: true,          // Remove whitespace from both ends
    index: true,         // Create database index for faster queries
  },
  password: {
    type: String,        // Data type is string
    required: true,      // This field is mandatory
    minlength: 6,        // Minimum password length
  },
  emailVerified: {
    type: Boolean,       // Data type is boolean
    default: false,      // Default value is false (not verified)
  },
  createdAt: {
    type: Date,         // Data type is date
    default: Date.now,  // Automatically set to current time
  },
  updatedAt: {
    type: Date,         // Data type is date
    default: Date.now,  // Automatically set to current time
  },
});

// Create index for efficient email lookups
UserSchema.index({ email: 1 });

// Update the updatedAt field before saving
UserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Create or retrieve the User model
// This pattern prevents overwriting the model during hot reloads in development
const User: Model<IUser> =
  (mongoose.models && mongoose.models.User) || mongoose.model<IUser>("User", UserSchema);

export default User;
