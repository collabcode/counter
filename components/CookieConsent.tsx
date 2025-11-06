import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

interface CookieConsentProps {
  onNavigateToCookiePolicy?: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onNavigateToCookiePolicy }) => {
  const [consentGiven, setConsentGiven] = useLocalStorage<boolean>('cookie-consent', false);
  const [showBanner, setShowBanner] = useState(!consentGiven);

  const handleAccept = () => {
    setConsentGiven(true);
    setShowBanner(false);
  };

  const handleDecline = () => {
    // Clear all local storage except consent preference and theme preference
    const theme = localStorage.getItem('theme');
    localStorage.clear();
    if (theme) {
      localStorage.setItem('theme', theme);
    }
    // Explicitly set consent to false if declined
    localStorage.setItem('cookie-consent', 'false');
    setConsentGiven(false);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong className="text-gray-900 dark:text-white">Cookie Notice:</strong> This app uses local storage to save your preferences and session history. No tracking cookies are used. By continuing, you consent to this essential storage. 
            <button
              onClick={onNavigateToCookiePolicy}
              className="text-emerald-600 dark:text-emerald-400 hover:underline ml-1"
            >
              Learn more
            </button>
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors shadow-sm"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

