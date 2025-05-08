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
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!email || !password) {
      setLoginError('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    setLoginError('');
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setLoginError('Invalid login credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setLoginError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
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
              mb: 3
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
              TUHME
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                mb: 3,
                fontWeight: 500
              }}
            >
              Shopper Dashboard
            </Typography>
          </Box>

          {(loginError || error) && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {loginError || error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isLoading}
              sx={{
                py: 1.5,
                fontWeight: 600,
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
                'Sign In'
              )}
            </Button>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Don't have an account?{' '}
              <Link component={RouterLink} to="/register" variant="body2" sx={{ fontWeight: 'medium' }}>
                Sign up
              </Link>
            </Typography>
            <Link component={RouterLink} to="/" variant="body2" sx={{ fontSize: '0.875rem' }}>
              Back to Home
            </Link>
          </Box>
          
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              For demo purposes, use:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: demo@tuhme.com | Password: shopper123
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

export default LoginPage;