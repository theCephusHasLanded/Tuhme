import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocalShipping as ShippingIcon,
  CheckCircle as CheckIcon,
  Phone as PhoneIcon,
  Instagram as InstagramIcon
} from '@mui/icons-material';

const HowItWorksPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Steps in the process
  const steps = [
    {
      icon: <SearchIcon fontSize="large" />,
      title: "Capture & Send",
      description: "Take screenshots of products you want to try or items you've found online. Forward them to us via WhatsApp with your size and color preferences.",
      imageUrl: "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      icon: <ShippingIcon fontSize="large" />,
      title: "We Shop & Deliver",
      description: "Our personal shoppers visit the stores in Manhattan and Brooklyn to collect your items and deliver them directly to your door at a time that works for you.",
      imageUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      icon: <CheckIcon fontSize="large" />,
      title: "Try & Decide",
      description: "Try everything on in the comfort of your home. Our shopper waits outside for 15-20 minutes. Keep what you love, return what you don't - you only pay for what you keep.",
      imageUrl: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=600&h=400"
    }
  ];

  // FAQs
  const faqs = [
    {
      question: "How much does the service cost?",
      answer: "We offer two options: Our TUHME now subscription for $49.99/month with unlimited deliveries and 50% off service fees, or pay-per-use with standard rates (3-5 items: $9.99/item, 5-10 items: $7.99/item, 10-15 items: $5.99/item). You only pay for what you keep!"
    },
    {
      question: "What stores do you work with?",
      answer: "We can shop from any local store in Manhattan and Brooklyn, not just the ones listed on our platform. Simply send us screenshots of items you want, and we'll do the shopping for you."
    },
    {
      question: "How long does delivery take?",
      answer: "Orders placed before 12:00 PM are delivered the same day. Orders placed after 12:00 PM are delivered the next day. Weekend deliveries are available when stores are open."
    },
    {
      question: "How does the try-on process work?",
      answer: "Our shopper delivers items to your home and waits outside for 15-20 minutes while you try everything on. You keep what you like and return the rest to the shopper immediately."
    },
    {
      question: "What is TUHME now?",
      answer: "TUHME now is our subscription service ($49.99/month) that gives you unlimited deliveries and 50% off all service fees. Just like Amazon Prime revolutionized online shopping, TUHME now transforms your in-store shopping experience."
    },
    {
      question: "Can I pause or cancel my TUHME now subscription?",
      answer: "Yes, you can pause or cancel your TUHME now subscription at any time through your account settings or by contacting our customer service team."
    }
  ];

  return (
    <Box sx={{ pt: 8, pb: 8 }}>
      {/* Hero Section */}
      <Box sx={{ backgroundColor: 'background.default', py: 8 }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                How TUHME Works
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                color="primary"
                sx={{
                  fontWeight: 600,
                  mb: 2
                }}
              >
                The Home Try-On Service for Luxury Shoppers
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.1rem',
                  color: 'text.secondary',
                  mb: 4,
                  lineHeight: 1.6
                }}
              >
                TUHME brings items from any store in Manhattan and Brooklyn to your doorstep for try-on. 
                Our shoppers wait while you decide, and you only pay for what you keep. 
                With TUHME now, get unlimited deliveries and 50% off service fees for just $49.99/month.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={RouterLink}
                to="/try-on"
                sx={{ 
                  borderRadius: '50px',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                Try It Now
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800"
                alt="Person trying on clothes at home"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Process Steps */}
      <Box sx={{ py: 8, backgroundColor: 'white' }}>
        <Container>
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 6,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Our Simple 3-Step Process
          </Typography>

          <Grid container spacing={4}>
            {steps.map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={step.imageUrl}
                    alt={step.title}
                  />
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                    <Box sx={{ color: 'primary.main', mb: 2 }}>
                      {step.icon}
                    </Box>
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

      {/* TUHME now Section */}
      <Box sx={{ py: 8, backgroundColor: 'white' }}>
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                Introducing TUHME now
              </Typography>
              <Typography
                variant="h5"
                component="div"
                color="primary"
                sx={{ mb: 2, fontWeight: 600 }}
              >
                The Amazon Prime of Shopping Delivery
              </Typography>
              <Typography variant="body1" paragraph>
                For just $49.99/month, TUHME now gives you unlimited deliveries with significant savings on each order. 
                Never worry about delivery caps or full-price service fees again.
              </Typography>
              
              <Box sx={{ 
                backgroundColor: theme.palette.background.default, 
                p: 3, 
                borderRadius: 2,
                mb: 3 
              }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  With TUHME now you get:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CheckIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body1">Unlimited deliveries per month</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CheckIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body1">50% off all service fees</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CheckIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body1">Same-day delivery (orders before noon)</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body1">Ability to pause or cancel anytime</Typography>
                </Box>
              </Box>
              
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/membership"
                sx={{ 
                  borderRadius: 50,
                  px: 3, 
                  py: 1.5
                }}
              >
                Subscribe Now
              </Button>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                border: '1px solid', 
                borderColor: 'divider',
                borderRadius: 4,
                overflow: 'hidden'
              }}>
                <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, textAlign: 'center' }}>
                  <Typography variant="h6" fontWeight="bold">
                    Price Comparison
                  </Typography>
                </Box>
                
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Standard Service Fees
                      </Typography>
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="body2">3-5 items:</Typography>
                        <Typography variant="h6">$9.99 per item</Typography>
                      </Box>
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="body2">5-10 items:</Typography>
                        <Typography variant="h6">$7.99 per item</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2">10-15 items:</Typography>
                        <Typography variant="h6">$5.99 per item</Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Typography variant="subtitle1" fontWeight="bold" color="primary" gutterBottom>
                        TUHME now Members
                      </Typography>
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="body2">3-5 items:</Typography>
                        <Typography variant="h6" color="primary">$4.99 per item</Typography>
                      </Box>
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="body2">5-10 items:</Typography>
                        <Typography variant="h6" color="primary">$3.99 per item</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2">10-15 items:</Typography>
                        <Typography variant="h6" color="primary">$2.99 per item</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  
                  <Divider sx={{ my: 3 }} />
                  
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Example: For an order of 10 items, you'd pay
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
                      <Box>
                        <Typography variant="body2">Standard:</Typography>
                        <Typography variant="h6">$79.90</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2">TUHME now:</Typography>
                        <Typography variant="h6" color="primary">$39.90</Typography>
                      </Box>
                    </Box>
                    <Typography variant="subtitle2" color="primary" fontWeight="bold">
                      Save $40 on a single order!
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: 8, backgroundColor: theme.palette.background.default }}>
        <Container>
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 6,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Frequently Asked Questions
          </Typography>

          <Grid container spacing={4}>
            {faqs.map((faq, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ mb: 2, height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
                      {faq.question}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box sx={{ py: 8, backgroundColor: 'black', color: 'white' }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                Try TUHME now - The Amazon Prime of Shopping
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.1rem',
                  mb: 4,
                  opacity: 0.9
                }}
              >
                Subscribe for just $49.99/month and enjoy unlimited deliveries with 50% off service fees.
                Shop from any store in Manhattan and Brooklyn, try items at home, and only pay for what you keep.
                Cancel or pause anytime.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  component={RouterLink}
                  to="/membership"
                  sx={{ 
                    borderRadius: '50px',
                    px: 3,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: 'black'
                  }}
                >
                  Subscribe to TUHME now
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  component={RouterLink}
                  to="/try-on"
                  sx={{ 
                    borderRadius: '50px',
                    px: 3,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Try Without Subscription
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1576097467878-3389cddc588e?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=600"
                alt="Happy customer using TUHME"
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '50%',
                  border: '5px solid white',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HowItWorksPage;