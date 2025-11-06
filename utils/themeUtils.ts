import { ThemeName } from '../hooks/useTheme';

export const getThemeGradient = (theme: ThemeName, variant: 'from' | 'via' | 'to' = 'from'): string => {
  const gradients: Record<ThemeName, { from: string; via: string; to: string }> = {
    light: { from: 'from-emerald-500', via: 'via-green-500', to: 'to-emerald-600' },
    dark: { from: 'from-emerald-400', via: 'via-green-400', to: 'to-emerald-500' },
    blue: { from: 'from-blue-500', via: 'via-cyan-500', to: 'to-blue-600' },
    purple: { from: 'from-purple-500', via: 'via-violet-500', to: 'to-purple-600' },
    orange: { from: 'from-orange-500', via: 'via-amber-500', to: 'to-orange-600' },
    rose: { from: 'from-rose-500', via: 'via-pink-500', to: 'to-rose-600' },
    emerald: { from: 'from-emerald-500', via: 'via-green-500', to: 'to-emerald-600' },
  };
  
  const darkGradients: Record<ThemeName, { from: string; via: string; to: string }> = {
    light: { from: 'dark:from-emerald-400', via: 'dark:via-green-400', to: 'dark:to-emerald-500' },
    dark: { from: 'from-emerald-400', via: 'via-green-400', to: 'to-emerald-500' },
    blue: { from: 'dark:from-blue-400', via: 'dark:via-cyan-400', to: 'dark:to-blue-500' },
    purple: { from: 'dark:from-purple-400', via: 'dark:via-violet-400', to: 'dark:to-purple-500' },
    orange: { from: 'dark:from-orange-400', via: 'dark:via-amber-400', to: 'dark:to-orange-500' },
    rose: { from: 'dark:from-rose-400', via: 'dark:via-pink-400', to: 'dark:to-rose-500' },
    emerald: { from: 'dark:from-emerald-400', via: 'dark:via-green-400', to: 'dark:to-emerald-500' },
  };
  
  const isDark = theme === 'dark';
  const gradientSet = isDark ? darkGradients[theme] : gradients[theme];
  
  return gradientSet[variant];
};

export const getThemeGradientClasses = (theme: ThemeName, includeDark: boolean = true): string => {
  const from = getThemeGradient(theme, 'from');
  const via = getThemeGradient(theme, 'via');
  const to = getThemeGradient(theme, 'to');
  
  if (includeDark && theme !== 'dark') {
    const darkFrom = getThemeGradient('dark', 'from');
    const darkVia = getThemeGradient('dark', 'via');
    const darkTo = getThemeGradient('dark', 'to');
    return `bg-gradient-to-r ${from} ${via} ${to} dark:${darkFrom} dark:${darkVia} dark:${darkTo}`;
  }
  
  return `bg-gradient-to-r ${from} ${via} ${to}`;
};

export const getThemeTextGradient = (theme: ThemeName): string => {
  const from = getThemeGradient(theme, 'from');
  const via = getThemeGradient(theme, 'via');
  const to = getThemeGradient(theme, 'to');
  
  if (theme === 'dark') {
    return `bg-gradient-to-r ${from} ${via} ${to}`;
  }
  
  const darkFrom = getThemeGradient('dark', 'from');
  const darkVia = getThemeGradient('dark', 'via');
  const darkTo = getThemeGradient('dark', 'to');
  return `bg-gradient-to-r ${from} ${via} ${to} dark:${darkFrom} dark:${darkVia} dark:${darkTo}`;
};

export const getThemeButtonClasses = (theme: ThemeName): string => {
  const buttonColors: Record<ThemeName, { bg: string; hover: string; shadow: string }> = {
    light: { bg: 'bg-emerald-500', hover: 'hover:bg-emerald-600', shadow: 'shadow-emerald-500/30' },
    dark: { bg: 'bg-emerald-500', hover: 'hover:bg-emerald-600', shadow: 'shadow-emerald-500/30' },
    blue: { bg: 'bg-blue-500', hover: 'hover:bg-blue-600', shadow: 'shadow-blue-500/30' },
    purple: { bg: 'bg-purple-500', hover: 'hover:bg-purple-600', shadow: 'shadow-purple-500/30' },
    orange: { bg: 'bg-orange-500', hover: 'hover:bg-orange-600', shadow: 'shadow-orange-500/30' },
    rose: { bg: 'bg-rose-500', hover: 'hover:bg-rose-600', shadow: 'shadow-rose-500/30' },
    emerald: { bg: 'bg-emerald-500', hover: 'hover:bg-emerald-600', shadow: 'shadow-emerald-500/30' },
  };
  
  const colors = buttonColors[theme];
  return `${colors.bg} ${colors.hover} ${colors.shadow}`;
};

export const getThemeBadgeClasses = (theme: ThemeName, isActive: boolean = false): string => {
  if (!isActive) {
    return 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800';
  }
  
  const badgeColors: Record<ThemeName, { bg: string; text: string }> = {
    light: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300' },
    dark: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300' },
    blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300' },
    purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300' },
    orange: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-300' },
    rose: { bg: 'bg-rose-100 dark:bg-rose-900/30', text: 'text-rose-700 dark:text-rose-300' },
    emerald: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300' },
  };
  
  const colors = badgeColors[theme];
  return `${colors.bg} ${colors.text}`;
};

export const getThemeHeadingClasses = (theme: ThemeName): string => {
  const headingColors: Record<ThemeName, string> = {
    light: 'text-emerald-600 dark:text-emerald-400',
    dark: 'text-emerald-400',
    blue: 'text-blue-600 dark:text-blue-400',
    purple: 'text-purple-600 dark:text-purple-400',
    orange: 'text-orange-600 dark:text-orange-400',
    rose: 'text-rose-600 dark:text-rose-400',
    emerald: 'text-emerald-600 dark:text-emerald-400',
  };
  
  return headingColors[theme] || headingColors.emerald;
};

export const getThemeTextClasses = (theme: ThemeName): string => {
  const textColors: Record<ThemeName, string> = {
    light: 'text-emerald-700 dark:text-emerald-300',
    dark: 'text-emerald-300',
    blue: 'text-blue-700 dark:text-blue-300',
    purple: 'text-purple-700 dark:text-purple-300',
    orange: 'text-orange-700 dark:text-orange-300',
    rose: 'text-rose-700 dark:text-rose-300',
    emerald: 'text-emerald-700 dark:text-emerald-300',
  };
  
  return textColors[theme] || textColors.emerald;
};

