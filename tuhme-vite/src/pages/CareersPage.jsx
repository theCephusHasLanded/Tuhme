import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Avatar,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  CheckCircleOutline as CheckIcon,
  Schedule as ScheduleIcon,
  AttachMoney as MoneyIcon,
  LocationOn as LocationIcon,
  PersonOutline as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Instagram as InstagramIcon,
  Apartment as ApartmentIcon,
  Star as StarIcon,
  Public as PublicIcon
} from '@mui/icons-material';

const CareersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    experience: '',
    whyJoin: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Benefits of being a TUHME Shopper
  const benefits = [
    {
      icon: <ScheduleIcon />,
      title: "Flexible Hours",
      description: "Work when it fits your schedule. Choose your availability and pick up shopping assignments that work for you."
    },
    {
      icon: <MoneyIcon />,
      title: "Competitive Pay",
      description: "Earn up to $30/hour plus tips. Get paid weekly and track your earnings in real-time through our app."
    },
    {
      icon: <LocationIcon />,
      title: "Manhattan-Based",
      description: "All shopping assignments are within Manhattan, allowing you to shop at premiere retail locations."
    },
    {
      icon: <PublicIcon />,
      title: "Join a Community",
      description: "Connect with other fashion-forward shoppers and build your network in the NYC retail scene."
    }
  ];

  // Qualifications
  const qualifications = [
    "Strong knowledge of fashion and retail",
    "Excellent customer service skills",
    "Reliable transportation within Manhattan",
    "Smartphone with reliable data plan",
    "Available to work at least 10 hours per week",
    "Professional appearance and demeanor",
    "Background check required"
  ];

  // Application process steps
  const applicationSteps = [
    "Submit online application",
    "Initial phone interview",
    "In-person style assessment",
    "Background check",
    "Training and onboarding"
  ];

  // Testimonials from current shoppers
  const testimonials = [
    {
      id: 1,
      name: "Sofia Chen",
      role: "TUHME Shopper since 2024",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=150",
      quote: "Being a TUHME shopper lets me combine my love for fashion with a flexible work schedule that accommodates my other jobs in the industry. The app is super intuitive, and I love connecting clients with styles that make them feel amazing."
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "TUHME Shopper since 2023",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=150",
      quote: "TUHME has been a game-changer for me. As someone who used to work retail, this gives me the freedom to still be in fashion without being tied to store hours. The pay is excellent, and the customers are always excited to see what I've brought them!"
    }
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        experience: '',
        whyJoin: ''
      });
    }, 1500);
  };

  return (
    <Box sx={{ py: 8 }}>
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
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                Become a TUHME Shopper
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
                Join our team of fashion-forward personal shoppers and help deliver exceptional try-before-you-buy experiences to our customers throughout Manhattan.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                href="#apply"
                sx={{ 
                  borderRadius: '50px',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                Apply Now
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800"
                alt="Personal shopper at work"
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

      {/* Benefits Section */}
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
            Why Become a TUHME Shopper?
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
          >
            Our shoppers enjoy competitive pay, flexible schedules, and the chance to work with premium fashion brands throughout Manhattan.
          </Typography>

          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
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

      {/* Instagram Section */}
      <Box sx={{ py: 8, backgroundColor: theme.palette.background.default }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={5}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography
                  variant="h3"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                  }}
                >
                  Follow Our Journey
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 4 }}
                >
                  Check out @tuh.me on Instagram to see our shoppers in action, behind-the-scenes content, and the latest fashion trends we're delivering.
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  startIcon={<InstagramIcon />}
                  component="a"
                  href="https://www.instagram.com/tuh.me/"
                  target="_blank"
                  sx={{ 
                    borderRadius: '50px',
                    px: 3,
                    py: 1.5
                  }}
                >
                  Follow @tuh.me
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
                {/* Instagram feed simulation - These would be actual Instagram posts */}
                {[...Array(6)].map((_, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={`https://source.unsplash.com/random/300x300?fashion,shopping&sig=${index}`}
                    alt="Instagram feed"
                    sx={{
                      width: '100%',
                      aspectRatio: '1/1',
                      objectFit: 'cover',
                      borderRadius: 2,
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        cursor: 'pointer'
                      }
                    }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Qualifications and Process */}
      <Box sx={{ py: 8, backgroundColor: 'white' }}>
        <Container>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                      fontWeight: 700,
                      mb: 3
                    }}
                  >
                    Qualifications
                  </Typography>

                  <List>
                    {qualifications.map((qualification, index) => (
                      <ListItem key={index} sx={{ py: 1 }}>
                        <ListItemIcon>
                          <CheckIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={qualification} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                      fontWeight: 700,
                      mb: 3
                    }}
                  >
                    Application Process
                  </Typography>

                  <Stepper 
                    orientation="vertical" 
                    sx={{ mt: 3 }}
                    activeStep={-1}
                  >
                    {applicationSteps.map((step, index) => (
                      <Step key={index} active={true}>
                        <StepLabel>{step}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
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
            Hear From Our Shoppers
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {testimonials.map((testimonial) => (
              <Grid item xs={12} md={6} key={testimonial.id}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    height: '100%',
                    position: 'relative',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      top: 30,
                      left: 30,
                      width: 40,
                      height: 40,
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23e0e0e0\'%3E%3Cpath d=\'M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.045-.56.139-.882.274-.317.144-.646.294-.977.486-.336.179-.656.393-.96.652-.307.25-.585.54-.849.846-.261.315-.466.653-.653.984-.193.325-.347.67-.487 1.01-.136.357-.224.673-.283.988-.052.302-.098.556-.11.805-.012.268 0 .493 0 .493l.299 3.648c0 0 .183-.013.519-.056.351-.034.828-.112 1.343-.152.347-.033.704-.067 1.067-.08.374-.022.753.007 1.128.026.375.018.753.044 1.127.071.6.055 1.185.133 1.718.16.35.037.656.043.915.067.66.036 1.014.046 1.014.046l.413-3.191c0 0-.358.037-1.062.037-1.331 0-2.733-.356-2.733-1.96 0-1.01.932-1.643 2.392-1.643.861 0 2.829.233 2.829 1.38 0 .784-.692 1.21-1.419 1.21-.974 0-1.382-.657-1.382-1.12 0-.407.173-.627.357-.736.186-.125.417-.23.417-.23s-.064-.407-.178-.611c-.111-.21-.301-.472-.691-.472-.362 0-1.524.448-1.524 2.196 0 1.888 1.785 2.424 3.315 2.424 1.83 0 3.291-.827 3.291-2.34 0-1.235-1.312-2.424-3.381-2.424C7.025 10 6.5 10 6.5 10zm11 0c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L21.258 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.045-.56.139-.882.274-.317.144-.646.294-.977.486-.336.179-.656.393-.96.652-.307.25-.585.54-.849.846-.261.315-.466.653-.653.984-.193.325-.347.67-.487 1.01-.136.357-.224.673-.283.988-.052.302-.098.556-.11.805-.012.268 0 .493 0 .493l.299 3.648c0 0 .183-.013.519-.056.351-.034.828-.112 1.343-.152.347-.033.704-.067 1.067-.08.374-.022.753.007 1.128.026.375.018.753.044 1.127.071.6.055 1.185.133 1.718.16.35.037.656.043.915.067.66.036 1.014.046 1.014.046l.413-3.191c0 0-.358.037-1.062.037-1.331 0-2.733-.356-2.733-1.96 0-1.01.932-1.643 2.392-1.643.861 0 2.829.233 2.829 1.38 0 .784-.692 1.21-1.419 1.21-.974 0-1.382-.657-1.382-1.12 0-.407.173-.627.357-.736.186-.125.417-.23.417-.23s-.064-.407-.178-.611c-.111-.21-.301-.472-.691-.472-.362 0-1.524.448-1.524 2.196 0 1.888 1.785 2.424 3.315 2.424 1.83 0 3.291-.827 3.291-2.34 0-1.235-1.312-2.424-3.381-2.424-1.8 0-2.325 0-2.325 0z\'/%3E%3C/svg%3E")',
                      backgroundRepeat: 'no-repeat',
                      zIndex: 0,
                      opacity: 0.2
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                    <Avatar 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      sx={{ width: 60, height: 60, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body1" sx={{ fontStyle: 'italic', position: 'relative', zIndex: 1 }}>
                    "{testimonial.quote}"
                  </Typography>
                  <Box sx={{ display: 'flex', mt: 2 }}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} sx={{ color: '#FFD700', fontSize: 20 }} />
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Application Form */}
      <Box id="apply" sx={{ py: 8, backgroundColor: 'black', color: 'white' }}>
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
            Join Our Team
          </Typography>

          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 6, maxWidth: 700, mx: 'auto', opacity: 0.9 }}
          >
            Ready to start your journey as a TUHME personal shopper? Fill out the application below, and our team will reach out to schedule your interview.
          </Typography>

          <Paper 
            component="form" 
            onSubmit={handleSubmit}
            sx={{ 
              maxWidth: 800, 
              mx: 'auto',
              p: { xs: 3, md: 5 },
              borderRadius: 3
            }}
          >
            {submitted ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <CheckIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Application Submitted!
                </Typography>
                <Typography color="text.secondary">
                  Thank you for your interest in becoming a TUHME shopper. Our team will review your application and contact you within 2-3 business days to discuss next steps.
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
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
                    InputProps={{
                      startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
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
                    InputProps={{
                      startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
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
                    InputProps={{
                      startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Manhattan Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: <ApartmentIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Relevant Experience"
                    name="experience"
                    multiline
                    rows={3}
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="Tell us about your background in fashion, retail, or customer service..."
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Why do you want to join TUHME?"
                    name="whyJoin"
                    multiline
                    rows={3}
                    value={formData.whyJoin}
                    onChange={handleInputChange}
                    placeholder="Share why you're interested in becoming a TUHME shopper..."
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={loading}
                    sx={{ py: 1.5, fontWeight: 600 }}
                  >
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </Grid>
              </Grid>
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default CareersPage;