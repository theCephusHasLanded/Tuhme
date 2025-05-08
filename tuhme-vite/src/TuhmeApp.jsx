import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// MUI imports
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
  IconButton
} from '@mui/material';

// Import components
import Hero from './components/Hero';
import SaviAIAssistant from './components/SaviAIAssistant';
import CartModal from './components/CartModal';
import StoreLogoCarousel from './components/StoreLogoCarousel';
import StoreWebBrowser from './components/StoreWebBrowser';
import ExpressOrderModal from './components/ExpressOrderModal';
import ResponsiveNavbar from './components/ResponsiveNavbar';
import NavigationWarningModal from './components/NavigationWarningModal';

// Import cart storage functions
import {
  loadCartItems,
  saveCartItems,
  addCartItem,
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
  loadUploadedImages,
  saveUploadedImages,
  getTotalItemsCount
} from './utils/cartStorage';

/**
 * TUHME App - Main component for the luxury garment try-on service
 * Cloud Supply Chain Platform for direct access to Manhattan's luxury stores
 * Focuses on TUHME's role as a logistics middleman rather than a shopping destination
 */
const TuhmeApp = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State management
  const [showSplash, setShowSplash] = useState(true);
  const [showSavi, setShowSavi] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState(loadCartItems());
  const [uploadedImages, setUploadedImages] = useState(loadUploadedImages());
  const [tryOnCount, setTryOnCount] = useState(getTotalItemsCount());
  const [storeBrowserOpen, setStoreBrowserOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [expressOrderModalOpen, setExpressOrderModalOpen] = useState(false);
  const [navigationWarningOpen, setNavigationWarningOpen] = useState(false);
  const [destinationUrl, setDestinationUrl] = useState('');

  // Custom hero slides with upscale NYC luxury fashion and architecture
  const heroSlides = [
    {
      id: 1,
      headline: 'Experience Before Investment',
      subline: 'Designer garments delivered to your door for try-on. Keep what you love, return the rest.',
      image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D',
      cta: {
        text: 'Discover How',
        url: '/how-it-works'
      },
      alignment: 'left'
    },
    {
      id: 2,
      headline: 'Manhattan\'s Finest Delivered',
      subline: 'Curated pieces from exclusive boutiques, brought directly to your home.',
      image: 'https://images.unsplash.com/photo-1658619597762-00996f1f5b5d?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFuaGF0dGFuJTIwbHV4dXJ5fGVufDB8fDB8fHww',
      cta: {
        text: 'Browse Stores',
        url: '/store-locator'
      },
      alignment: 'center'
    },
    {
      id: 3,
      headline: 'The Ultimate Luxury Experience',
      subline: 'From Fifth Avenue to your doorstep, experience fashion at its finest.',
      image: 'https://images.unsplash.com/photo-1574022609383-9f3618c7820c?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFuaGF0dGFuJTIwc2hvcHBpbmd8ZW58MHx8MHx8fDA%3D',
      cta: {
        text: 'Learn More',
        url: '/how-it-works'
      },
      alignment: 'right'
    },
    {
      id: 4,
      headline: 'Personal Shopping, Refined',
      subline: 'AI-assisted discovery with human expert curation. The best of both worlds.',
      image: 'https://images.unsplash.com/photo-1604233738267-7945098da152?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c29ob3xlbnwwfHwwfHx8MA%3D%3D',
      cta: {
        text: 'Meet Savi',
        url: '#',
        action: 'openSavi'
      },
      alignment: 'left'
    },
    {
      id: 5,
      headline: 'New York\'s Iconic Style',
      subline: 'Access the most prestigious stores in Manhattan with our concierge service.',
      image: 'https://images.unsplash.com/flagged/photo-1581390330676-a9dc2d68ce07?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29ob3xlbnwwfHwwfHx8MA%3D%3D',
      cta: {
        text: 'Explore Stores',
        url: '/store-locator'
      },
      alignment: 'center'
    },
    {
      id: 6,
      headline: 'Elevate Your Wardrobe',
      subline: 'Signature pieces from the world\'s most iconic designers, delivered to you.',
      image: 'https://images.unsplash.com/photo-1614631446501-abcf76949eca?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FyZHJvYmV8ZW58MHx8MHx8fDA%3D',
      cta: {
        text: 'Get Started',
        url: '/membership'
      },
      alignment: 'right'
    }
  ];

  // Handle splash screen completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Listen for openSavi events
  useEffect(() => {
    const handleOpenSavi = () => {
      setShowSavi(true);
    };

    window.addEventListener('openSavi', handleOpenSavi);
    return () => {
      window.removeEventListener('openSavi', handleOpenSavi);
    };
  }, []);

  // Handle store selection for web browser
  const handleStoreSelect = (store, mode = 'browser') => {
    setSelectedStore(store);

    if (mode === 'newTab') {
      // When the store is opened in a new tab, show the navigation warning modal
      setDestinationUrl(store.url);
      setNavigationWarningOpen(true);
    } else {
      // Default behavior (open in internal browser)
      setStoreBrowserOpen(true);
    }
  };

  // Handle saving item from store browser
  const handleSaveItemFromStore = (item) => {
    const newItem = {
      id: `item_${Date.now()}`,
      name: item.name,
      brand: item.store,
      price: parseFloat(item.price) || 0,
      notes: item.notes,
      store: item.store,
      url: item.url,
      timestamp: new Date().toISOString()
    };

    // Add to cart items with persistence
    const updatedItems = addCartItem(newItem);
    setCartItems(updatedItems);
    setTryOnCount(getTotalItemsCount());

    // Show notification and open cart modal
    setNotification({
      open: true,
      message: `${item.name} added to your try-on list`,
      severity: 'success'
    });

    // Open the cart modal to show the added item
    setTimeout(() => {
      setCartModalOpen(true);
    }, 500);
  };

  // Handle removing item from cart with persistence
  const handleRemoveFromCart = (itemId) => {
    const updatedItems = removeCartItem(itemId);
    setCartItems(updatedItems);
    setTryOnCount(getTotalItemsCount());
  };

  // Handle clearing the entire cart with persistence
  const handleClearCart = () => {
    clearCart();
    setCartItems([]);
    setTryOnCount(uploadedImages.length > 0 ? 1 : 0);
  };

  // Handle quantity updates for cart items
  const handleQuantityChange = (itemId, delta) => {
    const updatedItems = updateCartItemQuantity(itemId, delta);
    setCartItems(updatedItems);
    setTryOnCount(getTotalItemsCount());
  };

  // Handle saving uploaded images with persistence
  const handleUploadedImagesChange = (images) => {
    saveUploadedImages(images);
    setUploadedImages(images);
    setTryOnCount(getTotalItemsCount());
  };

  // Handle notification close
  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  // If splash screen is active, render minimal splash screen
  if (showSplash) {
    return (
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: theme.palette.background.default
        }}
      >
        <Box
          component="img"
          src="/tuhme-logo.png"
          alt="TUHME - Cloud Supply Chain Platform"
          sx={{
            width: { xs: '60%', sm: '40%', md: '25%' },
            maxWidth: '200px',
            mb: 3
          }}
        />
        <CircularProgress size={24} sx={{ color: theme.palette.primary.main }} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Responsive Navigation Bar */}
      <ResponsiveNavbar 
        cartItemsCount={tryOnCount}
        onCartOpen={() => setCartModalOpen(true)}
      />
      
      {/* Floating cart icon (mobile only) */}
      <Box
        sx={{
          position: 'fixed',
          top: 80,
          right: 20,
          zIndex: theme.zIndex.appBar,
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 1
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCartModalOpen(true)}
          sx={{
            borderRadius: '50%',
            minWidth: 0,
            width: 56,
            height: 56,
            boxShadow: theme.shadows.lg,
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: theme.shadows.xl
            }
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {tryOnCount > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.secondary.main,
                  color: 'white',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}
              >
                {tryOnCount}
              </Box>
            )}
          </Box>
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowSavi(true)}
          sx={{
            borderRadius: '50%',
            minWidth: 0,
            width: 56,
            height: 56,
            boxShadow: theme.shadows.lg,
            backgroundColor: theme.palette.secondary.main,
            '&:hover': {
              backgroundColor: theme.palette.secondary.dark,
              transform: 'translateY(-3px)',
              boxShadow: theme.shadows.xl
            }
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
      </Box>

      {/* Hero Section */}
      <main id="main-content">
        <Hero slides={heroSlides} />

        {/* Store Logo Carousel Section */}
        <StoreLogoCarousel onStoreSelect={handleStoreSelect} />

        {/* How It Works Section */}
        <Box
          sx={{
            py: { xs: 6, md: 10 },
            backgroundColor: 'background.default'
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              align="center"
              sx={{
                mb: 2,
                fontWeight: theme.typography.fontWeightBold,
                letterSpacing: theme.typography.tighter
              }}
            >
              The TUHME Experience
            </Typography>

            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              sx={{
                mb: 6,
                maxWidth: 700,
                mx: 'auto',
                fontSize: { xs: theme.typography.body1.fontSize, md: theme.typography.h6.fontSize },
              }}
            >
              Your personal shopping concierge for Manhattan's finest luxury boutiques
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: theme.shape.borderRadius,
                    backgroundColor: 'rgba(0,133,91,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.shadows.md
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      backgroundColor: 'primary.main',
                      color: 'white',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      mb: 3
                    }}
                  >
                    1
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: theme.typography.fontWeightMedium }}>
                    Browse & Select
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Explore curated collections or upload an image of an item you're looking for.
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: theme.shape.borderRadius,
                    backgroundColor: 'rgba(0,133,91,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.shadows.md
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      backgroundColor: 'primary.main',
                      color: 'white',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      mb: 3
                    }}
                  >
                    2
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: theme.typography.fontWeightMedium }}>
                    Schedule Delivery
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Choose a convenient time slot for your garments to be delivered to your door.
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: theme.shape.borderRadius,
                    backgroundColor: 'rgba(0,133,91,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.shadows.md
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      backgroundColor: 'primary.main',
                      color: 'white',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      mb: 3
                    }}
                  >
                    3
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: theme.typography.fontWeightMedium }}>
                    Try At Home
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Experience the luxury in the comfort of your own space with no pressure.
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: theme.shape.borderRadius,
                    backgroundColor: 'rgba(0,133,91,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.shadows.md
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      backgroundColor: 'primary.main',
                      color: 'white',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      mb: 3
                    }}
                  >
                    4
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: theme.typography.fontWeightMedium }}>
                    Purchase or Return
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Keep what you love, schedule a pick-up for the rest. Pay only for what you keep.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Button
                variant="contained"
                color="primary"
                href="/how-it-works"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: theme.shape.borderRadius * 2,
                  boxShadow: theme.shadows.md,
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: theme.shadows.lg
                  }
                }}
              >
                Learn More
              </Button>
            </Box>
          </Container>
        </Box>

        {/* WhatsApp Express Section */}
        <Box
          sx={{
            py: { xs: 6, md: 8 },
            backgroundColor: '#25D366', // WhatsApp green
            color: 'white'
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography
                  variant="h3"
                  sx={{
                    mb: 2,
                    fontWeight: theme.typography.fontWeightBold,
                    letterSpacing: theme.typography.tighter
                  }}
                >
                  WhatsApp Express Service
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    fontWeight: theme.typography.fontWeightRegular
                  }}
                >
                  Connect with our concierge team instantly via WhatsApp
                </Typography>

                <Typography variant="body1" sx={{ mb: 4 }}>
                  Our dedicated stylists are available 7 days a week to help you with:
                </Typography>

                <Grid container spacing={2} sx={{ mb: 4 }}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{
                        mr: 2,
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 3L19 12L5 21V3Z" fill="white"/>
                        </svg>
                      </Box>
                      <Typography variant="body1">Express item requests</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{
                        mr: 2,
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 3L19 12L5 21V3Z" fill="white"/>
                        </svg>
                      </Box>
                      <Typography variant="body1">Same-day delivery</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{
                        mr: 2,
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 3L19 12L5 21V3Z" fill="white"/>
                        </svg>
                      </Box>
                      <Typography variant="body1">Personalized styling advice</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{
                        mr: 2,
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 3L19 12L5 21V3Z" fill="white"/>
                        </svg>
                      </Box>
                      <Typography variant="body1">Special in-store appointments</Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  color="primary"
                  href="https://api.whatsapp.com/send/?phone=16465889916&type=phone_number&app_absent=0"
                  target="_blank"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: theme.shape.borderRadius * 2,
                    backgroundColor: 'white',
                    color: '#25D366',
                    boxShadow: theme.shadows.md,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      transform: 'translateY(-3px)',
                      boxShadow: theme.shadows.lg
                    }
                  }}
                  startIcon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.3547 4.5973C17.3204 2.5629 14.5457 1.4286 11.6139 1.4286C5.55437 1.4286 0.627792 6.35515 0.627792 12.4147C0.627792 14.3519 1.1332 16.2459 2.07684 17.9106L0.540649 23.5714L6.34158 22.0714C7.93684 22.9291 9.75148 23.3939 11.6048 23.3939H11.6139C17.6643 23.3939 22.5909 18.4674 22.5909 12.4079C22.5909 9.47608 21.389 6.63172 19.3547 4.5973ZM11.6139 21.5174C9.96879 21.5174 8.36263 21.0708 6.96514 20.2313L6.62513 20.0286L3.18873 20.8954L4.07244 17.5557L3.84873 17.1993C2.92513 15.7416 2.43244 14.102 2.43244 12.4147C2.43244 7.39172 6.59078 3.23337 11.6229 3.23337C14.0411 3.23337 16.3239 4.17701 18.0138 5.87608C19.7038 7.57515 20.7956 9.85798 20.7865 12.4079C20.7865 17.44 16.6371 21.5174 11.6139 21.5174ZM16.6189 14.8714C16.3419 14.7339 15.0128 14.0812 14.7539 13.9889C14.4951 13.8966 14.3072 13.8504 14.1194 14.1364C13.9315 14.4225 13.415 15.0209 13.2454 15.2088C13.0757 15.3966 12.9061 15.4159 12.6291 15.2784C11.0429 14.4851 9.99339 13.8596 8.9348 12.0737C8.65599 11.5809 9.22696 11.6193 9.7548 10.5663C9.84709 10.3784 9.80098 10.2139 9.7277 10.0764C9.65441 9.93886 9.10348 8.60977 8.86878 8.04699C8.64307 7.50244 8.40837 7.57572 8.22962 7.57572C8.06168 7.57572 7.87383 7.55665 7.68599 7.55665C7.49814 7.55665 7.19335 7.62994 6.93452 7.90696C6.67568 8.18398 5.97794 8.83665 5.97794 10.1657C5.97794 11.4948 6.96514 12.7777 7.10896 12.9656C7.2528 13.1534 9.08496 16.0392 11.952 17.2147C13.6958 17.9557 14.3666 17.9919 15.2231 17.8636C15.7379 17.7804 16.8023 17.2057 17.037 16.5511C17.2718 15.8966 17.2718 15.3429 17.1985 15.2178C17.134 15.0827 16.9462 15.009 16.6189 14.8714Z" fill="currentColor"/>
                    </svg>
                  }
                >
                  Start WhatsApp Chat
                </Button>
              </Grid>

              <Grid item xs={12} md={5}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=800&q=80"
                  alt="WhatsApp Express Service"
                  sx={{
                    width: '100%',
                    borderRadius: theme.shape.borderRadius,
                    boxShadow: theme.shadows.lg
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </main>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 6,
          borderTop: '1px solid #eee',
          mt: 'auto',
          backgroundColor: theme.palette.background.default
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box
                component="img"
                src="/tuhme-logo.png"
                alt="TUHME"
                sx={{
                  height: 40,
                  mb: 2
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Your home. Your style. Your time.
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: theme.typography.fontWeightMedium, mb: 2 }}>
                TUHME
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography
                    variant="body2"
                    component="a"
                    href="/about"
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
                    About Us
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography
                    variant="body2"
                    component="a"
                    href="/careers"
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
                    Careers
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography
                    variant="body2"
                    component="a"
                    href="/press"
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
                    Press
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: theme.typography.fontWeightMedium, mb: 2 }}>
                Services
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography
                    variant="body2"
                    component="a"
                    href="/how-it-works"
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
                    How It Works
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography
                    variant="body2"
                    component="a"
                    href="/pricing"
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
                    Pricing
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography
                    variant="body2"
                    component="a"
                    href="/membership"
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
                    Membership
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: theme.typography.fontWeightMedium, mb: 2 }}>
                Support
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography
                    variant="body2"
                    component="a"
                    href="/help"
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
                    Help Center
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography
                    variant="body2"
                    component="a"
                    href="/contact"
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
                    Contact Us
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography
                    variant="body2"
                    component="a"
                    href="/privacy"
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
                    Privacy Policy
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography
                    variant="body2"
                    component="a"
                    href="/terms"
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
                    Terms of Service
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: theme.typography.fontWeightMedium, mb: 2 }}>
                Connect
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton
                  component="a"
                  href="https://www.instagram.com/tuh.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TUHME on Instagram"
                  sx={{
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5932 15.1514 13.8416 15.5297C13.0901 15.9079 12.2385 16.0396 11.4078 15.9059C10.5771 15.7723 9.80977 15.3801 9.21485 14.7852C8.61993 14.1902 8.22774 13.4229 8.09408 12.5922C7.96042 11.7615 8.09208 10.9099 8.47034 10.1584C8.8486 9.40685 9.4542 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </IconButton>

                <IconButton
                  component="a"
                  href="https://www.tiktok.com/@tuh.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TUHME on TikTok"
                  sx={{
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12C6.23858 12 4 14.2386 4 17C4 19.7614 6.23858 22 9 22C11.7614 22 14 19.7614 14 17V12H9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 12V8C14 5.23858 16.2386 3 19 3V7C21.7614 7 24 4.76142 24 2H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </IconButton>

                <IconButton
                  component="a"
                  href="https://api.whatsapp.com/send/?phone=16465889916&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TUHME on WhatsApp"
                  sx={{
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.3547 4.5973C17.3204 2.5629 14.5457 1.4286 11.6139 1.4286C5.55437 1.4286 0.627792 6.35515 0.627792 12.4147C0.627792 14.3519 1.1332 16.2459 2.07684 17.9106L0.540649 23.5714L6.34158 22.0714C7.93684 22.9291 9.75148 23.3939 11.6048 23.3939H11.6139C17.6643 23.3939 22.5909 18.4674 22.5909 12.4079C22.5909 9.47608 21.389 6.63172 19.3547 4.5973ZM11.6139 21.5174C9.96879 21.5174 8.36263 21.0708 6.96514 20.2313L6.62513 20.0286L3.18873 20.8954L4.07244 17.5557L3.84873 17.1993C2.92513 15.7416 2.43244 14.102 2.43244 12.4147C2.43244 7.39172 6.59078 3.23337 11.6229 3.23337C14.0411 3.23337 16.3239 4.17701 18.0138 5.87608C19.7038 7.57515 20.7956 9.85798 20.7865 12.4079C20.7865 17.44 16.6371 21.5174 11.6139 21.5174ZM16.6189 14.8714C16.3419 14.7339 15.0128 14.0812 14.7539 13.9889C14.4951 13.8966 14.3072 13.8504 14.1194 14.1364C13.9315 14.4225 13.415 15.0209 13.2454 15.2088C13.0757 15.3966 12.9061 15.4159 12.6291 15.2784C11.0429 14.4851 9.99339 13.8596 8.9348 12.0737C8.65599 11.5809 9.22696 11.6193 9.7548 10.5663C9.84709 10.3784 9.80098 10.2139 9.7277 10.0764C9.65441 9.93886 9.10348 8.60977 8.86878 8.04699C8.64307 7.50244 8.40837 7.57572 8.22962 7.57572C8.06168 7.57572 7.87383 7.55665 7.68599 7.55665C7.49814 7.55665 7.19335 7.62994 6.93452 7.90696C6.67568 8.18398 5.97794 8.83665 5.97794 10.1657C5.97794 11.4948 6.96514 12.7777 7.10896 12.9656C7.2528 13.1534 9.08496 16.0392 11.952 17.2147C13.6958 17.9557 14.3666 17.9919 15.2231 17.8636C15.7379 17.7804 16.8023 17.2057 17.037 16.5511C17.2718 15.8966 17.2718 15.3429 17.1985 15.2178C17.134 15.0827 16.9462 15.009 16.6189 14.8714Z" fill="currentColor"/>
                  </svg>
                </IconButton>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} TUHME, Inc. All rights reserved.
          </Typography>
        </Container>
      </Box>

      {/* Savi AI Assistant */}
      {showSavi && (
        <SaviAIAssistant
          onClose={() => setShowSavi(false)}
          storeName="TUHME Luxury"
        />
      )}

      {/* Cart Modal Component */}
      <CartModal
        open={cartModalOpen}
        onClose={() => setCartModalOpen(false)}
        cartItems={cartItems}
        uploadedImages={uploadedImages}
        onImagesChange={handleUploadedImagesChange}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onQuantityChange={handleQuantityChange}
      />

      {/* Store Web Browser - shown when a store is selected */}
      {storeBrowserOpen && selectedStore && (
        <Box className="store-browser-overlay" sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: theme.zIndex.modal,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: { xs: 2, md: 4 }
        }}>
          <Box className="store-browser-container" sx={{
            width: '100%',
            height: '100%',
            maxWidth: 1200,
            backgroundColor: 'background.paper',
            borderRadius: theme.shape.borderRadius,
            overflow: 'hidden',
            boxShadow: theme.shadows.xl,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <StoreWebBrowser
              storeName={selectedStore.name}
              storeUrl={selectedStore.url}
              onClose={() => setStoreBrowserOpen(false)}
              onSaveItem={handleSaveItemFromStore}
            />
          </Box>
        </Box>
      )}

      {/* Express Order Modal - shown after store link is opened in new tab */}
      <ExpressOrderModal
        open={expressOrderModalOpen}
        onClose={() => setExpressOrderModalOpen(false)}
        storeName={selectedStore?.name}
      />

      {/* Notifications */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleNotificationClose}
          severity={notification.severity}
          elevation={6}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
      
      {/* Navigation Warning Modal */}
      <NavigationWarningModal 
        open={navigationWarningOpen}
        onClose={() => setNavigationWarningOpen(false)}
        destination={destinationUrl}
        destinationName={selectedStore?.name || 'the store'}
      />
    </Box>
  );
};

export default TuhmeApp;
