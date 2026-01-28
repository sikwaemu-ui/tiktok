import { userStorage, UserRecord } from "@/lib/storage";

// Interface defining the structure of a User document
export interface IUser {
  name: string;           // User's full name
  email: string;          // User's email address (unique)
  password: string;       // Hashed password
  emailVerified: boolean; // Whether email has been verified
  createdAt: Date;        // When the user account was created
  updatedAt: Date;        // When the user account was last updated
  _id?: string;           // Unique identifier
}

/**
 * User Model - File-based storage adapter
 * Provides MongoDB-like interface using local file storage
 */
const UserModel = {
  /**
   * Create a new user record
   */
  create: async (data: {
    name: string;
    email: string;
    password: string;
    emailVerified: boolean;
  }): Promise<IUser> => {
    const record = userStorage.create({
      name: data.name,
      email: data.email.toLowerCase(),
      password: data.password,
      emailVerified: data.emailVerified,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return {
      ...record,
      createdAt: new Date(record.createdAt || new Date().toISOString()),
      updatedAt: new Date(record.updatedAt || new Date().toISOString()),
      _id: record.id,
    };
  },

  /**
   * Find one user record
   */
  findOne: async (filter: any): Promise<IUser | null> => {
    const record = userStorage.findOne({
      email: filter.email?.toLowerCase?.() || filter.email,
      id: filter._id || filter.id,
    });

    if (!record) return null;

    return {
      ...record,
      createdAt: new Date(record.createdAt || new Date().toISOString()),
      updatedAt: new Date(record.updatedAt || new Date().toISOString()),
      _id: record.id,
    };
  },

  /**
   * Find all user records matching filter
   */
  find: async (filter: any): Promise<IUser[]> => {
    const records = userStorage.find({
      email: filter.email?.toLowerCase?.() || filter.email,
      id: filter._id || filter.id,
    });

    return records.map((record) => ({
      ...record,
      createdAt: new Date(record.createdAt || new Date().toISOString()),
      updatedAt: new Date(record.updatedAt || new Date().toISOString()),
      _id: record.id,
    }));
  },

  /**
   * Update one user record
   */
  updateOne: async (filter: any, update: any): Promise<any> => {
    return userStorage.updateOne(
      { id: filter._id || filter.id },
      { ...update, updatedAt: new Date().toISOString() }
    );
  },

  /**
   * Delete one user record
   */
  deleteOne: async (filter: any): Promise<any> => {
    return userStorage.deleteOne({ id: filter._id || filter.id });
  },

  /**
   * Save method for user record
   */
  save: async function (this: any): Promise<any> {
    const { _id, id, ...data } = this;
    if (_id || id) {
      return userStorage.updateOne(
        { id: _id || id },
        { ...data, updatedAt: new Date().toISOString() }
      );
    } else {
      return userStorage.create({
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  },
};

export default UserModel;
