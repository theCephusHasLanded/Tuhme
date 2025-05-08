import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Container,
  Button,
  Link,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { CheckCircleOutline, Email, Dashboard, ShoppingBag } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const RegistrationSuccessPage = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container maxWidth="md">
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
            p: { xs: 3, md: 5 },
            width: '100%',
            borderRadius: 2,
            textAlign: 'center'
          }}
        >
          <CheckCircleOutline
            color="success"
            sx={{ fontSize: 64, mb: 2 }}
          />
          
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 600
            }}
          >
            Registration Successful!
          </Typography>
          
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Thank you for joining TUHME's luxury shopping experience
          </Typography>
          
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Email color="primary" sx={{ mr: 1 }} />
            <Typography>
              We've sent a verification email to{' '}
              <Box component="span" sx={{ fontWeight: 'bold' }}>
                {currentUser?.email}
              </Box>
            </Typography>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ textAlign: 'left', mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
              What's Next?
            </Typography>
            
            <List>
              <ListItem sx={{ py: 1 }}>
                <ListItemIcon>
                  <Email color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Verify Your Email"
                  secondary="Click the link in the verification email we just sent you"
                />
              </ListItem>
              
              <ListItem sx={{ py: 1 }}>
                <ListItemIcon>
                  <Dashboard color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Complete Your Profile"
                  secondary="Add your delivery addresses and preferences in your account settings"
                />
              </ListItem>
              
              <ListItem sx={{ py: 1 }}>
                <ListItemIcon>
                  <ShoppingBag color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Start Shopping"
                  secondary="Explore luxury boutiques and let our shoppers assist you"
                />
              </ListItem>
            </List>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', gap: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              component={RouterLink} 
              to="/dashboard"
              sx={{ px: 4, py: 1.5 }}
            >
              Go to Dashboard
            </Button>
            
            <Button 
              variant="outlined" 
              component={RouterLink} 
              to="/"
              sx={{ px: 4, py: 1.5 }}
            >
              Back to Home
            </Button>
          </Box>
        </Paper>
        
        <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
          &copy; {new Date().getFullYear()} TUHME, Inc. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default RegistrationSuccessPage;