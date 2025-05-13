import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Chip,
  IconButton
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PaymentsIcon from '@mui/icons-material/Payments';
import DiamondIcon from '@mui/icons-material/Diamond';

/**
 * CustomerJourneyPath - A component that guides users through the main customer journey
 * Similar to the flow on tuhme.com but with enhanced UI and clearer CTAs
 */
const CustomerJourneyPath = ({ onSelectionComplete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  // Journey paths data
  const journeyPaths = [
    {
      id: 'express',
      title: 'TUHME Express',
      description: 'Need something now? Get items delivered quickly from Manhattan luxury stores.',
      icon: <ShoppingBagIcon sx={{ fontSize: 40 }} />,
      steps: [
        'Search for specific items at top stores',
        'Personal shoppers collect your selections',
        'Same-day delivery to your door',
        'Try on and keep what you love'
      ],
      cta: 'Start Express Shopping',
      ctaAction: () => {
        // Open the store selection map
        if (onSelectionComplete) {
          onSelectionComplete('express');
        } else {
          navigate('/store-locator');
        }
      },
      recommended: true
    },
    {
      id: 'membership',
      title: 'TUHME Membership',
      description: 'Join our luxury membership program for unlimited style access.',
      icon: <DiamondIcon sx={{ fontSize: 40 }} />,
      steps: [
        'Choose your membership tier',
        'Unlimited try-on deliveries',
        'Personal stylist consultation',
        'Exclusive access to pre-releases'
      ],
      cta: 'View Membership Options',
      ctaAction: () => {
        // Show membership options
        if (onSelectionComplete) {
          onSelectionComplete('membership');
        } else {
          navigate('/membership');
        }
      },
      recommended: false
    },
    {
      id: 'ondemand',
      title: 'TUHME On-Demand',
      description: 'One-time service for special occasions or specific needs.',
      icon: <PaymentsIcon sx={{ fontSize: 40 }} />,
      steps: [
        'Tell us what items you need',
        'We source from multiple stores', 
        'Choose your delivery slot',
        'Pay per service with no commitment'
      ],
      cta: 'Schedule On-Demand',
      ctaAction: () => {
        // Open scheduling form
        if (onSelectionComplete) {
          onSelectionComplete('ondemand');
        } else {
          navigate('/schedule');
        }
      },
      recommended: false
    }
  ];
  
  return (
    <Box 
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: 'var(--tuhme-white)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background subtle pattern */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          backgroundImage: 'radial-gradient(circle at 25px 25px, black 2%, transparent 0%), radial-gradient(circle at 75px 75px, black 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          pointerEvents: 'none'
        }}
      />
      
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
          <Typography
            variant="h2"
            component="h2"
            className="tuhme-fadeIn"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 800,
              mb: 2,
              color: 'var(--tuhme-black)',
              letterSpacing: 'var(--tuhme-letter-tight)'
            }}
          >
            Choose Your Path
          </Typography>
          
          <Typography
            variant="body1"
            className="tuhme-fadeIn"
            sx={{
              color: 'var(--tuhme-text-secondary)',
              maxWidth: 700,
              mx: 'auto',
              mb: 3,
              lineHeight: 1.6
            }}
          >
            Select how you'd like to experience TUHME's luxury try-before-you-buy service.
          </Typography>
          
          <Divider 
            sx={{ 
              width: 80, 
              mx: 'auto', 
              borderColor: 'var(--tuhme-black)', 
              borderWidth: 2,
              mb: 6
            }} 
          />
        </Box>
        
        <Grid container spacing={4}>
          {journeyPaths.map((path, index) => (
            <Grid 
              item 
              xs={12} 
              md={4} 
              key={path.id}
              className="tuhme-slideUp"
              sx={{ animationDelay: `${index * 150}ms` }}
            >
              <Card 
                elevation={path.recommended ? 6 : 2}
                sx={{
                  height: '100%',
                  borderRadius: 'var(--tuhme-radius-lg)',
                  position: 'relative',
                  transition: 'var(--tuhme-transition-normal)',
                  transform: path.recommended ? 'scale(1.03)' : 'scale(1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 'var(--tuhme-shadow-lg)'
                  },
                  bgcolor: path.recommended ? 'var(--tuhme-black)' : 'var(--tuhme-white)',
                  color: path.recommended ? 'var(--tuhme-white)' : 'var(--tuhme-black)',
                  border: path.recommended ? 'none' : '1px solid var(--tuhme-border-light)'
                }}
              >
                {path.recommended && (
                  <Chip
                    label="RECOMMENDED"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      bgcolor: 'white',
                      color: 'var(--tuhme-black)',
                      fontWeight: 'var(--tuhme-font-bold)',
                      fontSize: '0.7rem',
                      letterSpacing: 'var(--tuhme-letter-wide)'
                    }}
                    size="small"
                  />
                )}
                
                <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Icon */}
                  <Box 
                    sx={{ 
                      mb: 3,
                      color: path.recommended ? 'var(--tuhme-white)' : 'var(--tuhme-black)'
                    }}
                  >
                    {path.icon}
                  </Box>
                  
                  {/* Title */}
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    sx={{ 
                      fontWeight: 'var(--tuhme-font-bold)',
                      mb: 1
                    }}
                  >
                    {path.title}
                  </Typography>
                  
                  {/* Description */}
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 3,
                      color: path.recommended ? 'rgba(255, 255, 255, 0.8)' : 'var(--tuhme-text-secondary)'
                    }}
                  >
                    {path.description}
                  </Typography>
                  
                  <Divider 
                    sx={{ 
                      mb: 3, 
                      borderColor: path.recommended ? 'rgba(255, 255, 255, 0.2)' : 'var(--tuhme-border-light)' 
                    }} 
                  />
                  
                  {/* Steps */}
                  <Box sx={{ mb: 4, flexGrow: 1 }}>
                    {path.steps.map((step, stepIndex) => (
                      <Box 
                        key={stepIndex} 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          mb: 1.5
                        }}
                      >
                        <Box 
                          sx={{ 
                            width: 24, 
                            height: 24, 
                            borderRadius: '50%', 
                            bgcolor: path.recommended ? 'white' : 'var(--tuhme-black)',
                            color: path.recommended ? 'var(--tuhme-black)' : 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 'var(--tuhme-font-bold)',
                            mr: 2,
                            flexShrink: 0
                          }}
                        >
                          {stepIndex + 1}
                        </Box>
                        <Typography 
                          variant="body2"
                          sx={{ 
                            color: path.recommended ? 'white' : 'var(--tuhme-text-secondary)',
                            fontSize: '0.875rem'
                          }}
                        >
                          {step}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  
                  {/* CTA Button */}
                  <Button
                    variant={path.recommended ? 'contained' : 'outlined'}
                    fullWidth
                    onClick={path.ctaAction}
                    sx={{
                      py: 1.5,
                      mt: 'auto',
                      color: path.recommended ? 'var(--tuhme-black)' : 'var(--tuhme-black)',
                      bgcolor: path.recommended ? 'white' : 'transparent',
                      borderColor: path.recommended ? 'white' : 'var(--tuhme-black)',
                      '&:hover': {
                        bgcolor: path.recommended ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.05)',
                        borderColor: path.recommended ? 'white' : 'var(--tuhme-black)'
                      }
                    }}
                    endIcon={<ArrowForwardIcon />}
                  >
                    {path.cta}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {/* Bottom info */}
        <Box 
          sx={{ 
            mt: 6, 
            textAlign: 'center',
            p: 3,
            borderRadius: 'var(--tuhme-radius-lg)',
            border: '1px dashed var(--tuhme-border-light)',
            bgcolor: 'var(--tuhme-bg-secondary)'
          }}
          className="tuhme-fadeIn"
        >
          <Typography variant="body2" color="var(--tuhme-text-secondary)">
            Not sure which option is right for you? Text "HELP" to <strong>(646) 588-9916</strong> for personalized guidance.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default CustomerJourneyPath;