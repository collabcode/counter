import React from 'react';
import HomeIcon from './icons/HomeIcon';
import PauseIcon from './icons/PauseIcon';
import PlayIcon from './icons/PlayIcon';
import RestartIcon from './icons/RestartIcon';
import ThemeSelector from './ThemeSelector';
import { ThemeName } from '../hooks/useTheme';
import { getThemeTextGradient, getThemeBadgeClasses } from '../utils/themeUtils';

interface HeaderProps {
  sessionActive: boolean;
  isPaused: boolean;
  onHomeClick: () => void;
  onPauseToggleClick: () => void;
  onRestartClick: () => void;
  theme: ThemeName;
  onThemeChange: (theme: ThemeName) => void;
  currentPage?: string;
  onPageChange?: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  sessionActive,
  isPaused,
  onHomeClick,
  onPauseToggleClick,
  onRestartClick,
  theme,
  onThemeChange,
  currentPage = 'home',
  onPageChange,
}) => {
  const buttonClasses = "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 p-2.5 md:p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/90 shadow-sm hover:shadow-md ring-1 ring-gray-200/50 dark:ring-gray-700/50 hover:ring-gray-300/50 dark:hover:ring-gray-600/50 active:scale-95";

  return (
    <header className="fixed top-0 left-0 w-full p-3 md:p-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl z-30 border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300 shadow-sm">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={onHomeClick}
            className={buttonClasses}
            aria-label="Home"
          >
            <HomeIcon className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={onHomeClick}
            className={`text-xl md:text-2xl font-black tracking-tight bg-clip-text text-transparent ${getThemeTextGradient(theme)} hover:opacity-80 transition-opacity cursor-pointer`}
            aria-label="Go to home"
          >
            Counter
          </button>
          {!sessionActive && onPageChange && (
            <nav className="hidden md:flex items-center gap-2">
              <button
                onClick={() => onPageChange('help')}
                className={`text-xs md:text-sm px-3 py-1.5 rounded-lg transition-colors ${getThemeBadgeClasses(theme, currentPage === 'help')}`}
              >
                Help
              </button>
              <button
                onClick={() => onPageChange('privacy')}
                className={`text-xs md:text-sm px-3 py-1.5 rounded-lg transition-colors ${getThemeBadgeClasses(theme, currentPage === 'privacy')}`}
              >
                Privacy
              </button>
            </nav>
          )}
        </div>
        
        <div className="flex items-center gap-1.5 md:gap-2">
          {sessionActive && (
            <div className="flex items-center gap-1.5 md:gap-2">
              <button
                onClick={onPauseToggleClick}
                className={buttonClasses}
                aria-label={isPaused ? 'Play' : 'Pause'}
              >
                {isPaused ? <PlayIcon className="w-5 h-5 md:w-6 md:h-6" /> : <PauseIcon className="w-5 h-5 md:w-6 md:h-6" />}
              </button>
              <button
                onClick={onRestartClick}
                className={buttonClasses}
                aria-label="Restart"
              >
                <RestartIcon className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          )}
          <ThemeSelector currentTheme={theme} onThemeChange={onThemeChange} />
        </div>
      </div>
    </header>
  );
};

export default Header;
