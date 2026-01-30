"use client";

import { useRouter } from "next/navigation";
import HomeLayout from "@/components/HomeLayout";

export default function WalletPage() {
  const router = useRouter();

  return (
    <HomeLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Wallet</h1>
        
        {/* Wallet Balance */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Total Balance</h2>
              <p className="text-gray-600">Available funds and coins</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">$125.50</div>
              <div className="text-sm text-gray-500">USD</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow text-left">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div className="font-medium text-gray-900">Add Funds</div>
            <div className="text-sm text-gray-500">Add money to wallet</div>
          </button>

          <button className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow text-left">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V2" />
              </svg>
            </div>
            <div className="font-medium text-gray-900">Withdraw</div>
            <div className="text-sm text-gray-500">Transfer to bank</div>
          </button>

          <button className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow text-left">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="font-medium text-gray-900">Transaction History</div>
            <div className="text-sm text-gray-500">View all activity</div>
          </button>
        </div>

        {/* Recent Transactions */}
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
                  <div className="font-medium text-gray-900">Received Payment</div>
                  <div className="text-sm text-gray-500">From @user123 • Dec 15, 2023</div>
                </div>
              </div>
              <div className="text-green-600 font-medium">+$25.00</div>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Sent Payment</div>
                  <div className="text-sm text-gray-500">To @creator456 • Dec 14, 2023</div>
                </div>
              </div>
              <div className="text-red-600 font-medium">-$10.00</div>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Card Added</div>
                  <div className="text-sm text-gray-500">•••• 4242 • Dec 10, 2023</div>
                </div>
              </div>
              <div className="text-gray-600 font-medium">Setup</div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
