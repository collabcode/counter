import React from 'react';
import HomeIcon from './icons/HomeIcon';
import { ThemeName } from '../hooks/useTheme';
import { getThemeTextGradient, getThemeHeadingClasses, getThemeTextClasses } from '../utils/themeUtils';

interface PrivacyPolicyProps {
  onBack: () => void;
  theme?: ThemeName;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack, theme = 'emerald' }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-3xl md:text-4xl font-bold bg-clip-text text-transparent ${getThemeTextGradient(theme)}`}>
          Privacy Policy
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
          <h2 className={`text-2xl font-bold mb-3 ${getThemeHeadingClasses(theme)}`}>Overview</h2>
          <p>
            This Privacy Policy describes how we handle your data when you use this application. We are committed to protecting your privacy and ensuring transparency about our data practices.
          </p>
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-3 ${getThemeHeadingClasses(theme)}`}>Data Collection</h2>
          <p className="mb-2">This application operates entirely in your browser and collects minimal data:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong>Local Storage:</strong> Your session configurations, history, and theme preferences are stored locally in your browser</li>
            <li><strong>No Server Communication:</strong> This app does not send any data to external servers</li>
            <li><strong>No Analytics:</strong> We do not use analytics or tracking services</li>
            <li><strong>No Cookies:</strong> We do not use cookies for tracking purposes (only for essential functionality like theme preference)</li>
          </ul>
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-3 ${getThemeHeadingClasses(theme)}`}>Data Storage</h2>
          <p className="mb-2">All data is stored locally on your device:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Session history and configurations are stored in your browser's local storage</li>
            <li>Theme preferences are stored in local storage</li>
            <li>You can clear all data at any time by clearing your browser's local storage or using the "Clear History" feature</li>
            <li>Data is not synchronized across devices unless you manually export/import it</li>
          </ul>
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-3 ${getThemeHeadingClasses(theme)}`}>Third-Party Services</h2>
          <p className="mb-2">This application uses the following third-party services:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong>Tailwind CSS:</strong> Loaded from CDN for styling (no data collection)</li>
            <li><strong>Google Fonts:</strong> Inter font loaded from Google Fonts (subject to Google's privacy policy)</li>
          </ul>
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-3 ${getThemeHeadingClasses(theme)}`}>Your Rights</h2>
          <p className="mb-2">You have full control over your data:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>You can view all stored data through your browser's developer tools</li>
            <li>You can delete your session history at any time</li>
            <li>You can clear all data by clearing your browser's local storage</li>
            <li>Since no data is sent to servers, there is no data to request or delete from external sources</li>
          </ul>
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-3 ${getThemeHeadingClasses(theme)}`}>Children's Privacy</h2>
          <p>
            This application does not knowingly collect personal information from children. Since we do not collect any personal information from anyone, this application is safe for users of all ages.
          </p>
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-3 ${getThemeHeadingClasses(theme)}`}>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated "Last updated" date. We encourage you to review this policy periodically.
          </p>
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-3 ${getThemeHeadingClasses(theme)}`}>Contact</h2>
          <p>
            If you have any questions about this Privacy Policy, please review the Help section or check the application's source code for transparency about data handling.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

