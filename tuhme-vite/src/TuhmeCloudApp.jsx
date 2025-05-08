import React from 'react';
import { Box, Typography, Button, Container, AppBar, Toolbar, Stack, Card, CardContent, Grid } from '@mui/material';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import StoreLogoCarousel from './components/StoreLogoCarousel';

/**
 * Tuhme Cloud Supply Chain Platform
 * A simplified version that works with existing components
 */
const TuhmeCloudApp = () => {
  // Hero slides specific to the cloud platform
  const heroSlides = [
    {
      id: 1,
      headline: 'Tuhme Cloud Supply Chain Platform',
      subline: 'Direct access to high-end Manhattan inventory for seamless shopping experiences',
      image: 'https://images.unsplash.com/photo-1566096650894-9e86f139b742?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1800&q=80',
      cta: {
        text: 'Explore Platform',
        url: '#platform'
      },
      alignment: 'center'
    },
    {
      id: 2,
      headline: 'Streamlined Luxury Shopping',
      subline: 'Connect directly to Manhattan\'s exclusive boutiques through our secure platform',
      image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1800&q=80',
      cta: {
        text: 'View Stores',
        url: '#stores'
      },
      alignment: 'left'
    }
  ];

  // Features section
  const features = [
    {
      title: 'Secure Access',
      description: 'End-to-end encrypted connection to store inventory systems',
      icon: '🔒'
    },
    {
      title: 'Real-time Updates',
      description: 'Live product availability and pricing information',
      icon: '⚡'
    },
    {
      title: 'Express Delivery',
      description: 'Same-day delivery throughout Manhattan via WhatsApp integration',
      icon: '🚚'
    },
    {
      title: 'Personalized Service',
      description: 'AI-powered recommendations based on your preferences',
      icon: '👤'
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "Tuhme's Cloud Platform revolutionized how we connect to luxury stores. The direct inventory access is a game-changer.",
      author: "Sarah Johnson, Retail Director",
      company: "XYZ Fashion"
    },
    {
      quote: "The real-time inventory view and WhatsApp integration has improved our fulfillment times by 40%.",
      author: "Michael Chen, Operations Manager",
      company: "Luxury Connect"
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #eee' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            TUHME CLOUD
          </Typography>
          <Button color="inherit">Platform</Button>
          <Button color="inherit">Solutions</Button>
          <Button color="inherit">Pricing</Button>
          <Button color="inherit">About</Button>
          <Button variant="contained" color="primary" sx={{ ml: 2, borderRadius: 50 }}>
            Contact Sales
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Hero slides={heroSlides} />

      {/* Store Logo Carousel */}
      <Box id="stores" sx={{ py: 6, bgcolor: '#f9f9f9' }}>
        <StoreLogoCarousel onStoreClick={() => {}} />
      </Box>
      
      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h3" 
          align="center" 
          sx={{ mb: 2, fontWeight: 600 }}
        >
          Cloud Supply Chain Platform
        </Typography>
        
        <Typography 
          variant="h6" 
          align="center" 
          color="text.secondary" 
          sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}
        >
          Our platform connects luxury retailers with customers through a seamless digital experience
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card 
                elevation={0} 
                sx={{ 
                  height: '100%',
                  p: 2,
                  borderRadius: 4,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': { 
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h1" sx={{ mb: 2, fontSize: '3rem' }}>
                    {feature.icon}
                  </Typography>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* Testimonials Section */}
      <Box sx={{ bgcolor: '#00855B', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" sx={{ mb: 6, fontWeight: 600 }}>
            What Our Clients Say
          </Typography>
          
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box sx={{ p: 4, height: '100%', bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 4 }}>
                  <Typography variant="h5" paragraph sx={{ fontStyle: 'italic', mb: 3 }}>
                    "{testimonial.quote}"
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {testimonial.author}
                  </Typography>
                  <Typography variant="body2">
                    {testimonial.company}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 600 }}>
          Ready to transform your shopping experience?
        </Typography>
        
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Join the exclusive network of luxury retailers using Tuhme Cloud to deliver exceptional customer experiences.
        </Typography>
        
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2} 
          justifyContent="center"
        >
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            sx={{ 
              borderRadius: 50, 
              px: 4,
              py: 1.5,
              boxShadow: 3,
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: 6
              }
            }}
          >
            Request a Demo
          </Button>
          
          <Button 
            variant="outlined" 
            color="primary" 
            size="large"
            sx={{ 
              borderRadius: 50, 
              px: 4,
              py: 1.5,
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.04)'
              }
            }}
          >
            Contact Sales
          </Button>
        </Stack>
      </Container>
      
      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          backgroundColor: '#f8f8f8', 
          py: 4,
          borderTop: '1px solid #eee',
          mt: 'auto'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                TUHME CLOUD
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A cloud supply chain platform connecting luxury retailers with discerning customers.
              </Typography>
            </Grid>
            
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Platform
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" component="a" href="#" sx={{ color: 'text.secondary', textDecoration: 'none' }}>
                  Overview
                </Typography>
                <Typography variant="body2" component="a" href="#" sx={{ color: 'text.secondary', textDecoration: 'none' }}>
                  Features
                </Typography>
                <Typography variant="body2" component="a" href="#" sx={{ color: 'text.secondary', textDecoration: 'none' }}>
                  Integrations
                </Typography>
              </Stack>
            </Grid>
            
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Company
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" component="a" href="#" sx={{ color: 'text.secondary', textDecoration: 'none' }}>
                  About
                </Typography>
                <Typography variant="body2" component="a" href="#" sx={{ color: 'text.secondary', textDecoration: 'none' }}>
                  Careers
                </Typography>
                <Typography variant="body2" component="a" href="#" sx={{ color: 'text.secondary', textDecoration: 'none' }}>
                  Blog
                </Typography>
              </Stack>
            </Grid>
            
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Resources
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" component="a" href="#" sx={{ color: 'text.secondary', textDecoration: 'none' }}>
                  Documentation
                </Typography>
                <Typography variant="body2" component="a" href="#" sx={{ color: 'text.secondary', textDecoration: 'none' }}>
                  Support
                </Typography>
                <Typography variant="body2" component="a" href="#" sx={{ color: 'text.secondary', textDecoration: 'none' }}>
                  API
                </Typography>
              </Stack>
            </Grid>
            
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Legal
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" component="a" href="#" sx={{ color: 'text.secondary', textDecoration: 'none' }}>
                  Privacy
                </Typography>
                <Typography variant="body2" component="a" href="#" sx={{ color: 'text.secondary', textDecoration: 'none' }}>
                  Terms
                </Typography>
                <Typography variant="body2" component="a" href="#" sx={{ color: 'text.secondary', textDecoration: 'none' }}>
                  Cookies
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4, pt: 4, borderTop: '1px solid #eee' }}>
            © {new Date().getFullYear()} TUHME, Inc. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default TuhmeCloudApp;