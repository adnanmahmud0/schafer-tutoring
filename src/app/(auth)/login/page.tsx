'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);

  const handleLogin = () => {
    console.log('Login attempt:', { email, password, rememberPassword });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-md mx-auto py-6">
          <h1 className="text-3xl font-bold text-[#0B31BD] text-center">
            Schäfer Tutoring
          </h1>
        </div>
      </div>

      {/* Login Container */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md space-y-8">
          {/* Heading Section */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Hello Again!</h2>
            <p className="text-gray-600">Please login to continue</p>
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 block">
                Email
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-gray-400 focus:ring-0 focus:outline-none"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 block">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-gray-400 focus:ring-0 focus:outline-none"
              />
            </div>

            {/* Remember Password & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberPassword}
                  onCheckedChange={setRememberPassword}
                  className="border-gray-300"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  Remember Password
                </label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot Password
              </a>
            </div>

            {/* Login Button */}
            <Button
              onClick={handleLogin}
              className="w-full bg-[#0B31BD] hover:bg-blue-800 text-white font-semibold py-2.5 rounded-lg text-base"
            >
              Login
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-700 text-sm">
              If have an account?{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;