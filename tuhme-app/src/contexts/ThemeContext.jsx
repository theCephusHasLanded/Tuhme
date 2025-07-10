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
  // Force perpetual dark mode
  const [isDarkMode] = useState(true);
  const [isTransitioning] = useState(false);

  useEffect(() => {
    // Always set to dark mode
    document.documentElement.setAttribute('data-theme', 'dark');
    // Remove any stored theme preference
    localStorage.removeItem('tuhme-theme');
  }, []);

  // Disabled toggle function
  const toggleTheme = () => {
    // No-op - theme switching disabled
    console.log('Theme switching disabled - app is in perpetual dark mode');
  };

  const value = {
    isDarkMode: true,
    toggleTheme,
    isTransitioning: false,
    theme: 'dark'
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