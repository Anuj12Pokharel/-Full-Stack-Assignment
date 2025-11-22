import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen auth-background relative">
      {/* Abstract background shapes */}
      <div className="auth-shape-1"></div>
      <div className="auth-shape-2"></div>
      <div className="auth-shape-3"></div>

      {/* Top Bar */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 h-1 relative z-10"></div>
      
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-50 shadow-lg relative z-10 sticky top-0 border-b-2 border-slate-300/30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between h-auto sm:h-16 py-3 sm:py-0 items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-r from-purple-500 via-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-blue-700 tracking-tight">
                TaskMaster
              </h1>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              {user ? (
                <Link
                  to="/dashboard"
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-semibold text-sm sm:text-base w-full sm:w-auto text-center shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-blue-700 hover:text-blue-900 font-semibold transition-all duration-200 text-sm sm:text-base w-full sm:w-auto text-center hover:underline decoration-2 underline-offset-4"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-bold text-sm sm:text-base w-full sm:w-auto text-center shadow-md hover:shadow-xl transform hover:scale-105"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Organize Your Life,
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 animate-gradient">
              One Task at a Time
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            The ultimate task management solution to help you stay productive, organized, and focused on what matters most.
          </p>
          {!user && (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link
                to="/register"
                className="px-6 sm:px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition duration-200 font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="px-6 sm:px-8 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition duration-200 font-semibold text-base sm:text-lg shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          <div className="water-card bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border-2 border-indigo-200">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-lg transform rotate-3 hover:rotate-6 transition-transform">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-3">Smart Organization</h3>
            <p className="text-indigo-700 text-sm sm:text-base">
              Organize your tasks with priorities, due dates, and categories. Never miss an important deadline again.
            </p>
          </div>

          <div className="water-card bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border-2 border-emerald-200">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-4 shadow-lg transform -rotate-3 hover:-rotate-6 transition-transform">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-emerald-900 mb-3">Track Progress</h3>
            <p className="text-emerald-700 text-sm sm:text-base">
              Visualize your progress with overdue task highlighting and priority-based sorting. Stay on top of your goals.
            </p>
          </div>

          <div className="water-card bg-gradient-to-br from-amber-50 to-orange-100 rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border-2 border-amber-200 sm:col-span-2 lg:col-span-1">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 shadow-lg transform rotate-3 hover:rotate-6 transition-transform">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-amber-900 mb-3">Secure & Private</h3>
            <p className="text-amber-700 text-sm sm:text-base">
              Your data is protected with industry-standard encryption. Your tasks are private and secure.
            </p>
          </div>
        </div>

        {/* Visual Section with Figures */}
        <div className="water-card bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                Everything You Need to
                <span className="block text-blue-600">Stay Productive</span>
              </h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Create and manage unlimited tasks</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Set priorities and due dates</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Sort and filter with ease</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Visual overdue task alerts</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Server-side pagination</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              {/* Decorative Figure */}
              <div className="relative bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="relative z-10 text-center">
                  <div className="w-32 h-32 bg-white rounded-full shadow-xl mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">Task Management</h4>
                  <p className="text-gray-600">Made Simple</p>
                </div>
                {/* Decorative circles */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-indigo-200 rounded-full opacity-50"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-blue-200 rounded-full opacity-50"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          <div className="water-card bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-4 sm:p-6 text-center transform hover:scale-110 transition-all duration-300 border-2 border-purple-200">
            <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">100%</div>
            <div className="text-sm sm:text-base text-purple-700 font-medium">Free to Use</div>
          </div>
          <div className="water-card bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl shadow-lg p-4 sm:p-6 text-center transform hover:scale-110 transition-all duration-300 border-2 border-cyan-200">
            <div className="text-3xl sm:text-4xl font-bold text-cyan-600 mb-2">24/7</div>
            <div className="text-sm sm:text-base text-cyan-700 font-medium">Available</div>
          </div>
          <div className="water-card bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl shadow-lg p-4 sm:p-6 text-center transform hover:scale-110 transition-all duration-300 border-2 border-pink-200">
            <div className="text-3xl sm:text-4xl font-bold text-pink-600 mb-2">∞</div>
            <div className="text-sm sm:text-base text-pink-700 font-medium">Unlimited Tasks</div>
          </div>
          <div className="water-card bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl shadow-lg p-4 sm:p-6 text-center transform hover:scale-110 transition-all duration-300 border-2 border-violet-200">
            <div className="text-3xl sm:text-4xl font-bold text-violet-600 mb-2">100%</div>
            <div className="text-sm sm:text-base text-violet-700 font-medium">Secure</div>
          </div>
        </div>

        {/* CTA Section */}
        {!user && (
          <div className="water-card bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-white">Ready to Get Started?</h3>
              <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-white/90">
                Join thousands of users who are already organizing their tasks with TaskMaster
              </p>
              <Link
                to="/register"
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition duration-200 font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
              >
                Create Your Free Account
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-blue-100 py-10 sm:py-14 relative z-10 border-t-2 border-blue-200/50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {/* Brand Column */}
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">TaskMaster</h4>
              </div>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Your trusted companion for task management and productivity.
              </p>
            </div>

            {/* Quick Links Column */}
            <div>
              <h4 className="text-lg sm:text-xl font-bold mb-5 text-gray-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656l4-4z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 10l6 6m0 0l6-6m-6 6V4" />
                </svg>
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-700 hover:text-blue-600 transition-all duration-200 flex items-center gap-2 group font-medium">
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Home
                  </Link>
                </li>
                {user ? (
                  <li>
                    <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-all duration-200 flex items-center gap-2 group font-medium">
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Dashboard
                    </Link>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-all duration-200 flex items-center gap-2 group font-medium">
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/register" className="text-gray-700 hover:text-blue-600 transition-all duration-200 flex items-center gap-2 group font-medium">
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Features Column */}
            <div>
              <h4 className="text-lg sm:text-xl font-bold mb-5 text-gray-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Features
              </h4>
              <ul className="space-y-3">
                <li className="text-gray-700 flex items-center gap-2 group">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full group-hover:scale-150 transition-transform"></div>
                  <span className="font-medium group-hover:text-green-600 transition-colors">Task Management</span>
                </li>
                <li className="text-gray-700 flex items-center gap-2 group">
                  <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full group-hover:scale-150 transition-transform"></div>
                  <span className="font-medium group-hover:text-orange-600 transition-colors">Priority Sorting</span>
                </li>
                <li className="text-gray-700 flex items-center gap-2 group">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full group-hover:scale-150 transition-transform"></div>
                  <span className="font-medium group-hover:text-blue-600 transition-colors">Due Date Tracking</span>
                </li>
                <li className="text-gray-700 flex items-center gap-2 group">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full group-hover:scale-150 transition-transform"></div>
                  <span className="font-medium group-hover:text-purple-600 transition-colors">Secure Authentication</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Copyright Section */}
          <div className="border-t-2 border-blue-200/50 mt-10 sm:mt-12 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-700 text-sm sm:text-base font-medium">
                &copy; 2024 <span className="font-bold text-blue-600">TaskMaster</span>. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex gap-3">
                  <a href="#" className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

