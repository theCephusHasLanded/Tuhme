import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combine class names with proper Tailwind CSS merging
 * Resolves conflicts intelligently
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Dynamic color scheme utilities for the 24 luxury palettes
 */
export const LUXURY_PALETTES = {
  'midnight-mono': {
    primary: 'rgb(10, 10, 10)',
    secondary: 'rgb(26, 26, 26)',
    accent: 'rgb(255, 255, 255)',
    accentRgb: '255, 255, 255',
  },
  'champagne-dusk': {
    primary: 'rgb(26, 15, 26)',
    secondary: 'rgb(42, 26, 42)',
    accent: 'rgb(230, 194, 166)',
    accentRgb: '230, 194, 166',
  },
  'sapphire-night': {
    primary: 'rgb(15, 20, 25)',
    secondary: 'rgb(26, 33, 41)',
    accent: 'rgb(139, 157, 195)',
    accentRgb: '139, 157, 195',
  },
  'cognac-dream': {
    primary: 'rgb(25, 20, 20)',
    secondary: 'rgb(42, 33, 37)',
    accent: 'rgb(221, 161, 94)',
    accentRgb: '221, 161, 94',
  },
  'tiffany-dawn': {
    primary: 'rgb(13, 20, 33)',
    secondary: 'rgb(26, 35, 50)',
    accent: 'rgb(168, 218, 220)',
    accentRgb: '168, 218, 220',
  },
  'pearl-morning': {
    primary: 'rgb(26, 26, 15)',
    secondary: 'rgb(42, 42, 26)',
    accent: 'rgb(241, 250, 238)',
    accentRgb: '241, 250, 238',
  },
  'rose-aurora': {
    primary: 'rgb(26, 15, 20)',
    secondary: 'rgb(42, 26, 37)',
    accent: 'rgb(255, 179, 186)',
    accentRgb: '255, 179, 186',
  },
  'emerald-mist': {
    primary: 'rgb(15, 26, 20)',
    secondary: 'rgb(26, 42, 37)',
    accent: 'rgb(199, 249, 204)',
    accentRgb: '199, 249, 204',
  },
  'crystal-blue': {
    primary: 'rgb(20, 20, 26)',
    secondary: 'rgb(37, 37, 42)',
    accent: 'rgb(189, 224, 255)',
    accentRgb: '189, 224, 255',
  },
  'saffron-luxury': {
    primary: 'rgb(26, 20, 15)',
    secondary: 'rgb(42, 37, 26)',
    accent: 'rgb(255, 210, 63)',
    accentRgb: '255, 210, 63',
  },
  'amethyst-elite': {
    primary: 'rgb(20, 26, 26)',
    secondary: 'rgb(37, 42, 42)',
    accent: 'rgb(166, 99, 204)',
    accentRgb: '166, 99, 204',
  },
  'mono-prestige': {
    primary: 'rgb(26, 25, 20)',
    secondary: 'rgb(42, 41, 37)',
    accent: 'rgb(255, 255, 255)',
    accentRgb: '255, 255, 255',
  },
  'turquoise-calm': {
    primary: 'rgb(15, 20, 26)',
    secondary: 'rgb(26, 37, 42)',
    accent: 'rgb(78, 205, 196)',
    accentRgb: '78, 205, 196',
  },
  'coral-sunset': {
    primary: 'rgb(26, 15, 15)',
    secondary: 'rgb(42, 26, 26)',
    accent: 'rgb(230, 194, 166)',
    accentRgb: '230, 194, 166',
  },
  'citrine-bright': {
    primary: 'rgb(20, 20, 26)',
    secondary: 'rgb(37, 37, 42)',
    accent: 'rgb(248, 243, 43)',
    accentRgb: '248, 243, 43',
  },
  'mint-elegance': {
    primary: 'rgb(26, 26, 20)',
    secondary: 'rgb(42, 42, 37)',
    accent: 'rgb(149, 225, 211)',
    accentRgb: '149, 225, 211',
  },
  'peony-blush': {
    primary: 'rgb(25, 16, 20)',
    secondary: 'rgb(42, 26, 37)',
    accent: 'rgb(243, 139, 168)',
    accentRgb: '243, 139, 168',
  },
  'azure-luxury': {
    primary: 'rgb(20, 26, 25)',
    secondary: 'rgb(37, 42, 41)',
    accent: 'rgb(116, 192, 252)',
    accentRgb: '116, 192, 252',
  },
  'topaz-glow': {
    primary: 'rgb(26, 20, 20)',
    secondary: 'rgb(42, 37, 37)',
    accent: 'rgb(255, 212, 59)',
    accentRgb: '255, 212, 59',
  },
  'lavender-dusk': {
    primary: 'rgb(15, 26, 26)',
    secondary: 'rgb(26, 42, 42)',
    accent: 'rgb(177, 151, 252)',
    accentRgb: '177, 151, 252',
  },
  'jade-prosperity': {
    primary: 'rgb(26, 25, 15)',
    secondary: 'rgb(42, 41, 26)',
    accent: 'rgb(105, 219, 124)',
    accentRgb: '105, 219, 124',
  },
  'blush-elegance': {
    primary: 'rgb(26, 15, 25)',
    secondary: 'rgb(42, 26, 41)',
    accent: 'rgb(241, 250, 238)',
    accentRgb: '241, 250, 238',
  },
  'peridot-fresh': {
    primary: 'rgb(15, 26, 15)',
    secondary: 'rgb(26, 42, 26)',
    accent: 'rgb(130, 201, 30)',
    accentRgb: '130, 201, 30',
  },
  'classic-mono': {
    primary: 'rgb(26, 26, 26)',
    secondary: 'rgb(42, 42, 42)',
    accent: 'rgb(255, 255, 255)',
    accentRgb: '255, 255, 255',
  },
}

/**
 * Get Tailwind classes for a specific palette
 */
export function getPaletteClasses(paletteName) {
  const palette = LUXURY_PALETTES[paletteName]
  if (!palette) return {}

  return {
    primary: `bg-[${palette.primary}]`,
    secondary: `bg-[${palette.secondary}]`,
    accent: `text-[${palette.accent}]`,
    accentBg: `bg-[${palette.accent}]`,
    gradient: `bg-gradient-to-br from-[${palette.primary}] to-[${palette.secondary}]`,
  }
}

/**
 * Apply dynamic CSS custom properties for palette
 */
export function applyPalette(paletteName) {
  const palette = LUXURY_PALETTES[paletteName]
  if (!palette) return

  const root = document.documentElement
  root.style.setProperty('--global-primary', palette.primary)
  root.style.setProperty('--global-secondary', palette.secondary)
  root.style.setProperty('--global-accent', palette.accent)
  root.style.setProperty('--global-accent-rgb', palette.accentRgb)
  root.setAttribute('data-global-palette', paletteName)
}

/**
 * Button style utilities with WCAG compliance
 */
export const buttonStyles = {
  primary: cn(
    'btn-luxury-primary',
    'inline-flex items-center justify-center',
    'px-6 py-3 text-sm font-semibold',
    'rounded-luxury transition-all duration-300',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  ),
  secondary: cn(
    'btn-luxury-secondary',
    'inline-flex items-center justify-center',
    'px-6 py-3 text-sm font-semibold',
    'rounded-luxury transition-all duration-300',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  ),
  ghost: cn(
    'inline-flex items-center justify-center',
    'px-6 py-3 text-sm font-semibold text-white/90',
    'rounded-luxury transition-all duration-300',
    'hover:bg-white/10 hover:text-white',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  ),
  icon: cn(
    'inline-flex items-center justify-center',
    'w-11 h-11 rounded-luxury',
    'glass-luxury transition-all duration-300',
    'hover:scale-105 hover:bg-white/20',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  ),
}

/**
 * Card component styles
 */
export const cardStyles = {
  base: cn(
    'glass-luxury rounded-luxury-lg p-6',
    'transition-all duration-300',
    'hover:scale-[1.02] hover:shadow-luxury-xl'
  ),
  pricing: cn(
    'glass-luxury rounded-luxury-xl p-8',
    'transition-all duration-500',
    'hover:scale-105 hover:shadow-luxury-2xl hover:z-10',
    'border border-white/20'
  ),
  testimonial: cn(
    'glass-luxury rounded-luxury-lg p-6',
    'transition-all duration-300',
    'hover:shadow-luxury-lg'
  ),
}

/**
 * Text styles with proper contrast
 */
export const textStyles = {
  hero: cn(
    'text-display-lg font-bold text-white',
    'text-glow-white animate-glow-pulse'
  ),
  title: cn(
    'text-3xl md:text-4xl font-bold text-white',
    'text-glow-white'
  ),
  subtitle: cn(
    'text-lg text-white/80',
    'leading-relaxed'
  ),
  body: cn(
    'text-base text-white/70',
    'leading-relaxed'
  ),
  accent: cn(
    'font-semibold text-luxury-gold-light',
    'text-glow-gold'
  ),
}

/**
 * Layout utilities
 */
export const layoutStyles = {
  container: cn(
    'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
  ),
  section: cn(
    'py-16 md:py-24'
  ),
  grid: cn(
    'grid gap-6 md:gap-8'
  ),
  flexCenter: cn(
    'flex items-center justify-center'
  ),
  flexBetween: cn(
    'flex items-center justify-between'
  ),
}

/**
 * Animation utilities
 */
export const animationStyles = {
  fadeIn: cn(
    'animate-fade-in'
  ),
  slideUp: cn(
    'animate-slide-up'
  ),
  scaleIn: cn(
    'animate-scale-in'
  ),
  float: cn(
    'animate-luxury-float'
  ),
}