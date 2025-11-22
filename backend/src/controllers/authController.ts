import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt, { SignOptions } from 'jsonwebtoken';
import { UserModel } from '../models/User';

/**
 * Register a new user
 * Validates input, checks for existing user, creates account, and returns JWT token
 * 
 * @route POST /api/register
 * @access Public
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check for validation errors from express-validator middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { first_name, middle_name, last_name, email, password } = req.body;

    // Check if user with this email already exists
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      res.status(400).json({ error: 'User with this email already exists' });
      return;
    }

    // Create new user in database (password will be hashed in the model)
    const user = await UserModel.create({ first_name, middle_name, last_name, email, password });

    // Generate JWT token for authentication
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({ error: 'JWT secret not configured' });
      return;
    }

    // Get token expiration from environment or default to 7 days
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
    const signOptions: SignOptions = { expiresIn };
    const token = jwt.sign({ userId: user.id }, jwtSecret, signOptions);

    // Return success response with token and user data (excluding password)
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    // Handle Prisma unique constraint violation (duplicate email)
    if (error.code === 'P2002') {
      res.status(400).json({ error: 'Email already exists. Please use a different email.' });
      return;
    }
    // Generic error response for other failures
    res.status(500).json({ error: 'Failed to register user. Please try again later.' });
  }
};

/**
 * Authenticate user and return JWT token
 * Validates credentials and returns token for subsequent authenticated requests
 * 
 * @route POST /api/login
 * @access Public
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check for validation errors from express-validator middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;

    // Find user by email
    const user = await UserModel.findByEmail(email);
    if (!user) {
      // Don't reveal if email exists for security (prevent email enumeration)
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    // Verify password using bcrypt comparison
    const isPasswordValid = await UserModel.comparePassword(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    // Generate JWT token for authenticated session
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({ error: 'JWT secret not configured' });
      return;
    }

    // Get token expiration from environment or default to 7 days
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
    const signOptions: SignOptions = { expiresIn };
    const token = jwt.sign({ userId: user.id }, jwtSecret, signOptions);

    // Return success response with token and user data (excluding password)
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to authenticate. Please try again later.' });
  }
};

