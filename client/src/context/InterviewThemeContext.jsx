import { createContext, useContext, useState, useEffect } from 'react';

const InterviewThemeContext = createContext();

export const useInterviewTheme = () => {
  const context = useContext(InterviewThemeContext);
  if (!context) {
    throw new Error('useInterviewTheme must be used within an InterviewThemeProvider');
  }
  return context;
};

// Professional interview themes
const themes = {
  'vs-dark-inspired': {
    name: 'VS Dark Inspired',
    colors: {
      primary: '#007acc',
      secondary: '#6a9955',
      background: '#1e1e1e',
      surface: '#252526',
      border: '#3c3c3c',
      text: '#cccccc',
      textSecondary: '#969696',
      accent: '#007acc',
      success: '#4ec9b0',
      warning: '#dcdcaa',
      error: '#f44747',
      codeBg: '#1e1e1e',
      codeText: '#d4d4d4',
      chatBg: '#252526',
      chatUser: '#007acc',
      chatAI: '#6a9955'
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
    }
  },
  'interview-dark': {
    name: 'Interview Dark',
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      background: '#0f172a',
      surface: '#1e293b',
      border: '#334155',
      text: '#f1f5f9',
      textSecondary: '#94a3b8',
      accent: '#3b82f6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      codeBg: '#1e293b',
      codeText: '#e2e8f0',
      chatBg: '#1e293b',
      chatUser: '#3b82f6',
      chatAI: '#64748b'
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    }
  },
  'interview-light': {
    name: 'Interview Light',
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      background: '#ffffff',
      surface: '#f8fafc',
      border: '#e2e8f0',
      text: '#1e293b',
      textSecondary: '#64748b',
      accent: '#3b82f6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      codeBg: '#f1f5f9',
      codeText: '#1e293b',
      chatBg: '#f8fafc',
      chatUser: '#3b82f6',
      chatAI: '#64748b'
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    }
  }
};

export const InterviewThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('interview-theme');
    return saved && themes[saved] ? saved : 'vs-dark-inspired';
  });

  const [systemTheme, setSystemTheme] = useState('dark');

  useEffect(() => {
    localStorage.setItem('interview-theme', currentTheme);
    
    // Apply theme to document for CSS variables
    const theme = themes[currentTheme];
    Object.entries(theme.colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--interview-${key}`, value);
    });
  }, [currentTheme]);

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
    setCurrentTheme(prev => 
      prev === 'vs-dark-inspired' ? 'interview-dark' : 'vs-dark-inspired'
    );
  };

  const setSystemThemeMode = () => {
    setCurrentTheme(systemTheme === 'dark' ? 'vs-dark-inspired' : 'interview-light');
  };

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    themes: Object.keys(themes),
    setTheme: setCurrentTheme,
    toggleTheme,
    setSystemThemeMode,
    systemTheme
  };

  return (
    <InterviewThemeContext.Provider value={value}>
      {children}
    </InterviewThemeContext.Provider>
  );
};
