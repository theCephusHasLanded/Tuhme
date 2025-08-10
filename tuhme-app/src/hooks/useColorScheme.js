import { useState, useEffect, useCallback } from 'react'
import { LUXURY_PALETTES, applyPalette } from '../utils/classNames'

/**
 * Custom hook for managing TUHME's sophisticated color scheme system
 * Preserves the existing 24-palette luxury system while integrating with Tailwind
 */
export const useColorScheme = () => {
  const [currentPalette, setCurrentPalette] = useState('midnight-mono')
  const [theme, setTheme] = useState('dark') // dark | light
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Get the current hour for automatic palette cycling
  const getCurrentHour = () => new Date().getHours()

  // Mapping hours to luxury palettes (24-hour cycle)
  const HOURLY_PALETTE_MAP = {
    0: 'midnight-mono',        // 12 AM - Deep night
    1: 'lavender-dusk',        // 1 AM - Late night
    2: 'sapphire-night',       // 2 AM - Deep night blues
    3: 'amethyst-elite',       // 3 AM - Mystical purple
    4: 'cognac-dream',         // 4 AM - Warm brown
    5: 'pearl-morning',        // 5 AM - Early morning light
    6: 'rose-aurora',          // 6 AM - Dawn roses
    7: 'emerald-mist',         // 7 AM - Fresh morning
    8: 'mint-elegance',        // 8 AM - Clean morning
    9: 'crystal-blue',         // 9 AM - Clear sky
    10: 'tiffany-dawn',        // 10 AM - Elegant blue
    11: 'azure-luxury',        // 11 AM - Rich blue
    12: 'citrine-bright',      // 12 PM - Bright noon
    13: 'saffron-luxury',      // 1 PM - Warm afternoon
    14: 'topaz-glow',          // 2 PM - Golden hour prep
    15: 'champagne-dusk',      // 3 PM - Sophisticated gold
    16: 'coral-sunset',        // 4 PM - Warm evening
    17: 'peony-blush',         // 5 PM - Sunset pink
    18: 'blush-elegance',      // 6 PM - Evening elegance
    19: 'jade-prosperity',     // 7 PM - Rich evening
    20: 'turquoise-calm',      // 8 PM - Calming night
    21: 'mono-prestige',       // 9 PM - Classic evening
    22: 'classic-mono',        // 10 PM - Sophisticated night
    23: 'peridot-fresh',       // 11 PM - Late evening
  }

  // Apply palette with smooth transition
  const applyPaletteWithTransition = useCallback((paletteName) => {
    if (!LUXURY_PALETTES[paletteName]) {
      console.warn(`Unknown palette: ${paletteName}`)
      return
    }

    setIsTransitioning(true)
    
    // Apply the new palette
    applyPalette(paletteName)
    setCurrentPalette(paletteName)

    // End transition after CSS transition completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 1000)
  }, [])

  // Initialize palette based on current time
  useEffect(() => {
    const hour = getCurrentHour()
    const autopalette = HOURLY_PALETTE_MAP[hour]
    applyPaletteWithTransition(autopalette)
  }, [applyPaletteWithTransition])

  // Auto-update palette every hour
  useEffect(() => {
    const updatePalette = () => {
      const hour = getCurrentHour()
      const newPalette = HOURLY_PALETTE_MAP[hour]
      if (newPalette !== currentPalette) {
        applyPaletteWithTransition(newPalette)
      }
    }

    // Check every minute for hour changes
    const interval = setInterval(updatePalette, 60000)
    return () => clearInterval(interval)
  }, [currentPalette, applyPaletteWithTransition])

  // Theme detection and management
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleThemeChange = (e) => {
      const systemTheme = e.matches ? 'dark' : 'light'
      setTheme(systemTheme)
      document.documentElement.setAttribute('data-theme', systemTheme)
    }

    // Set initial theme
    handleThemeChange(mediaQuery)
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleThemeChange)
    
    return () => mediaQuery.removeEventListener('change', handleThemeChange)
  }, [])

  // Manual palette change
  const changePalette = useCallback((paletteName) => {
    applyPaletteWithTransition(paletteName)
  }, [applyPaletteWithTransition])

  // Manual theme toggle
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }, [theme])

  // Get current palette data
  const getCurrentPaletteData = useCallback(() => {
    return LUXURY_PALETTES[currentPalette] || LUXURY_PALETTES['midnight-mono']
  }, [currentPalette])

  // Check if current palette is light-friendly
  const isLightPalette = useCallback(() => {
    const lightPalettes = [
      'pearl-morning',
      'emerald-mist', 
      'crystal-blue',
      'mint-elegance',
      'blush-elegance'
    ]
    return lightPalettes.includes(currentPalette)
  }, [currentPalette])

  // Get contrast-safe text color
  const getContrastSafeTextColor = useCallback(() => {
    return isLightPalette() ? 'text-black' : 'text-white'
  }, [isLightPalette])

  // Get contrast-safe background color
  const getContrastSafeBgColor = useCallback(() => {
    return isLightPalette() ? 'bg-white/90' : 'bg-black/80'
  }, [isLightPalette])

  // Get button styles for current palette
  const getButtonStyles = useCallback((variant = 'primary') => {
    const baseStyles = {
      primary: 'btn-luxury-primary',
      secondary: 'btn-luxury-secondary',
      ghost: 'btn-luxury-ghost',
      icon: 'btn-luxury-icon'
    }

    let styles = baseStyles[variant] || baseStyles.primary

    // Add light mode overrides for light palettes
    if (isLightPalette()) {
      if (variant === 'primary') {
        styles += ' !text-white !bg-gradient-to-br !from-black !to-gray-800'
      } else if (variant === 'secondary') {
        styles += ' !text-black !bg-white/90 !border-black/20'
      } else if (variant === 'ghost') {
        styles += ' !text-black/90 hover:!bg-black/10 hover:!text-black'
      } else if (variant === 'icon') {
        styles += ' !text-black !bg-white/90 !border-black/20 hover:!bg-white'
      }
    }

    return styles
  }, [isLightPalette])

  // Get current palette CSS variables as Tailwind classes
  const getPaletteClasses = useCallback(() => {
    const palette = getCurrentPaletteData()
    return {
      primary: `bg-[${palette.primary}]`,
      secondary: `bg-[${palette.secondary}]`,
      accent: `text-[${palette.accent}]`,
      accentBg: `bg-[${palette.accent}]`,
      gradient: `bg-gradient-to-br from-[${palette.primary}] to-[${palette.secondary}]`,
    }
  }, [getCurrentPaletteData])

  return {
    // State
    currentPalette,
    theme,
    isTransitioning,
    
    // Palette management
    changePalette,
    getCurrentPaletteData,
    getPaletteClasses,
    
    // Theme management
    toggleTheme,
    isLightPalette,
    
    // Utility functions
    getContrastSafeTextColor,
    getContrastSafeBgColor,
    getButtonStyles,
    
    // Available palettes
    availablePalettes: Object.keys(LUXURY_PALETTES),
    hourlyPaletteMap: HOURLY_PALETTE_MAP,
  }
}

/**
 * Hook for components that need to react to palette changes
 */
export const usePaletteSubscription = (callback) => {
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-global-palette') {
          const newPalette = mutation.target.getAttribute('data-global-palette')
          callback(newPalette)
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-global-palette']
    })

    return () => observer.disconnect()
  }, [callback])
}

/**
 * Hook for getting dynamic CSS custom properties
 */
export const useDynamicColors = () => {
  const [colors, setColors] = useState({
    primary: 'rgb(10, 10, 10)',
    secondary: 'rgb(26, 26, 26)',
    accent: 'rgb(255, 255, 255)',
    accentRgb: '255, 255, 255'
  })

  usePaletteSubscription((paletteName) => {
    const palette = LUXURY_PALETTES[paletteName]
    if (palette) {
      setColors({
        primary: palette.primary,
        secondary: palette.secondary,
        accent: palette.accent,
        accentRgb: palette.accentRgb
      })
    }
  })

  return colors
}