import React from 'react';
import HomeIcon from './icons/HomeIcon';
import PauseIcon from './icons/PauseIcon';
import PlayIcon from './icons/PlayIcon';
import RestartIcon from './icons/RestartIcon';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';

interface HeaderProps {
  sessionActive: boolean;
  isPaused: boolean;
  onHomeClick: () => void;
  onPauseToggleClick: () => void;
  onRestartClick: () => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({
  sessionActive,
  isPaused,
  onHomeClick,
  onPauseToggleClick,
  onRestartClick,
  theme,
  onThemeToggle,
}) => {
  const buttonClasses = "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors p-3 rounded-full bg-gray-200/40 dark:bg-gray-800/40 hover:bg-gray-300/60 dark:hover:bg-gray-700/60";

  return (
    <header className="fixed top-0 left-0 w-full p-4 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm z-30 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-500 dark:text-green-400">Counter</h1>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          {sessionActive && (
            <div className="flex items-center space-x-2 md:space-x-4">
              <button
                onClick={onPauseToggleClick}
                className={buttonClasses}
                aria-label={isPaused ? 'Play' : 'Pause'}
              >
                {isPaused ? <PlayIcon className="w-6 h-6" /> : <PauseIcon className="w-6 h-6" />}
              </button>
              <button
                onClick={onRestartClick}
                className={buttonClasses}
                aria-label="Restart Session"
              >
                <RestartIcon className="w-6 h-6" />
              </button>
              <button
                onClick={onHomeClick}
                className={buttonClasses}
                aria-label="New Session"
              >
                <HomeIcon className="w-6 h-6" />
              </button>
            </div>
          )}
          <button
            onClick={onThemeToggle}
            className={buttonClasses}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
