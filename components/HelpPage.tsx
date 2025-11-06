import React from 'react';
import HomeIcon from './icons/HomeIcon';
import { ThemeName } from '../hooks/useTheme';
import { getThemeTextGradient, getThemeHeadingClasses, getThemeTextClasses } from '../utils/themeUtils';

interface HelpPageProps {
  onBack: () => void;
  theme?: ThemeName;
}

const HelpPage: React.FC<HelpPageProps> = ({ onBack, theme = 'emerald' }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-3xl md:text-4xl font-bold bg-clip-text text-transparent ${getThemeTextGradient(theme)}`}>
          Help & Instructions
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
        <section>
          <h2 className={`text-2xl font-bold mb-3 ${getThemeHeadingClasses(theme)}`}>Getting Started</h2>
          <p className="mb-4">
            This app helps you track timed intervals organized into sets and steps. It's useful for various activities like exercises, meditation, work sessions, or any timed routine.
          </p>
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-3 ${getThemeHeadingClasses(theme)}`}>How to Use</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className={`text-xl font-semibold mb-2 ${getThemeHeadingClasses(theme)}`}>1. Configure Your Session</h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Name:</strong> Optionally give your session a name to identify it later</li>
                <li><strong>Steps per Set:</strong> Number of timed intervals in each set (1-50)</li>
                <li><strong>Duration per Step:</strong> How long each step lasts in seconds (1-3600, max 1 hour)</li>
                <li><strong>Number of Sets:</strong> How many sets you want to complete (1-100)</li>
                <li><strong>Rest Between Sets:</strong> Rest time between sets in seconds (1-3600, max 1 hour)</li>
                <li><strong>Counting Direction:</strong> Choose whether to count down from the duration or count up from zero</li>
              </ul>
            </div>

            <div>
              <h3 className={`text-xl font-semibold mb-2 ${getThemeHeadingClasses(theme)}`}>2. Start Your Session</h3>
              <p className="mb-2">Click the "Start" button to begin. You'll see:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>A visual grid showing your progress (each cell represents one step)</li>
                <li>The current set and step number</li>
                <li>A countdown or count-up timer</li>
                <li>Audio beeps when each step completes and when the session finishes</li>
              </ul>
            </div>

            <div>
              <h3 className={`text-xl font-semibold mb-2 ${getThemeHeadingClasses(theme)}`}>3. During a Session</h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Pause/Play:</strong> Temporarily pause or resume the session</li>
                <li><strong>Restart:</strong> Reset the current session to the beginning</li>
                <li><strong>Home:</strong> End the session and return to setup (incomplete sessions are saved to history)</li>
              </ul>
            </div>

            <div>
              <h3 className={`text-xl font-semibold mb-2 ${getThemeHeadingClasses(theme)}`}>4. View History</h3>
              <p className="mb-2">All completed and incomplete sessions are saved in your history:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Sessions are grouped by date</li>
                <li>Today's sessions are expanded by default</li>
                <li>Click on a date to expand or collapse it</li>
                <li>Click "Load" on any session to reuse its settings</li>
                <li>Use "Clear History" to remove all saved sessions</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-3 ${getThemeHeadingClasses(theme)}`}>Tips</h2>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>The maximum total cells (Steps × Sets) is 5000 to ensure smooth performance</li>
            <li>All data is stored locally in your browser - nothing is sent to any server</li>
            <li>Your preferences and history persist between sessions</li>
            <li>Use dark mode for a more comfortable experience in low-light conditions</li>
            <li>You can use this app offline - no internet connection required</li>
          </ul>
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-3 ${getThemeHeadingClasses(theme)}`}>Examples</h2>
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg space-y-3">
            <div>
              <strong className={getThemeHeadingClasses(theme)}>Exercise Routine:</strong>
              <p className="text-sm mt-1">5 steps × 60 seconds, 3 sets, 30 seconds rest</p>
            </div>
            <div>
              <strong className={getThemeHeadingClasses(theme)}>Meditation:</strong>
              <p className="text-sm mt-1">10 steps × 30 seconds, 1 set, count down</p>
            </div>
            <div>
              <strong className={getThemeHeadingClasses(theme)}>Work Sessions:</strong>
              <p className="text-sm mt-1">4 steps × 25 minutes (1500 seconds), 2 sets, 5 minutes rest</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HelpPage;
