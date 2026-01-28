"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    otp: "",
  });
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLoginAttempt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // First validate credentials (you'd implement this)
      // For demo, we'll assume user exists and get their phone number
      const mockPhoneNumber = "+1234567890"; // In real app, get from user database

      // Generate and send OTP
      const response = await fetch('/api/auth/generate-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: mockPhoneNumber,
          username: formData.username,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSessionId(data.sessionId);
        setShowOtpInput(true);
        
        // For demo purposes, show the OTP
        if (data.demoOTP) {
          console.log('Demo OTP:', data.demoOTP);
        }
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          otp: formData.otp,
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Login successful - redirect to home
        router.push('/');
      } else {
        setError(data.error || 'Invalid OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center relative">
      {/* Back Arrow */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="w-full max-w-md px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="text-3xl sm:text-4xl font-bold">
              <span className="text-black">Tik</span>
              <span className="text-[#FE2C55]">Tok</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={showOtpInput ? handleVerifyOtp : handleLoginAttempt} className="space-y-4">
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username or email"
                value={formData.username}
                onChange={handleInputChange}
                required
                disabled={loading || showOtpInput}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent"
              />
            </div>
            
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={loading || showOtpInput}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent"
              />
            </div>
            
            {showOtpInput && (
              <div>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter 6-digit OTP sent to your phone"
                  value={formData.otp}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent"
                />
              </div>
            )}

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="rounded border-gray-300" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-[#FE2C55] hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FE2C55] text-white py-3 rounded-lg font-semibold hover:bg-[#E01E3C] transition-colors disabled:opacity-50"
            >
              {loading ? (showOtpInput ? "Verifying OTP..." : "Sending OTP...") : (showOtpInput ? "Verify OTP" : "Log in")}
            </button>
          </form>

          {/* Error message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500"></span>
            </div>
          </div>

          {/* Terms of Service */}
          <div className="mt-6">
            <label className="flex items-start gap-2 text-xs text-gray-500">
              <input
                type="checkbox"
                required
                className="mt-0.5 rounded border-gray-300 text-[#FE2C55] focus:ring-[#FE2C55]"
              />
              <span>
                By logging in, you agree to our{" "}
                <a href="/terms" className="text-[#FE2C55] hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-[#FE2C55] hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>
          </div>

          
        </div>
      </div>
    </div>
  );
}
