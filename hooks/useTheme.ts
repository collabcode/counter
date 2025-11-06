import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

export type ThemeName = 'light' | 'dark' | 'blue' | 'purple' | 'orange' | 'rose' | 'emerald';

export interface ThemeConfig {
  name: ThemeName;
  displayName: string;
  isDark: boolean;
  primaryColor: string;
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
}

export const themes: Record<ThemeName, ThemeConfig> = {
  light: {
    name: 'light',
    displayName: 'Light',
    isDark: false,
    primaryColor: 'emerald',
    gradientFrom: 'from-emerald-500',
    gradientVia: 'via-green-500',
    gradientTo: 'to-emerald-600',
  },
  dark: {
    name: 'dark',
    displayName: 'Dark',
    isDark: true,
    primaryColor: 'emerald',
    gradientFrom: 'from-emerald-400',
    gradientVia: 'via-green-400',
    gradientTo: 'to-emerald-500',
  },
  blue: {
    name: 'blue',
    displayName: 'Blue',
    isDark: false,
    primaryColor: 'blue',
    gradientFrom: 'from-blue-500',
    gradientVia: 'via-cyan-500',
    gradientTo: 'to-blue-600',
  },
  purple: {
    name: 'purple',
    displayName: 'Purple',
    isDark: false,
    primaryColor: 'purple',
    gradientFrom: 'from-purple-500',
    gradientVia: 'via-violet-500',
    gradientTo: 'to-purple-600',
  },
  orange: {
    name: 'orange',
    displayName: 'Orange',
    isDark: false,
    primaryColor: 'orange',
    gradientFrom: 'from-orange-500',
    gradientVia: 'via-amber-500',
    gradientTo: 'to-orange-600',
  },
  rose: {
    name: 'rose',
    displayName: 'Rose',
    isDark: false,
    primaryColor: 'rose',
    gradientFrom: 'from-rose-500',
    gradientVia: 'via-pink-500',
    gradientTo: 'to-rose-600',
  },
  emerald: {
    name: 'emerald',
    displayName: 'Emerald',
    isDark: false,
    primaryColor: 'emerald',
    gradientFrom: 'from-emerald-500',
    gradientVia: 'via-green-500',
    gradientTo: 'to-emerald-600',
  },
};

const useTheme = () => {
  // Check for saved theme in localStorage, fallback to system preference
  const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const defaultTheme: ThemeName = prefersDark ? 'dark' : 'emerald';

  const [themeName, setThemeName] = useLocalStorage<ThemeName>('theme', defaultTheme);
  const theme = themes[themeName] || themes.emerald;

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('dark', 'theme-blue', 'theme-purple', 'theme-orange', 'theme-rose', 'theme-emerald');
    
    // Add dark class if needed
    if (theme.isDark) {
      root.classList.add('dark');
    }
    
    // Add theme-specific class
    if (theme.name !== 'light' && theme.name !== 'dark') {
      root.classList.add(`theme-${theme.name}`);
    }
    
    // Set CSS custom properties for theme colors
    const colorMap: Record<string, Record<string, string>> = {
      blue: {
        '--theme-primary': 'rgb(59, 130, 246)', // blue-500
        '--theme-primary-dark': 'rgb(37, 99, 235)', // blue-600
        '--theme-primary-light': 'rgb(96, 165, 250)', // blue-400
      },
      purple: {
        '--theme-primary': 'rgb(168, 85, 247)', // purple-500
        '--theme-primary-dark': 'rgb(147, 51, 234)', // purple-600
        '--theme-primary-light': 'rgb(192, 132, 252)', // purple-400
      },
      orange: {
        '--theme-primary': 'rgb(249, 115, 22)', // orange-500
        '--theme-primary-dark': 'rgb(234, 88, 12)', // orange-600
        '--theme-primary-light': 'rgb(251, 146, 60)', // orange-400
      },
      rose: {
        '--theme-primary': 'rgb(244, 63, 94)', // rose-500
        '--theme-primary-dark': 'rgb(225, 29, 72)', // rose-600
        '--theme-primary-light': 'rgb(251, 113, 133)', // rose-400
      },
      emerald: {
        '--theme-primary': 'rgb(16, 185, 129)', // emerald-500
        '--theme-primary-dark': 'rgb(5, 150, 105)', // emerald-600
        '--theme-primary-light': 'rgb(52, 211, 153)', // emerald-400
      },
    };
    
    if (colorMap[theme.name]) {
      Object.entries(colorMap[theme.name]).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    } else {
      // Reset to default emerald
      Object.entries(colorMap.emerald).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }
  }, [theme]);

  const setTheme = (newTheme: ThemeName) => {
    setThemeName(newTheme);
  };

  return { theme, setTheme, themes: Object.values(themes) };
};

export default useTheme;
