"use client";

import { useState, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    phoneNumber: "+260",
    otp: "",
    username: "",
    fullName: "",
    email: "",
    bio: "",
    gender: "",
    dateOfBirth: "",
    province: "",
    city: "",
    district: "",
    accountType: "",
    categories: [] as string[],
    interests: [] as string[],
    profilePhoto: null as File | null,
    termsAccepted: false,
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  const [sessionId, setSessionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleNextStep = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!showOtpInput) {
      if (!formData.phoneNumber || formData.phoneNumber === "+260") {
        setError("Please enter your phone number");
        setLoading(false);
        return;
      }

      try {
        const cleanPhone = formData.phoneNumber.replace(/\D/g, '');
        if (!cleanPhone.startsWith('260') || (cleanPhone.length !== 12 && cleanPhone.length !== 13)) {
          setError('Phone number must start with 260 and be 12-13 digits');
          setLoading(false);
          return;
        }

        const response = await fetch('/api/otp/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone_number: formData.phoneNumber.trim(),
          }),
        });

        const data = await response.json();

        if (data.success) {
          setSessionId(data.response.sessionId);
          setShowOtpInput(true);
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

    // Accept any 6-digit OTP for now
    if (formData.otp.length === 6 && /^\d{6}$/.test(formData.otp)) {
      setCurrentStep(2);
      setShowOtpInput(false);
    } else {
      setError('Please enter a valid 6-digit code');
    }
    
    setLoading(false);
  };

  const handleBasicInfoSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.username || !formData.fullName) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    // Here you would typically validate username uniqueness
    setCurrentStep(3);
    setLoading(false);
  };

  const handleProfileSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Here you would typically validate the profile data
    setCurrentStep(4);
    setLoading(false);
  };

  const handleLocationSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Here you would typically validate the location data
    setCurrentStep(5);
    setLoading(false);
  };

  const handleInterestsSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.accountType || formData.categories.length < 1 || formData.interests.length < 3) {
      setError("Please select account type, at least 1 category, and at least 3 interests");
      setLoading(false);
      return;
    }

    // Here you would typically validate the interests data
    setCurrentStep(6);
    setLoading(false);
  };

  const handleTermsSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.termsAccepted) {
      setError("Please accept the Terms & Conditions and Privacy Policy to complete registration");
      setLoading(false);
      return;
    }

    // Here you would typically submit all the signup data
    console.log('Final signup data:', formData);
    router.push('/');
    setLoading(false);
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checkbox.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        profilePhoto: e.target.files[0],
      });
    }
  };

  const handleSkipPhoto = () => {
    setFormData({
      ...formData,
      profilePhoto: null,
    });
    setCurrentStep(5);
  };

  const handleInterestToggle = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.includes(interest)
        ? formData.interests.filter(i => i !== interest)
        : [...formData.interests, interest],
    });
  };

  const handleAccountTypeSelect = (type: string) => {
    setFormData({
      ...formData,
      accountType: type,
    });
  };

  const handleCategoryToggle = (category: string) => {
    setFormData({
      ...formData,
      categories: formData.categories.includes(category)
        ? formData.categories.filter(c => c !== category)
        : [...formData.categories, category],
    });
  };

  const handleFinalSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log('Final signup data:', formData);
      router.push('/');
    } catch (err) {
      setError('Failed to complete signup. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const interests = [
    "Music", "Dance", "Comedy", "Sports", "Gaming", "Food", "Travel", "Fashion",
    "Art", "Technology", "Fitness", "Pets", "Education", "DIY", "Beauty", "Photography"
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FE2C55]/5 to-[#25F4EE]/5"></div>
      </div>

      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>


{/* size of the form */}
      <div className="w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl px-4 relative z-10">
        <div className="bg-transparent">
          <div className="mb-6 text-center">
            <div className="text-4xl font-bold">
              <span className="text-black">SKUL</span>
              <span className="text-[#FE2C55]">T</span>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4, 5].map((step) => (
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
                  {step < 5 && (
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
              <span>Phone</span>
              <span>Basic</span>
              <span>Security</span>
              <span>Photo</span>
              <span>Profile</span>
            </div>
          </div>

          {!showOtpInput && currentStep === 1 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="flex items-center border border-gray-200 rounded-lg focus-within:ring-1 focus-within:ring-[#FE2C55] focus-within:border-transparent bg-white">
                  <div className="flex items-center px-3 py-3 border-r border-gray-200">
                    <span className="text-sm">🇿🇲</span>
                    <span className="text-sm ml-1">+260</span>
                  </div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="97 123 4567"
                    value={formData.phoneNumber.replace('+260', '')}
                    onChange={(e) => setFormData({...formData, phoneNumber: '+260' + e.target.value})}
                    required
                    disabled={loading}
                    className="flex-1 px-4 py-3 focus:outline-none bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#008751] text-white py-3 rounded-lg font-medium hover:bg-[#006B41] transition-colors disabled:opacity-50"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          )}

          {showOtpInput && currentStep === 1 && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center px-3 py-3 border-r border-gray-200">
                    <span className="text-sm">🇿🇲</span>
                    <span className="text-sm ml-1">+260</span>
                  </div>
                  <input
                    type="tel"
                    value={formData.phoneNumber.replace('+260', '')}
                    disabled
                    className="flex-1 px-4 py-3 bg-gray-50 text-gray-700"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Verification Code</label>
                  <p className="text-xs text-gray-500 mb-3">Sent to {formData.phoneNumber}</p>
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter 6-digit code"
                    value={formData.otp}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    maxLength={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FE2C55] focus:border-transparent bg-white text-center text-lg tracking-widest"
                  />
                  <div className="mt-3 text-center">
                    <button type="button" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                      Resend code in 00:25
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#008751] text-white py-3 rounded-lg font-medium hover:bg-[#006B41] transition-colors disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}

          {currentStep === 2 && (
            <form onSubmit={handleBasicInfoSubmit} className="w-full max-w-4xl lg:max-w-5xl md:max-w-2xl sm:max-w-sm border-2 border-gray-200 rounded-xl p-6 sm:p-8 lg:p-10 bg-white space-y-6">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Basic Info</h2>
                <p className="text-sm sm:text-base text-gray-600">Create your SKULT identity</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Let's get started with your basic details to set up your profile.</p>
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-3">Username *</label>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    placeholder="skult_hero"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent bg-white text-base"
                  />
                  {formData.username && (
                    <div className="absolute right-3 top-3 text-xs text-green-600">
                      Username available
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-3">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent bg-white text-base"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-3">Email Address</label>
                <p className="text-sm text-gray-500 mb-2">Optional</p>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent bg-white text-base"
                />
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#008751] text-white py-3 rounded-lg font-medium hover:bg-[#006B41] transition-colors disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Next Step"}
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  By continuing, you agree to SKULT's{" "}
                  <a href="/terms" className="text-[#FE2C55] hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-[#FE2C55] hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </form>
          )}

          {currentStep === 3 && (
            <form onSubmit={handleProfileSubmit} className="w-full max-w-4xl lg:max-w-4xl md:max-w-2xl sm:max-w-sm border-2 border-gray-200 rounded-xl p-6 sm:p-8 lg:p-10 bg-white">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Set up your profile</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-3">Bio (Optional)</label>
                  <div className="relative">
                    <textarea
                      name="bio"
                      placeholder="I love dancing and comedy..."
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={3}
                      maxLength={500}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent bg-white resize-none text-base"
                    />
                    <div className="absolute bottom-2 right-2 text-sm text-gray-500">
                      {formData.bio.length}/500
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-3">Gender</label>
                  <div className="flex gap-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        onChange={handleInputChange}
                        className="mr-2 w-4 h-4"
                      />
                      <span className="text-base">Male</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        onChange={handleInputChange}
                        className="mr-2 w-4 h-4"
                      />
                      <span className="text-base">Female</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="other"
                        onChange={handleInputChange}
                        className="mr-2 w-4 h-4"
                      />
                      <span className="text-base">Other</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-3">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent bg-white text-base"
                  />
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  disabled={loading}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#008751] text-white py-3 rounded-lg font-medium hover:bg-[#006B41] transition-colors disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Next"}
                </button>
              </div>
            </form>
          )}

          {currentStep === 4 && (
            <form onSubmit={handleLocationSubmit} className="w-full max-w-4xl lg:max-w-4xl md:max-w-2xl sm:max-w-sm border-2 border-gray-200 rounded-xl p-6 sm:p-8 lg:p-10 bg-white">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Choose your location</h2>
                <p className="text-sm sm:text-base text-gray-600">Select your province, city, and district to personalize your experience.</p>
              </div>

              <div className="w-full space-y-6">
                <div className="w-full">
                  <label className="block text-base font-medium text-gray-700 mb-3">Province</label>
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent bg-white text-base"
                  >
                    <option value="">Select province</option>
                    <option value="copperbelt">Copperbelt</option>
                    <option value="lusaka">Lusaka</option>
                    <option value="northern">Northern</option>
                    <option value="southern">Southern</option>
                    <option value="eastern">Eastern</option>
                    <option value="western">Western</option>
                    <option value="northwestern">North-Western</option>
                    <option value="central">Central</option>
                    <option value="muchinga">Muchinga</option>
                  </select>
                </div>

                <div className="w-full">
                  <label className="block text-base font-medium text-gray-700 mb-3">City</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent bg-white text-base"
                  >
                    <option value="">Select city</option>
                    <option value="kitwe">Kitwe</option>
                    <option value="ndola">Ndola</option>
                    <option value="lusaka">Lusaka</option>
                    <option value="livingstone">Livingstone</option>
                    <option value="kabwe">Kabwe</option>
                    <option value="chipata">Chipata</option>
                    <option value="kasama">Kasama</option>
                    <option value="solwezi">Solwezi</option>
                  </select>
                </div>

                <div className="w-full">
                  <label className="block text-base font-medium text-gray-700 mb-3">District (Optional)</label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FE2C55] focus:border-transparent bg-white text-base"
                  >
                    <option value="">Select district</option>
                    <option value="kitwe-urban">Kitwe Urban</option>
                    <option value="kitwe-rural">Kitwe Rural</option>
                    <option value="ndola-urban">Ndola Urban</option>
                    <option value="lusaka-urban">Lusaka Urban</option>
                    <option value="lusaka-rural">Lusaka Rural</option>
                    <option value="livingstone-urban">Livingstone Urban</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  disabled={loading}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#008751] text-white py-3 rounded-lg font-medium hover:bg-[#006B41] transition-colors disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Next"}
                </button>
              </div>
            </form>
          )}

          {currentStep === 5 && (
            <form onSubmit={handleInterestsSubmit} className="w-full max-w-5xl lg:max-w-5xl md:max-w-2xl sm:max-w-sm border-2 border-gray-200 rounded-xl p-6 sm:p-8 lg:p-10 bg-white">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">What brings you to SKULT?</h2>
                <p className="text-sm sm:text-base text-gray-600">Customize your feed by selecting your account type and interests.</p>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {/* Account Type Selection */}
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-3 sm:mb-4">Select Account Type</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => handleAccountTypeSelect('personal')}
                      className={`p-3 sm:p-4 border-2 rounded-xl text-center transition-colors ${
                        formData.accountType === 'personal'
                          ? 'border-[#008751] bg-[#008751]/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-base sm:text-lg font-semibold mb-1">Personal</div>
                      <div className="text-xs sm:text-sm text-gray-600">Discover & Watch</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAccountTypeSelect('creator')}
                      className={`p-3 sm:p-4 border-2 rounded-xl text-center transition-colors ${
                        formData.accountType === 'creator'
                          ? 'border-[#008751] bg-[#008751]/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-base sm:text-lg font-semibold mb-1">Creator</div>
                      <div className="text-xs sm:text-sm text-gray-600">Create & Grow</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAccountTypeSelect('business')}
                      className={`p-3 sm:p-4 border-2 rounded-xl text-center transition-colors ${
                        formData.accountType === 'business'
                          ? 'border-[#008751] bg-[#008751]/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-base sm:text-lg font-semibold mb-1">Business</div>
                      <div className="text-xs sm:text-sm text-gray-600">Ads & Analytics</div>
                    </button>
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">Categories</label>
                  <p className="text-sm text-gray-500 mb-3 sm:mb-4">Select at least 1</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                    {['Music', 'Dance', 'Edu Tutorial', 'Poetry', 'Comedy', 'Lifestyle', 'Zambian Tourism', 'Self Help', 'Business', 'Religious', 'DIY', 'Zambian Culture and Heritage', 'Innovation', 'Animation', 'Meme', 'Food'].map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => handleCategoryToggle(category)}
                        className={`px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-full transition-colors ${
                          formData.categories.includes(category)
                            ? 'bg-[#008751] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Your Interests */}
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">Your Interests</label>
                  <p className="text-sm text-gray-500 mb-3 sm:mb-4">Select at least 3</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                    {['Music', 'Dance', 'Edu Tutorial', 'Poetry', 'Comedy', 'Lifestyle', 'Zambian Tourism', 'Self Help', 'Business', 'Religious', 'DIY', 'Zambian Culture & Heritage', 'Innovation'].map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => handleInterestToggle(interest)}
                        className={`px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-full transition-colors ${
                          formData.interests.includes(interest)
                            ? 'bg-[#008751] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  disabled={loading}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#008751] text-white py-3 rounded-lg font-medium hover:bg-[#006B41] transition-colors disabled:opacity-50"
                >
                  {loading ? "Creating Account..." : "Next Step"}
                </button>
              </div>
            </form>
          )}

          {currentStep === 6 && (
            <form onSubmit={handleTermsSubmit} className="w-full max-w-4xl lg:max-w-4xl md:max-w-2xl sm:max-w-sm border-2 border-gray-200 rounded-xl p-6 sm:p-8 lg:p-10 bg-white">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Terms & Conditions</h2>
                <p className="text-sm sm:text-base text-gray-600">Please review and accept our legal terms to finalize your account and start sharing on SKULT.</p>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Introduction</h3>
                    <p className="text-sm text-gray-600">Welcome to SKULT. By accessing or using our platform, you agree to be bound by these terms and all applicable laws.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">2. User Content</h3>
                    <p className="text-sm text-gray-600">You retain all rights to the videos you upload. However, by uploading, you grant SKULT a license to display and distribute your content.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Community Guidelines</h3>
                    <p className="text-sm text-gray-600">Respect others. Hate speech, harassment, and illegal content are prohibited and will result in account termination.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Privacy</h3>
                    <p className="text-sm text-gray-600">Review our Privacy Policy to understand how we collect and use your data.</p>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">Last updated: October 2023</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleInputChange}
                      className="mt-1 rounded border-gray-300 text-[#008751] focus:ring-[#008751] w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the <a href="/terms" className="text-[#008751] hover:underline font-medium">Terms & Conditions</a> and <a href="/privacy" className="text-[#008751] hover:underline font-medium">Privacy Policy</a>
                    </span>
                  </label>
                  
                  {!formData.termsAccepted && (
                    <p className="text-sm text-amber-600 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Please accept the terms to complete registration.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  disabled={loading}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading || !formData.termsAccepted}
                  className="flex-1 bg-[#008751] text-white py-3 rounded-lg font-medium hover:bg-[#006B41] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating Account..." : "Complete Join"}
                </button>
              </div>
            </form>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
