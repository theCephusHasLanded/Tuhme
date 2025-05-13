import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Link,
  Grid,
  Card,
  CardContent,
  Avatar,
  TextField,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Snackbar,
  Dialog,
  DialogContent
} from '@mui/material';
import {
  Menu as MenuIcon,
  WhatsApp as WhatsAppIcon,
  Map as MapIcon,
  Close as CloseIcon,
  Add as AddIcon
} from '@mui/icons-material';
import ManhattanMap from '../components/ManhattanMap';
import StoreLogoCarousel from '../components/StoreLogoCarousel';
import StoreWebBrowser from '../components/StoreWebBrowser';
import ScheduleModal from '../components/ScheduleModal';
import ReplacementModal from '../components/ReplacementModal';
import MembershipSection from '../components/MembershipSection';
import CustomerJourneyPath from '../components/CustomerJourneyPath';

// Add custom styles to mimic Bootstrap classes
const styles = {
  search: {
    borderRadius: '50px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    padding: '8px 16px',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center'
  },
  searchInput: {
    border: 'none',
    width: '100%',
    padding: '10px 0',
    '&:focus': {
      outline: 'none',
      boxShadow: 'none'
    }
  },
  uploadBtn: {
    borderRadius: '50px',
    height: 48,
    width: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 1
  },
  garmentCard: {
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'transform 0.2s',
    border: '1px solid rgba(0,0,0,0.1)',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
    }
  },
  garmentImg: {
    height: 300,
    width: '100%',
    objectFit: 'cover'
  },
  ctaButton: {
    borderRadius: '50px',
    padding: '12px 30px',
    fontWeight: 600
  }
};

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    needs: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [activeScreen, setActiveScreen] = useState('home-screen');
  const [tryOnCount, setTryOnCount] = useState(0);
  const [tryOnItems, setTryOnItems] = useState([]);

  // Modal states
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [replacementModalOpen, setReplacementModalOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Store browser state
  const [storeBrowserOpen, setStoreBrowserOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  // Sample replacement item
  const replacementItem = {
    id: 4,
    name: 'Designer Statement Necklace',
    store: 'Tiffany & Co.',
    price: 1875,
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=400&h=300'
  };

  // Sample garment data
  const garmentData = [
    {
      id: 1,
      name: 'Black Silk Evening Dress',
      store: 'Saks Fifth Avenue',
      price: 1245,
      image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
      id: 2,
      name: 'Designer Wool Coat',
      store: 'Bergdorf Goodman',
      price: 2320,
      image: 'https://images.unsplash.com/photo-1548123378-363a55a039c2?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
      id: 3,
      name: 'Luxury Leather Handbag',
      store: 'Louis Vuitton',
      price: 3195,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=400&h=300'
    }
  ];

  // Navigation links
  const navLinks = [
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Membership', path: '/membership' },
    { name: 'Careers', path: '/careers' },
    { name: 'My Account', path: '/my-account' },
    { name: 'Get Started', anchor: 'start', highlight: true } // Changed to anchor to the new customer journey
  ];

  // Toggle mobile drawer
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Scroll to section or navigate to page
  const navigateToSection = (link) => {
    if (link.anchor) {
      // Scroll to anchor on this page
      const element = document.getElementById(link.anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // For RouterLink navigation, handling will be done by React Router

    // Close mobile drawer if open
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.phone || !formData.email) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call - in a real app, this would connect to Firebase
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSuccess(true);

      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        needs: ''
      });
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Failed to submit form. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Show different screen
  const showScreen = (screenId) => {
    setActiveScreen(screenId);
    // Scroll to top when changing screens
    window.scrollTo(0, 0);
  };

  // Add item to try-on list with toast notification
  const addToTryOn = (itemId) => {
    if (!tryOnItems.includes(itemId)) {
      setTryOnItems([...tryOnItems, itemId]);
      setTryOnCount(tryOnCount + 1);

      // Show toast notification
      setToastMessage('Item added to your try-on list');
      setToastOpen(true);
    }
  };

  // Remove item from try-on list
  const removeFromTryOn = (itemId) => {
    setTryOnItems(tryOnItems.filter(id => id !== itemId));
    setTryOnCount(tryOnCount - 1);
  };

  // Simulate search
  const simulateSearch = () => {
    showScreen('search-results-screen');
  };

  // Schedule order - open modal
  const scheduleOrder = () => {
    setScheduleModalOpen(true);
  };

  // Handle schedule form submission
  const handleScheduleSubmit = (data) => {
    setScheduleModalOpen(false);

    // Show toast notification
    setToastMessage('Order scheduled successfully!');
    setToastOpen(true);

    // Show tracking screen after a brief delay
    setTimeout(() => {
      showScreen('tracking-screen');

      // Show replacement modal after 2 seconds (simulating item unavailability)
      setTimeout(() => {
        setReplacementModalOpen(true);
      }, 2000);
    }, 500);
  };

  // Handle replacement approval
  const handleReplacementApprove = () => {
    setReplacementModalOpen(false);

    // Replace the first item in tryOnItems with the replacement
    const updatedItems = [...tryOnItems];
    if (updatedItems.length > 0) {
      updatedItems[0] = replacementItem.id;
      setTryOnItems(updatedItems);
    }

    // Show toast notification
    setToastMessage('Replacement approved!');
    setToastOpen(true);
  };

  // Handle replacement decline
  const handleReplacementDecline = () => {
    setReplacementModalOpen(false);

    // Remove the first item from tryOnItems
    if (tryOnItems.length > 0) {
      const updatedItems = tryOnItems.filter((_, index) => index !== 0);
      setTryOnItems(updatedItems);
      setTryOnCount(updatedItems.length);
    }

    // Show toast notification
    setToastMessage('Replacement declined. The item has been removed from your order.');
    setToastOpen(true);
  };

  // Handle store selection from carousel
  const handleStoreSelect = (store) => {
    setSelectedStore(store);
    setStoreBrowserOpen(true);
  };

  // Handle saving item from store browser
  const handleSaveStoreItem = (item) => {
    // Create a new garment item from the saved store item
    const newItem = {
      id: garmentData.length + tryOnItems.length + 1, // Generate a unique ID
      name: item.name,
      store: item.store,
      price: parseFloat(item.price) || 1999, // Higher default price for luxury items
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=400&h=300', // Luxury fashion image
      notes: item.notes
    };

    // Add to try-on items
    addToTryOn(newItem.id);

    // Add to garment data if it doesn't already exist
    if (!garmentData.find(g => g.id === newItem.id)) {
      garmentData.push(newItem);
    }

    // Show toast
    setToastMessage(`Item "${item.name}" added to your try-on list`);
    setToastOpen(true);
  };

  // Mobile drawer content
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', p: 2 }}>
      <Typography
        variant="h6"
        component="div"
        sx={{ my: 2, color: 'primary.main', fontWeight: 700 }}
      >
        TUHME
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        <ListItem button onClick={() => showScreen('home-screen')} sx={{ justifyContent: 'center' }}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => showScreen('orders-screen')} sx={{ justifyContent: 'center' }}>
          <ListItemText primary="My Orders" />
        </ListItem>
        {navLinks.map((link) => (
          <ListItem
            button
            key={link.name}
            component={link.path ? RouterLink : 'div'}
            to={link.path}
            onClick={link.anchor ? () => navigateToSection(link) : undefined}
            sx={{ justifyContent: 'center' }}
          >
            <ListItemText
              primary={link.name}
              primaryTypographyProps={{
                color: link.highlight ? 'primary.main' : 'inherit',
                fontWeight: link.highlight ? 600 : 400
              }}
            />
          </ListItem>
        ))}
        <ListItem button component={RouterLink} to="/store-locator" sx={{ justifyContent: 'center' }}>
          <ListItemText primary="Store Locator" />
        </ListItem>
        <ListItem button component={RouterLink} to="/login" sx={{ justifyContent: 'center' }}>
          <ListItemText primary="Shopper Login" />
        </ListItem>
      </List>
    </Box>
  );

  // Home Screen Content
  const homeScreen = (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          py: { xs: 6, md: 12 }
        }}
      >
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  mb: 2,
                  lineHeight: 1.2
                }}
              >
                Try before you buy
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  color: 'text.secondary',
                  mb: 4,
                  maxWidth: '90%'
                }}
              >
                Upload an image or enter a URL to find garments for try-on delivery in Manhattan
              </Typography>

              {/* Search Bar - custom styled to match Bootstrap */}
              <Box sx={styles.search}>
                <input
                  type="text"
                  placeholder="Enter garment URL or description"
                  style={styles.searchInput}
                />
                <IconButton
                  sx={{
                    ...styles.uploadBtn,
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                  onClick={simulateSearch}
                >
                  <i className="bi bi-search"></i>
                </IconButton>
                <IconButton
                  sx={{
                    ...styles.uploadBtn,
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                >
                  <i className="bi bi-camera"></i>
                </IconButton>
              </Box>
            </Grid>

            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1581338834647-b0fb40704e21?auto=format&fit=crop&q=80&w=1974&q=80"
                alt="Luxury fashion in New York"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                  mb: { xs: 4, md: 0 }
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Customer Journey Path - New component aligned with tuhme.com */}
      <Box id="start">
        <CustomerJourneyPath 
          onSelectionComplete={(path) => {
            // Handle the selected path
            if (path === 'express') {
              // Show the map for express shopping
              window.scrollTo({
                top: document.getElementById('store-locations').offsetTop - 100,
                behavior: 'smooth'
              });
            } else if (path === 'membership') {
              // Show membership options
              window.scrollTo({
                top: document.getElementById('membership').offsetTop - 100,
                behavior: 'smooth'
              });
            } else if (path === 'ondemand') {
              // Open scheduling modal
              setScheduleModalOpen(true);
            }
          }}
        />
      </Box>
      
      {/* How It Works */}
      <Box id="how-it-works" sx={{ py: { xs: 6, md: 10 }, backgroundColor: 'white' }}>
        <Container>
          <Typography
            variant="h2"
            component="h2"
            align="center"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              mb: 6
            }}
          >
            How it works
          </Typography>

          {/* Steps */}
          <Grid container spacing={4}>
            {[
              {
                icon: "bi bi-search",
                title: "Find",
                description: "Upload an image or URL of garments you want to try"
              },
              {
                icon: "bi bi-truck",
                title: "Deliver",
                description: "We source your items from Manhattan stores and deliver them to you"
              },
              {
                icon: "bi bi-bag-check",
                title: "Try & Buy",
                description: "Try on the garments and only pay for what you keep"
              }
            ].map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    border: 0,
                    bgcolor: 'background.default'
                  }}
                  elevation={0}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                    {step.icon === "bi bi-search" && (
                      <Box sx={{ fontSize: '3rem', mb: 3, color: 'primary.main' }}>
                        <i className={step.icon}></i>
                      </Box>
                    )}
                    {step.icon === "bi bi-truck" && (
                      <Box sx={{ fontSize: '3rem', mb: 3, color: 'primary.main' }}>
                        <i className={step.icon}></i>
                      </Box>
                    )}
                    {step.icon === "bi bi-bag-check" && (
                      <Box sx={{ fontSize: '3rem', mb: 3, color: 'primary.main' }}>
                        <i className={step.icon}></i>
                      </Box>
                    )}

                    <Typography
                      variant="h5"
                      component="h3"
                      gutterBottom
                      sx={{ fontWeight: 600, mb: 2 }}
                    >
                      {step.title}
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                      {step.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Store Locations Section */}
      <Box id="store-locations" sx={{ py: { xs: 6, md: 10 }, backgroundColor: theme.palette.background.default }}>
        <Container>
          <Typography
            variant="h2"
            component="h2"
            align="center"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              mb: 2
            }}
          >
            Our Manhattan Store Partners
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{
              maxWidth: 700,
              mx: 'auto',
              mb: 4,
              fontSize: { xs: '1rem', md: '1.1rem' }
            }}
          >
            Explore our curated network of premium shopping locations throughout Manhattan where our shoppers source items just for you.
          </Typography>

          {/* Logo Carousel */}
          <StoreLogoCarousel onStoreSelect={handleStoreSelect} />

          <Box sx={{ height: 400, borderRadius: 4, overflow: 'hidden', my: 5, position: 'relative' }}>
            {/* Map component */}
            <Box
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '1rem'
              }}
            >
              <ManhattanMap />
            </Box>

            <Box
              sx={{
                position: 'absolute',
                bottom: 20,
                right: 20,
                zIndex: 10,
                bgcolor: 'background.paper',
                p: 2,
                borderRadius: 2,
                boxShadow: 3
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => window.open('/manhattan-map', '_blank', 'width=1000,height=800')}
                sx={{ fontWeight: 600 }}
                startIcon={<MapIcon />}
              >
                Open Full Screen Map
              </Button>
            </Box>
          </Box>

          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                    Luxury Shopping Districts
                  </Typography>
                  <Typography variant="body2" paragraph color="text.secondary">
                    Our shoppers have access to the most exclusive stores on Fifth Avenue, SoHo, and the Upper East Side to bring you the finest designer collections.
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      // Open chat with AI assistant
                      alert('Chat with our AI Style Assistant to learn more about our locations');
                    }}
                  >
                    Ask About Locations
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', backgroundColor: 'primary.main', color: 'white' }}>
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                    Personal AI Style Consultation
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Not sure where to start? Chat with our AI Style Assistant to determine your style profile and get personalized location recommendations.
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    }}
                  >
                    Start Consultation
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Membership Section */}
      <Box id="membership">
        <MembershipSection
          onSelectPlan={(planId) => {
            // Navigate to membership page or show pricing details
            window.location.href = `/membership?plan=${planId}`;
          }}
        />
      </Box>

      {/* Contact Section */}
      <Box id="contact" sx={{ py: { xs: 6, md: 10 }, backgroundColor: 'white' }}>
        <Container>
          <Typography
            variant="h2"
            component="h2"
            align="center"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              mb: 2
            }}
          >
            Start Your Styling Journey
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{
              maxWidth: 700,
              mx: 'auto',
              mb: 6,
              fontSize: { xs: '1rem', md: '1.1rem' }
            }}
          >
            Text "STYLE" to our WhatsApp number to begin. Our AI assistant will guide you through the onboarding process.
          </Typography>

          <Grid container spacing={6}>
            <Grid item xs={12} md={5}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  Text Us Now
                </Typography>

                <Button
                  variant="contained"
                  size="large"
                  startIcon={<WhatsAppIcon />}
                  sx={{
                    backgroundColor: '#25D366',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#128C7E',
                    },
                    py: 2,
                    px: 4,
                    borderRadius: 2,
                    fontSize: '1rem',
                    mt: 2,
                    mb: 4,
                    width: '100%',
                    maxWidth: 350
                  }}
                  component={Link}
                  href="https://wa.me/16465889916?text=STYLE"
                  target="_blank"
                >
                  Send "STYLE" to +1 (646) 588-9916
                </Button>

                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                  <Divider sx={{ my: 4 }}>OR</Divider>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center' }}>
              <Divider orientation="vertical" sx={{ height: '100%' }}>
                <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>OR</Typography>
              </Divider>
            </Grid>

            <Grid item xs={12} md={5}>
              <Card elevation={2}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, textAlign: 'center', mb: 3 }}>
                    Request More Information
                  </Typography>

                  {success ? (
                    <Alert severity="success" sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Thank You!
                      </Typography>
                      <Typography variant="body2">
                        We've received your information and will reach out to you shortly via WhatsApp or email.
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                        Welcome to the TUHME styling experience, {formData.name}!
                      </Typography>
                    </Alert>
                  ) : (
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                      {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                          {error}
                        </Alert>
                      )}

                      <TextField
                        required
                        fullWidth
                        id="name"
                        name="name"
                        label="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        margin="normal"
                        variant="outlined"
                      />

                      <TextField
                        required
                        fullWidth
                        id="phone"
                        name="phone"
                        label="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        margin="normal"
                        variant="outlined"
                      />

                      <TextField
                        required
                        fullWidth
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        margin="normal"
                        variant="outlined"
                      />

                      <TextField
                        fullWidth
                        id="needs"
                        name="needs"
                        label="What are you looking for?"
                        value={formData.needs}
                        onChange={handleInputChange}
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={3}
                      />

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={loading}
                        sx={{
                          mt: 3,
                          py: 1.5,
                          fontWeight: 600,
                          position: 'relative'
                        }}
                      >
                        {loading ? (
                          <CircularProgress
                            size={24}
                            sx={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              marginTop: '-12px',
                              marginLeft: '-12px'
                            }}
                          />
                        ) : (
                          'Get Started'
                        )}
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );

  // Search Results Screen
  const searchResultsScreen = (
    <Container sx={{ py: 5 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h2" fontWeight="bold">
          Results matching your search
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Select items to add to your try-on list
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {garmentData.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={styles.garmentCard}>
              <Box sx={styles.garmentImg} component="img" src={item.image} alt={item.name} />
              <CardContent>
                <Typography variant="h6" component="h3" fontWeight="bold">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {item.store}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" fontWeight="bold">
                    ${item.price}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => addToTryOn(item.id)}
                    startIcon={<i className="bi bi-plus"></i>}
                  >
                    Add to Try-On
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          sx={styles.ctaButton}
          onClick={() => showScreen('try-on-list-screen')}
        >
          View Try-On List <Box component="span" sx={{ ml: 1, bgcolor: 'rgba(255,255,255,0.2)', px: 1, py: 0.5, borderRadius: 1 }}>{tryOnCount}</Box>
        </Button>
      </Box>
    </Container>
  );

  // Try-On List Screen
  const tryOnListScreen = (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" component="h2" fontWeight="bold" sx={{ mb: 1 }}>
        Your Try-On List
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Review your selected items before scheduling
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {tryOnItems.length > 0 ? (
            tryOnItems.map(itemId => {
              const item = garmentData.find(g => g.id === itemId);
              return (
                <Card key={item.id} sx={{ mb: 2, borderLeft: '4px solid', borderColor: 'primary.main' }}>
                  <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <Box
                      component="img"
                      src={item.image}
                      sx={{ width: 60, height: 60, borderRadius: 1, objectFit: 'cover' }}
                    />
                    <Box sx={{ ml: 2, flexGrow: 1 }}>
                      <Typography variant="h6" fontWeight="bold">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.store} - ${item.price}
                      </Typography>
                    </Box>
                    <IconButton onClick={() => removeFromTryOn(item.id)} color="error">
                      <i className="bi bi-trash"></i>
                    </IconButton>
                  </Box>
                </Card>
              );
            })
          ) : (
            <Typography>Your try-on list is empty.</Typography>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                Order Summary
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Garments to try ({tryOnCount})</Typography>
                <Typography>$0.00</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Delivery Fee</Typography>
                <Typography>$15.00</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <Typography>Total (if kept)</Typography>
                <Typography>
                  ${tryOnItems.reduce((sum, id) => {
                    const item = garmentData.find(g => g.id === id);
                    return sum + item.price;
                  }, 0)}
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                <Box component="i" className="bi bi-info-circle" sx={{ mr: 1 }}></Box>
                You'll only pay for items you decide to keep
              </Typography>

              <Box sx={{ mt: 3 }}>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                  <input type="checkbox" style={{ marginRight: 8 }} />
                  <Typography variant="body2">
                    I agree to potentially receive replacement items if my selections are unavailable
                  </Typography>
                </label>
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3, ...styles.ctaButton }}
                onClick={() => setScheduleModalOpen(true)}
                disabled={tryOnItems.length === 0}
              >
                Schedule Try-On
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );

  // Order Tracking Screen
  const trackingScreen = (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" component="h2" fontWeight="bold">
        Track Your Order
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Order #TM25792 - Expected arrival: 2:45 PM
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {/* Progress Bar */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                Order Status
              </Typography>

              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    height: 8,
                    bgcolor: '#f0f0f0',
                    borderRadius: 4,
                    overflow: 'hidden'
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      width: '50%',
                      bgcolor: 'primary.main'
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">Order Placed</Typography>
                  <Typography variant="body2" color="text.secondary">Sourcing</Typography>
                  <Typography variant="body2" color="text.secondary">En Route</Typography>
                  <Typography variant="body2" color="text.secondary">Try-On</Typography>
                  <Typography variant="body2" color="text.secondary">Complete</Typography>
                </Box>
              </Box>

              <Alert severity="info" icon={<i className="bi bi-info-circle"></i>}>
                Your stylist is currently sourcing your items
              </Alert>
            </CardContent>
          </Card>

          {/* Map View */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                Delivery Tracking
              </Typography>

              <Box
                sx={{
                  height: 300,
                  borderRadius: 2,
                  overflow: 'hidden',
                  mb: 3,
                  position: 'relative'
                }}
              >
                <ManhattanMap />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                Your Items
              </Typography>

              {tryOnItems.map(itemId => {
                const item = garmentData.find(g => g.id === itemId);
                return (
                  <Box key={item.id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center' }}>
                    <Box
                      component="img"
                      src={item.image}
                      sx={{ width: 50, height: 50, borderRadius: 1, objectFit: 'cover' }}
                    />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle2" fontWeight="bold">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{item.store}</Typography>
                      <Box
                        sx={{
                          display: 'inline-block',
                          px: 1,
                          py: 0.25,
                          bgcolor: 'primary.main',
                          color: 'white',
                          borderRadius: 1,
                          fontSize: '0.75rem',
                          mt: 0.5
                        }}
                      >
                        Sourcing
                      </Box>
                    </Box>
                  </Box>
                );
              })}

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Delivery Fee</Typography>
                <Typography variant="body2">$15.00</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Pre-authorization</Typography>
                <Typography variant="body2">
                  ${tryOnItems.reduce((sum, id) => {
                    const item = garmentData.find(g => g.id === id);
                    return sum + item.price;
                  }, 0)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );

  // My Orders Screen
  const ordersScreen = (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" component="h2" fontWeight="bold">
        My Orders
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Track and manage your orders
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
                Order #TM25792
              </Typography>
              <Typography variant="body2" color="text.secondary">
                April 23, 2025 at 2:45 PM
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => showScreen('tracking-screen')}
            >
              Track
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Grid container>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex' }}>
                {garmentData.map(item => (
                  <Box
                    key={item.id}
                    component="img"
                    src={item.image}
                    sx={{ width: 40, height: 40, borderRadius: 1, mr: 1 }}
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{
              mt: { xs: 2, md: 0 },
              textAlign: { xs: 'left', md: 'right' }
            }}>
              <Box
                sx={{
                  display: 'inline-block',
                  px: 1.5,
                  py: 0.5,
                  bgcolor: '#FFC107',
                  color: 'black',
                  borderRadius: 1,
                  fontSize: '0.875rem',
                }}
              >
                In Progress
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
                Order #TM25680
              </Typography>
              <Typography variant="body2" color="text.secondary">
                April 20, 2025 at 5:30 PM
              </Typography>
            </Box>
            <Button variant="outlined" color="primary">
              Details
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Grid container>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex' }}>
                {garmentData.slice(0, 2).map(item => (
                  <Box
                    key={item.id}
                    component="img"
                    src={item.image}
                    sx={{ width: 40, height: 40, borderRadius: 1, mr: 1 }}
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{
              mt: { xs: 2, md: 0 },
              textAlign: { xs: 'left', md: 'right' }
            }}>
              <Box
                sx={{
                  display: 'inline-block',
                  px: 1.5,
                  py: 0.5,
                  bgcolor: '#4CAF50',
                  color: 'white',
                  borderRadius: 1,
                  fontSize: '0.875rem',
                }}
              >
                Completed
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );

  return (
    <Box>
      {/* Navigation */}
      <AppBar
        position="sticky"
        color="default"
        elevation={1}
        sx={{
          backgroundColor: 'white',
        }}
      >
        <Container>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: 700,
                color: 'primary.main',
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}
            >
              <span style={{ color: 'var(--tuhme-black)' }}>tuhme</span>
              <span style={{ color: 'rgba(0,0,0,0.5)' }}>.com</span>
            </Typography>

            {/* Mobile menu button */}
            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  onClick={() => showScreen('home-screen')}
                  sx={{
                    ml: 2,
                    color: 'text.primary',
                    fontWeight: 500,
                    '&:hover': {
                      color: 'primary.main'
                    }
                  }}
                >
                  Home
                </Button>
                {navLinks.map((link) => (
                  link.path ? (
                    <Button
                      key={link.name}
                      component={RouterLink}
                      to={link.path}
                      sx={{
                        ml: 2,
                        color: link.highlight ? 'primary.main' : 'text.primary',
                        fontWeight: link.highlight ? 600 : 500,
                        '&:hover': {
                          color: 'primary.main'
                        }
                      }}
                    >
                      {link.name}
                    </Button>
                  ) : (
                    <Button
                      key={link.name}
                      onClick={() => navigateToSection(link)}
                      sx={{
                        ml: 2,
                        color: link.highlight ? 'primary.main' : 'text.primary',
                        fontWeight: link.highlight ? 600 : 500,
                        '&:hover': {
                          color: 'primary.main'
                        }
                      }}
                    >
                      {link.name}
                    </Button>
                  )
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main Content - Show active screen */}
      {activeScreen === 'home-screen' && homeScreen}
      {activeScreen === 'search-results-screen' && searchResultsScreen}
      {activeScreen === 'try-on-list-screen' && tryOnListScreen}
      {activeScreen === 'tracking-screen' && trackingScreen}
      {activeScreen === 'orders-screen' && ordersScreen}

      {/* Footer */}
      <Box sx={{ py: 6, backgroundColor: 'background.dark', color: 'white' }}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                TUHME
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 3,
                  opacity: 0.8,
                  fontStyle: 'italic',
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                Your home. Your style. Your time.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                  Quick Links
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {navLinks.map(link => (
                    <Link
                      key={link.name}
                      color="inherit"
                      sx={{ '&:hover': { color: 'secondary.main' } }}
                      onClick={() => scrollToSection(link.anchor)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link
                    component={RouterLink}
                    to="/login"
                    color="inherit"
                    sx={{ '&:hover': { color: 'secondary.main' } }}
                  >
                    Shopper Login
                  </Link>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                  Contact Us
                </Typography>
                <Typography variant="body2" paragraph>
                  WhatsApp: +1 (987) 654-3210
                </Typography>
                <Typography variant="body2" paragraph>
                  Email: hello@tuhme.com
                </Typography>
                <Typography variant="body2">
                  Manhattan, New York
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" sx={{ textAlign: isMobile ? 'center' : 'left' }}>
              &copy; {new Date().getFullYear()} TUHME, Inc. All rights reserved.
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
              <Link href="#" color="inherit" underline="hover" variant="body2">
                Privacy Policy
              </Link>
              <Link href="#" color="inherit" underline="hover" variant="body2">
                Terms of Service
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Schedule Modal */}
      <ScheduleModal
        open={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        onSubmit={handleScheduleSubmit}
      />

      {/* Replacement Modal */}
      <ReplacementModal
        open={replacementModalOpen}
        onClose={() => setReplacementModalOpen(false)}
        onApprove={handleReplacementApprove}
        onDecline={handleReplacementDecline}
        replacementItem={replacementItem}
        originalItem={garmentData.find(item => item.id === 1)} // First item in the list
      />

      {/* Toast Notification */}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        message={toastMessage}
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={() => setToastOpen(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        sx={{
          '& .MuiSnackbarContent-root': {
            borderRadius: 2,
            minWidth: 'auto',
          }
        }}
      />

      {/* Store Browser Dialog */}
      <Dialog
        open={storeBrowserOpen}
        onClose={() => setStoreBrowserOpen(false)}
        fullScreen
        PaperProps={{
          sx: {
            bgcolor: 'background.default'
          }
        }}
      >
        <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {selectedStore && (
            <StoreWebBrowser
              storeName={selectedStore.name}
              storeUrl={selectedStore.url}
              onClose={() => setStoreBrowserOpen(false)}
              onSaveItem={handleSaveStoreItem}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default LandingPage;
