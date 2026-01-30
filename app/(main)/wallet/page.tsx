"use client";

import { useDarkMode } from "@/contexts/DarkModeContext";

export default function WalletPage() {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="p-6 pt-20 lg:pt-6">
      <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Wallet
      </h1>
      
      <div className={`rounded-xl p-6 shadow-sm ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="space-y-6">
          {/* Balance Card */}
          <div className={`p-6 rounded-lg ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <h2 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Available Balance
            </h2>
            <div className="text-3xl font-bold text-[var(--zm-orange)]">
              0 SKT Coins
            </div>
            <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Get coins to unlock premium features
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="p-4 rounded-lg bg-[var(--zm-orange)] text-white font-semibold hover:bg-[var(--zm-red)] transition-colors">
              Get Coins
            </button>
            <button className={`p-4 rounded-lg font-semibold transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}>
              Transaction History
            </button>
          </div>

          {/* Recent Transactions */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Transactions
            </h3>
            <div className={`text-center py-8 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                No transactions yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
