import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Check as CheckIcon,
  Stars as StarsIcon,
  LocalShipping as ShippingIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  Apartment as ApartmentIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  CreditCard as CreditCardIcon,
  Lock as LockIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const MembershipPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    terms: false
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Membership benefits
  const membershipBenefits = [
    {
      icon: <ShippingIcon fontSize="large" />,
      title: "Unlimited Deliveries",
      description: "Get unlimited deliveries per month as a TUHME now member, with no delivery cap."
    },
    {
      icon: <ScheduleIcon fontSize="large" />,
      title: "50% Off Service Fee",
      description: "Pay only 50% of the regular service fee for each item - significant savings on every order."
    },
    {
      icon: <StarsIcon fontSize="large" />,
      title: "Same-Day Delivery",
      description: "Orders placed before noon are delivered the same day, even on weekends when stores are open."
    },
    {
      icon: <PersonIcon fontSize="large" />,
      title: "Try Before You Buy",
      description: "Try on items at home and only pay for what you keep. Return unwanted items to the shopper."
    }
  ];

  // Membership tiers
  const membershipTiers = [
    {
      name: 'TUHME now',
      price: '49.99',
      features: [
        'Unlimited orders per month',
        '50% off service fee per item',
        'Same-day delivery (orders before noon)',
        'Service fee based on order size:',
        '3-5 items: $4.99 per item (regular $9.99)',
        '5-10 items: $3.99 per item (regular $7.99)',
        '10-15 items: $2.99 per item (regular $5.99)',
        'Cancel or pause anytime',
        'Manhattan & Brooklyn delivery',
        'Shop from any local store'
      ],
      recommended: true
    },
    {
      name: 'Pay Per Service',
      price: '0',
      isPayPerUse: true,
      features: [
        'Pay for each delivery',
        'Full service fee per item',
        'Next-day delivery for orders after noon',
        'Standard service fees:',
        '3-5 items: $9.99 per item',
        '5-10 items: $7.99 per item',
        '10-15 items: $5.99 per item',
        'Try before you buy',
        'Manhattan & Brooklyn delivery',
        'Shop from any local store'
      ],
      recommended: false
    }
  ];

  // Steps for sign-up process
  const steps = [
    {
      label: 'Choose Your Membership',
      description: 'Select the membership tier that best fits your needs.'
    },
    {
      label: 'Personal Information',
      description: 'Tell us about yourself so we can personalize your experience.'
    },
    {
      label: 'Shipping Address',
      description: 'Where should we deliver your items?'
    },
    {
      label: 'Payment Information',
      description: 'Your payment information is securely encrypted.'
    }
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle next step
  const handleNext = () => {
    // Validate current step before proceeding
    if (activeStep === 3) {
      handleSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  // Handle back step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Handle form submission
  const handleSubmit = () => {
    setLoading(true);
    setError('');

    // Form validation
    if (!formData.terms) {
      setError('You must agree to the terms and conditions to proceed.');
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  // Reset the form
  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      cardName: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
      terms: false
    });
    setSuccess(false);
  };

  // Render membership selection step
  const renderMembershipSelection = () => (
    <Grid container spacing={4}>
      {membershipTiers.map((tier, index) => (
        <Grid item xs={12} md={6} key={index}>
          <Card 
            sx={{ 
              height: '100%',
              position: 'relative',
              border: tier.recommended ? '2px solid' : '1px solid #e0e0e0',
              borderColor: tier.recommended ? 'primary.main' : 'divider',
              borderRadius: 4,
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
              }
            }}
          >
            {tier.recommended && (
              <Box 
                sx={{ 
                  position: 'absolute', 
                  top: 20, 
                  right: 0,
                  backgroundColor: 'primary.main',
                  color: 'white',
                  py: 0.5,
                  px: 2,
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                  fontWeight: 'bold',
                  fontSize: '0.85rem'
                }}
              >
                Recommended
              </Box>
            )}
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" component="h3" fontWeight="bold" gutterBottom>
                {tier.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 3 }}>
                {tier.isPayPerUse ? (
                  <Typography variant="h5" component="span" fontWeight="bold" color="text.secondary">
                    No monthly fee
                  </Typography>
                ) : (
                  <>
                    <Typography variant="h3" component="span" fontWeight="bold">
                      ${tier.price}
                    </Typography>
                    <Typography variant="body1" component="span" color="text.secondary" sx={{ ml: 1 }}>
                      /month
                    </Typography>
                  </>
                )}
              </Box>
              <Divider sx={{ my: 3 }} />
              <List disablePadding>
                {tier.features.map((feature, i) => (
                  <ListItem key={i} disableGutters sx={{ py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={feature} 
                      primaryTypographyProps={{ variant: 'body2' }} 
                    />
                  </ListItem>
                ))}
              </List>
              <Button
                variant={tier.recommended ? "contained" : "outlined"}
                color="primary"
                fullWidth
                size="large"
                sx={{ 
                  mt: 4, 
                  py: 1.5, 
                  borderRadius: 50,
                  fontWeight: 600
                }}
                onClick={handleNext}
              >
                {tier.isPayPerUse ? 'Continue Without Subscription' : `Subscribe to ${tier.name}`}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  // Render personal information step
  const renderPersonalInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </Grid>
    </Grid>
  );

  // Render shipping address step
  const renderShippingAddress = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Street Address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="City"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          required
          fullWidth
          label="State"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          required
          fullWidth
          label="ZIP Code"
          name="zip"
          value={formData.zip}
          onChange={handleInputChange}
        />
      </Grid>
    </Grid>
  );

  // Render payment information step
  const renderPaymentInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Name on Card"
          name="cardName"
          value={formData.cardName}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Card Number"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: <CreditCardIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Expiry Date (MM/YY)"
          name="expiry"
          value={formData.expiry}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="CVV"
          name="cvv"
          value={formData.cvv}
          onChange={handleInputChange}
          type="password"
        />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f9f9f9', p: 2, borderRadius: 2 }}>
          <LockIcon sx={{ color: 'text.secondary', mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Your payment information is securely encrypted using industry-standard SSL technology
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox 
              checked={formData.terms} 
              onChange={handleInputChange} 
              name="terms" 
              color="primary" 
            />
          }
          label={
            <Typography variant="body2">
              I agree to the TUHME <RouterLink to="#" style={{ color: theme.palette.primary.main }}>Terms of Service</RouterLink> and <RouterLink to="#" style={{ color: theme.palette.primary.main }}>Privacy Policy</RouterLink>
            </Typography>
          }
        />
      </Grid>
      {error && (
        <Grid item xs={12}>
          <Alert severity="error">{error}</Alert>
        </Grid>
      )}
    </Grid>
  );

  // Render appropriate step content
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return renderMembershipSelection();
      case 1:
        return renderPersonalInfo();
      case 2:
        return renderShippingAddress();
      case 3:
        return renderPaymentInfo();
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ backgroundColor: 'black', color: 'white', py: 8 }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                TUHME now
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
                The Amazon Prime of Shopping Delivery
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.1rem',
                  mb: 4,
                  lineHeight: 1.6
                }}
              >
                $49.99/month for unlimited deliveries with 50% off service fees. Try items at home, pay only for what you keep, and have your shopper take back the rest.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                href="#join"
                sx={{ 
                  borderRadius: '50px',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                Subscribe Now
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800"
                alt="Luxury shopping experience"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Membership Benefits */}
      <Box sx={{ py: 8, backgroundColor: 'white' }}>
        <Container>
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            TUHME now Benefits
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
          >
            Just like Amazon Prime revolutionized online shopping, TUHME now transforms your in-store shopping experience with unlimited deliveries and significant savings on every order.
          </Typography>

          <Grid container spacing={4}>
            {membershipBenefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-10px)'
                    }
                  }}
                  elevation={2}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                    <Box sx={{ color: 'primary.main', mb: 2, fontSize: '3rem' }}>
                      {benefit.icon}
                    </Box>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom
                      sx={{ fontWeight: 600, mb: 2 }}
                    >
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {benefit.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Membership Sign-Up Process */}
      <Box id="join" sx={{ py: 8, backgroundColor: theme.palette.background.default }}>
        <Container>
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Subscribe to TUHME now
          </Typography>
          
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
          >
            Start enjoying unlimited deliveries for one flat monthly fee of $49.99. Pause or cancel anytime.
          </Typography>

          {success ? (
            <Paper
              elevation={3}
              sx={{
                p: 5,
                maxWidth: 800,
                mx: 'auto',
                textAlign: 'center',
                borderRadius: 4
              }}
            >
              <CheckIcon 
                color="success" 
                sx={{ 
                  fontSize: 80,
                  mb: 3,
                  p: 2,
                  bgcolor: 'success.light',
                  borderRadius: '50%',
                  color: 'success.main'
                }} 
              />
              <Typography variant="h4" gutterBottom fontWeight="bold">
                Welcome to TUHME now!
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                Your subscription has been successfully activated. You'll receive a confirmation email shortly with all the details about your TUHME now benefits, including how to enjoy unlimited deliveries and 50% off service fees.
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/try-on"
                  sx={{ 
                    mr: 2,
                    px: 3,
                    py: 1.5,
                    borderRadius: 50
                  }}
                >
                  Start Shopping
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  sx={{ 
                    px: 3,
                    py: 1.5,
                    borderRadius: 50
                  }}
                >
                  Return to Membership
                </Button>
              </Box>
            </Paper>
          ) : (
            <Box sx={{ maxWidth: 800, mx: 'auto' }}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel>
                      <Typography variant="h6">{step.label}</Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {step.description}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        {getStepContent(index)}
                      </Box>
                      <Box sx={{ mb: 2, mt: 4, display: 'flex' }}>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ 
                            px: 3, 
                            py: 1, 
                            borderRadius: 50,
                            minWidth: 120
                          }}
                          disabled={loading}
                        >
                          {loading ? (
                            <CircularProgress size={24} />
                          ) : (
                            activeStep === steps.length - 1 ? 'Complete' : 'Continue'
                          )}
                        </Button>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box>
          )}
        </Container>
      </Box>

      {/* Testimonials */}
      <Box sx={{ py: 8, backgroundColor: 'black', color: 'white' }}>
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
            What Our Members Say
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                quote: "TUHME now has completely transformed how I shop. The unlimited deliveries and 50% discount on service fees make it so easy to try multiple styles without the commitment.",
                name: "Alexandra R.",
                title: "TUHME now subscriber since 2024",
                avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=100"
              },
              {
                quote: "I love that I can shop from any local store in Manhattan, not just the ones listed on the app. The TUHME now subscription has paid for itself after just two shopping trips.",
                name: "Michael T.",
                title: "TUHME now subscriber since 2023",
                avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=100"
              },
              {
                quote: "As a busy professional, the same-day delivery for orders placed before noon is a game-changer. I can get items delivered to my home to try on without ever entering a store.",
                name: "Sophia K.",
                title: "TUHME now subscriber since 2024",
                avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=100"
              }
            ].map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ bgcolor: 'rgba(255,255,255,0.1)', height: '100%', borderRadius: 4, boxShadow: 'none' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 3 }}>
                      "{testimonial.quote}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        component="img"
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        sx={{ width: 50, height: 50, borderRadius: '50%', mr: 2 }}
                      />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                          {testimonial.title}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Banner */}
      <Box sx={{ py: 5, backgroundColor: 'white' }}>
        <Container>
          <Box sx={{ 
            p: 4, 
            bgcolor: theme.palette.background.default, 
            borderRadius: 4,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            textAlign: { xs: 'center', md: 'left' }
          }}>
            <Box sx={{ mb: { xs: 3, md: 0 } }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                How TUHME Works
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Forward screenshots of items via WhatsApp, and we'll handle the rest. Orders before noon are delivered same day.
              </Typography>
            </Box>
            <Button 
              variant="outlined" 
              color="primary"
              component={RouterLink}
              to="/how-it-works"
              sx={{ 
                borderRadius: 50,
                px: 3,
                py: 1.5,
                minWidth: 200
              }}
            >
              Learn How It Works
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default MembershipPage;