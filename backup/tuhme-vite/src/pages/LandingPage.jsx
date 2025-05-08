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
  Divider
} from '@mui/material';
import { Menu as MenuIcon, WhatsApp as WhatsAppIcon } from '@mui/icons-material';

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

  // Navigation links
  const navLinks = [
    { name: 'How It Works', anchor: 'how-it-works' },
    { name: 'Our Stylists', anchor: 'stylists' },
    { name: 'Testimonials', anchor: 'testimonials' },
    { name: 'Get Started', anchor: 'contact', highlight: true }
  ];

  // Toggle mobile drawer
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
        {navLinks.map((link) => (
          <ListItem
            button
            key={link.name}
            onClick={() => scrollToSection(link.anchor)}
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
        <ListItem button component={RouterLink} to="/login" sx={{ justifyContent: 'center' }}>
          <ListItemText primary="Stylist Login" />
        </ListItem>
      </List>
    </Box>
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
              TUHME
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
                {navLinks.map((link) => (
                  link.highlight ? (
                    <Button
                      key={link.name}
                      onClick={() => scrollToSection(link.anchor)}
                      variant="contained"
                      color="primary"
                      sx={{
                        ml: 2,
                        fontWeight: 600,
                        borderRadius: 2,
                      }}
                    >
                      {link.name}
                    </Button>
                  ) : (
                    <Button
                      key={link.name}
                      onClick={() => scrollToSection(link.anchor)}
                      sx={{
                        ml: 2,
                        color: 'text.primary',
                        fontWeight: 500,
                        '&:hover': {
                          color: 'primary.main'
                        }
                      }}
                    >
                      {link.name}
                    </Button>
                  )
                ))}
                <Button
                  component={RouterLink}
                  to="/login"
                  sx={{
                    ml: 2,
                    color: 'text.primary',
                    fontWeight: 500,
                    '&:hover': {
                      color: 'primary.main'
                    }
                  }}
                >
                  Stylist Login
                </Button>
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
                Your Personal Stylist, Delivered to Your Door
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
                Send us your style requests via WhatsApp. We'll bring curated outfits
                to your home. Only pay for what you love.
              </Typography>

              <Button
                onClick={() => scrollToSection('contact')}
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  boxShadow: '0 4px 14px rgba(58, 81, 153, 0.4)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(58, 81, 153, 0.6)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Start Styling
              </Button>
            </Grid>

            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt="Personal styling experience"
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
            How TUHME Works
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                step: 1,
                title: 'Send Your Request',
                description: "Text us your style needs via WhatsApp. Send photos of styles you like or describe what you're looking for."
              },
              {
                step: 2,
                title: 'Expert Curation',
                description: 'Our stylists source perfect items for you from top stores in Manhattan based on your preferences.'
              },
              {
                step: 3,
                title: 'Home Fitting',
                description: 'A stylist delivers items to your door for a private fitting session at your convenience.'
              },
              {
                step: 4,
                title: 'Pay Only for Keepers',
                description: 'Purchase only what you love. We return the rest. A $150 service fee applies to each session.'
              }
            ].map((step) => (
              <Grid item xs={12} sm={6} md={3} key={step.step}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                  elevation={2}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        bgcolor: 'primary.main',
                        margin: '0 auto 16px',
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {step.step}
                    </Avatar>

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
                    Stylist Login
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
    </Box>
  );
};

export default LandingPage;
