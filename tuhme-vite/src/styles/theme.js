/**
 * TUHME Style System - Modern Black & White Luxury Theme
 * This theme represents a refined and elegant aesthetic based on:
 * - Clean, minimalist black and white principles
 * - Generous negative space for an upscale, gallery-like experience
 * - High contrast elements for clarity and visual impact
 * - Subtle gray accents for depth and dimension
 */

// Core color palette
const colors = {
  // Primary palette
  pureWhite: '#FFFFFF', // Pristine background
  pureBlack: '#000000', // Primary text and critical UI
  accentGray: '#888888', // Subtle accent color
  
  // Secondary palette
  offWhite: '#F8F8F8', // Secondary backgrounds
  charcoal: '#333333', // Secondary text
  lightGray: '#DDDDDD', // Borders and dividers
  
  // UI states
  success: '#000000', // Success indicators (using black)
  error: '#FF3B30', // Error states (minimal red)
  warning: '#000000', // Warning states (using black)
  info: '#000000', // Info states (using black)
  
  // UI/UX Specific
  borderLight: '#EEEEEE', // Light borders
  borderDark: '#000000', // Dark borders
  shadowLight: 'rgba(0, 0, 0, 0.05)', // Subtle shadows
  shadowMedium: 'rgba(0, 0, 0, 0.08)', // Medium shadows
  shadowHeavy: 'rgba(0, 0, 0, 0.12)', // Heavy shadows
  overlay: 'rgba(0, 0, 0, 0.7)', // Modal overlays
};

// Typography system
const typography = {
  // Font families
  primaryFont: "'Montserrat', 'Helvetica Neue', sans-serif", // Changed to Montserrat for luxury feel
  secondaryFont: "'Cormorant Garamond', 'Georgia', serif", // Elegant serif for accents
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
  display: '3.5rem', // 56px - increased for more impact
  
  // Font weights
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,    // Added for headings
  
  // Line heights
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.8,
  
  // Letter spacing
  tighter: '-0.03em', // More dramatic for headings
  tight: '-0.01em',
  normal: '0',
  wide: '0.02em',
  wider: '0.05em',
  widest: '0.12em',
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
  lg: '0.75rem',     // 12px - reduced for more refined look
  xl: '1rem',        // 16px - reduced for more refined look
  circle: '50%',
  pill: '9999px',
  // New refined borderRadius options
  button: '0.375rem', // 6px - specific for buttons
  card: '0.75rem',    // 12px - specific for cards
  input: '0.375rem',  // 6px - specific for inputs
};

// Shadows
const shadows = {
  sm: `0 2px 4px ${colors.shadowLight}`,
  md: `0 4px 12px ${colors.shadowMedium}`,
  lg: `0 8px 24px ${colors.shadowMedium}`,
  xl: `0 16px 32px ${colors.shadowHeavy}`,
  inner: `inset 0 2px 4px ${colors.shadowLight}`,
  none: 'none',
  // New elegant shadows
  card: `0 10px 30px ${colors.shadowMedium}, 0 1px 3px ${colors.shadowLight}`,
  floating: `0 20px 40px ${colors.shadowHeavy}, 0 2px 6px ${colors.shadowMedium}`,
  subtle: `0 2px 10px ${colors.shadowLight}`,
};

// Animation timing
const animation = {
  fast: '200ms',      // Slightly slower for more elegance
  normal: '350ms',    // Slightly slower for more elegance
  slow: '600ms',      // Slightly slower for more elegance
  // More refined easing curves
  easeInOut: 'cubic-bezier(0.165, 0.84, 0.44, 1)', // Refined luxury easing
  easeOut: 'cubic-bezier(0.19, 1, 0.22, 1)',       // Elegant exit
  easeIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)', // Refined entry
  bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Subtle bounce
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

// Component-specific styling
const components = {
  // Button styling
  button: {
    primary: {
      backgroundColor: colors.pureBlack,
      color: colors.pureWhite,
      borderRadius: borderRadius.button,
      fontSize: typography.sm,
      fontWeight: typography.semibold,
      padding: `${spacing.sm} ${spacing.lg}`,
      transition: `all ${animation.normal} ${animation.easeInOut}`,
      boxShadow: shadows.sm,
      hoverState: {
        backgroundColor: colors.charcoal,
        transform: 'translateY(-2px)',
        boxShadow: shadows.md,
      }
    },
    secondary: {
      backgroundColor: 'transparent',
      color: colors.pureBlack,
      borderRadius: borderRadius.button,
      border: `1px solid ${colors.pureBlack}`,
      fontSize: typography.sm,
      fontWeight: typography.semibold,
      padding: `${spacing.sm} ${spacing.lg}`,
      transition: `all ${animation.normal} ${animation.easeInOut}`,
      hoverState: {
        backgroundColor: colors.lightGray,
        transform: 'translateY(-2px)',
      }
    },
  },
  
  // Card styling
  card: {
    backgroundColor: colors.pureWhite,
    borderRadius: borderRadius.card,
    boxShadow: shadows.card,
    padding: spacing.lg,
    transition: `all ${animation.normal} ${animation.easeInOut}`,
    hoverState: {
      boxShadow: shadows.floating,
      transform: 'translateY(-4px)',
    }
  },
  
  // Input styling
  input: {
    backgroundColor: colors.pureWhite,
    borderRadius: borderRadius.input,
    border: `1px solid ${colors.lightGray}`,
    padding: `${spacing.sm} ${spacing.md}`,
    fontSize: typography.sm,
    transition: `all ${animation.fast} ${animation.easeInOut}`,
    focusState: {
      borderColor: colors.pureBlack,
      boxShadow: `0 0 0 2px rgba(0, 0, 0, 0.1)`,
    }
  },
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
  components,
  // Theme name and metadata
  name: 'TUHME Black & White',
  mode: 'light',
  version: '2.0'
};

export default theme;