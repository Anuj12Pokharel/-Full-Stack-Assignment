import { body } from 'express-validator';

/**
 * Validation rules for user registration
 * Ensures all input fields meet the required criteria
 */
export const registerValidation = [
  // First name validation: required, only letters allowed
  body('first_name')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 1, max: 255 })
    .withMessage('First name must be between 1 and 255 characters')
    .matches(/^[a-zA-Z]+$/)
    .withMessage('First name can only contain letters'),
  
  // Middle name validation: optional, only letters if provided
  body('middle_name')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Middle name must not exceed 255 characters')
    .matches(/^[a-zA-Z]*$/)
    .withMessage('Middle name can only contain letters'),
  
  // Last name validation: required, only letters allowed
  body('last_name')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 1, max: 255 })
    .withMessage('Last name must be between 1 and 255 characters')
    .matches(/^[a-zA-Z]+$/)
    .withMessage('Last name can only contain letters'),
  // Email validation: must be a valid email format
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail() // Normalizes email (lowercase, etc.)
    .isLength({ max: 255 })
    .withMessage('Email must not exceed 255 characters'),
  
  // Password validation: minimum length and complexity requirements
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .custom((value) => {
      // Enforce password complexity: must contain uppercase, lowercase, and number
      if (value && value.length >= 6) {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);
        if (!hasUpperCase || !hasLowerCase || !hasNumber) {
          throw new Error('Password must contain at least one uppercase letter, one lowercase letter, and one number');
        }
      }
      return true;
    }),
];

/**
 * Validation rules for user login
 * Ensures email and password are provided in correct format
 */
export const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

/**
 * Validation rules for task creation
 * Ensures task data meets the required criteria
 */
export const taskValidation = [
  // Title is required and must not be empty after trimming
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string')
    .isLength({ max: 255 })
    .withMessage('Title must not exceed 255 characters'),
  
  // Description is optional but must be a string if provided
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  
  // Priority must be one of the allowed values
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  
  // End date must be a valid ISO 8601 date format if provided
  body('end_date')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date in ISO 8601 format (YYYY-MM-DD)'),
];

/**
 * Validation rules for task updates
 * All fields are optional, but must meet criteria if provided
 */
export const taskUpdateValidation = [
  // Title is optional for updates but must not be empty if provided
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty if provided')
    .isString()
    .withMessage('Title must be a string')
    .isLength({ max: 255 })
    .withMessage('Title must not exceed 255 characters'),
  
  // Description is optional but must be a string if provided
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  
  // Priority must be one of the allowed values
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  
  // End date must be a valid ISO 8601 date format if provided
  body('end_date')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date in ISO 8601 format (YYYY-MM-DD)'),
];

