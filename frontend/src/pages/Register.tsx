import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate first name: only letters allowed
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(firstName.trim())) {
      setError('First name can only contain letters');
      return;
    }

    // Validate middle name if provided: only letters allowed
    if (middleName.trim() && !nameRegex.test(middleName.trim())) {
      setError('Middle name can only contain letters');
      return;
    }

    // Validate last name: only letters allowed
    if (!nameRegex.test(lastName.trim())) {
      setError('Last name can only contain letters');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // Password complexity validation
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    
    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, and one number');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await register(firstName, middleName || undefined, lastName, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center auth-background px-4 py-12 relative">
      {/* Abstract background shapes */}
      <div className="auth-shape-1"></div>
      <div className="auth-shape-2"></div>
      <div className="auth-shape-3"></div>

      <div className="auth-card max-w-md w-full rounded-2xl p-8 relative z-10">
        {/* Logo and Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">TaskMaster</h1>
              <p className="text-xs text-white/70 font-medium">Your Productivity Partner</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white">Register</h2>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-400/50 text-red-200 rounded-lg backdrop-blur-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
              First Name *
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => {
                const value = e.target.value;
                // Only allow letters
                if (value === '' || /^[a-zA-Z]*$/.test(value)) {
                  setFirstName(value);
                }
              }}
              required
              className={`w-full px-4 py-3 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 ${
                firstName && !/^[a-zA-Z]+$/.test(firstName.trim())
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300'
              }`}
              placeholder="Enter your first name"
            />
            {firstName && !/^[a-zA-Z]+$/.test(firstName.trim()) && (
              <p className="mt-1 text-sm text-red-300">
                First name can only contain letters
              </p>
            )}
          </div>

          <div>
            <label htmlFor="middleName" className="block text-sm font-medium text-white mb-2">
              Middle Name
            </label>
            <input
              id="middleName"
              type="text"
              value={middleName}
              onChange={(e) => {
                const value = e.target.value;
                // Only allow letters
                if (value === '' || /^[a-zA-Z]*$/.test(value)) {
                  setMiddleName(value);
                }
              }}
              className={`w-full px-4 py-3 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 ${
                middleName && !/^[a-zA-Z]*$/.test(middleName.trim())
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300'
              }`}
              placeholder="Enter your middle name (optional)"
            />
            {middleName && !/^[a-zA-Z]*$/.test(middleName.trim()) && (
              <p className="mt-1 text-sm text-red-300">
                Middle name can only contain letters
              </p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">
              Last Name *
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => {
                const value = e.target.value;
                // Only allow letters
                if (value === '' || /^[a-zA-Z]*$/.test(value)) {
                  setLastName(value);
                }
              }}
              required
              className={`w-full px-4 py-3 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 ${
                lastName && !/^[a-zA-Z]+$/.test(lastName.trim())
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300'
              }`}
              placeholder="Enter your last name"
            />
            {lastName && !/^[a-zA-Z]+$/.test(lastName.trim()) && (
              <p className="mt-1 text-sm text-red-300">
                Last name can only contain letters
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
              placeholder="username@gmail.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
              placeholder="Password (min 6 characters)"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className={`w-full px-4 py-3 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 ${
                confirmPassword && password !== confirmPassword
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300'
              }`}
              placeholder="Confirm your password"
            />
            {confirmPassword && password !== confirmPassword && (
              <p className="mt-1 text-sm text-red-300">Passwords do not match</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-700 text-white py-3 px-4 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-semibold"
          >
            {isLoading ? 'Registering...' : 'Sign up'}
          </button>

          {/* Separator */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-white">or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-3 gap-4">
            <button
              type="button"
              className="flex items-center justify-center p-3 bg-white rounded-lg hover:bg-gray-50 transition duration-200"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>
            <button
              type="button"
              className="flex items-center justify-center p-3 bg-white rounded-lg hover:bg-gray-50 transition duration-200"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </button>
            <button
              type="button"
              className="flex items-center justify-center p-3 bg-white rounded-lg hover:bg-gray-50 transition duration-200"
            >
              <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-white">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-300 hover:text-blue-200 font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

