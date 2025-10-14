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
  const [theme, setTheme] = useState('dark');
  const [accentColor, setAccentColor] = useState('#6366f1');

  const themes = {
    dark: {
      primary: '#0f0f23',
      secondary: '#1a1a2e',
      tertiary: '#16213e',
      text: '#ffffff',
      textSecondary: '#a1a1aa',
      accent: accentColor,
      background: '#0f0f23',
      surface: '#1a1a2e',
      border: '#374151',
      shadow: 'rgba(0, 0, 0, 0.3)',
    },
    light: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#e2e8f0',
      text: '#1a202c',
      textSecondary: '#4a5568',
      accent: accentColor,
      background: '#ffffff',
      surface: '#f8fafc',
      border: '#e2e8f0',
      shadow: 'rgba(0, 0, 0, 0.1)',
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const changeAccentColor = (color) => {
    setAccentColor(color);
  };

  const currentTheme = themes[theme];

  useEffect(() => {
    document.documentElement.style.setProperty('--primary', currentTheme.primary);
    document.documentElement.style.setProperty('--secondary', currentTheme.secondary);
    document.documentElement.style.setProperty('--tertiary', currentTheme.tertiary);
    document.documentElement.style.setProperty('--text', currentTheme.text);
    document.documentElement.style.setProperty('--text-secondary', currentTheme.textSecondary);
    document.documentElement.style.setProperty('--accent', currentTheme.accent);
    document.documentElement.style.setProperty('--background', currentTheme.background);
    document.documentElement.style.setProperty('--surface', currentTheme.surface);
    document.documentElement.style.setProperty('--border', currentTheme.border);
    document.documentElement.style.setProperty('--shadow', currentTheme.shadow);
  }, [currentTheme]);

  const value = {
    theme,
    currentTheme,
    toggleTheme,
    changeAccentColor,
    accentColor,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
