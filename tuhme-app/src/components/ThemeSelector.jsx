import React, { useState, useEffect } from 'react';
import './ThemeSelector.css';

const ThemeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('auto');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Color scheme definitions with light/dark variants for each luxury theme
  const colorSchemes = {
    auto: { name: 'Auto', description: 'System preference' },
    'midnight-gold-dark': { 
      name: 'Midnight Gold', 
      mode: 'dark',
      primary: '#0a0a0a', 
      secondary: '#1a1a1a', 
      accent: '#d4af37',
      description: 'Deep black with gold accents'
    },
    'midnight-gold-light': { 
      name: 'Midnight Gold', 
      mode: 'light',
      primary: '#f8f6f0', 
      secondary: '#f0ede5', 
      accent: '#d4af37',
      description: 'Cream with gold accents'
    },
    'champagne-dusk-dark': { 
      name: 'Champagne Dusk', 
      mode: 'dark',
      primary: '#1a0f1a', 
      secondary: '#2a1a2a', 
      accent: '#e6c2a6',
      description: 'Purple tones with champagne'
    },
    'champagne-dusk-light': { 
      name: 'Champagne Dusk', 
      mode: 'light',
      primary: '#f5f0f5', 
      secondary: '#ede5ed', 
      accent: '#e6c2a6',
      description: 'Light lavender with champagne'
    },
    'sapphire-night-dark': { 
      name: 'Sapphire Night', 
      mode: 'dark',
      primary: '#0f1419', 
      secondary: '#1a2129', 
      accent: '#8b9dc3',
      description: 'Deep blue with sapphire accents'
    },
    'sapphire-night-light': { 
      name: 'Sapphire Night', 
      mode: 'light',
      primary: '#f0f4f9', 
      secondary: '#e5ebf1', 
      accent: '#8b9dc3',
      description: 'Sky blue with sapphire accents'
    },
    'cognac-dream-dark': { 
      name: 'Cognac Dream', 
      mode: 'dark',
      primary: '#191414', 
      secondary: '#2a2125', 
      accent: '#dda15e',
      description: 'Rich brown with cognac highlights'
    },
    'cognac-dream-light': { 
      name: 'Cognac Dream', 
      mode: 'light',
      primary: '#f9f4f4', 
      secondary: '#f0e5e0', 
      accent: '#dda15e',
      description: 'Warm beige with cognac highlights'
    },
    'tiffany-dawn-dark': { 
      name: 'Tiffany Dawn', 
      mode: 'dark',
      primary: '#0d1421', 
      secondary: '#1a2332', 
      accent: '#a8dadc',
      description: 'Navy with tiffany blue'
    },
    'tiffany-dawn-light': { 
      name: 'Tiffany Dawn', 
      mode: 'light',
      primary: '#f0f9fa', 
      secondary: '#e5f3f5', 
      accent: '#a8dadc',
      description: 'Mint with tiffany blue'
    }
  };

  // Detect system dark mode preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme to CSS variables
  const applyTheme = (themeKey) => {
    const root = document.documentElement;
    const scheme = colorSchemes[themeKey];

    if (themeKey === 'auto') {
      // Remove custom colors, use system preference
      root.removeAttribute('data-theme');
      root.style.removeProperty('--theme-primary');
      root.style.removeProperty('--theme-secondary');
      root.style.removeProperty('--theme-accent');
      root.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    } else {
      // Custom luxury theme
      const themeMode = scheme.mode || 'dark';
      root.setAttribute('data-theme', themeMode === 'light' ? 'luxury-light' : 'luxury-dark');
      root.style.setProperty('--theme-primary', scheme.primary);
      root.style.setProperty('--theme-secondary', scheme.secondary);
      root.style.setProperty('--theme-accent', scheme.accent);
      
      // Set comprehensive theme variables based on mode
      if (themeMode === 'light') {
        root.style.setProperty('--bg-primary', scheme.primary);
        root.style.setProperty('--bg-secondary', scheme.secondary);
        root.style.setProperty('--bg-luxury', scheme.secondary);
        root.style.setProperty('--text-primary', '#1a1a1a');
        root.style.setProperty('--text-secondary', '#666666');
        root.style.setProperty('--color-primary-600', scheme.accent);
        root.style.setProperty('--color-accent-500', scheme.accent);
      } else {
        root.style.setProperty('--bg-primary', scheme.primary);
        root.style.setProperty('--bg-secondary', scheme.secondary);
        root.style.setProperty('--bg-luxury', scheme.secondary);
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#cccccc');
        root.style.setProperty('--color-primary-600', scheme.accent);
        root.style.setProperty('--color-accent-500', scheme.accent);
      }
    }
  };

  // Load saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-preference') || 'auto';
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, [isDarkMode]);

  const handleThemeChange = (themeKey) => {
    setCurrentTheme(themeKey);
    localStorage.setItem('theme-preference', themeKey);
    applyTheme(themeKey);
    setIsOpen(false);
  };

  const getCurrentThemeDisplay = () => {
    const scheme = colorSchemes[currentTheme];
    if (currentTheme === 'auto') return 'Auto';
    return scheme?.name ? `${scheme.name} (${scheme.mode === 'light' ? 'Light' : 'Dark'})` : 'Auto';
  };

  return (
    <div className="theme-selector">
      <button 
        className="theme-selector-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select theme"
      >
        <span className="theme-icon">🎨</span>
        <span className="theme-name">{getCurrentThemeDisplay()}</span>
        <span className={`chevron ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <>
          <div className="theme-selector-overlay" onClick={() => setIsOpen(false)} />
          <div className="theme-selector-dropdown">
            <div className="theme-selector-header">
              <h3>Choose Theme</h3>
              <p>Select your preferred color scheme</p>
            </div>

            <div className="theme-options">
              {/* System Options */}
              <div className="theme-category">
                <h4>System</h4>
                <button
                  className={`theme-option ${currentTheme === 'auto' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('auto')}
                >
                  <div className="theme-preview">
                    <div className="preview-auto">🔄</div>
                  </div>
                  <div className="theme-info">
                    <div className="theme-name">Auto</div>
                    <div className="theme-description">System preference</div>
                  </div>
                  {currentTheme === 'auto' && (
                    <div className="theme-check">✓</div>
                  )}
                </button>
              </div>

              {/* Luxury Color Schemes */}
              <div className="theme-category">
                <h4>Luxury Themes</h4>
                {(() => {
                  // Group themes by base name
                  const themeGroups = {};
                  Object.entries(colorSchemes)
                    .filter(([key]) => key !== 'auto')
                    .forEach(([key, scheme]) => {
                      if (!themeGroups[scheme.name]) {
                        themeGroups[scheme.name] = [];
                      }
                      themeGroups[scheme.name].push({ key, scheme });
                    });

                  return Object.entries(themeGroups).map(([themeName, variants]) => (
                    <div key={themeName} className="theme-group">
                      <div className="theme-group-name">{themeName}</div>
                      <div className="theme-variants">
                        {variants.map(({ key, scheme }) => (
                          <button
                            key={key}
                            className={`theme-variant ${currentTheme === key ? 'active' : ''}`}
                            onClick={() => handleThemeChange(key)}
                            title={scheme.description}
                          >
                            <div className="variant-preview">
                              <div 
                                className="color-swatch"
                                style={{ backgroundColor: scheme.accent }}
                              />
                            </div>
                            <div className="variant-mode">
                              {scheme.mode === 'light' ? '☀️' : '🌙'}
                            </div>
                            {currentTheme === key && (
                              <div className="variant-check">✓</div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSelector;
