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
  Switch,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  useTheme,
  Paper
} from '@mui/material';
import {
  Check as CheckIcon,
  ExpandMore as ExpandMoreIcon,
  StarOutline as StarOutlineIcon,
  ErrorOutline as ErrorOutlineIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const PricingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [annual, setAnnual] = useState(false);

  // Pricing tiers
  const pricingTiers = [
    {
      name: 'Basic',
      description: 'Perfect for occasional shoppers',
      price: annual ? '19.99' : '24.99',
      frequency: annual ? '/month, billed annually' : '/month',
      features: [
        '3-5 items per order',
        '$9.99 service fee per item',
        'Same-day delivery (orders before 2PM)',
        'Returns within 15 minutes',
        'Basic shopper match',
        'Email support'
      ],
      cta: 'Start Shopping',
      color: '#ffffff',
      border: '#e0e0e0',
      highlighted: false
    },
    {
      name: 'Premium',
      description: 'Our most popular option',
      price: annual ? '39.99' : '49.99',
      frequency: annual ? '/month, billed annually' : '/month',
      features: [
        '5-10 items per order',
        '$7.99 service fee per item',
        'Same-day delivery (orders before 4PM)',
        'Returns within 24 hours',
        'Priority shopper match',
        'Phone & email support',
        'Personal style consultation',
        'Exclusive style events'
      ],
      cta: 'Go Premium',
      color: '#000000',
      textColor: '#ffffff',
      highlighted: true
    },
    {
      name: 'VIP',
      description: 'For serious fashion enthusiasts',
      price: annual ? '79.99' : '99.99',
      frequency: annual ? '/month, billed annually' : '/month',
      features: [
        '10-15 items per order',
        '$5.99 service fee per item',
        'Same-day priority delivery',
        'Returns within 48 hours',
        'Elite shopper match',
        '24/7 concierge support',
        'Quarterly wardrobe refresh',
        'Exclusive designer access',
        'Complimentary alterations',
        'Fashion week invitations'
      ],
      cta: 'Join VIP',
      color: '#ffffff',
      border: '#e0e0e0',
      highlighted: false
    }
  ];

  // Per-item pricing for non-members
  const itemPricing = [
    { items: '3-5 items', fee: '$9.99 per item' },
    { items: '5-10 items', fee: '$7.99 per item' },
    { items: '10-15 items', fee: '$5.99 per item' }
  ];

  // FAQs
  const faqs = [
    {
      question: 'How does the membership pricing work?',
      answer: 'Our membership plans offer a fixed monthly fee plus a reduced per-item service fee. The per-item fee is charged only for items you keep, not for items you try on and return.'
    },
    {
      question: 'Can I use TUHME without a membership?',
      answer: 'Yes! TUHME is available without a membership. Non-members pay only the per-item service fee based on the number of items ordered, with no monthly commitment.'
    },
    {
      question: 'What\'s included in the service fee?',
      answer: 'The service fee covers personal shopping, delivery to your door, waiting time for try-on, and return handling. It ensures our shoppers are fairly compensated for their expertise and time.'
    },
    {
      question: 'How often can I place orders with a membership?',
      answer: 'There is no limit to the number of orders you can place with any membership tier. Order as often as you like while your membership is active.'
    },
    {
      question: 'Can I cancel my membership at any time?',
      answer: 'Yes, you can cancel your membership at any time. For annual plans, you may be eligible for a prorated refund based on your usage.'
    },
    {
      question: 'Are there any hidden fees?',
      answer: 'No hidden fees! You only pay your membership fee (if applicable) and the service fee for items you keep. The price of the actual items is set by the stores, not by TUHME.'
    }
  ];

  const handleToggleAnnual = () => {
    setAnnual(!annual);
  };

  return (
    <Box sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ backgroundColor: 'background.default', py: 8 }}>
        <Container>
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              Simple, Transparent Pricing
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
              Choose how you want to experience TUHME. Pay per use with no commitment, or save with our membership options.
            </Typography>
            <FormControlLabel
              control={
                <Switch 
                  checked={annual} 
                  onChange={handleToggleAnnual}
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ mr: 1 }}>
                    {annual ? 'Annual (20% off)' : 'Monthly'}
                  </Typography>
                  {annual && (
                    <Box 
                      component="span" 
                      sx={{ 
                        bgcolor: '#FFD700', 
                        color: 'black', 
                        px: 1, 
                        py: 0.5, 
                        borderRadius: 1, 
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                      }}
                    >
                      SAVE 20%
                    </Box>
                  )}
                </Box>
              }
              sx={{ mb: 4 }}
            />
          </Box>

          {/* Pricing Cards */}
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {pricingTiers.map((tier, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  elevation={tier.highlighted ? 6 : 1}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    backgroundColor: tier.color,
                    color: tier.textColor,
                    border: tier.border ? `2px solid ${tier.border}` : 'none',
                    borderRadius: 4,
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: tier.highlighted ? 'translateY(-16px)' : 'translateY(-8px)'
                    },
                    ...(tier.highlighted && {
                      transform: { md: 'translateY(-16px)' }
                    })
                  }}
                >
                  {tier.highlighted && (
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        top: -15, 
                        left: 0, 
                        right: 0, 
                        textAlign: 'center' 
                      }}
                    >
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          display: 'inline-block', 
                          bgcolor: 'primary.main', 
                          color: 'white', 
                          px: 2, 
                          py: 0.5, 
                          borderRadius: 5,
                          fontWeight: 'bold'
                        }}
                      >
                        Most Popular
                      </Typography>
                    </Box>
                  )}
                  <CardContent sx={{ p: 4, flexGrow: 1 }}>
                    <Typography 
                      variant="h4" 
                      component="h2" 
                      fontWeight="bold" 
                      gutterBottom
                    >
                      {tier.name}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color={tier.textColor || 'text.secondary'} 
                      sx={{ mb: 3, opacity: tier.textColor ? 0.9 : 0.7 }}
                    >
                      {tier.description}
                    </Typography>

                    <Box sx={{ my: 3 }}>
                      <Typography 
                        variant="h3" 
                        component="span" 
                        fontWeight="bold"
                      >
                        ${tier.price}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        component="span"
                        sx={{ ml: 1, opacity: 0.7 }}
                      >
                        {tier.frequency}
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 3, borderColor: tier.textColor ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }} />

                    <List disablePadding>
                      {tier.features.map((feature, i) => (
                        <ListItem key={i} disableGutters sx={{ py: 1 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckIcon sx={{ color: tier.textColor || 'primary.main' }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={feature} 
                            primaryTypographyProps={{ 
                              variant: 'body2',
                              color: tier.textColor ? 'inherit' : 'text.primary'
                            }} 
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>

                  <Box sx={{ p: 4, pt: 0 }}>
                    <Button
                      variant={tier.highlighted ? "contained" : "outlined"}
                      color={tier.highlighted ? "secondary" : "primary"}
                      fullWidth
                      size="large"
                      component={RouterLink}
                      to="/try-on"
                      sx={{ 
                        py: 1.5, 
                        borderRadius: 50,
                        color: tier.highlighted ? 'black' : undefined,
                        fontWeight: 600
                      }}
                    >
                      {tier.cta}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Non-membership option */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
              Pay Per Use
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}>
              No membership required. Just pay a service fee for each item you keep.
            </Typography>
          </Box>

          <Grid container spacing={2} justifyContent="center" sx={{ mb: 6 }}>
            {itemPricing.map((pricing, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Paper 
                  elevation={2} 
                  sx={{ 
                    py: 3, 
                    px: 4, 
                    textAlign: 'center',
                    borderRadius: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    {pricing.items}
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {pricing.fee}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to="/try-on"
              sx={{ 
                py: 1.5, 
                px: 4, 
                borderRadius: 50,
                fontWeight: 600
              }}
            >
              Start Shopping
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Value Proposition */}
      <Box sx={{ py: 8, backgroundColor: 'black', color: 'white' }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={5}>
              <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
                What Makes TUHME Different
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                We're not just another shopping service. TUHME brings a unique try-before-you-buy experience with transparent pricing and expert personal shoppers.
              </Typography>
              <List disablePadding>
                {[
                  "Only pay for what you keep",
                  "No markup on retail prices",
                  "Hand-selected items from Manhattan stores",
                  "Flexible return time options",
                  "Personal shoppers with fashion expertise"
                ].map((point, index) => (
                  <ListItem key={index} disableGutters sx={{ py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <StarOutlineIcon sx={{ color: 'secondary.main' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={point} 
                      primaryTypographyProps={{ variant: 'body1' }} 
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1483181994834-aba9fd1e251a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800"
                alt="TUHME shopping experience"
                sx={{
                  width: '100%',
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FAQs */}
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
            Frequently Asked Questions
          </Typography>

          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            {faqs.map((faq, index) => (
              <Accordion key={index} sx={{ mb: 2, boxShadow: 'none', border: '1px solid #e0e0e0', borderRadius: '8px !important', overflow: 'hidden', '&:before': { display: 'none' } }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ 
                    backgroundColor: 'rgba(0,0,0,0.02)',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } 
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          <Box sx={{ mt: 6, p: 3, bgcolor: '#f8f9fa', borderRadius: 4, maxWidth: 800, mx: 'auto', display: 'flex', alignItems: 'center' }}>
            <ErrorOutlineIcon sx={{ fontSize: 36, color: 'primary.main', mr: 2 }} />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Still have questions?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Contact our customer support team at support@tuhme.com or call us at (212) 555-7890.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box sx={{ py: 8, backgroundColor: theme.palette.background.default }}>
        <Container>
          <Box sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto' }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Ready to Transform Your Shopping Experience?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Join thousands of satisfied customers who've discovered a better way to shop. 
              Start your TUHME journey today with no long-term commitments.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to="/try-on"
              sx={{ 
                px: 6,
                py: 1.5,
                borderRadius: 50,
                fontWeight: 600,
                fontSize: '1.1rem'
              }}
            >
              Start Your Free Trial
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default PricingPage;