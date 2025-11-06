import React, { useState, useRef, useEffect } from 'react';
import { ThemeName, themes } from '../hooks/useTheme';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';

interface ThemeSelectorProps {
  currentTheme: ThemeName;
  onThemeChange: (theme: ThemeName) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const currentThemeConfig = themes[currentTheme];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const buttonClasses = "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 p-2.5 md:p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700/90 shadow-sm hover:shadow-md ring-1 ring-gray-200/50 dark:ring-gray-700/50 hover:ring-gray-300/50 dark:hover:ring-gray-600/50 active:scale-95 relative";

  const getThemeIcon = (themeName: ThemeName) => {
    switch (themeName) {
      case 'dark':
        return <MoonIcon className="w-4 h-4" />;
      case 'light':
        return <SunIcon className="w-4 h-4" />;
      case 'blue':
        return <div className="w-4 h-4 rounded-full bg-blue-500" />;
      case 'purple':
        return <div className="w-4 h-4 rounded-full bg-purple-500" />;
      case 'orange':
        return <div className="w-4 h-4 rounded-full bg-orange-500" />;
      case 'rose':
        return <div className="w-4 h-4 rounded-full bg-rose-500" />;
      case 'emerald':
        return <div className="w-4 h-4 rounded-full bg-emerald-500" />;
      default:
        return <SunIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={buttonClasses}
        aria-label="Select theme"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Select theme"
      >
        {currentThemeConfig.isDark ? (
          <MoonIcon className="w-5 h-5 md:w-6 md:h-6" />
        ) : (
          <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br ${currentThemeConfig.gradientFrom} ${currentThemeConfig.gradientTo}`} />
        )}
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 backdrop-blur-xl"
        >
          {Object.values(themes).map((themeConfig) => {
            const isSelected = themeConfig.name === currentTheme;
            return (
              <button
                key={themeConfig.name}
                onClick={() => {
                  onThemeChange(themeConfig.name);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 flex items-center gap-3 text-left transition-colors ${
                  isSelected
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex-shrink-0">
                  {getThemeIcon(themeConfig.name)}
                </div>
                <span className="flex-1 font-medium text-sm">{themeConfig.displayName}</span>
                {isSelected && (
                  <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;

