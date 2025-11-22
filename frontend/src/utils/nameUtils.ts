import { User } from '../types';

/**
 * Formats a user's full name from first, middle, and last name
 * @param user - User object with name fields
 * @returns Formatted full name string
 */
export const formatFullName = (user: User | null): string => {
  if (!user) return '';
  
  const parts = [user.first_name];
  if (user.middle_name) {
    parts.push(user.middle_name);
  }
  parts.push(user.last_name);
  
  return parts.join(' ');
};

