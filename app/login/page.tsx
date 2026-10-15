'use client';

import React, { useState, ChangeEvent, FormEvent, MouseEvent } from 'react';

export default function AuthPage() {
  const [currentTab, setCurrentTab] = useState<'signin' | 'signup'>('signin');
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
  });

  // Toast state
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    icon: '✨',
  });

  const showToast = (message: string, icon: string = '✨') => {
    setToast({ visible: true, message, icon });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3500);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentTab === 'signup' && formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match! Please check again.", "⚠️");
      return;
    }

    if (currentTab === 'signin') {
      showToast("Welcome back! Signed in successfully.", "🚀");
    } else {
      showToast("Account created successfully! Welcome to NewaNext.", "🎉");
    }
  };

  const handleForgotPassword = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    showToast("Password reset link sent to your email!", "✉️");
  };

  const handleSocialLogin = (provider: string) => {
    showToast(`Redirecting to ${provider} authentication...`, "🔑");
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 relative overflow-x-hidden flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      
      {/* Ambient Light Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl pointer-events-none" />

      {/* Toast / Alert Notification Container */}
      <div className={`fixed top-5 right-5 z-50 transform transition-all duration-300 ${toast.visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} pointer-events-none`}>
        <div className="bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center space-x-3 border border-slate-700 max-w-sm">
          <span className="text-xl">{toast.icon}</span>
          <span className="text-xs font-medium">{toast.message}</span>
        </div>
      </div>

      <main className="w-full max-w-md relative z-10 my-8">
        {/* Hero Header */}
        <div className="text-center space-y-3 mb-8">
          <span className="inline-block bg-purple-100 text-purple-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
            NewaNext Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            {currentTab === 'signin' ? 'Welcome Back' : 'Create an Account'}
          </h1>
          <p className="text-sm text-gray-600">
            {currentTab === 'signin' 
              ? 'Access your dashboard and custom software projects in Kathmandu.' 
              : 'Join NewaNext to start your next custom software project.'}
          </p>
        </div>

        {/* Main Card Container */}
        <div className="bg-white/90 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-xl relative">
          
          {/* Interactive Tab Switcher */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8">
            <button
              type="button"
              onClick={() => setCurrentTab('signin')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                currentTab === 'signin'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setCurrentTab('signup')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                currentTab === 'signup'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name (Sign Up only) */}
            {currentTab === 'signup' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Manish Sharma"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 text-sm transition-all bg-slate-50 focus:bg-white"
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="manish@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 text-sm transition-all bg-slate-50 focus:bg-white"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={isPasswordShown ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 text-sm transition-all bg-slate-50 focus:bg-white pr-14"
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordShown(!isPasswordShown)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-purple-600 hover:text-purple-800 focus:outline-none"
                >
                  {isPasswordShown ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (Sign Up only) */}
            {currentTab === 'signup' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type={isPasswordShown ? 'text' : 'password'}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 text-sm transition-all bg-slate-50 focus:bg-white"
                />
              </div>
            )}

            {/* Remember Me & Forgot Password (Sign In only) */}
            {currentTab === 'signin' && (
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-2 w-4 h-4"
                  />
                  <span className="font-medium">Remember me</span>
                </label>
                <a
                  href="#forgot"
                  onClick={handleForgotPassword}
                  className="font-semibold text-purple-600 hover:text-purple-800 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:opacity-90 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg text-sm tracking-wide"
            >
              {currentTab === 'signin' ? 'Sign In →' : 'Create Account →'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-gray-400 font-semibold tracking-wider">Or continue with</span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              className="flex items-center justify-center space-x-2 py-2.5 px-4 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 bg-white hover:bg-slate-50 transition-all shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('GitHub')}
              className="flex items-center justify-center space-x-2 py-2.5 px-4 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 bg-white hover:bg-slate-50 transition-all shadow-sm"
            >
              <svg className="w-4 h-4 fill-current text-gray-800" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
            </button>
          </div>

        </div>

        {/* Footer Copyright */}
        <div className="text-center mt-6 text-xs text-gray-400 font-medium">
          <p>© NewaNext Technologies. Kathmandu, Nepal.</p>
        </div>
      </main>
    </div>
  );
}