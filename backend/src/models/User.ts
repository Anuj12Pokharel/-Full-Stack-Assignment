import prisma from '../config/database';
import bcrypt from 'bcryptjs';
import { User } from '@prisma/client';

export type { User };

/**
 * User type without password field for safe data transfer
 * Used when returning user data to clients
 */
export type UserWithoutPassword = Omit<User, 'password'>;

/**
 * Input interface for creating a new user
 */
export interface UserInput {
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  password: string;
}

/**
 * User Model
 * Handles all database operations related to users
 * Uses Prisma ORM for type-safe database access
 */
export class UserModel {
  /**
   * Create a new user in the database
   * Hashes the password using bcrypt before storing
   * 
   * @param userData - User data including name, email, and plain text password
   * @returns User object without password field
   */
  static async create(userData: {
    first_name: string;
    middle_name?: string;
    last_name: string;
    email: string;
    password: string;
  }): Promise<UserWithoutPassword> {
    // Hash password with bcrypt (10 rounds for security)
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    // Create user in database, excluding password from response
    const user = await prisma.user.create({
      data: {
        first_name: userData.first_name,
        middle_name: userData.middle_name || null,
        last_name: userData.last_name,
        email: userData.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        first_name: true,
        middle_name: true,
        last_name: true,
        email: true,
        created_at: true,
      },
    });
    return user;
  }

  /**
   * Find a user by email address
   * Used for login and checking if email exists
   * 
   * @param email - User's email address
   * @returns User object with password (for verification) or null if not found
   */
  static async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  /**
   * Find a user by ID
   * Returns user data without password for safe data transfer
   * 
   * @param id - User's unique identifier
   * @returns User object without password or null if not found
   */
  static async findById(id: number): Promise<UserWithoutPassword | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        first_name: true,
        middle_name: true,
        last_name: true,
        email: true,
        created_at: true,
      },
    });
    return user;
  }

  /**
   * Compare plain text password with hashed password
   * Uses bcrypt for secure password comparison
   * 
   * @param plainPassword - Plain text password from user input
   * @param hashedPassword - Hashed password from database
   * @returns true if passwords match, false otherwise
   */
  static async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
