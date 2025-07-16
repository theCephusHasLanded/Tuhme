/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      // TUHME Luxury Color System - Migrated from CSS Variables
      colors: {
        // Primary Brand Colors - Sophisticated Monochrome
        primary: {
          50: '#f8f8f8',
          100: '#f0f0f0',
          200: '#e8e8e8',
          300: '#d1d1d1',
          400: '#b4b4b4',
          500: '#000000', // Base black
          600: '#333333',
          700: '#4a4a4a',
          800: '#666666',
          900: '#808080',
          950: '#999999',
        },
        
        // Secondary - Luxury Teal/Cyan Accent
        secondary: {
          50: '#f0fbff',
          100: '#e0f6fe',
          200: '#baedfb',
          300: '#7ddef7',
          400: '#38ccf0',
          500: '#0fb9e0',
          600: '#0294be',
          700: '#057699',
          800: '#0a647e',
          900: '#0e5368',
          950: '#053544',
        },

        // Luxury Color Palette
        luxury: {
          gold: {
            light: '#f4e09a',
            DEFAULT: '#d4af37', // Classic luxury gold
            dark: '#b8941f',
          },
          charcoal: {
            light: '#556b7d',
            DEFAULT: '#36454f',
            dark: '#1e2328',
          },
          cream: {
            light: '#f8f6f0',
            DEFAULT: '#f0ede4',
            dark: '#e8e4d8',
          },
          navy: {
            light: '#2d3e52',
            DEFAULT: '#1a2332',
            dark: '#0f1419',
          },
        },

        // Global Dynamic Palette System - 24 Sophisticated Palettes
        palette: {
          'midnight-mono': {
            primary: '#0a0a0a',
            secondary: '#1a1a1a',
            accent: '#ffffff',
          },
          'champagne-dusk': {
            primary: '#1a0f1a',
            secondary: '#2a1a2a',
            accent: '#e6c2a6',
          },
          'sapphire-night': {
            primary: '#0f1419',
            secondary: '#1a2129',
            accent: '#8b9dc3',
          },
          'cognac-dream': {
            primary: '#191414',
            secondary: '#2a2125',
            accent: '#dda15e',
          },
          'tiffany-dawn': {
            primary: '#0d1421',
            secondary: '#1a2332',
            accent: '#a8dadc',
          },
          'pearl-morning': {
            primary: '#1a1a0f',
            secondary: '#2a2a1a',
            accent: '#f1faee',
          },
          'rose-aurora': {
            primary: '#1a0f14',
            secondary: '#2a1a25',
            accent: '#ffb3ba',
          },
          'emerald-mist': {
            primary: '#0f1a14',
            secondary: '#1a2a25',
            accent: '#c7f9cc',
          },
          'crystal-blue': {
            primary: '#14141a',
            secondary: '#25252a',
            accent: '#bde0ff',
          },
          'saffron-luxury': {
            primary: '#1a140f',
            secondary: '#2a251a',
            accent: '#ffd23f',
          },
          'amethyst-elite': {
            primary: '#141a1a',
            secondary: '#252a2a',
            accent: '#a663cc',
          },
          'mono-prestige': {
            primary: '#1a1914',
            secondary: '#2a2925',
            accent: '#ffffff',
          },
          'turquoise-calm': {
            primary: '#0f141a',
            secondary: '#1a252a',
            accent: '#4ecdc4',
          },
          'coral-sunset': {
            primary: '#1a0f0f',
            secondary: '#2a1a1a',
            accent: '#e6c2a6',
          },
          'citrine-bright': {
            primary: '#14141a',
            secondary: '#25252a',
            accent: '#f8f32b',
          },
          'mint-elegance': {
            primary: '#1a1a14',
            secondary: '#2a2a25',
            accent: '#95e1d3',
          },
          'peony-blush': {
            primary: '#191014',
            secondary: '#2a1a25',
            accent: '#f38ba8',
          },
          'azure-luxury': {
            primary: '#141a19',
            secondary: '#252a29',
            accent: '#74c0fc',
          },
          'topaz-glow': {
            primary: '#1a1414',
            secondary: '#2a2525',
            accent: '#ffd43b',
          },
          'lavender-dusk': {
            primary: '#0f1a1a',
            secondary: '#1a2a2a',
            accent: '#b197fc',
          },
          'jade-prosperity': {
            primary: '#1a190f',
            secondary: '#2a291a',
            accent: '#69db7c',
          },
          'blush-elegance': {
            primary: '#1a0f19',
            secondary: '#2a1a29',
            accent: '#f1faee',
          },
          'peridot-fresh': {
            primary: '#0f1a0f',
            secondary: '#1a2a1a',
            accent: '#82c91e',
          },
          'classic-mono': {
            primary: '#1a1a1a',
            secondary: '#2a2a2a',
            accent: '#ffffff',
          },
        },

        // Semantic Colors
        success: {
          light: '#86efac',
          DEFAULT: '#22c55e',
          dark: '#16a34a',
        },
        warning: {
          light: '#fcd34d',
          DEFAULT: '#f59e0b',
          dark: '#d97706',
        },
        error: {
          light: '#fca5a5',
          DEFAULT: '#ef4444',
          dark: '#dc2626',
        },
        info: {
          light: '#7ddef7',
          DEFAULT: '#0fb9e0',
          dark: '#057699',
        },

        // Neutral Grays with Warm Undertones
        neutral: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
      },

      // Typography System
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        luxury: ['Playfair Display', 'serif'],
      },

      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        // Luxury Display Sizes
        'display-sm': ['2.5rem', { lineHeight: '3rem', letterSpacing: '-0.025em' }],
        'display-md': ['3.5rem', { lineHeight: '4rem', letterSpacing: '-0.025em' }],
        'display-lg': ['4.5rem', { lineHeight: '5rem', letterSpacing: '-0.025em' }],
        'display-xl': ['6rem', { lineHeight: '6.5rem', letterSpacing: '-0.025em' }],
      },

      // Luxury Shadows
      boxShadow: {
        'luxury-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'luxury-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'luxury-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'luxury-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'luxury-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'luxury-3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.35)',
        'gold-glow': '0 0 30px rgba(212, 175, 55, 0.4), 0 0 60px rgba(212, 175, 55, 0.2)',
        'accent-glow': '0 0 20px rgba(var(--tw-accent-rgb), 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'glass-dark': '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      },

      // Glass Morphism and Backdrop Filters
      backdropBlur: {
        'luxury': '20px',
        'ultra': '40px',
      },

      // Animations and Transitions
      animation: {
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite alternate',
        'hero-glow': 'hero-glow 4s ease-in-out infinite',
        'luxury-float': 'luxury-float 6s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
      },

      keyframes: {
        'glow-pulse': {
          '0%': {
            textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4)',
          },
          '100%': {
            textShadow: '0 0 15px rgba(255, 255, 255, 0.9), 0 0 25px rgba(255, 255, 255, 0.7), 0 0 35px rgba(255, 255, 255, 0.5)',
          },
        },
        'hero-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(212, 175, 55, 0.5)',
          },
        },
        'luxury-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },

      // Spacing for Luxury Layouts
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
      },

      // Border Radius for Modern UI
      borderRadius: {
        'luxury': '0.75rem',
        'luxury-lg': '1rem',
        'luxury-xl': '1.5rem',
        'luxury-2xl': '2rem',
      },

      // Grid System for Luxury Layouts
      gridTemplateColumns: {
        'luxury-cards': 'repeat(auto-fit, minmax(300px, 1fr))',
        'pricing': 'repeat(auto-fit, minmax(280px, 1fr))',
        'testimonials': 'repeat(auto-fit, minmax(350px, 1fr))',
      },

      // Aspect Ratios for Media
      aspectRatio: {
        'luxury': '4 / 3',
        'hero': '16 / 9',
        'portrait': '3 / 4',
        'square': '1 / 1',
      },

      // Z-Index Scale
      zIndex: {
        'dropdown': '1000',
        'modal': '9999',
        'navigation': '1000',
        'overlay': '9998',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    // Custom plugin for dynamic color schemes
    function({ addUtilities, theme }) {
      const newUtilities = {
        // Glass morphism utilities
        '.glass-luxury': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-luxury-dark': {
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        // Luxury button styles
        '.btn-luxury-primary': {
          background: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '0.75rem',
          padding: '0.75rem 1.5rem',
          fontWeight: '600',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          },
        },
        '.btn-luxury-secondary': {
          background: 'rgba(255, 255, 255, 0.1)',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '0.75rem',
          padding: '0.75rem 1.5rem',
          fontWeight: '600',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.2)',
            transform: 'translateY(-2px)',
          },
        },
        // Text glow effects
        '.text-glow-white': {
          textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4)',
        },
        '.text-glow-gold': {
          textShadow: '0 0 10px rgba(212, 175, 55, 0.8), 0 0 20px rgba(212, 175, 55, 0.6), 0 0 30px rgba(212, 175, 55, 0.4)',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}