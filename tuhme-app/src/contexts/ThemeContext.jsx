import { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Force dark mode as the only theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.classList.add('dark-theme');
    // Remove any light theme classes
    document.body.classList.remove('light-theme');
    // Clean up any old localStorage theme preferences
    localStorage.removeItem('tuhme-theme');
  }, []);

  const value = {
    isDarkMode: true,
    theme: 'dark',
    // Keep these for backward compatibility but they do nothing
    toggleTheme: () => {},
    isTransitioning: false
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className="theme-container dark-theme">
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;