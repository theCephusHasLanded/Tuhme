import { useState, useEffect, Fragment } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  SparklesIcon,
  MapPinIcon,

  EllipsisHorizontalIcon,
  NewspaperIcon,
  StarIcon,
  ChatBubbleLeftEllipsisIcon,
  PlayIcon
} from '@heroicons/react/24/outline'
import { useModal } from '../contexts/ModalContext'
// useColorScheme removed - using mandatory dark mode
import { cn, buttonStyles } from '../utils/classNames'
import tuhmeLogo from '../assets/tuhme.png'

const NavigationLuxury = ({ onNavigate, currentSection, onOpenSavi, onOpenFeedback }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { openModal } = useModal()
  // Dark mode only - simplified button styles
  const getButtonStyles = (variant) => buttonStyles[variant] || buttonStyles.primary;

  // Navigation items with enhanced structure
  const navItems = [
    { 
      id: 'home', 
      label: 'Home', 
      type: 'navigate',
      description: 'Return to homepage'
    },
    { 
      id: 'how-it-works', 
      label: 'How Tuhme Works', 
      type: 'navigate',
      description: 'Learn about our process'
    },
    { 
      id: 'mission', 
      label: 'Mission Statement', 
      type: 'modal',
      description: 'Our purpose and values'
    },
    { 
      id: 'partner', 
      label: 'Partner With Us', 
      type: 'modal',
      description: 'Join our network'
    },
    { 
      id: 'luxury-items', 
      label: 'Luxury Items', 
      type: 'modal',
      description: 'Exclusive collections'
    },
    { 
      id: 'hiring', 
      label: "We're Hiring!", 
      type: 'navigate',
      description: 'Join our team'
    },
    { 
      id: 'tuhme-now', 
      label: 'Tuhme Now', 
      type: 'modal',
      description: 'Instant styling service'
    }
  ]

  // Quick action items for dropdown menu
  const quickActions = [
    {
      id: 'daily-flyer',
      label: 'Daily Sales Flyer',
      icon: NewspaperIcon,
      action: () => {
        localStorage.removeItem('tuhme-daily-flyer-shown')
        openModal('dailySalesFlyer')
      },
      description: 'Latest deals and offers'
    },
    {
      id: 'membership',
      label: 'Premium Membership',
      icon: StarIcon,
      action: () => openModal('membership'),
      description: 'Unlock exclusive benefits'
    },
    {
      id: 'feedback',
      label: 'Contact & Support',
      icon: ChatBubbleLeftEllipsisIcon,
      action: onOpenFeedback,
      description: 'Get help or share feedback'
    },
    {
      id: 'express-order',
      label: 'Start Express Order',
      icon: PlayIcon,
      action: () => onNavigate('express-order'),
      description: 'Quick styling service',
      featured: true
    }
  ]

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle navigation clicks
  const handleNavClick = (item) => {
    if (item.type === 'modal') {
      openModal(item.id)
    } else {
      onNavigate(item.id)
    }
    setMobileMenuOpen(false)
  }

  // Theme icon removed - using mandatory dark mode

  return (
    <>
      {/* Main Navigation */}
      <nav className={cn(
        'nav-luxury',
        isScrolled && 'scrolled'
      )}>
        <div className="nav-container">
          {/* Logo */}
          <div className="nav-logo">
            <button
              onClick={() => onNavigate('home')}
              className={cn(
                'flex items-center space-x-3 transition-all duration-300',
                'hover:scale-105 focus-luxury'
              )}
            >
              <img
                src={tuhmeLogo}
                alt="TUHME"
                className="h-10 w-auto"
              />
              <span className={cn(
                'text-xl font-bold tracking-tight',
                getContrastSafeTextColor()
              )}>
                TUHME
              </span>
            </button>
          </div>

          {/* Desktop Navigation Menu */}
          <div className="nav-menu">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={cn(
                  'text-sm font-medium transition-all duration-300',
                  'hover:scale-105 focus-luxury',
                  getContrastSafeTextColor(),
                  'hover:text-luxury-gold-light',
                  currentSection === item.id && 'text-luxury-gold-light'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="nav-actions">
            {/* SAVI AI Assistant */}
            <button
              onClick={onOpenSavi}
              className={cn(
                getButtonStyles('icon'),
                'relative group'
              )}
              title="Ask SAVI (AI Assistant)"
            >
              <SparklesIcon className="h-5 w-5" />
              <div className="absolute -inset-1 bg-cyan-500/20 rounded-luxury opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            </button>

            {/* Store Finder */}
            <button
              onClick={() => openModal('storeFinder')}
              className={cn(
                getButtonStyles('icon'),
                'relative group'
              )}
              title="Find Stores"
            >
              <MapPinIcon className="h-5 w-5" />
              <div className="absolute -inset-1 bg-green-500/20 rounded-luxury opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            </button>

            {/* Theme toggle removed - using mandatory dark mode */}

            {/* Quick Actions Dropdown */}
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={cn(
                      getButtonStyles('icon'),
                      'relative group',
                      open && 'bg-white/20'
                    )}
                  >
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                    <div className="absolute -inset-1 bg-purple-500/20 rounded-luxury opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-1 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-1 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute right-0 top-full mt-3 w-80 z-50">
                      <div className="glass-luxury-dark rounded-luxury-xl border border-white/10 shadow-luxury-3xl overflow-hidden">
                        <div className="p-4">
                          <h3 className="text-sm font-semibold text-white mb-3">
                            Quick Actions
                          </h3>
                          <div className="space-y-2">
                            {quickActions.map((action) => (
                              <button
                                key={action.id}
                                onClick={() => {
                                  action.action()
                                }}
                                className={cn(
                                  'w-full flex items-center space-x-3 p-3 rounded-luxury',
                                  'transition-all duration-200',
                                  'hover:bg-white/10 hover:scale-[1.02]',
                                  'focus-luxury text-left',
                                  action.featured && 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30'
                                )}
                              >
                                <action.icon className="h-5 w-5 text-white/80 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-white">
                                    {action.label}
                                  </p>
                                  <p className="text-xs text-white/60 truncate">
                                    {action.description}
                                  </p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={cn(
                getButtonStyles('icon'),
                'md:hidden'
              )}
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 md:hidden"
          onClose={setMobileMenuOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80 backdrop-blur-luxury" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-300"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-300"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-sm">
                    <div className="flex h-full flex-col bg-global-gradient">
                      {/* Header */}
                      <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <div className="flex items-center space-x-3">
                          <img src={tuhmeLogo} alt="TUHME" className="h-8 w-auto" />
                          <span className="text-lg font-bold text-white">TUHME</span>
                        </div>
                        <button
                          onClick={() => setMobileMenuOpen(false)}
                          className={getButtonStyles('icon')}
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Navigation Items */}
                      <div className="flex-1 overflow-y-auto p-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
                              Navigation
                            </h3>
                            <div className="space-y-2">
                              {navItems.map((item) => (
                                <button
                                  key={item.id}
                                  onClick={() => handleNavClick(item)}
                                  className={cn(
                                    'w-full flex items-center justify-between p-3 rounded-luxury',
                                    'transition-all duration-200',
                                    'hover:bg-white/10 focus-luxury text-left',
                                    currentSection === item.id && 'bg-luxury-gold-light/20 text-luxury-gold-light'
                                  )}
                                >
                                  <div>
                                    <p className="text-sm font-medium text-white">
                                      {item.label}
                                    </p>
                                    <p className="text-xs text-white/60">
                                      {item.description}
                                    </p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
                              Quick Actions
                            </h3>
                            <div className="space-y-2">
                              {quickActions.map((action) => (
                                <button
                                  key={action.id}
                                  onClick={() => {
                                    action.action()
                                    setMobileMenuOpen(false)
                                  }}
                                  className={cn(
                                    'w-full flex items-center space-x-3 p-3 rounded-luxury',
                                    'transition-all duration-200',
                                    'hover:bg-white/10 focus-luxury text-left',
                                    action.featured && 'bg-gradient-to-r from-purple-500/20 to-pink-500/20'
                                  )}
                                >
                                  <action.icon className="h-5 w-5 text-white/80 flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white">
                                      {action.label}
                                    </p>
                                    <p className="text-xs text-white/60">
                                      {action.description}
                                    </p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="border-t border-white/10 p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                onOpenSavi()
                                setMobileMenuOpen(false)
                              }}
                              className={getButtonStyles('icon')}
                              title="SAVI Assistant"
                            >
                              <SparklesIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => {
                                openModal('storeFinder')
                                setMobileMenuOpen(false)
                              }}
                              className={getButtonStyles('icon')}
                              title="Store Finder"
                            >
                              <MapPinIcon className="h-5 w-5" />
                            </button>
                            {/* Theme toggle removed - using mandatory dark mode */}
                          </div>
                          <div className="text-xs text-white/40">
                            Dark Mode
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default NavigationLuxury