import { useState, useEffect } from 'react';

export const useHourlyTheme = () => {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  // Luxury color palettes that change hourly (matching Hero component)
  const luxuryPalettes = [
    { primary: '#0a0a0a', secondary: '#1a1a1a', accent: '#d4af37', name: 'Midnight Gold' },
    { primary: '#1a0f1a', secondary: '#2a1a2a', accent: '#e6c2a6', name: 'Champagne Dusk' },
    { primary: '#0f1419', secondary: '#1a2129', accent: '#8b9dc3', name: 'Sapphire Night' },
    { primary: '#191414', secondary: '#2a2125', accent: '#dda15e', name: 'Cognac Dream' },
    { primary: '#0d1421', secondary: '#1a2332', accent: '#a8dadc', name: 'Tiffany Dawn' },
    { primary: '#1a1a0f', secondary: '#2a2a1a', accent: '#f1faee', name: 'Pearl Morning' },
    { primary: '#1a0f14', secondary: '#2a1a25', accent: '#ffb3ba', name: 'Rose Aurora' },
    { primary: '#0f1a14', secondary: '#1a2a25', accent: '#c7f9cc', name: 'Emerald Mist' },
    { primary: '#14141a', secondary: '#25252a', accent: '#bde0ff', name: 'Crystal Blue' },
    { primary: '#1a140f', secondary: '#2a251a', accent: '#ffd23f', name: 'Saffron Luxury' },
    { primary: '#141a1a', secondary: '#252a2a', accent: '#a663cc', name: 'Amethyst Elite' },
    { primary: '#1a1914', secondary: '#2a2925', accent: '#ff6b35', name: 'Amber Prestige' },
    { primary: '#0f141a', secondary: '#1a252a', accent: '#4ecdc4', name: 'Turquoise Calm' },
    { primary: '#1a0f0f', secondary: '#2a1a1a', accent: '#ff9a8b', name: 'Coral Sunset' },
    { primary: '#14141a', secondary: '#25252a', accent: '#f8f32b', name: 'Citrine Bright' },
    { primary: '#1a1a14', secondary: '#2a2a25', accent: '#95e1d3', name: 'Mint Elegance' },
    { primary: '#191014', secondary: '#2a1a25', accent: '#f38ba8', name: 'Peony Blush' },
    { primary: '#141a19', secondary: '#252a29', accent: '#74c0fc', name: 'Azure Luxury' },
    { primary: '#1a1414', secondary: '#2a2525', accent: '#ffd43b', name: 'Topaz Glow' },
    { primary: '#0f1a1a', secondary: '#1a2a2a', accent: '#b197fc', name: 'Lavender Dusk' },
    { primary: '#1a190f', secondary: '#2a291a', accent: '#69db7c', name: 'Jade Prosperity' },
    { primary: '#1a0f19', secondary: '#2a1a29', accent: '#ffa8a8', name: 'Blush Elegance' },
    { primary: '#0f1a0f', secondary: '#1a2a1a', accent: '#82c91e', name: 'Peridot Fresh' },
    { primary: '#1a1a1a', secondary: '#2a2a2a', accent: '#d4af37', name: 'Classic Gold' }
  ];

  const currentPalette = luxuryPalettes[currentHour % luxuryPalettes.length];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  // Apply theme to CSS custom properties
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', currentPalette.primary);
    root.style.setProperty('--theme-secondary', currentPalette.secondary);
    root.style.setProperty('--theme-accent', currentPalette.accent);
    root.style.setProperty('--theme-name', currentPalette.name);

    // Set button colors based on theme
    const isLight = currentPalette.primary.includes('f') || currentPalette.accent.includes('f');
    root.style.setProperty('--button-primary-bg', isLight ? '#000000' : '#ffffff');
    root.style.setProperty('--button-primary-text', isLight ? '#ffffff' : '#000000');
    root.style.setProperty('--button-secondary-bg', isLight ? '#ffffff' : '#000000');
    root.style.setProperty('--button-secondary-text', isLight ? '#000000' : '#ffffff');
  }, [currentPalette]);

  return {
    currentPalette,
    currentHour,
    luxuryPalettes
  };
};

export default useHourlyTheme;
