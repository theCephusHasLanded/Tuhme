import { useState, useEffect } from 'react';
import { MantineProvider } from '@mantine/core';
import { mantineTheme, updateMantineTheme, isLightAccent } from '../theme/mantineTheme';
import colorSchemeManager from '../utils/colorSchemeManager';

// Import Mantine core styles
import '@mantine/core/styles.css';

export function MantineThemeProvider({ children }) {
  const [currentPalette, setCurrentPalette] = useState(colorSchemeManager.getCurrentPalette());
  const [colorScheme, setColorScheme] = useState('dark');
  
  // Update theme when palette changes
  useEffect(() => {
    const unsubscribe = colorSchemeManager.subscribe((newPalette) => {
      setCurrentPalette(newPalette);
      
      // Determine if this palette should use light or dark mode
      const shouldUseLightMode = isLightAccent(newPalette.accent);
      setColorScheme(shouldUseLightMode ? 'light' : 'dark');
    });

    return unsubscribe;
  }, []);

  // Create dynamic theme based on current palette and color scheme
  const dynamicTheme = updateMantineTheme(currentPalette, colorScheme);
  
  // Override theme colors and colorScheme
  const themeWithColorScheme = {
    ...dynamicTheme,
    other: {
      currentPalette,
      isLightMode: colorScheme === 'light',
      toggleColorScheme: (value) => {
        const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
        setColorScheme(nextColorScheme);
      }
    }
  };

  return (
    <MantineProvider 
      theme={{
        ...themeWithColorScheme,
        colorScheme
      }}
      forceColorScheme={colorScheme}
    >
      {children}
    </MantineProvider>
  );
}