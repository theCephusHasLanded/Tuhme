import { createContext, useContext, useEffect, useState } from 'react';

const ThemeSystemContext = createContext();

export const useThemeSystem = () => {
  const context = useContext(ThemeSystemContext);
  if (!context) {
    throw new Error('useThemeSystem must be used within ThemeSystemProvider');
  }
  return context;
};

export const ThemeSystemProvider = ({ children }) => {
  // Initialize theme from localStorage or system preference
  const getInitialTheme = () => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('tuhme-theme');
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    
    // Default to dark
    return 'dark';
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const [isLoading, setIsLoading] = useState(true);

  // Apply theme to document
  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    
    // Remove existing theme attributes
    root.removeAttribute('data-theme');
    
    // Apply new theme
    if (newTheme === 'light') {
      root.setAttribute('data-theme', 'light');
    }
    // Dark theme is default, no attribute needed
    
    // Save to localStorage
    localStorage.setItem('tuhme-theme', newTheme);
    
    // Update state
    setTheme(newTheme);
  };

  // Toggle between themes
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  };

  // Set specific theme
  const setThemeMode = (newTheme) => {
    if (newTheme === 'dark' || newTheme === 'light') {
      applyTheme(newTheme);
    }
  };

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    
    const handleSystemThemeChange = (e) => {
      // Only auto-update if user hasn't manually set a preference
      const savedTheme = localStorage.getItem('tuhme-theme');
      if (!savedTheme) {
        const systemTheme = e.matches ? 'light' : 'dark';
        applyTheme(systemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  // Initialize theme on mount
  useEffect(() => {
    applyTheme(theme);
    setIsLoading(false);
  }, []);

  // Provide theme utilities
  const themeUtils = {
    isDark: theme === 'dark',
    isLight: theme === 'light',
    currentTheme: theme,
    
    // CSS variable getters
    getColor: (colorVar) => {
      return getComputedStyle(document.documentElement).getPropertyValue(colorVar);
    },
    
    // Theme-aware color helpers
    colors: {
      primary: 'var(--text-primary)',
      secondary: 'var(--text-secondary)',
      tertiary: 'var(--text-tertiary)',
      accent: 'var(--accent-primary)',
      background: 'var(--bg-primary)',
      surface: 'var(--bg-surface)',
      border: 'var(--border-primary)',
    },
    
    // Conditional styling
    when: {
      dark: (styles) => theme === 'dark' ? styles : {},
      light: (styles) => theme === 'light' ? styles : {},
    }
  };

  const value = {
    theme,
    toggleTheme,
    setTheme: setThemeMode,
    isLoading,
    ...themeUtils
  };

  // Don't render until theme is initialized to prevent flash
  if (isLoading) {
    return (
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        backgroundColor: theme === 'light' ? '#ffffff' : '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        <div style={{
          color: theme === 'light' ? '#000000' : '#ffffff',
          fontSize: '14px',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <ThemeSystemContext.Provider value={value}>
      {children}
    </ThemeSystemContext.Provider>
  );
};

export default ThemeSystemProvider;