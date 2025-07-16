import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlayIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useColorScheme, useDynamicColors } from '../hooks/useColorScheme'
import { cn, textStyles, buttonStyles } from '../utils/classNames'
import Button from './ui/Button'

/**
 * Luxury Hero Component - Tailwind UI Migration
 * Preserves all existing animations and luxury aesthetics
 * Adds enhanced responsiveness and automatic color adaptation
 */
const HeroLuxury = ({ onNavigate, onOpenSavi }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const { currentPalette, isLightPalette } = useColorScheme()
  const dynamicColors = useDynamicColors()

  // Luxury hero images with dynamic overlays
  const heroImages = [
    {
      url: '/images/luxury-hero-1.jpg',
      alt: 'Luxury Fashion Experience',
      gradient: 'from-black/60 via-black/40 to-transparent'
    },
    {
      url: '/images/luxury-hero-2.jpg', 
      alt: 'Personal Shopping Service',
      gradient: 'from-black/50 via-transparent to-black/30'
    },
    {
      url: '/images/luxury-hero-3.jpg',
      alt: 'Premium Style Consultation',
      gradient: 'from-transparent via-black/30 to-black/60'
    }
  ]

  // Trust indicators with real-time updates
  const trustIndicators = [
    { 
      number: '10K+', 
      label: 'Satisfied Clients',
      icon: SparklesIcon,
      color: 'text-luxury-gold-light'
    },
    { 
      number: '24/7', 
      label: 'Style Support',
      icon: PlayIcon,
      color: 'text-emerald-400'
    },
    { 
      number: '2H', 
      label: 'Average Delivery',
      icon: SparklesIcon,
      color: 'text-blue-400'
    }
  ]

  // Dynamic palette name display
  const formatPaletteName = (palette) => {
    return palette
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Hero content animations
  useEffect(() => {
    setIsLoaded(true)
    
    // Auto-cycle hero images
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % heroImages.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [heroImages.length])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  const glowVariants = {
    initial: { scale: 1, opacity: 0.8 },
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${dynamicColors.primary} 0%, ${dynamicColors.secondary} 100%)`
      }}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {/* Animated Gradient Overlay */}
        <div 
          className="absolute inset-0 opacity-90"
          style={{
            background: `radial-gradient(ellipse at center, rgba(${dynamicColors.accentRgb}, 0.1) 0%, transparent 70%)`
          }}
        />
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container-luxury relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Palette Indicator */}
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center space-x-2 glass-luxury rounded-full px-4 py-2"
          >
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: dynamicColors.accent }}
            />
            <span className="text-sm font-medium text-white/80 uppercase tracking-wider">
              {formatPaletteName(currentPalette)}
            </span>
          </motion.div>

          {/* Brand Name */}
          <motion.h1
            variants={itemVariants}
            className={cn(
              'text-6xl md:text-7xl lg:text-8xl font-bold mb-6',
              'text-glow-white animate-glow-pulse',
              'tracking-tight leading-none'
            )}
          >
            <span className="block">TUHME</span>
            <motion.span
              variants={glowVariants}
              initial="initial"
              animate="animate"
              className="block text-luxury-gold-light text-glow-gold"
            >
              LUXURY
            </motion.span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className={cn(
              'text-xl md:text-2xl lg:text-3xl mb-8',
              'text-white/90 leading-relaxed max-w-3xl mx-auto'
            )}
          >
            <span className="font-light">Personal styling redefined.</span>
            <br />
            <span className="font-semibold text-glow-white">
              Premium fashion at your doorstep in 2 hours.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
          >
            <Button
              variant="luxury"
              size="xl"
              onClick={() => onNavigate('express-order')}
              className="group relative overflow-hidden"
              icon={PlayIcon}
            >
              <span className="relative z-10">Start Express Order</span>
              <div className="absolute inset-0 bg-gradient-to-r from-luxury-gold to-luxury-gold-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            
            <Button
              variant="secondary"
              size="xl"
              onClick={onOpenSavi}
              icon={SparklesIcon}
              className="group"
            >
              <span>Ask SAVI Assistant</span>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 mb-12"
          >
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={indicator.label}
                variants={itemVariants}
                className="flex flex-col items-center space-y-2 group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <indicator.icon className={cn('h-6 w-6', indicator.color)} />
                  <span className={cn(
                    'text-3xl font-bold',
                    indicator.color,
                    'text-glow-white'
                  )}>
                    {indicator.number}
                  </span>
                </div>
                <span className="text-white/70 font-medium tracking-wide">
                  {indicator.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center space-y-4"
          >
            <span className="text-white/60 text-sm uppercase tracking-wider">
              Discover Our Services
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-1 h-3 bg-white/60 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Ambient Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dynamic accent glow */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: `radial-gradient(circle, rgba(${dynamicColors.accentRgb}, 0.3) 0%, transparent 70%)`
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{
            background: `radial-gradient(circle, rgba(${dynamicColors.accentRgb}, 0.2) 0%, transparent 70%)`
          }}
        />
        
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-white/5 to-transparent" />
      </div>
    </section>
  )
}

export default HeroLuxury