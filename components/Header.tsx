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
  const buttonClasses = "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors p-3 rounded-full bg-white/70 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-700 shadow-sm ring-1 ring-gray-200/70 dark:ring-gray-700/70";

  return (
    <header className="fixed top-0 left-0 w-full p-4 bg-gradient-to-b from-white/80 to-white/40 dark:from-gray-900/80 dark:to-gray-900/40 backdrop-blur-lg z-30 border-b border-gray-200/70 dark:border-gray-800/70 transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400">Counter</h1>
        
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
