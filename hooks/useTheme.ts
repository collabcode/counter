import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useTheme = () => {
  // Check for saved theme in localStorage, fallback to system preference
  const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const defaultTheme = prefersDark ? 'dark' : 'light';

  const [theme, setTheme] = useLocalStorage<'dark' | 'light'>('theme', defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
};

export default useTheme;
