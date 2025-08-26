import { useState, useEffect } from 'react';
import { THEME } from '../constants';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && Object.values(THEME).includes(savedTheme)) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEME.DARK;
    }
    
    return THEME.LIGHT;
  });

  useEffect(() => {
    // Update localStorage when theme changes
    localStorage.setItem('theme', theme);
    
    // Update document class for CSS variables
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => 
      prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
    );
  };

  const setSystemTheme = () => {
    setTheme(THEME.SYSTEM);
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    setSystemTheme,
    isDark: theme === THEME.DARK,
    isLight: theme === THEME.LIGHT,
  };
};
