import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import DiamondIcon from '@mui/icons-material/Diamond';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

/**
 * MembershipSection component
 * Showcases TUHME membership tiers with a modern black and white theme
 */
const MembershipSection = ({ onSelectPlan }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Membership plans data
  const plans = [
    {
      id: 'basic',
      name: 'TUHME Basic',
      price: 29.99,
      billing: 'monthly',
      description: 'Essential try-on service for occasional shoppers',
      features: [
        '2 try-on sessions per month',
        'Free Manhattan delivery',
        '48-hour try-on period',
        'Up to 4 items per delivery',
        'Standard shopping hours'
      ],
      highlight: false,
      icon: <StarHalfIcon fontSize="large" />,
      color: '#666'
    },
    {
      id: 'premium',
      name: 'TUHME Premium',
      price: 99.99,
      billing: 'monthly',
      description: 'Enhanced try-on service with priority handling',
      features: [
        'Unlimited try-on sessions',
        'Priority delivery windows',
        '72-hour extended try-on period',
        'Up to 8 items per delivery',
        'Personal style concierge',
        'Access to store pre-releases',
        'Extended shopping hours (9AM-8PM)'
      ],
      highlight: true,
      icon: <StarIcon fontSize="large" />,
      color: '#000'
    },
    {
      id: 'luxury',
      name: 'TUHME Luxury',
      price: 249.99,
      billing: 'monthly',
      description: 'VIP service for the most discerning clients',
      features: [
        'Unlimited try-on sessions',
        'Immediate same-day delivery',
        '5-day extended try-on period',
        'Unlimited items per delivery',
        'Dedicated personal shopper',
        'After-hours shopping service',
        'Exclusive brand access',
        'Private in-home styling sessions',
        'Alterations included'
      ],
      highlight: false,
      icon: <DiamondIcon fontSize="large" />,
      color: '#333'
    }
  ];
  
  // Handle plan selection
  const handleSelectPlan = (planId) => {
    if (onSelectPlan) {
      onSelectPlan(planId);
    } else {
      // Default behavior: open membership page
      window.location.href = '/membership';
    }
  };
  
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: '#000',
        color: 'white',
        backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(255, 255, 255, 0.03) 0%, transparent 70%), radial-gradient(circle at 10% 90%, rgba(255, 255, 255, 0.02) 0%, transparent 70%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background accent elements */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: -100, 
          right: -100, 
          width: 300, 
          height: 300, 
          borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%)'
        }}
      />
      
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Chip 
            label="MEMBERSHIP" 
            sx={{ 
              color: 'white', 
              bgcolor: 'rgba(255,255,255,0.1)', 
              fontSize: '0.75rem', 
              mb: 2,
              '& .MuiChip-label': { px: 2 }
            }} 
          />
          
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: '2.25rem', md: '3rem' },
              fontWeight: 700,
              mb: 2,
              background: 'linear-gradient(90deg, #FFFFFF 0%, #CCCCCC 100%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Choose Your Experience
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            Select the perfect TUHME membership to match your shopping needs. All plans include our signature try-before-you-buy experience.
          </Typography>
        </Box>
        
        {/* Membership Plans */}
        <Grid container spacing={4} justifyContent="center">
          {plans.map((plan) => (
            <Grid item xs={12} md={4} key={plan.id}>
              <Card 
                elevation={plan.highlight ? 10 : 2}
                sx={{
                  height: '100%',
                  backgroundColor: plan.highlight ? 'white' : 'rgba(255, 255, 255, 0.05)',
                  color: plan.highlight ? 'black' : 'white',
                  border: plan.highlight ? '2px solid white' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 3,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  overflow: 'hidden',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 48px rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                {/* Popular tag */}
                {plan.highlight && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 20,
                      right: -30,
                      transform: 'rotate(45deg)',
                      backgroundColor: '#000',
                      color: 'white',
                      px: 4,
                      py: 0.5,
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      zIndex: 1,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                    }}
                  >
                    MOST POPULAR
                  </Box>
                )}
                
                <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Plan Header */}
                  <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                    <Box 
                      sx={{ 
                        mr: 2, 
                        color: plan.highlight ? plan.color : 'white',
                        bgcolor: plan.highlight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '50%',
                        width: 48,
                        height: 48,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {plan.icon}
                    </Box>
                    <Box>
                      <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {plan.name}
                      </Typography>
                      <Typography variant="body2" color={plan.highlight ? 'text.secondary' : 'rgba(255, 255, 255, 0.7)'}>
                        {plan.description}
                      </Typography>
                    </Box>
                  </Box>
                  
                  {/* Price */}
                  <Box sx={{ mb: 3 }}>
                    <Typography 
                      variant="h3" 
                      component="div" 
                      sx={{ 
                        fontWeight: 700, 
                        display: 'flex', 
                        alignItems: 'baseline'
                      }}
                    >
                      ${plan.price}
                      <Typography 
                        component="span" 
                        sx={{ 
                          fontSize: '1rem',
                          ml: 1,
                          fontWeight: 400,
                          color: plan.highlight ? 'text.secondary' : 'rgba(255, 255, 255, 0.6)'
                        }}
                      >
                        /month
                      </Typography>
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ 
                    mb: 3, 
                    borderColor: plan.highlight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)' 
                  }} />
                  
                  {/* Features */}
                  <List sx={{ mb: 4, flexGrow: 1 }}>
                    {plan.features.map((feature, idx) => (
                      <ListItem key={idx} disableGutters sx={{ py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircleIcon sx={{ 
                            color: plan.highlight ? 'primary.main' : 'rgba(255, 255, 255, 0.9)',
                            fontSize: '1.25rem' 
                          }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={feature} 
                          primaryTypographyProps={{ 
                            fontSize: '0.95rem',
                            color: plan.highlight ? 'inherit' : 'rgba(255, 255, 255, 0.9)',
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  
                  {/* Action Button */}
                  <Button
                    variant={plan.highlight ? 'contained' : 'outlined'}
                    fullWidth
                    size="large"
                    onClick={() => handleSelectPlan(plan.id)}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      backgroundColor: plan.highlight ? 'black' : 'transparent',
                      color: plan.highlight ? 'white' : 'white',
                      borderColor: 'white',
                      '&:hover': {
                        backgroundColor: plan.highlight ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.1)',
                      },
                      mt: 'auto'
                    }}
                    endIcon={<ArrowForwardIcon />}
                  >
                    Select Plan
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {/* Promo Box */}
        <Paper
          elevation={0}
          sx={{
            mt: 8,
            p: { xs: 3, md: 4 },
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 4,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <LocalOfferIcon sx={{ fontSize: 32, color: '#FFC107' }} />
            <Box>
              <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                First Month 50% Off
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Experience TUHME luxury at half the price. Limited time offer for new members.
              </Typography>
            </Box>
          </Box>
          
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: 'white',
              color: 'white',
              borderRadius: 2,
              px: 3,
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Claim Offer
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default MembershipSection;