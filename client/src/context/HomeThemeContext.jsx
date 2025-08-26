import { createContext, useContext, useEffect, useState } from 'react';

const HomeThemeContext = createContext();

export const useHomeTheme = () => {
  const ctx = useContext(HomeThemeContext);
  if (!ctx) throw new Error('useHomeTheme must be used within HomeThemeProvider');
  return ctx;
};

const homeTheme = {
  name: 'Home VS Dark',
  colors: {
    bg: '#1e1e1e',
    surface: '#252526',
    border: '#3c3c3c',
    text: '#d4d4d4',
    muted: '#969696',
    accent: '#007acc',
    accentText: '#111827',
    glowBlue: 'rgba(0,122,204,0.15)',
    glowGreen: 'rgba(106,153,85,0.12)'
  }
};

export const HomeThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(homeTheme);

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([k, v]) => {
      root.style.setProperty(`--home-${k}`, v);
    });
  }, [theme]);

  return (
    <HomeThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </HomeThemeContext.Provider>
  );
};
