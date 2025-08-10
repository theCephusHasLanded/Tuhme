import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/classNames'
import { useColorScheme } from '../../hooks/useColorScheme'

/**
 * Luxury Card Component System
 * Provides consistent styling across all card layouts
 */
const Card = forwardRef(({ 
  children, 
  variant = 'default',
  size = 'md',
  hover = true,
  featured = false,
  className,
  as: Component = 'div',
  ...props 
}, ref) => {
  const { isLightPalette } = useColorScheme()

  // Base card styles
  const baseStyles = cn(
    'relative overflow-hidden transition-all duration-300 ease-out',
    hover && 'hover:scale-[1.02] hover:z-10'
  )

  // Size variants
  const sizeStyles = {
    sm: 'p-4 rounded-luxury',
    md: 'p-6 rounded-luxury-lg',
    lg: 'p-8 rounded-luxury-xl',
    xl: 'p-10 rounded-luxury-2xl',
  }

  // Variant styles
  const getVariantStyles = () => {
    const lightMode = isLightPalette()
    
    switch (variant) {
      case 'default':
        return cn(
          'glass-luxury border border-white/20',
          hover && 'hover:shadow-luxury-xl hover:border-white/30',
          lightMode && 'border-black/10 hover:border-black/20'
        )
      
      case 'pricing':
        return cn(
          'glass-luxury border border-white/20',
          'hover:shadow-luxury-2xl hover:border-white/40',
          'backdrop-blur-luxury',
          featured && cn(
            'ring-2 ring-luxury-gold-light/50',
            'shadow-gold-glow',
            'transform scale-105'
          ),
          lightMode && 'border-black/10 hover:border-black/30'
        )
      
      case 'testimonial':
        return cn(
          'glass-luxury border border-white/10',
          'hover:shadow-luxury-lg hover:border-white/20',
          lightMode && 'border-black/5 hover:border-black/15'
        )
      
      case 'feature':
        return cn(
          'glass-luxury border border-white/20',
          'hover:shadow-luxury-xl hover:border-white/30',
          'hover:bg-white/5',
          lightMode && 'border-black/10 hover:border-black/20 hover:bg-black/5'
        )
      
      case 'service':
        return cn(
          'glass-luxury border border-white/15',
          'hover:shadow-luxury-lg hover:border-white/25',
          'hover:transform hover:-translate-y-1',
          lightMode && 'border-black/8 hover:border-black/18'
        )
      
      case 'solid':
        return cn(
          lightMode ? 'bg-white border border-black/10' : 'bg-black/40 border border-white/20',
          hover && 'hover:shadow-luxury-xl',
          lightMode && hover && 'hover:shadow-luxury-lg'
        )
      
      default:
        return getVariantStyles('default')
    }
  }

  return (
    <Component
      ref={ref}
      className={cn(
        baseStyles,
        sizeStyles[size],
        getVariantStyles(),
        className
      )}
      {...props}
    >
      {children}
      
      {/* Featured badge */}
      {featured && (
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-luxury-gold-light rounded-full flex items-center justify-center shadow-gold-glow">
          <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      )}
    </Component>
  )
})

Card.displayName = 'Card'

/**
 * Card Header Component
 */
export const CardHeader = ({ children, className, ...props }) => {
  const { getContrastSafeTextColor } = useColorScheme()
  
  return (
    <div 
      className={cn(
        'mb-4 pb-4 border-b border-white/10',
        getContrastSafeTextColor(),
        className
      )} 
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Card Title Component
 */
export const CardTitle = ({ children, className, as: Component = 'h3', ...props }) => {
  const { getContrastSafeTextColor } = useColorScheme()
  
  return (
    <Component 
      className={cn(
        'text-xl font-semibold mb-2',
        getContrastSafeTextColor(),
        className
      )} 
      {...props}
    >
      {children}
    </Component>
  )
}

/**
 * Card Content Component
 */
export const CardContent = ({ children, className, ...props }) => {
  return (
    <div 
      className={cn('text-white/80', className)} 
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Card Footer Component
 */
export const CardFooter = ({ children, className, ...props }) => {
  return (
    <div 
      className={cn(
        'mt-6 pt-4 border-t border-white/10 flex items-center justify-between',
        className
      )} 
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Animated Card Wrapper
 */
export const AnimatedCard = ({ children, delay = 0, ...props }) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <Card {...props}>
        {children}
      </Card>
    </motion.div>
  )
}

/**
 * Specialized Card Components
 */

// Pricing Card
export const PricingCard = forwardRef(({ 
  title,
  price,
  priceLabel,
  features,
  buttonText,
  onButtonClick,
  featured = false,
  popular = false,
  className,
  ...props 
}, ref) => (
  <Card
    ref={ref}
    variant="pricing"
    featured={featured}
    className={cn('text-center', className)}
    {...props}
  >
    {popular && (
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-luxury-gold-light text-black px-3 py-1 rounded-full text-sm font-semibold">
        Most Popular
      </div>
    )}
    
    <CardHeader>
      <CardTitle className="text-2xl">{title}</CardTitle>
      <div className="text-3xl font-bold text-luxury-gold-light">
        {price}
        {priceLabel && <span className="text-lg text-white/60 font-normal">/{priceLabel}</span>}
      </div>
    </CardHeader>
    
    <CardContent>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-white/80">
            <svg className="w-5 h-5 text-luxury-gold-light mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </CardContent>
    
    {buttonText && (
      <CardFooter className="border-t-0 pt-0 block">
        <button
          onClick={onButtonClick}
          className={cn(
            'w-full btn-luxury-primary',
            featured && 'btn-luxury-luxury'
          )}
        >
          {buttonText}
        </button>
      </CardFooter>
    )}
  </Card>
))

PricingCard.displayName = 'PricingCard'

// Testimonial Card
export const TestimonialCard = ({ 
  quote,
  author,
  role,
  avatar,
  rating = 5,
  className,
  ...props 
}) => (
  <Card variant="testimonial" className={className} {...props}>
    <CardContent>
      {/* Rating */}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={cn(
              'w-5 h-5',
              i < rating ? 'text-luxury-gold-light' : 'text-white/20'
            )}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      {/* Quote */}
      <blockquote className="text-white/90 mb-6 italic text-lg leading-relaxed">
        "{quote}"
      </blockquote>
      
      {/* Author */}
      <div className="flex items-center">
        {avatar && (
          <img 
            src={avatar} 
            alt={author}
            className="w-12 h-12 rounded-full mr-4 object-cover"
          />
        )}
        <div>
          <div className="font-semibold text-white">{author}</div>
          <div className="text-white/60 text-sm">{role}</div>
        </div>
      </div>
    </CardContent>
  </Card>
)

// Feature Card
export const FeatureCard = ({ 
  icon: Icon,
  title,
  description,
  className,
  ...props 
}) => (
  <Card variant="feature" className={cn('text-center', className)} {...props}>
    <CardContent>
      {Icon && (
        <div className="w-16 h-16 mx-auto mb-4 bg-luxury-gold-light/10 rounded-luxury flex items-center justify-center">
          <Icon className="w-8 h-8 text-luxury-gold-light" />
        </div>
      )}
      
      <CardTitle className="mb-3">{title}</CardTitle>
      <p className="text-white/70 leading-relaxed">{description}</p>
    </CardContent>
  </Card>
)

export default Card