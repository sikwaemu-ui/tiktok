"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [sessionId, setSessionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleNextStep = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate current step
    if (currentStep === 1) {
      // Validate basic info
      if (!formData.username || !formData.email) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }
      setCurrentStep(2);
      setLoading(false);
    } else if (currentStep === 2) {
      // Validate phone and password
      if (!formData.phoneNumber || !formData.password || formData.password !== formData.confirmPassword) {
        setError("Please fill in all fields and ensure passwords match");
        setLoading(false);
        return;
      }

      try {
        // Debug: Log the phone number being sent
        console.log('Sending OTP to:', formData.phoneNumber);
        
        // Validate phone number before sending
        if (!formData.phoneNumber || formData.phoneNumber.trim() === '') {
          setError('Phone number is required');
          setLoading(false);
          return;
        }

        // Check if phone number starts with 260
        const cleanPhone = formData.phoneNumber.replace(/\D/g, '');
        if (!cleanPhone.startsWith('260') || (cleanPhone.length !== 12 && cleanPhone.length !== 13)) {
          setError('Phone number must start with 260 and be 12-13 digits (e.g., 2600776061217)');
          setLoading(false);
          return;
        }

        // Generate and send OTP using new endpoint
        const response = await fetch('/api/otp/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone_number: formData.phoneNumber.trim(),
          }),
        });

        const data = await response.json();

        // Debug: Log the response
        console.log('OTP Response:', data);

        if (data.success) {
          setSessionId(data.response.sessionId);
          setCurrentStep(3);
          
          // For demo purposes, show the OTP
          if (data.response.demoOTP) {
            console.log('Demo OTP:', data.response.demoOTP);
          }
        } else {
          setError(data.error || 'Failed to send OTP');
        }
      } catch (err) {
        console.error('OTP Send Error:', err);
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleVerifyOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Debug: Log the OTP data being sent
    console.log('Verifying OTP:', {
      otp: formData.otp,
      phone_number: formData.phoneNumber,
      fcm_token: 'demo_fcm_token'
    });

    try {
      const response = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp: formData.otp,
          phone_number: formData.phoneNumber,
          fcm_token: 'demo_fcm_token', // Optional FCM token
        }),
      });

      const data = await response.json();

      // Debug: Log the response
      console.log('OTP Verify Response:', data);

      if (data.verified) {
        // Account created successfully - redirect to home
        console.log('JWT Token:', data.token);
        console.log('User data:', data.user);
        
        // Store JWT token in localStorage or cookies
        localStorage.setItem('auth_token', data.token);
        
        router.push('/');
      } else {
        setError(data.error || data.message || 'Invalid OTP');
      }
    } catch (err) {
      console.error('OTP Verify Error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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
          <div className="mb-6 text-center">
            <div className="text-3xl sm:text-4xl font-bold">
              <span className="text-black">Tik</span>
              <span className="text-[#FE2C55]">Tok</span>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      currentStep >= step
                        ? "bg-[#FE2C55] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-full h-1 mx-2 ${
                        currentStep > step ? "bg-[#FE2C55]" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              <span>Basic Info</span>
              <span>Security</span>
              <span>Verify</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={currentStep === 3 ? handleVerifyOtp : handleNextStep} className="space-y-4">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <>
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
              </>
            )}

            {/* Step 2: Security */}
            {currentStep === 2 && (
              <>
                <div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="2600776061217"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Format: 260 + 9-10 digits (e.g., 2600776061217)</p>
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
                <div>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent"
                  />
                </div>
              </>
            )}

            {/* Step 3: OTP Verification */}
            {currentStep === 3 && (
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


            {/* Navigation Buttons */}
            <div className="flex gap-3">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  disabled={loading}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 bg-[#FE2C55] text-white py-3 rounded-lg font-semibold hover:bg-[#E01E3C] transition-colors disabled:opacity-50 ${
                  currentStep === 1 ? "w-full" : ""
                }`}
              >
                {loading ? (
                  currentStep === 3 ? "Creating account..." : "Next..."
                ) : (
                  currentStep === 3 ? "Create Account" : "Next"
                )}
              </button>
            </div>
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
            {/* <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div> */}
          </div>

          {/* Terms of Service - Only show on final step */}
          {currentStep === 3 && (
            <div className="mt-6">
              <label className="flex items-start gap-2 text-xs text-gray-500">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 rounded border-gray-300 text-[#FE2C55] focus:ring-[#FE2C55]"
                />
                <span>
                  By creating your account, you agree to our{" "}
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
          )}

          
        </div>
      </div>
    </div>
  );
}
