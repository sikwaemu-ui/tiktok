"use client";

import { useRouter } from "next/navigation";
import HomeLayout from "@/components/HomeLayout";

export default function CoinsPage() {
  const router = useRouter();

  return (
    <HomeLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Get Coins</h1>
        
        {/* Coin Balance */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Your Coin Balance</h2>
              <p className="text-gray-600">Current balance available for purchases</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-orange-500">1,250</div>
              <div className="text-sm text-gray-500">coins</div>
            </div>
          </div>
        </div>

        {/* Coin Packages */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Purchase Coins</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Small Package */}
            <div className="border border-gray-200 rounded-lg p-4 hover:border-orange-500 transition-colors cursor-pointer">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500 mb-2">100</div>
                <div className="text-sm text-gray-600 mb-3">Coins</div>
                <div className="text-lg font-semibold text-gray-900 mb-3">$0.99</div>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Medium Package */}
            <div className="border border-orange-500 rounded-lg p-4 relative">
              <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                Popular
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500 mb-2">500</div>
                <div className="text-sm text-gray-600 mb-3">Coins</div>
                <div className="text-lg font-semibold text-gray-900 mb-3">$4.99</div>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Large Package */}
            <div className="border border-gray-200 rounded-lg p-4 hover:border-orange-500 transition-colors cursor-pointer">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500 mb-2">1,000</div>
                <div className="text-sm text-gray-600 mb-3">Coins</div>
                <div className="text-lg font-semibold text-gray-900 mb-3">$9.99</div>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Purchased Coins</div>
                  <div className="text-sm text-gray-500">Dec 15, 2023</div>
                </div>
              </div>
              <div className="text-green-600 font-medium">+500</div>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Sent Gift</div>
                  <div className="text-sm text-gray-500">Dec 14, 2023</div>
                </div>
              </div>
              <div className="text-red-600 font-medium">-50</div>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Purchased Coins</div>
                  <div className="text-sm text-gray-500">Dec 10, 2023</div>
                </div>
              </div>
              <div className="text-green-600 font-medium">+100</div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
