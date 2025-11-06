import React from 'react';
import HomeIcon from './icons/HomeIcon';
import { ThemeName } from '../hooks/useTheme';
import { getThemeTextGradient, getThemeHeadingClasses, getThemeTextClasses } from '../utils/themeUtils';

interface CookiePolicyProps {
  onBack: () => void;
  theme?: ThemeName;
}

const CookiePolicy: React.FC<CookiePolicyProps> = ({ onBack, theme = 'emerald' }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-3xl md:text-4xl font-bold bg-clip-text text-transparent ${getThemeTextGradient(theme)}`}>
          Cookie Policy
        </h1>
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Back to home"
        >
          <HomeIcon className="w-6 h-6" />
        </button>
      </div>

      <div className={`space-y-6 ${getThemeTextClasses(theme)}`}>
        <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>

        <section>
          <h2 className={`text-2xl font-bold mb-3 ${getThemeHeadingClasses(theme)}`}>What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your device when you visit a website. They help websites remember your preferences and improve your browsing experience.
          </p>
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-3 ${getThemeHeadingClasses(theme)}`}>How We Use Cookies</h2>
          <p className="mb-2">This application uses minimal cookies and local storage:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong>Essential Cookies:</strong> We use local storage (similar to cookies) to store your theme preference (light/dark mode)</li>
            <li><strong>Session Data:</strong> Your session configurations and history are stored in local storage</li>
            <li><strong>No Tracking Cookies:</strong> We do not use cookies for tracking, analytics, or advertising purposes</li>
            <li><strong>No Third-Party Cookies:</strong> We do not set or allow third-party cookies</li>
          </ul>
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-3 ${getThemeHeadingClasses(theme)}`}>Types of Storage Used</h2>
          <div className="space-y-3">
            <div>
              <h3 className={`text-xl font-semibold mb-2 ${getThemeHeadingClasses(theme)}`}>Local Storage</h3>
              <p className="mb-2">We use browser local storage (not traditional cookies) to store:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Theme preference (light/dark mode)</li>
                <li>Session configurations</li>
                <li>Session history</li>
              </ul>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Local storage is similar to cookies but stored differently. You can clear it through your browser settings.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-3 ${getThemeHeadingClasses(theme)}`}>Managing Your Preferences</h2>
          <p className="mb-2">You have full control over stored data:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong>Clear History:</strong> Use the "Clear History" button in the app to remove all session data</li>
            <li><strong>Browser Settings:</strong> Clear local storage through your browser's settings or developer tools</li>
            <li><strong>Disable Storage:</strong> You can disable local storage in your browser, though this will prevent the app from saving your preferences</li>
          </ul>
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-3 ${getThemeHeadingClasses(theme)}`}>Third-Party Services</h2>
          <p className="mb-2">This application loads resources from:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong>Tailwind CSS CDN:</strong> For styling (may set technical cookies, no tracking)</li>
            <li><strong>Google Fonts:</strong> For fonts (subject to Google's cookie policy)</li>
          </ul>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            These services may use cookies according to their own policies. We recommend reviewing their privacy policies if you have concerns.
          </p>
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-3 ${getThemeHeadingClasses(theme)}`}>Your Consent</h2>
          <p>
            By using this application, you consent to the use of local storage as described in this policy. Since we only use essential storage for app functionality (not tracking), continued use implies consent. You can withdraw consent at any time by clearing your browser's local storage.
          </p>
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-3 ${getThemeHeadingClasses(theme)}`}>Changes to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. Any changes will be reflected on this page with an updated "Last updated" date. We encourage you to review this policy periodically.
          </p>
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-3 ${getThemeHeadingClasses(theme)}`}>Contact</h2>
          <p>
            If you have any questions about this Cookie Policy, please review the Help section or check the application's source code for transparency about data storage.
          </p>
        </section>
      </div>
    </div>
  );
};

export default CookiePolicy;

