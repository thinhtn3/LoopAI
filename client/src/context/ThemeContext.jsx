import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('editor-theme');
    return saved || 'vs-dark';
  });

  const [systemTheme, setSystemTheme] = useState('dark');

  useEffect(() => {
    localStorage.setItem('editor-theme', theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystemTheme = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    updateSystemTheme(mediaQuery);
    mediaQuery.addEventListener('change', updateSystemTheme);

    return () => mediaQuery.removeEventListener('change', updateSystemTheme);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'vs-dark' ? 'vs-light' : 'vs-dark');
  };

  const setSystemThemeMode = () => {
    setTheme(systemTheme === 'dark' ? 'vs-dark' : 'vs-light');
  };

  const value = {
    theme,
    systemTheme,
    toggleTheme,
    setSystemThemeMode,
    setTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
