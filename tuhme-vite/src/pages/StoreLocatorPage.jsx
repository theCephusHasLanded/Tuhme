import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { collection, doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Button,
  Card,
  CardContent,
  CardActions,
  Dialog,
  Avatar,
  IconButton,
  Alert,
  Snackbar,
  useTheme,
  Link,
  Rating,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  ShoppingBag as ShoppingBagIcon,
  Star as StarIcon,
  InfoOutlined as InfoIcon,
  Language as WebIcon,
  Delete as DeleteIcon,
  MyLocation as MyLocationIcon,
  Phone as PhoneIcon,
  AccessTime as TimeIcon,
  Bookmark as BookmarkIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import FreeMap from '../components/FreeMap';
import StoreWebBrowser from '../components/StoreWebBrowser';

// Luxury stores data with detailed information
const luxuryStores = [
  {
    id: 1,
    name: 'Saks Fifth Avenue',
    category: 'Department Store',
    logo: '/assets/logos/saks_fifth_avenue.svg',
    location: { lat: 40.7587, lng: -73.9776 },
    address: '611 5th Ave, New York, NY 10022',
    phone: '+1 (212) 753-4000',
    website: 'https://www.saksfifthavenue.com',
    hours: 'Mon-Sat: 10AM-8PM, Sun: 11AM-7PM',
    description: 'Iconic luxury department store offering high-end designer clothing, accessories, and home goods.',
    rating: 4.5,
    tags: ['Designer Fashion', 'Luxury', 'Department Store'],
    image: 'https://images.unsplash.com/photo-1581079383252-99f32c01ad18?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Bergdorf Goodman',
    category: 'Luxury',
    logo: '/assets/logos/bergdorf_goodman.svg',
    location: { lat: 40.7633, lng: -73.9740 },
    address: '754 5th Ave, New York, NY 10019',
    phone: '+1 (212) 753-7300',
    website: 'https://www.bergdorfgoodman.com',
    hours: 'Mon-Sat: 11AM-7PM, Sun: 12PM-6PM',
    description: 'Historic luxury department store known for its curated selection of designer fashion and extraordinary service.',
    rating: 4.7,
    tags: ['Designer Fashion', 'Luxury', 'Department Store'],
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Tiffany & Co.',
    category: 'Jewelry',
    logo: '/assets/logos/tiffany_and_co.svg',
    location: { lat: 40.7625, lng: -73.9739 },
    address: '727 5th Ave, New York, NY 10022',
    phone: '+1 (212) 755-8000',
    website: 'https://www.tiffany.com',
    hours: 'Mon-Sat: 10AM-7PM, Sun: 12PM-6PM',
    description: 'Renowned luxury jewelry store famous for its diamond engagement rings and sterling silver designs.',
    rating: 4.8,
    tags: ['Jewelry', 'Luxury', 'Gifts'],
    image: 'https://images.unsplash.com/photo-1583445095369-9c651e9e227d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'Gucci',
    category: 'Luxury',
    logo: '/assets/logos/gucci.svg',
    location: { lat: 40.7635, lng: -73.9729 },
    address: '725 5th Ave, New York, NY 10022',
    phone: '+1 (212) 826-2600',
    website: 'https://www.gucci.com',
    hours: 'Mon-Sat: 11AM-7PM, Sun: 12PM-6PM',
    description: 'Italian luxury fashion house offering clothing, leather goods, shoes, and accessories.',
    rating: 4.6,
    tags: ['Designer Fashion', 'Luxury', 'Accessories'],
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    name: 'Louis Vuitton',
    category: 'Luxury',
    logo: '/assets/logos/louis_vuitton.svg',
    location: { lat: 40.7640, lng: -73.9733 },
    address: '1 E 57th St, New York, NY 10022',
    phone: '+1 (212) 758-8877',
    website: 'https://www.louisvuitton.com',
    hours: 'Mon-Sat: 10AM-8PM, Sun: 12PM-6PM',
    description: 'French luxury fashion house specializing in leather goods, ready-to-wear, accessories, and more.',
    rating: 4.7,
    tags: ['Designer Fashion', 'Luxury', 'Leather Goods'],
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    name: 'Bloomingdale\'s',
    category: 'Department Store',
    logo: '/assets/logos/bloomingdales.svg',
    location: { lat: 40.7623, lng: -73.9669 },
    address: '1000 3rd Ave, New York, NY 10022',
    phone: '+1 (212) 705-2000',
    website: 'https://www.bloomingdales.com',
    hours: 'Mon-Sat: 10AM-9PM, Sun: 11AM-7PM',
    description: 'Upscale department store chain offering designer clothing, accessories, and home goods.',
    rating: 4.3,
    tags: ['Designer Fashion', 'Department Store', 'Home Goods'],
    image: 'https://images.unsplash.com/photo-1531190260877-c8d11eb5afaf?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 7,
    name: 'Prada',
    category: 'Luxury',
    logo: '/assets/logos/prada.svg',
    location: { lat: 40.7638, lng: -73.9726 },
    address: '724 5th Ave, New York, NY 10019',
    phone: '+1 (212) 664-0010',
    website: 'https://www.prada.com',
    hours: 'Mon-Sat: 10AM-7PM, Sun: 12PM-6PM',
    description: 'Italian luxury fashion house specializing in leather handbags, shoes, ready-to-wear, and accessories.',
    rating: 4.5,
    tags: ['Designer Fashion', 'Luxury', 'Handbags'],
    image: 'https://images.unsplash.com/photo-1577166071289-182afe156856?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 8,
    name: 'Fendi',
    category: 'Luxury',
    logo: '/assets/logos/fendi.svg',
    location: { lat: 40.7638, lng: -73.9723 },
    address: '598 Madison Ave, New York, NY 10022',
    phone: '+1 (212) 897-2244',
    website: 'https://www.fendi.com',
    hours: 'Mon-Sat: 10AM-6PM, Sun: 12PM-5PM',
    description: 'Italian luxury fashion house specializing in handbags, ready-to-wear, accessories, and fur.',
    rating: 4.4,
    tags: ['Designer Fashion', 'Luxury', 'Handbags'],
    image: 'https://images.unsplash.com/photo-1591465001609-ded6360ecaab?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 9,
    name: 'Arc\'teryx',
    category: 'Outdoor Clothing',
    logo: '/assets/logos/arcteryx.svg',
    location: { lat: 40.7245, lng: -73.9976 },
    address: '165 Mercer St, New York, NY 10012',
    phone: '+1 (212) 226-8311',
    website: 'https://www.arcteryx.com',
    hours: 'Mon-Sat: 11AM-7PM, Sun: 11AM-6PM',
    description: 'High-performance outdoor equipment and clothing retailer known for technical fabrics and design.',
    rating: 4.6,
    tags: ['Outdoor', 'Performance Wear', 'Technical'],
    image: 'https://images.unsplash.com/photo-1520027011837-ed5b16320969?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 10,
    name: 'New Balance',
    category: 'Athletic Wear',
    logo: '/assets/logos/new_balance.svg',
    location: { lat: 40.7234, lng: -73.9987 },
    address: '150 5th Ave, New York, NY 10011',
    phone: '+1 (212) 727-2520',
    website: 'https://www.newbalance.com',
    hours: 'Mon-Sun: 10AM-8PM',
    description: 'Athletic footwear and apparel company with a focus on running shoes and lifestyle products.',
    rating: 4.2,
    tags: ['Athletic', 'Footwear', 'Sportswear'],
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 11,
    name: 'Miu Miu',
    category: 'Luxury',
    logo: '/assets/logos/miu_miu.svg',
    location: { lat: 40.7645, lng: -73.9730 },
    address: '11 E 57th St, New York, NY 10022',
    phone: '+1 (212) 641-2980',
    website: 'https://www.miumiu.com',
    hours: 'Mon-Sat: 11AM-7PM, Sun: 12PM-6PM',
    description: 'Luxury fashion house founded by Miuccia Prada, known for its playful and feminine designs.',
    rating: 4.3,
    tags: ['Designer Fashion', 'Luxury', 'Women\'s Fashion'],
    image: 'https://images.unsplash.com/photo-1590756214573-68d66520269a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 12,
    name: 'Loro Piana',
    category: 'Luxury',
    logo: '/assets/logos/loro_piana.svg',
    location: { lat: 40.7648, lng: -73.9718 },
    address: '745 5th Ave, New York, NY 10151',
    phone: '+1 (212) 980-7960',
    website: 'https://www.loropiana.com',
    hours: 'Mon-Sat: 10AM-6PM, Sun: Closed',
    description: 'Italian luxury fashion house specializing in high-end cashmere and wool products.',
    rating: 4.7,
    tags: ['Designer Fashion', 'Luxury', 'Cashmere'],
    image: 'https://images.unsplash.com/photo-1634731167601-e2e2e7842809?auto=format&fit=crop&w=800&q=80'
  }
];

const StoreLocatorPage = () => {
  const theme = useTheme();
  const [selectedStores, setSelectedStores] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [webBrowserOpen, setWebBrowserOpen] = useState(false);
  const [webBrowserInfo, setWebBrowserInfo] = useState({ storeName: '', storeUrl: '' });
  const [savedItems, setSavedItems] = useState([]);
  const [locationAlert, setLocationAlert] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [filteredStores, setFilteredStores] = useState(luxuryStores);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [storeDetailOpen, setStoreDetailOpen] = useState(false);
  const { currentUser } = useAuth();
  
  // Available categories for filtering
  const categories = [...new Set(luxuryStores.map(store => store.category))];
  
  // All available tags for filtering
  const allTags = [...new Set(luxuryStores.flatMap(store => store.tags))].sort();
  
  // Load saved shops from Firebase when user logs in
  useEffect(() => {
    const loadSavedShops = async () => {
      if (!currentUser) return;
      
      try {
        const userShopsRef = doc(db, 'users', currentUser.uid, 'preferences', 'shoppingList');
        const docSnap = await getDoc(userShopsRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.shops && Array.isArray(data.shops)) {
            setShoppingCart(data.shops);
          }
        }

        // Also load saved items
        const userItemsRef = doc(db, 'users', currentUser.uid, 'preferences', 'savedItems');
        const itemsSnap = await getDoc(userItemsRef);
        
        if (itemsSnap.exists()) {
          const data = itemsSnap.data();
          if (data.items && Array.isArray(data.items)) {
            setSavedItems(data.items);
          }
        }
      } catch (error) {
        console.error('Error loading saved shops:', error);
      }
    };
    
    loadSavedShops();
  }, [currentUser]);
  
  // Get user's current location
  const getUserLocation = () => {
    setLocationAlert(true);
    
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by your browser');
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        setLocationAlert(false);
        
        // Sort stores by distance from user
        sortStoresByDistance(location);
      },
      (error) => {
        console.error('Error getting location:', error);
        setLocationAlert(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };
  
  // Sort stores by distance from user
  const sortStoresByDistance = (userLocation) => {
    if (!userLocation) return;
    
    // Calculate distance for each store
    const storesWithDistance = luxuryStores.map(store => {
      const distance = calculateDistance(
        userLocation.lat, 
        userLocation.lng,
        store.location.lat,
        store.location.lng
      );
      
      return { ...store, distance };
    });
    
    // Sort by distance
    storesWithDistance.sort((a, b) => a.distance - b.distance);
    setFilteredStores(storesWithDistance);
  };
  
  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in km
    
    return distance;
  };
  
  // Search and filter stores
  useEffect(() => {
    let results = luxuryStores;
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(store => 
        store.name.toLowerCase().includes(term) || 
        store.description.toLowerCase().includes(term) ||
        store.category.toLowerCase().includes(term) ||
        store.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    // Apply category/tag filters
    if (selectedFilters.length > 0) {
      results = results.filter(store => 
        selectedFilters.includes(store.category) || 
        store.tags.some(tag => selectedFilters.includes(tag))
      );
    }
    
    // Sort by distance if user location is available
    if (userLocation) {
      results = [...results].sort((a, b) => {
        const distanceA = calculateDistance(
          userLocation.lat, 
          userLocation.lng,
          a.location.lat,
          a.location.lng
        );
        
        const distanceB = calculateDistance(
          userLocation.lat, 
          userLocation.lng,
          b.location.lat,
          b.location.lng
        );
        
        return distanceA - distanceB;
      });
    }
    
    setFilteredStores(results);
  }, [searchTerm, selectedFilters, userLocation]);
  
  // Toggle filter selection
  const handleFilterToggle = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };
  
  // Handle store selection
  const handleStoreSelect = (store) => {
    setSelectedStore(store);
    setStoreDetailOpen(true);
  };
  
  // Handle store website open
  const handleOpenStoreWebsite = (store) => {
    setWebBrowserInfo({
      storeName: store.name,
      storeUrl: store.website,
      storeType: store.category
    });
    setWebBrowserOpen(true);
  };
  
  // Add store to shopping cart
  const handleAddToCart = async (store) => {
    if (shoppingCart.find(item => item === store.name)) {
      return; // Store already in cart
    }
    
    // Update local state
    const updatedCart = [...shoppingCart, store.name];
    setShoppingCart(updatedCart);
    
    // Save to Firebase if user is logged in
    if (currentUser) {
      try {
        setSaving(true);
        const userShopsRef = doc(db, 'users', currentUser.uid, 'preferences', 'shoppingList');
        
        await setDoc(userShopsRef, {
          shops: updatedCart,
          updatedAt: serverTimestamp()
        });
        
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      } catch (error) {
        console.error('Error saving shops to Firebase:', error);
      } finally {
        setSaving(false);
      }
    }
  };
  
  // Remove store from shopping cart
  const handleRemoveFromCart = async (storeName) => {
    const updatedCart = shoppingCart.filter(name => name !== storeName);
    setShoppingCart(updatedCart);
    
    // Update Firebase if user is logged in
    if (currentUser) {
      try {
        setSaving(true);
        const userShopsRef = doc(db, 'users', currentUser.uid, 'preferences', 'shoppingList');
        
        await setDoc(userShopsRef, {
          shops: updatedCart,
          updatedAt: serverTimestamp()
        });
      } catch (error) {
        console.error('Error updating shops in Firebase:', error);
      } finally {
        setSaving(false);
      }
    }
  };
  
  // Close the store details modal
  const handleCloseStoreDetail = () => {
    setStoreDetailOpen(false);
  };
  
  // Close web browser
  const handleCloseWebBrowser = () => {
    setWebBrowserOpen(false);
  };
  
  // Save item from web browser
  const handleSaveItem = async (item) => {
    // Add to local state
    const updatedItems = [...savedItems, item];
    setSavedItems(updatedItems);
    
    // Save to Firebase if user is logged in
    if (currentUser) {
      try {
        setSaving(true);
        const userItemsRef = doc(db, 'users', currentUser.uid, 'preferences', 'savedItems');
        
        await setDoc(userItemsRef, {
          items: updatedItems,
          updatedAt: serverTimestamp()
        });
        
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      } catch (error) {
        console.error('Error saving items to Firebase:', error);
      } finally {
        setSaving(false);
      }
    }
  };
  
  // Remove saved item
  const handleRemoveSavedItem = async (itemIndex) => {
    const updatedItems = savedItems.filter((_, index) => index !== itemIndex);
    setSavedItems(updatedItems);
    
    // Update Firebase if user is logged in
    if (currentUser) {
      try {
        setSaving(true);
        const userItemsRef = doc(db, 'users', currentUser.uid, 'preferences', 'savedItems');
        
        await setDoc(userItemsRef, {
          items: updatedItems,
          updatedAt: serverTimestamp()
        });
      } catch (error) {
        console.error('Error updating saved items in Firebase:', error);
      } finally {
        setSaving(false);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ my: { xs: 2, md: 4 }, px: { xs: 2, md: 3 } }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ 
          mb: 1, 
          fontWeight: 700,
          fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' }
        }}>
          Luxury Store Locator
        </Typography>
        
        <Typography variant="subtitle1" sx={{ 
          mb: 2, 
          color: 'text.secondary',
          fontSize: { xs: '0.875rem', md: '1rem' }
        }}>
          Discover luxury shopping near your location. Our concierge will visit these stores for you and deliver items for you to try on at home.
        </Typography>
      </Box>
      
      {/* Location Permission Alert */}
      <Snackbar
        open={locationAlert}
        autoHideDuration={6000}
        onClose={() => setLocationAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setLocationAlert(false)} 
          severity="info" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          Allow location access to find luxury stores near you
        </Alert>
      </Snackbar>
      
      {/* Success message */}
      {savedSuccess && (
        <Alert 
          severity="success" 
          sx={{ mb: 3 }}
          onClose={() => setSavedSuccess(false)}
        >
          Your selection has been saved successfully!
        </Alert>
      )}
      
      {/* Map and Filters Panel */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
        {/* Map */}
        <Paper 
          elevation={2} 
          sx={{ 
            flex: 2,
            overflow: 'hidden', 
            borderRadius: 2,
            height: { xs: '300px', md: '500px' }
          }}
        >
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            {/* Map component */}
            <FreeMap 
              stores={luxuryStores}
              onShopSelect={(store) => handleStoreSelect(store)}
            />
            
            {/* Map overlay */}
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 10, 
                right: 10,
                zIndex: 900,
                display: 'flex',
                flexDirection: 'column',
                gap: 1
              }}
            >
              <Button 
                variant="contained" 
                color="primary"
                size="small"
                startIcon={<MyLocationIcon />}
                onClick={getUserLocation}
                sx={{ 
                  borderRadius: 4,
                  boxShadow: 2,
                  px: 2
                }}
              >
                Find Stores Near Me
              </Button>
            </Box>
          </Box>
        </Paper>
        
        {/* Search and Filters */}
        <Paper 
          elevation={2} 
          sx={{ 
            flex: 1,
            p: 3, 
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          {/* Search Box */}
          <TextField
            fullWidth
            placeholder="Search for luxury stores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            size="small"
            sx={{ mb: 2 }}
          />
          
          {/* Category Filters */}
          <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1 }}>
            Filter by Category
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                clickable
                color={selectedFilters.includes(category) ? 'primary' : 'default'}
                onClick={() => handleFilterToggle(category)}
                size="small"
              />
            ))}
          </Box>
          
          {/* Tag Filters */}
          <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1 }}>
            Filter by Tags
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {allTags.slice(0, 10).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                clickable
                color={selectedFilters.includes(tag) ? 'primary' : 'default'}
                onClick={() => handleFilterToggle(tag)}
                size="small"
                variant="outlined"
              />
            ))}
          </Box>
          
          {/* Reset Filters */}
          {(searchTerm || selectedFilters.length > 0) && (
            <Button 
              variant="outlined" 
              color="primary" 
              size="small" 
              onClick={() => {
                setSearchTerm('');
                setSelectedFilters([]);
              }}
              sx={{ alignSelf: 'flex-end', mt: 2 }}
            >
              Reset Filters
            </Button>
          )}
        </Paper>
      </Box>
      
      {/* Stores Grid Display */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {filteredStores.length} {filteredStores.length === 1 ? 'Store' : 'Stores'} Available
          {userLocation && ' Near You'}
        </Typography>
        
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { 
              xs: '1fr', 
              sm: 'repeat(2, 1fr)', 
              md: 'repeat(3, 1fr)', 
              lg: 'repeat(4, 1fr)' 
            },
            gap: 2
          }}
        >
          {filteredStores.map((store) => (
            <Card 
              key={store.id} 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                },
                cursor: 'pointer',
                borderRadius: 2,
                overflow: 'hidden'
              }}
              onClick={() => handleStoreSelect(store)}
            >
              <Box 
                sx={{ 
                  height: 140, 
                  backgroundImage: `url(${store.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}
              >
                <Box 
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: 'background.paper',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 1
                  }}
                >
                  <Avatar 
                    src={store.logo}
                    alt={store.name}
                    sx={{ width: 24, height: 24 }}
                  />
                </Box>
                
                {/* Distance indicator if user location is available */}
                {userLocation && store.distance && (
                  <Chip
                    label={`${store.distance.toFixed(1)} km`}
                    size="small"
                    color="primary"
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      left: 8,
                      fontWeight: 'bold',
                      fontSize: '0.7rem'
                    }}
                  />
                )}
              </Box>
              
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography 
                  variant="subtitle1" 
                  component="div" 
                  sx={{ 
                    fontWeight: 'bold',
                    mb: 0.5,
                    fontSize: '0.95rem',
                    height: 48,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {store.name}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={store.rating} precision={0.5} readOnly size="small" />
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ ml: 0.5, fontSize: '0.75rem' }}
                  >
                    {store.rating}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationIcon fontSize="small" color="action" sx={{ mr: 0.5, fontSize: '1rem' }} />
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: '0.75rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {store.address.split(',')[0]}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Chip 
                    label={store.category} 
                    size="small" 
                    sx={{ fontSize: '0.6rem', height: 20 }}
                  />
                </Box>
              </CardContent>
              
              <CardActions sx={{ p: 1.5, justifyContent: 'space-between' }}>
                <Button 
                  size="small" 
                  startIcon={<InfoIcon />}
                  sx={{ fontSize: '0.7rem' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStoreSelect(store);
                  }}
                >
                  Details
                </Button>
                
                <Button
                  size="small"
                  color="primary"
                  startIcon={<ShoppingBagIcon />}
                  sx={{ fontSize: '0.7rem' }}
                  disabled={shoppingCart.includes(store.name)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(store);
                  }}
                >
                  {shoppingCart.includes(store.name) ? 'Added' : 'Add'}
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
        
        {filteredStores.length === 0 && (
          <Paper 
            sx={{ 
              p: 4, 
              textAlign: 'center', 
              borderRadius: 2,
              backgroundColor: 'background.paper' 
            }}
          >
            <InfoIcon color="action" sx={{ fontSize: 48, opacity: 0.5, mb: 2 }} />
            <Typography variant="h6" gutterBottom>No stores found</Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search criteria or filters.
            </Typography>
            <Button 
              variant="outlined" 
              sx={{ mt: 2 }}
              onClick={() => {
                setSearchTerm('');
                setSelectedFilters([]);
              }}
            >
              Reset Filters
            </Button>
          </Paper>
        )}
      </Box>
      
      {/* Selected shops section - Simplified */}
      <Paper sx={{ p: { xs: 2, md: 3 }, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Your Selected Stores
        </Typography>
        
        {shoppingCart.length > 0 ? (
          <Box>
            <List dense>
              {shoppingCart.map((shop, index) => (
                <ListItem key={index} disablePadding sx={{ py: 1 }}>
                  <ListItemIcon sx={{ minWidth: { xs: 32, md: 40 } }}>
                    <ShoppingBagIcon color="primary" fontSize={window.innerWidth < 600 ? "small" : "medium"} />
                  </ListItemIcon>
                  <ListItemText
                    primary={shop}
                    secondary="Available for your shopper to visit"
                    primaryTypographyProps={{ fontSize: { xs: '0.9rem', md: '1rem' } }}
                    secondaryTypographyProps={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                  />
                </ListItem>
              ))}
            </List>
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: { xs: 'center', md: 'flex-end' }, 
              mt: 2
            }}>
              <Button
                variant="contained"
                color="primary"
                disabled={shoppingCart.length === 0}
                onClick={() => {}}
                startIcon={<StarIcon />}
                size="medium"
              >
                Add to Shopping List
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: { xs: 2, md: 4 } }}>
            <Typography color="text.secondary" paragraph fontSize={{ xs: '0.875rem', md: '1rem' }}>
              Click on the map to select stores where you'd like our shoppers to visit for you.
            </Typography>
            <InfoIcon color="action" sx={{ width: { xs: 30, md: 40 }, height: { xs: 30, md: 40 }, opacity: 0.6 }} />
          </Box>
        )}
      </Paper>
      
      {/* Saved Items Section */}
      <Paper sx={{ p: { xs: 2, md: 3 }, mb: { xs: 2, md: 4 }, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Your Saved Items
        </Typography>
        
        {savedItems.length > 0 ? (
          <Box>
            <List sx={{ mb: 2 }}>
              {savedItems.map((item, index) => (
                <Card key={index} sx={{ mb: 2, boxShadow: 1 }}>
                  <CardContent sx={{ 
                    pb: 1,
                    px: { xs: 1.5, md: 2 },
                    py: { xs: 1, md: 1.5 }
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start'
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          variant="rounded" 
                          sx={{ 
                            mr: 1.5, 
                            bgcolor: 'primary.main', 
                            width: { xs: 32, md: 40 }, 
                            height: { xs: 32, md: 40 } 
                          }}
                        >
                          <ShoppingBagIcon sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" component="div" sx={{ 
                            fontWeight: 600,
                            fontSize: { xs: '0.85rem', md: '1rem' }
                          }}>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary"
                            sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}>
                            {item.store} • {item.price && `$${item.price}`}
                          </Typography>
                        </Box>
                      </Box>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleRemoveSavedItem(index)}
                        sx={{ p: { xs: 0.5, md: 1 } }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    
                    {item.notes && (
                      <Typography variant="body2" sx={{ 
                        mt: 1, 
                        color: 'text.secondary',
                        fontSize: { xs: '0.75rem', md: '0.875rem' }
                      }}>
                        {item.notes}
                      </Typography>
                    )}
                    
                    {item.url && (
                      <Box sx={{ 
                        mt: 1, 
                        fontSize: { xs: '0.7rem', md: '0.75rem' }, 
                        color: 'text.secondary'
                      }}>
                        <WebIcon fontSize="inherit" sx={{ verticalAlign: 'text-bottom', mr: 0.5 }} />
                        {item.url.slice(0, window.innerWidth < 600 ? 20 : 40)}...
                      </Box>
                    )}
                  </CardContent>
                </Card>
              ))}
            </List>
            
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={saving}
              size={window.innerWidth < 600 ? "small" : "medium"}
            >
              Schedule Try-On Delivery
            </Button>
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: { xs: 2, md: 4 } }}>
            <Typography color="text.secondary" paragraph
              sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
              You haven't saved any items yet.
            </Typography>
            <Typography variant="body2" color="text.secondary"
              sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
              Click on stores in the map to browse and save items.
            </Typography>
          </Box>
        )}
      </Paper>
      
      
      {/* Web Browser Dialog - fully responsive */}
      <Dialog
        open={webBrowserOpen}
        onClose={handleCloseWebBrowser}
        fullScreen
        PaperProps={{ 
          sx: { 
            borderRadius: { xs: 0, md: 2 },
            overflow: 'hidden',
            m: { xs: 0, md: 2 },
            height: { xs: '100%', md: 'calc(100% - 32px)' }
          } 
        }}
      >
        <StoreWebBrowser
          storeName={webBrowserInfo.storeName}
          storeUrl={webBrowserInfo.storeUrl}
          onClose={handleCloseWebBrowser}
          onSaveItem={handleSaveItem}
        />
      </Dialog>
      
      {/* Store Detail Dialog */}
      <Dialog
        open={storeDetailOpen}
        onClose={handleCloseStoreDetail}
        maxWidth="md"
        PaperProps={{ 
          sx: { 
            borderRadius: { xs: 2, md: 3 },
            overflow: 'hidden',
            width: '100%'
          }
        }}
      >
        {selectedStore && (
          <>
            <Box 
              sx={{ 
                position: 'relative', 
                height: { xs: 200, md: 300 },
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${selectedStore.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                p: { xs: 2, md: 3 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end'
              }}
            >
              <IconButton
                onClick={handleCloseStoreDetail}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  bgcolor: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                  }
                }}
              >
                <DeleteIcon />
              </IconButton>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar 
                  src={selectedStore.logo} 
                  alt={selectedStore.name}
                  sx={{ 
                    width: { xs: 40, md: 60 }, 
                    height: { xs: 40, md: 60 },
                    border: '2px solid white',
                    boxShadow: 2,
                    mr: 2 
                  }}
                />
                <Box>
                  <Chip 
                    label={selectedStore.category}
                    color="primary"
                    size="small"
                    sx={{ mb: 1, fontWeight: 'bold' }}
                  />
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    sx={{ 
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: { xs: '1.5rem', md: '2rem' },
                      textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
                    }}
                  >
                    {selectedStore.name}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Rating value={selectedStore.rating} precision={0.5} readOnly size="small" />
                <Typography 
                  variant="body2" 
                  sx={{ ml: 1, color: 'white', fontWeight: 'medium' }}
                >
                  {selectedStore.rating} rating
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ p: { xs: 2, md: 3 } }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'medium', mb: 1 }}>About</Typography>
              <Typography variant="body2" paragraph>
                {selectedStore.description}
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {selectedStore.tags.map((tag, index) => (
                  <Chip 
                    key={index}
                    label={tag}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.75rem' }}
                  />
                ))}
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle1" sx={{ fontWeight: 'medium', mb: 1 }}>Contact & Location</Typography>
              
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: 2,
                mb: 3
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationIcon color="primary" sx={{ mr: 1.5 }} />
                  <Typography variant="body2">
                    {selectedStore.address}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PhoneIcon color="primary" sx={{ mr: 1.5 }} />
                  <Link href={`tel:${selectedStore.phone}`} underline="hover">
                    <Typography variant="body2">
                      {selectedStore.phone}
                    </Typography>
                  </Link>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <WebIcon color="primary" sx={{ mr: 1.5 }} />
                  <Link href={selectedStore.website} target="_blank" rel="noopener" underline="hover">
                    <Typography variant="body2">
                      {new URL(selectedStore.website).hostname}
                    </Typography>
                  </Link>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TimeIcon color="primary" sx={{ mr: 1.5 }} />
                  <Typography variant="body2">
                    {selectedStore.hours}
                  </Typography>
                </Box>
              </Box>
              
              {userLocation && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 0.5 }}>
                    Distance from your location:
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MyLocationIcon color="primary" sx={{ mr: 1.5 }} />
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {calculateDistance(
                        userLocation.lat, 
                        userLocation.lng,
                        selectedStore.location.lat,
                        selectedStore.location.lng
                      ).toFixed(2)} km
                    </Typography>
                  </Box>
                </Box>
              )}
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<WebIcon />}
                  onClick={() => handleOpenStoreWebsite(selectedStore)}
                  sx={{ flex: 1 }}
                >
                  Visit Website
                </Button>
                
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ShoppingBagIcon />}
                  onClick={() => {
                    handleAddToCart(selectedStore);
                    handleCloseStoreDetail();
                  }}
                  disabled={shoppingCart.includes(selectedStore.name)}
                  sx={{ flex: 1 }}
                >
                  {shoppingCart.includes(selectedStore.name) ? 'Added to Shopping List' : 'Add to Shopping List'}
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default StoreLocatorPage;