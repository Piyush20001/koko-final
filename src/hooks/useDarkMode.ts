import { useState, useEffect } from 'react';

const STORAGE_KEY = 'theme';
const DARK_CLASS = 'dark';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    // Check local storage first
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    if (storedTheme) return storedTheme === 'dark';
    
    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Update localStorage and class when theme changes
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    
    if (isDark) {
      document.documentElement.classList.add(DARK_CLASS);
    } else {
      document.documentElement.classList.remove(DARK_CLASS);
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(prev => !prev);

  return [isDark, toggleDarkMode] as const;
}