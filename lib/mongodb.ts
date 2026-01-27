import mongoose from "mongoose";

// Get MongoDB connection string from environment variables
// This keeps sensitive credentials out of the code
const MONGODB_URI = process.env.MONGODB_URI;

// Check if MongoDB URI is defined
// If not, throw an error to prevent the app from running without database connection
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

/**
 * Interface for caching MongoDB connection
 * This helps maintain a single database connection across server restarts
 * during development (hot reloads) to prevent connection overflow
 */
interface MongooseCache {
  conn: typeof mongoose | null;    // The active mongoose connection
  promise: Promise<typeof mongoose> | null;  // Promise for ongoing connection attempt
}

// Extend the global object to include our mongoose cache
// This allows us to store the connection between hot reloads
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// Initialize cached connection from global or create new empty cache
// Check if global exists (server-side) before accessing it
let cached: MongooseCache = (typeof global !== 'undefined' ? global.mongoose : undefined) || { conn: null, promise: null };

// Store the cache in global if it doesn't exist yet
// This ensures the connection persists across hot reloads
if (typeof global !== 'undefined' && !global.mongoose) {
  global.mongoose = cached;
}

/**
 * Connect to MongoDB database
 * Uses cached connection if available to avoid creating multiple connections
 * @returns Promise that resolves to mongoose instance
 */
async function connectDB(): Promise<typeof mongoose> {
  // If we already have a connection, return it immediately
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection attempt is in progress, start one
  if (!cached.promise) {
    // Mongoose connection options
    const opts = {
      bufferCommands: false,  // Disable mongoose buffering to prevent errors during connection
    };

    // Attempt to connect to MongoDB
    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    // Wait for the connection to complete
    cached.conn = await cached.promise;
  } catch (e) {
    // If connection fails, reset the promise so we can try again
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
