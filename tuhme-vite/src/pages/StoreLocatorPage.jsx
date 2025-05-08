import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
  Button,
  Stack,
  Paper
} from '@mui/material';
import MapWithWhatsApp from '../components/MapWithWhatsApp';

// Store data
const storeCategories = [
  {
    id: 'luxury',
    name: 'Luxury',
    stores: [
      {
        name: 'Bergdorf Goodman',
        address: '754 5th Ave, New York, NY 10019',
        description: 'Iconic luxury department store offering high-end designer collections.',
        image: 'https://images.unsplash.com/photo-1604584968218-e03c1a715250?auto=format&fit=crop&q=80&w=300&h=200',
        coordinates: { lat: 40.7636, lng: -73.9740 }
      },
      {
        name: 'Gucci',
        address: '725 5th Ave, New York, NY 10022',
        description: 'Flagship store of the renowned Italian luxury fashion house.',
        image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&q=80&w=300&h=200',
        coordinates: { lat: 40.7635, lng: -73.9729 }
      },
      {
        name: 'Louis Vuitton',
        address: '1 E 57th St, New York, NY 10022',
        description: 'Luxurious flagship boutique showcasing the iconic French brand.',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=300&h=200',
        coordinates: { lat: 40.7630, lng: -73.9736 }
      }
    ]
  },
  {
    id: 'department',
    name: 'Department Stores',
    stores: [
      {
        name: 'Saks Fifth Avenue',
        address: '611 5th Ave, New York, NY 10022',
        description: 'Upscale department store with premier designer collections.',
        image: 'https://images.unsplash.com/photo-1582490841511-81e1363603e2?auto=format&fit=crop&q=80&w=300&h=200',
        coordinates: { lat: 40.7587, lng: -73.9776 }
      },
      {
        name: 'Bloomingdale\'s',
        address: '1000 3rd Ave, New York, NY 10022',
        description: 'Iconic department store featuring high-end fashion and accessories.',
        image: 'https://images.unsplash.com/photo-1560258018-558f6b9286d2?auto=format&fit=crop&q=80&w=300&h=200',
        coordinates: { lat: 40.7623, lng: -73.9669 }
      },
      {
        name: 'Nordstrom',
        address: '225 W 57th St, New York, NY 10019',
        description: 'Premier retailer offering designer apparel, shoes, and accessories.',
        image: 'https://images.unsplash.com/photo-1582657118090-af35aefc18d0?auto=format&fit=crop&q=80&w=300&h=200',
        coordinates: { lat: 40.7663, lng: -73.9818 }
      }
    ]
  },
  {
    id: 'boutiques',
    name: 'Designer Boutiques',
    stores: [
      {
        name: 'Chanel',
        address: '15 E 57th St, New York, NY 10022',
        description: 'Elegant boutique featuring the iconic French luxury brand.',
        image: 'https://images.unsplash.com/photo-1588665555327-5c633b00e04b?auto=format&fit=crop&q=80&w=300&h=200',
        coordinates: { lat: 40.7629, lng: -73.9730 }
      },
      {
        name: 'Prada',
        address: '724 5th Ave, New York, NY 10019',
        description: 'Sophisticated Italian luxury fashion and accessories flagship store.',
        image: 'https://images.unsplash.com/photo-1584370975283-3fbba69f677d?auto=format&fit=crop&q=80&w=300&h=200',
        coordinates: { lat: 40.7632, lng: -73.9744 }
      },
      {
        name: 'Celine',
        address: '650 Madison Ave, New York, NY 10022',
        description: 'Minimalist French luxury ready-to-wear and leather goods boutique.',
        image: 'https://images.unsplash.com/photo-1627372747732-d34c02d99dbb?auto=format&fit=crop&q=80&w=300&h=200',
        coordinates: { lat: 40.7645, lng: -73.9717 }
      }
    ]
  }
];

/**
 * Store Locator Page
 * 
 * An interactive map-based store locator that allows users to:
 * 1. Browse Manhattan luxury stores on a map
 * 2. Select a store and create a WhatsApp request
 * 3. View stores by category in a grid view
 */
const StoreLocatorPage = ({ cartItems = [] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = useState(0);
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'grid'
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSelectedCategory(newValue === 0 ? 'all' : storeCategories[newValue - 1].id);
  };
  
  // Handle view mode change
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };
  
  // Get filtered stores based on selected category
  const getFilteredStores = () => {
    if (selectedCategory === 'all') {
      // Return all stores from all categories
      return storeCategories.flatMap(category => category.stores);
    } else {
      // Return stores from selected category
      const category = storeCategories.find(cat => cat.id === selectedCategory);
      return category ? category.stores : [];
    }
  };
  
  // Handle store click in grid view
  const handleStoreClick = (store) => {
    // Create custom event to simulate map store selection
    const openStoreEvent = new CustomEvent('openStoreWebsite', {
      detail: {
        storeName: store.name,
        storeUrl: `https://www.google.com/search?q=${encodeURIComponent(store.name + ' New York')}`,
        storeType: selectedCategory
      }
    });
    window.dispatchEvent(openStoreEvent);
  };
  
  return (
    <Box sx={{ py: 5, minHeight: '100vh' }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 5, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 700 }}>
            Manhattan Store Locator
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Browse luxury stores across Manhattan and have TUHME bring items to your door for try-on
          </Typography>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant={isMobile ? "scrollable" : "fullWidth"}
            scrollButtons={isMobile ? "auto" : false}
            centered={!isMobile}
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: 'primary.main',
              }
            }}
          >
            <Tab label="All Stores" />
            {storeCategories.map(category => (
              <Tab key={category.id} label={category.name} />
            ))}
          </Tabs>
        </Box>
        
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Stack direction="row" spacing={1}>
            <Button
              variant={viewMode === 'map' ? 'contained' : 'outlined'}
              onClick={() => handleViewModeChange('map')}
              size="small"
            >
              Map View
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'contained' : 'outlined'}
              onClick={() => handleViewModeChange('grid')}
              size="small"
            >
              Grid View
            </Button>
          </Stack>
        </Box>
        
        {viewMode === 'map' ? (
          <Paper
            elevation={2}
            sx={{
              height: 600,
              borderRadius: 2,
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <MapWithWhatsApp />
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {getFilteredStores().map((store, index) => (
              <Grid item xs={12} sm={6} md={4} key={`${store.name}-${index}`}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 2,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                    },
                    cursor: 'pointer'
                  }}
                  onClick={() => handleStoreClick(store)}
                >
                  <Box
                    sx={{
                      height: 180,
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                  >
                    <Box
                      component="img"
                      src={store.image}
                      alt={store.name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </Box>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {store.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {store.address}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2">
                      {store.description}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      Shop via TUHME
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        
        <Box sx={{ mt: 5, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom>
            Why Shop with TUHME?
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Try Before You Buy
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Experience luxury items in the comfort of your home before making a purchase decision.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Personal Shopping Experts
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Our knowledgeable shoppers know the best Manhattan stores and can source the perfect items for you.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Effortless Returns
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Keep only what you love. We'll handle returns for everything else with no hassle.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default StoreLocatorPage;