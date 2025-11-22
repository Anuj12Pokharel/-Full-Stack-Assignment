import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Extended Express Request interface to include userId
 * userId is set by the authenticateToken middleware after JWT verification
 */
export interface AuthRequest extends Request {
  userId?: number;
}

/**
 * Authentication middleware
 * Verifies JWT token from Authorization header and extracts user ID
 * 
 * Token format: "Bearer <token>"
 * On success: sets req.userId and calls next()
 * On failure: returns 401 or 403 error
 */
export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Extract token from Authorization header (format: "Bearer <token>")
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Get token after "Bearer "

    if (!token) {
      res.status(401).json({ error: 'Access token required' });
      return;
    }

    // Get JWT secret from environment variables
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({ error: 'JWT secret not configured' });
      return;
    }

    // Verify and decode JWT token
    const decoded = jwt.verify(token, jwtSecret) as { userId: number };
    
    // Attach user ID to request object for use in route handlers
    req.userId = decoded.userId;
    next();
  } catch (error) {
    // Token is invalid, expired, or malformed
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};

