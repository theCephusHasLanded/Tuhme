import { createTheme } from '@mantine/core';

// Luxury Color Palettes - All 24 from colorSchemeManager
const luxuryPalettes = [
  { primary: '#0a0a0a', secondary: '#1a1a1a', accent: '#ffffff', name: 'midnight-mono', rgb: '255, 255, 255' },
  { primary: '#1a0f1a', secondary: '#2a1a2a', accent: '#e6c2a6', name: 'champagne-dusk', rgb: '230, 194, 166' },
  { primary: '#0f1419', secondary: '#1a2129', accent: '#8b9dc3', name: 'sapphire-night', rgb: '139, 157, 195' },
  { primary: '#191414', secondary: '#2a2125', accent: '#dda15e', name: 'cognac-dream', rgb: '221, 161, 94' },
  { primary: '#0d1421', secondary: '#1a2332', accent: '#a8dadc', name: 'tiffany-dawn', rgb: '168, 218, 220' },
  { primary: '#1a1a0f', secondary: '#2a2a1a', accent: '#f1faee', name: 'pearl-morning', rgb: '241, 250, 238' },
  { primary: '#1a0f14', secondary: '#2a1a25', accent: '#ffb3ba', name: 'rose-aurora', rgb: '255, 179, 186' },
  { primary: '#0f1a14', secondary: '#1a2a25', accent: '#c7f9cc', name: 'emerald-mist', rgb: '199, 249, 204' },
  { primary: '#14141a', secondary: '#25252a', accent: '#bde0ff', name: 'crystal-blue', rgb: '189, 224, 255' },
  { primary: '#1a140f', secondary: '#2a251a', accent: '#ffd23f', name: 'saffron-luxury', rgb: '255, 210, 63' },
  { primary: '#141a1a', secondary: '#252a2a', accent: '#a663cc', name: 'amethyst-elite', rgb: '166, 99, 204' },
  { primary: '#1a1914', secondary: '#2a2925', accent: '#ffffff', name: 'mono-prestige', rgb: '255, 255, 255' },
  { primary: '#0f141a', secondary: '#1a252a', accent: '#4ecdc4', name: 'turquoise-calm', rgb: '78, 205, 196' },
  { primary: '#1a0f0f', secondary: '#2a1a1a', accent: '#e6c2a6', name: 'coral-sunset', rgb: '230, 194, 166' },
  { primary: '#14141a', secondary: '#25252a', accent: '#f8f32b', name: 'citrine-bright', rgb: '248, 243, 43' },
  { primary: '#1a1a14', secondary: '#2a2a25', accent: '#95e1d3', name: 'mint-elegance', rgb: '149, 225, 211' },
  { primary: '#191014', secondary: '#2a1a25', accent: '#f38ba8', name: 'peony-blush', rgb: '243, 139, 168' },
  { primary: '#141a19', secondary: '#252a29', accent: '#74c0fc', name: 'azure-luxury', rgb: '116, 192, 252' },
  { primary: '#1a1414', secondary: '#2a2525', accent: '#ffd43b', name: 'topaz-glow', rgb: '255, 212, 59' },
  { primary: '#0f1a1a', secondary: '#1a2a2a', accent: '#b197fc', name: 'lavender-dusk', rgb: '177, 151, 252' },
  { primary: '#1a190f', secondary: '#2a291a', accent: '#69db7c', name: 'jade-prosperity', rgb: '105, 219, 124' },
  { primary: '#1a0f19', secondary: '#2a1a29', accent: '#f1faee', name: 'blush-elegance', rgb: '241, 250, 238' },
  { primary: '#0f1a0f', secondary: '#1a2a1a', accent: '#82c91e', name: 'peridot-fresh', rgb: '130, 201, 30' },
  { primary: '#1a1a1a', secondary: '#2a2a2a', accent: '#ffffff', name: 'classic-mono', rgb: '255, 255, 255' }
];

// Helper function to get current palette based on hour
const getCurrentPalette = () => {
  const currentHour = new Date().getHours();
  return luxuryPalettes[currentHour % luxuryPalettes.length];
};

// Helper function to determine if accent color is light
const isLightAccent = (accentColor) => {
  const lightAccents = ['#ffffff', '#f1faee', '#c7f9cc', '#bde0ff', '#ffd23f', '#f8f32b', '#95e1d3', '#ffd43b', '#69db7c', '#82c91e'];
  return lightAccents.includes(accentColor);
};

// Helper function to get optimal icon color based on background and theme
const getIconColor = (palette, colorScheme, isButton = false) => {
  const isLight = isLightAccent(palette.accent);
  
  if (isButton) {
    // For buttons, use accent color or appropriate contrast
    return palette.accent;
  }
  
  // For general icons, ensure visibility against background
  if (colorScheme === 'light') {
    return isLight ? '#1a1a1a' : palette.accent;
  } else {
    return isLight ? palette.accent : '#ffffff';
  }
};

// Create dynamic colors based on current palette
const createDynamicColors = (palette) => {
  const isLight = isLightAccent(palette.accent);
  
  return {
    // Brand colors - using accent as primary brand color
    brand: [
      palette.accent,
      palette.accent,
      palette.accent,
      palette.accent,
      palette.accent,
      palette.accent,
      palette.accent,
      palette.accent,
      palette.accent,
      palette.accent
    ],
    
    // Background colors based on palette
    dark: [
      '#ffffff', // lightest (for dark theme text)
      '#f8f9fa',
      '#e9ecef',
      '#dee2e6',
      '#ced4da',
      '#adb5bd',
      '#6c757d',
      palette.secondary, // using secondary from palette
      palette.primary,   // using primary from palette
      '#000000'  // darkest
    ],
    
    // Gray scale with luxury tints
    gray: [
      isLight ? '#f8f9fa' : '#ffffff',
      '#f1f3f4',
      '#e3e5e8',
      '#d2d4d7',
      '#b8bcc2',
      '#9ca3af',
      '#6b7280',
      '#4b5563',
      '#374151',
      '#1f2937'
    ]
  };
};

// Main Mantine theme function that accepts current palette and color scheme
const createMantineTheme = (palette, colorScheme = 'dark') => createTheme({
  colorScheme,
  
  primaryColor: 'brand',
  
  colors: createDynamicColors(palette),
  
  fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontFamilyMonospace: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
  
  headings: {
    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: '600',
    sizes: {
      h1: { fontSize: '2.5rem', lineHeight: '1.2' },
      h2: { fontSize: '2rem', lineHeight: '1.3' },
      h3: { fontSize: '1.75rem', lineHeight: '1.4' },
      h4: { fontSize: '1.5rem', lineHeight: '1.4' },
      h5: { fontSize: '1.25rem', lineHeight: '1.5' },
      h6: { fontSize: '1rem', lineHeight: '1.5' }
    }
  },
  
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem'
  },
  
  radius: {
    xs: '0.125rem',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem'
  },
  
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  
  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.12)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    md: '0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)',
    lg: '0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10)',
    xl: '0 15px 25px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.05)'
  },
  
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em'
  },
  
  // Component default props and styles
  components: {
    Button: {
      defaultProps: {
        size: 'md',
        radius: 'md'
      },
      styles: (theme, params) => {
        const currentPalette = palette;
        const isLight = isLightAccent(currentPalette.accent);
        
        return {
          root: {
            fontWeight: 600,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            backdropFilter: 'blur(12px)',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            
            // Luxury shimmer effect
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: `linear-gradient(90deg, transparent, rgba(${currentPalette.rgb}, 0.2), transparent)`,
              transition: 'left 0.6s',
              zIndex: 1
            },
            
            '&:hover::before': {
              left: '100%'
            },
            
            // Icon color inheritance and animations
            '& .tabler-icon, & svg': {
              color: 'inherit !important',
              fill: 'currentColor',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            },
            
            '&[data-variant="filled"]': {
              backgroundColor: currentPalette.accent,
              color: isLight ? '#000000' : '#ffffff',
              border: 'none',
              
              '&:hover': {
                backgroundColor: currentPalette.accent,
                opacity: 0.9,
                transform: 'translateY(-2px) scale(1.02)',
                boxShadow: `0 12px 35px rgba(${currentPalette.rgb}, 0.4), 0 0 20px rgba(${currentPalette.rgb}, 0.2)`
              },
              
              '&:active': {
                transform: 'translateY(0px)',
                boxShadow: `0 4px 15px rgba(${currentPalette.rgb}, 0.2)`
              }
            },
            
            '&[data-variant="outline"]': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: `2px solid ${currentPalette.accent}`,
              color: currentPalette.accent,
              
              '&:hover': {
                backgroundColor: currentPalette.accent,
                color: isLight ? '#000000' : '#ffffff',
                transform: 'translateY(-2px) scale(1.01)',
                borderColor: currentPalette.accent,
                boxShadow: `0 8px 25px rgba(${currentPalette.rgb}, 0.3)`
              }
            },
            
            '&[data-variant="subtle"]': {
              backgroundColor: `rgba(${currentPalette.rgb}, 0.1)`,
              color: currentPalette.accent,
              border: 'none',
              
              '&:hover': {
                backgroundColor: `rgba(${currentPalette.rgb}, 0.2)`,
                transform: 'translateY(-1px) scale(1.01)',
                boxShadow: `0 4px 15px rgba(${currentPalette.rgb}, 0.2)`
              }
            },
            
            // ActionIcon specific styles for navbar icons
            '&[data-variant="default"]': {
              backgroundColor: 'transparent',
              color: getIconColor(currentPalette, colorScheme, true),
              border: 'none',
              
              '&:hover': {
                backgroundColor: `rgba(${currentPalette.rgb}, 0.15)`,
                color: currentPalette.accent
              }
            }
          }
        };
      }
    },
    
    Modal: {
      defaultProps: {
        centered: true,
        overlayProps: {
          backgroundOpacity: 0.75,
          blur: 8
        }
      },
      styles: (theme) => {
        const currentPalette = palette;
        const isLight = isLightAccent(currentPalette.accent);
        
        return {
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(12px)'
          },
          content: {
            backgroundColor: currentPalette.secondary,
            border: `1px solid rgba(${currentPalette.rgb}, 0.3)`,
            borderRadius: theme.radius.xl,
            boxShadow: `0 25px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(${currentPalette.rgb}, 0.2)`,
            backdropFilter: 'blur(20px)',
            overflow: 'hidden',
            position: 'relative',
            
            // Luxury gradient overlay
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: `linear-gradient(90deg, transparent 0%, ${currentPalette.accent} 50%, transparent 100%)`,
              opacity: 0.8
            }
          },
          header: {
            backgroundColor: 'transparent',
            borderBottom: `1px solid rgba(${currentPalette.rgb}, 0.15)`,
            color: currentPalette.accent,
            padding: theme.spacing.xl,
            fontWeight: 600,
            fontSize: theme.fontSizes.lg
          },
          body: {
            color: '#ffffff',
            backgroundColor: 'transparent',
            padding: theme.spacing.xl
          },
          close: {
            color: currentPalette.accent,
            backgroundColor: 'transparent',
            border: 'none',
            
            '&:hover': {
              backgroundColor: `rgba(${currentPalette.rgb}, 0.15)`,
              color: isLight ? '#000000' : '#ffffff'
            }
          }
        };
      }
    },
    
    ActionIcon: {
      styles: (theme, params) => {
        const currentPalette = palette;
        
        return {
          root: {
            color: getIconColor(currentPalette, colorScheme, true),
            backgroundColor: 'transparent',
            border: 'none',
            transition: 'all 0.2s ease',
            
            // Ensure icons inherit color properly
            '& .tabler-icon, & svg': {
              color: 'inherit !important',
              fill: 'currentColor'
            },
            
            '&[data-variant="subtle"]': {
              backgroundColor: 'transparent',
              color: getIconColor(currentPalette, colorScheme, true),
              
              '&:hover': {
                backgroundColor: `rgba(${currentPalette.rgb}, 0.15)`,
                color: currentPalette.accent,
                transform: 'scale(1.05)'
              }
            },
            
            '&[data-variant="filled"]': {
              backgroundColor: currentPalette.accent,
              color: isLightAccent(currentPalette.accent) ? '#000000' : '#ffffff',
              
              '&:hover': {
                backgroundColor: currentPalette.accent,
                opacity: 0.9,
                transform: 'scale(1.05)'
              }
            }
          }
        };
      }
    },
    
    Paper: {
      styles: (theme) => {
        const currentPalette = palette;
        
        return {
          root: {
            backgroundColor: `rgba(${currentPalette.rgb}, 0.05)`,
            border: `1px solid rgba(${currentPalette.rgb}, 0.1)`,
            backdropFilter: 'blur(12px)',
            transition: 'all 0.3s ease'
          }
        };
      }
    },
    
    AppShell: {
      styles: (theme) => {
        const currentPalette = palette;
        
        return {
          root: {
            backgroundColor: currentPalette.primary
          },
          header: {
            backgroundColor: currentPalette.secondary,
            borderBottom: `1px solid rgba(${currentPalette.rgb}, 0.2)`,
            backdropFilter: 'blur(12px)'
          },
          navbar: {
            backgroundColor: currentPalette.secondary,
            borderRight: `1px solid rgba(${currentPalette.rgb}, 0.2)`,
            backdropFilter: 'blur(12px)'
          },
          main: {
            backgroundColor: currentPalette.primary
          }
        };
      }
    },
    
    TextInput: {
      styles: (theme) => {
        const currentPalette = palette;
        
        return {
          input: {
            backgroundColor: `rgba(${currentPalette.rgb}, 0.05)`,
            border: `1px solid rgba(${currentPalette.rgb}, 0.2)`,
            color: '#ffffff',
            
            '&:focus': {
              borderColor: currentPalette.accent,
              boxShadow: `0 0 0 2px rgba(${currentPalette.rgb}, 0.2)`
            },
            
            '&::placeholder': {
              color: 'rgba(255, 255, 255, 0.6)'
            }
          },
          label: {
            color: currentPalette.accent,
            fontWeight: 500
          }
        };
      }
    },
    
    Card: {
      styles: (theme) => {
        const currentPalette = palette;
        
        return {
          root: {
            backgroundColor: `rgba(${currentPalette.rgb}, 0.05)`,
            border: `1px solid rgba(${currentPalette.rgb}, 0.1)`,
            backdropFilter: 'blur(12px)',
            transition: 'all 0.3s ease',
            
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: `0 15px 35px rgba(${currentPalette.rgb}, 0.2)`,
              borderColor: `rgba(${currentPalette.rgb}, 0.3)`
            }
          }
        };
      }
    }
  }
});

// Default theme for backward compatibility
export const mantineTheme = createMantineTheme(getCurrentPalette());

// Function to create theme with specific palette and color scheme
export const updateMantineTheme = (palette, colorScheme = 'dark') => {
  return createMantineTheme(palette, colorScheme);
};

// Export utility functions
export { luxuryPalettes, getCurrentPalette, isLightAccent, createDynamicColors, getIconColor };