import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import TuhmeApp from './TuhmeApp';
import TuhmeCloudApp from './TuhmeCloudApp';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import ClientsPage from './pages/ClientsPage';
import ClientDetailsPage from './pages/ClientDetailsPage';
import StoreLocatorPage from './pages/StoreLocatorPage';
import NotFoundPage from './pages/NotFoundPage';
import ShopChatbot from './pages/ShopChatbot';
import HowItWorksPage from './pages/HowItWorksPage';
import MyAccountPage from './pages/MyAccountPage';
import CareersPage from './pages/CareersPage';
import PricingPage from './pages/PricingPage';
import MembershipPage from './pages/MembershipPage';

// Components
import ManhattanMap from './components/ManhattanMap';

// Protected Route component
import ProtectedRoute from './components/ProtectedRoute';

// Import theme variables
import theme from './styles/theme';

// Styles - Import new style system
import './styles/index.css';

// Create MUI theme from our custom theme variables
const muiTheme = createTheme({
  palette: {
    primary: {
      main: theme.colors.jamaicanGreen,
      light: theme.colors.vintageTeal,
      dark: theme.colors.carbonBlack,
    },
    secondary: {
      main: theme.colors.palmCoral,
      light: theme.colors.islandSkyBlue,
      dark: theme.colors.reggaeRed,
    },
    background: {
      default: theme.colors.galleryWhite,
      paper: theme.colors.galleryWhite,
      dark: theme.colors.carbonBlack,
    },
    text: {
      primary: theme.colors.carbonBlack,
      secondary: theme.colors.carbonBlack + '99', // 60% opacity
    },
    error: {
      main: theme.colors.reggaeRed,
    },
    warning: {
      main: theme.colors.golfGold,
    },
    success: {
      main: theme.colors.jamaicanGreen,
    },
    info: {
      main: theme.colors.islandSkyBlue,
    },
  },
  typography: {
    fontFamily: theme.typography.primaryFont,
    h1: {
      fontWeight: theme.typography.bold,
      letterSpacing: theme.typography.tighter,
    },
    h2: {
      fontWeight: theme.typography.semibold,
      letterSpacing: theme.typography.tight,
    },
    h3: {
      fontWeight: theme.typography.semibold,
    },
    h4: {
      fontWeight: theme.typography.medium,
    },
    button: {
      fontWeight: theme.typography.medium,
      letterSpacing: theme.typography.wide,
    },
    body1: {
      fontSize: theme.typography.sm,
      lineHeight: theme.typography.normal,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          textTransform: 'none',
          padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
          transition: `all ${theme.animation.normal} ${theme.animation.easeInOut}`,
        },
        containedPrimary: {
          boxShadow: theme.shadows.md,
          '&:hover': {
            boxShadow: theme.shadows.lg,
            transform: 'translateY(-2px)',
          },
        },
        outlinedPrimary: {
          borderWidth: '2px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: theme.borderRadius.lg,
          boxShadow: theme.shadows.md,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: theme.shadows.sm,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: theme.borderRadius.md,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: theme.borderRadius.lg,
        },
      },
    },
  },
  shape: {
    borderRadius: parseInt(theme.borderRadius.md.replace('rem', '')) * 16, // Convert from rem to px
  },
});

function App() {
  // Cart state for synchronized shopping across store websites and Savi
  const [globalCart, setGlobalCart] = useState([]);
  
  // Listen for cart updates from store browsers or Savi assistant
  useEffect(() => {
    const handleCartMessage = (event) => {
      if (event.data && event.data.type === 'addToCart') {
        const newItem = event.data.item;
        if (!newItem) return;
        
        setGlobalCart(prev => {
          const existingItemIndex = prev.findIndex(item => 
            item.id === newItem.id && item.store === newItem.store
          );
          
          if (existingItemIndex >= 0) {
            // Update existing item
            const updatedCart = [...prev];
            updatedCart[existingItemIndex] = {
              ...updatedCart[existingItemIndex],
              quantity: updatedCart[existingItemIndex].quantity + (newItem.quantity || 1)
            };
            return updatedCart;
          } else {
            // Add new item
            return [...prev, { ...newItem, quantity: newItem.quantity || 1 }];
          }
        });
      } else if (event.data && event.data.type === 'requestCart') {
        // Send cart data back to requesting window
        const requestingStore = event.data.store;
        const relevantItems = globalCart.filter(item => item.store === requestingStore);
        
        if (event.source) {
          event.source.postMessage({
            type: 'cartUpdate',
            items: relevantItems
          }, '*');
        }
      }
    };
    
    window.addEventListener('message', handleCartMessage);
    return () => {
      window.removeEventListener('message', handleCartMessage);
    };
  }, [globalCart]);
  
  // Custom event handler for store website interaction
  useEffect(() => {
    const handleStoreWebsite = (event) => {
      const { storeName, storeUrl, storeType } = event.detail;
      
      // Create an iframe or popup for the store website
      const storeWindow = window.open(
        storeUrl,
        `store_${storeName.replace(/\s+/g, '_')}`,
        'width=1100,height=800,resizable=yes,scrollbars=yes'
      );
      
      // Open Savi assistant for this store
      if (storeWindow) {
        const shopParams = new URLSearchParams();
        shopParams.append('shop', storeName);
        shopParams.append('category', storeType || 'Shopping');
        
        setTimeout(() => {
          window.open(
            `/shop-chatbot?${shopParams.toString()}`,
            'ShopChatbot',
            'width=400,height=600,resizable=yes,scrollbars=yes'
          );
        }, 1000);
      }
    };
    
    window.addEventListener('openStoreWebsite', handleStoreWebsite);
    return () => {
      window.removeEventListener('openStoreWebsite', handleStoreWebsite);
    };
  }, []);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Root shows the Tuhme Luxury Try-On App */}
            <Route path="/" element={<TuhmeApp cartItems={globalCart} />} />
            
            {/* Original app routes */}
            <Route path="/original" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* New pages */}
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/my-account" element={<MyAccountPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/orders" element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/orders/:orderId" element={
              <ProtectedRoute>
                <OrderDetailsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/clients" element={
              <ProtectedRoute>
                <ClientsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/clients/:clientId" element={
              <ProtectedRoute>
                <ClientDetailsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/store-locator" element={
              <ProtectedRoute>
                <StoreLocatorPage />
              </ProtectedRoute>
            } />

            <Route path="/store-locator" element={<StoreLocatorPage cartItems={globalCart} />} />
            
            <Route path="/manhattan-map" element={
              <div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
                <ManhattanMap />
              </div>
            } />
            
            <Route path="/shop-chatbot" element={<ShopChatbot />} />
            
            {/* Direct access to TryOn Experience */}
            <Route path="/try-on" element={<LandingPage />} />
            
            {/* Tuhme Cloud Supply Chain Platform */}
            <Route path="/cloud" element={<TuhmeCloudApp />} />
            
            {/* 404 and redirects */}
            <Route path="/dashboard/*" element={<Navigate to="/dashboard" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;