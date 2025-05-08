import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  CircularProgress,
  Alert,
  Link,
  InputAdornment,
  IconButton,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const steps = ['Account Setup', 'Personal Information'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors = {};

    if (activeStep === 0) {
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
      
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    } else if (activeStep === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep(prevStep => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep()) return;
    
    setIsLoading(true);
    
    try {
      const displayName = `${formData.firstName} ${formData.lastName}`;
      const success = await register(formData.email, formData.password, displayName);
      
      if (success) {
        // Update user profile with additional information
        await updateUserProfile({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber || '',
        });
        
        navigate('/registration-success');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setErrors(prev => ({ ...prev, form: 'An unexpected error occurred. Please try again later.' }));
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              sx={{ mb: 3 }}
            />
          </>
        );
      case 1:
        return (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="given-name"
              value={formData.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={formData.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              autoComplete="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              sx={{ mb: 3 }}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          py: 8
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 2
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 4
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                mb: 1
              }}
            >
              Join TUHME
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 3,
                textAlign: 'center'
              }}
            >
              Create your account to start receiving personalized shopping assistance
            </Typography>
          </Box>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {(errors.form || error) && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {errors.form || error}
            </Alert>
          )}

          <Box component="form" onSubmit={activeStep === steps.length - 1 ? handleSubmit : undefined} noValidate>
            {renderStep()}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                variant="outlined"
                onClick={activeStep === 0 ? () => navigate('/login') : handleBack}
                sx={{ mr: 1 }}
              >
                {activeStep === 0 ? 'Back to Login' : 'Back'}
              </Button>
              <Button
                variant="contained"
                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  minWidth: '120px',
                  position: 'relative'
                }}
              >
                {isLoading ? (
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
                  activeStep === steps.length - 1 ? 'Register' : 'Next'
                )}
              </Button>
            </Box>
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link component={RouterLink} to="/login" variant="body2">
                Sign in
              </Link>
            </Typography>
          </Box>
        </Paper>
        
        <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
          &copy; {new Date().getFullYear()} TUHME, Inc. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;