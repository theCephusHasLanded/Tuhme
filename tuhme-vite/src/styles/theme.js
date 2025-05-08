/**
 * TUHME Style System - Neo-Scandinavian with Retro Jamaican Golf Culture
 * This theme represents a complete overhaul of the brand aesthetic based on:
 * - Clean, minimalist principles with ample negative space
 * - Subtle 80s Jamaican golf culture accents
 * - Art gallery exhibition framework sensibilities
 */

// Core color palette
const colors = {
  // Primary palette
  galleryWhite: '#FAFAFA', // Main background
  carbonBlack: '#121212', // Primary text and critical UI
  jamaicanGreen: '#00855B', // Primary accent color
  
  // Secondary palette
  vintageTeal: '#1A8C94', // Membership tier indicators
  palmCoral: '#FF6C5C', // Action buttons and notifications
  sandBeige: '#E6DCC8', // Secondary backgrounds and cards
  
  // Tertiary accents
  golfGold: '#D4AF37', // Premium membership indicators
  reggaeRed: '#BC3F41', // Limited availability indicators
  islandSkyBlue: '#AAD6E6', // Feedback section highlights
  
  // UI/UX Specific
  borderLight: '#EEE9E2', // Light borders
  borderDark: '#2C2C2C', // Dark borders
  shadowLight: 'rgba(0, 0, 0, 0.05)', // Subtle shadows
  shadowMedium: 'rgba(0, 0, 0, 0.1)', // Medium shadows
  shadowHeavy: 'rgba(0, 0, 0, 0.2)', // Heavy shadows
  overlay: 'rgba(18, 18, 18, 0.7)', // Modal overlays
};

// Typography system
const typography = {
  // Font families
  primaryFont: "'Neue Haas Grotesk', 'Aktiv Grotesk', 'Helvetica Neue', sans-serif",
  secondaryFont: "'Canela Text', 'Georgia', serif",
  monoFont: "'IBM Plex Mono', monospace",
  
  // Font sizes (in rem for accessibility)
  xxs: '0.75rem',    // 12px
  xs: '0.875rem',    // 14px
  sm: '1rem',        // 16px - body
  md: '1.125rem',    // 18px
  lg: '1.25rem',     // 20px
  xl: '1.5rem',      // 24px
  xxl: '2rem',       // 32px
  xxxl: '2.5rem',    // 40px
  display: '3rem',   // 48px
  
  // Font weights
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  
  // Line heights
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.8,
  
  // Letter spacing
  tighter: '-0.02em',
  tight: '-0.01em',
  normal: '0',
  wide: '0.02em',
  wider: '0.05em',
  widest: '0.15em',
};

// Spacing system (in rem for accessibility)
const spacing = {
  xxs: '0.25rem',   // 4px
  xs: '0.5rem',     // 8px
  sm: '0.75rem',    // 12px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  xxl: '3rem',      // 48px
  xxxl: '4rem',     // 64px
};

// Border radii
const borderRadius = {
  none: '0',
  sm: '0.25rem',     // 4px
  md: '0.5rem',      // 8px
  lg: '1rem',        // 16px
  xl: '1.5rem',      // 24px
  circle: '50%',
  pill: '9999px',
};

// Shadows
const shadows = {
  sm: `0 2px 4px ${colors.shadowLight}`,
  md: `0 4px 8px ${colors.shadowMedium}`,
  lg: `0 8px 16px ${colors.shadowMedium}`,
  xl: `0 12px 24px ${colors.shadowHeavy}`,
  inner: `inset 0 2px 4px ${colors.shadowLight}`,
  none: 'none',
};

// Animation timing
const animation = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  easeInOut: 'cubic-bezier(0.19, 1, 0.22, 1)', // Custom easing
  easeOut: 'cubic-bezier(0.33, 1, 0.68, 1)',
  easeIn: 'cubic-bezier(0.32, 0, 0.67, 0)',
};

// Breakpoints for responsive design (in px)
const breakpoints = {
  xs: 480,
  sm: 768,
  md: 1024,
  lg: 1440,
  xl: 1920,
};

// Z-index system
const zIndex = {
  hide: -1,
  base: 0,
  raised: 1,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  popover: 1400,
  toast: 1500,
  tooltip: 1600,
};

// Export the theme object
const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animation,
  breakpoints,
  zIndex,
};

export default theme;