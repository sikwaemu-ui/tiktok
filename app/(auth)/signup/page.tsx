"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate signup
    setTimeout(() => {
      router.push("/");
      setLoading(false);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen w-screen bg-white flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-16 min-h-screen relative">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-gray-100 shadow-md flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Logo */}
        <div className="mb-8">
          <div className="text-3xl sm:text-4xl font-bold text-center lg:text-left">
            <span className="text-black">Tik</span>
            <span className="text-[#FE2C55]">Tok</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4 w-full max-w-md mx-auto lg:mx-0">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent"
            />
          </div>
          
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={loading}
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
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent"
            />
          </div>

          <div className="text-xs text-gray-600">
            By continuing, you agree to TikTok's{" "}
            <a href="#" className="text-[#FE2C55] hover:underline">
              Terms of Service
            </a>{" "}
            and confirm that you have read TikTok's{" "}
            <a href="#" className="text-[#FE2C55] hover:underline">
              Privacy Policy
            </a>
            .
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FE2C55] text-white py-3 rounded-lg font-semibold hover:bg-[#E01E3C] transition-colors disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        {/* Error message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 w-full max-w-md mx-auto lg:mx-0">
            {error}
          </div>
        )}

        {/* Divider */}
        <div className="relative my-6 w-full max-w-md mx-auto lg:mx-0">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">or</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="space-y-3 w-full max-w-md mx-auto lg:mx-0">
          <button className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-gray-700">Continue with Google</span>
          </button>

          <button className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
            <span className="text-gray-700">Continue with Apple</span>
          </button>
        </div>

        {/* Login link */}
        <div className="mt-8 text-sm w-full max-w-md mx-auto lg:mx-0">
          <span className="text-gray-600">Already have an account? </span>
          <a href="/login" className="text-[#FE2C55] hover:underline font-semibold">
            Log in
          </a>
        </div>
      </div>

      {/* Right Side - Image/Content */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#25F4EE] to-[#FE2C55] items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 text-center text-white px-8">
          <div className="text-6xl font-bold mb-4">
            Join TikTok
          </div>
          <p className="text-xl mb-8">
            Start your creative journey today
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                </svg>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 11 5.5 13 7.5l3.5-3.5zm-3.5 9.5L8.5 14 11 11.5 13 13.5l3.5-3.5z"/>
                </svg>
              </div>
            </div>
            <p className="text-sm opacity-90">
              Create, share, and grow your audience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
