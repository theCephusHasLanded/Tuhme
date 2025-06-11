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
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('tuhme-theme');
    if (saved) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    localStorage.setItem('tuhme-theme', JSON.stringify(isDarkMode));
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsTransitioning(true);
    setIsDarkMode(!isDarkMode);
    
    // Remove transition class after animation completes
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const value = {
    isDarkMode,
    toggleTheme,
    isTransitioning,
    theme: isDarkMode ? 'dark' : 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className={`theme-container ${isTransitioning ? 'theme-transitioning' : ''}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;