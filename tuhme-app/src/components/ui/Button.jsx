import { forwardRef } from 'react'
import { cn } from '../../utils/classNames'
import { useColorScheme } from '../../hooks/useColorScheme'

/**
 * Luxury Button Component with WCAG-compliant contrast
 * Automatically handles light/dark mode and all 24 color palettes
 */
const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  loading = false,
  fullWidth = false,
  className,
  icon: Icon,
  iconPosition = 'left',
  ...props 
}, ref) => {
  const { getButtonStyles, isLightPalette } = useColorScheme()

  // Base button styles
  const baseStyles = cn(
    'relative inline-flex items-center justify-center',
    'font-semibold transition-all duration-300 ease-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
    fullWidth && 'w-full'
  )

  // Size variants
  const sizeStyles = {
    xs: 'px-3 py-1.5 text-xs rounded-md',
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-sm rounded-luxury',
    lg: 'px-8 py-4 text-base rounded-luxury',
    xl: 'px-10 py-5 text-lg rounded-luxury-lg',
    icon: 'p-2 rounded-luxury',
    'icon-sm': 'p-1.5 rounded-lg',
    'icon-lg': 'p-3 rounded-luxury',
  }

  // Variant styles with automatic contrast handling
  const getVariantStyles = () => {
    const lightMode = isLightPalette()
    
    switch (variant) {
      case 'primary':
        return cn(
          'text-white bg-gradient-to-br from-black to-gray-800',
          'border border-white/20',
          'hover:from-gray-900 hover:to-black hover:scale-105 hover:shadow-luxury-xl',
          'focus:ring-white/50',
          'shadow-luxury-md'
        )
      
      case 'secondary':
        return cn(
          lightMode 
            ? 'text-black bg-white/90 border-black/20 hover:bg-white hover:border-black/30' 
            : 'text-white glass-luxury border-white/20 hover:bg-white/20',
          'hover:scale-105 hover:shadow-luxury-lg',
          lightMode ? 'focus:ring-black/50' : 'focus:ring-white/50'
        )
      
      case 'ghost':
        return cn(
          lightMode 
            ? 'text-black/90 hover:bg-black/10 hover:text-black' 
            : 'text-white/90 hover:bg-white/10 hover:text-white',
          'border border-transparent',
          'hover:scale-105',
          lightMode ? 'focus:ring-black/50' : 'focus:ring-white/50'
        )
      
      case 'outline':
        return cn(
          lightMode 
            ? 'text-black border-black/30 hover:bg-black hover:text-white' 
            : 'text-white border-white/30 hover:bg-white hover:text-black',
          'bg-transparent',
          'hover:scale-105 hover:shadow-luxury-lg',
          lightMode ? 'focus:ring-black/50' : 'focus:ring-white/50'
        )
      
      case 'luxury':
        return cn(
          'text-black bg-gradient-to-br from-luxury-gold-light to-luxury-gold-dark',
          'border border-luxury-gold-light/50',
          'hover:from-luxury-gold to-luxury-gold-light hover:scale-105',
          'shadow-gold-glow hover:shadow-luxury-xl',
          'focus:ring-luxury-gold-light/50'
        )
      
      case 'success':
        return cn(
          'text-white bg-gradient-to-br from-green-500 to-green-600',
          'border border-green-400/50',
          'hover:from-green-600 hover:to-green-700 hover:scale-105',
          'shadow-luxury-md hover:shadow-luxury-xl',
          'focus:ring-green-400/50'
        )
      
      case 'warning':
        return cn(
          'text-white bg-gradient-to-br from-orange-500 to-orange-600',
          'border border-orange-400/50',
          'hover:from-orange-600 hover:to-orange-700 hover:scale-105',
          'shadow-luxury-md hover:shadow-luxury-xl',
          'focus:ring-orange-400/50'
        )
      
      case 'error':
        return cn(
          'text-white bg-gradient-to-br from-red-500 to-red-600',
          'border border-red-400/50',
          'hover:from-red-600 hover:to-red-700 hover:scale-105',
          'shadow-luxury-md hover:shadow-luxury-xl',
          'focus:ring-red-400/50'
        )
      
      default:
        return getVariantStyles('primary')
    }
  }

  // Loading spinner component
  const LoadingSpinner = () => (
    <svg 
      className="animate-spin h-4 w-4" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )

  // Content with proper spacing
  const buttonContent = (
    <>
      {loading && <LoadingSpinner />}
      {Icon && iconPosition === 'left' && !loading && (
        <Icon className={cn('h-4 w-4', children && 'mr-2')} />
      )}
      {children && (
        <span className={cn(loading && 'ml-2')}>
          {children}
        </span>
      )}
      {Icon && iconPosition === 'right' && !loading && (
        <Icon className={cn('h-4 w-4', children && 'ml-2')} />
      )}
    </>
  )

  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        sizeStyles[size],
        getVariantStyles(),
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {buttonContent}
    </button>
  )
})

Button.displayName = 'Button'

export default Button

// Export variants for easy access
export const ButtonPrimary = (props) => <Button variant="primary" {...props} />
export const ButtonSecondary = (props) => <Button variant="secondary" {...props} />
export const ButtonGhost = (props) => <Button variant="ghost" {...props} />
export const ButtonOutline = (props) => <Button variant="outline" {...props} />
export const ButtonLuxury = (props) => <Button variant="luxury" {...props} />
export const ButtonSuccess = (props) => <Button variant="success" {...props} />
export const ButtonWarning = (props) => <Button variant="warning" {...props} />
export const ButtonError = (props) => <Button variant="error" {...props} />

// Icon button component
export const IconButton = forwardRef(({ 
  children, 
  size = 'icon',
  title,
  'aria-label': ariaLabel,
  ...props 
}, ref) => (
  <Button
    ref={ref}
    size={size}
    title={title}
    aria-label={ariaLabel || title}
    {...props}
  >
    {children}
  </Button>
))