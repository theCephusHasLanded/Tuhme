import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Divider,
  Button,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Paper,
  Badge,
  useMediaQuery,
  useTheme,
  Alert,
  CircularProgress,
  Snackbar
} from '@mui/material';
import {
  Person as PersonIcon,
  History as HistoryIcon,
  Favorite as FavoriteIcon,
  CreditCard as CreditCardIcon,
  Home as HomeIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  ShoppingBag as ShoppingBagIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Verified as VerifiedIcon,
  ErrorOutline as ErrorOutlineIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const MyAccountPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { currentUser, userProfile, updateUserProfile, error } = useAuth();
  
  const [activeTab, setActiveTab] = useState(0);
  const [editProfile, setEditProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    displayName: ''
  });
  
  // User data
  const [userData, setUserData] = useState({
    addresses: [
      {
        id: 1,
        type: 'Home',
        street: '123 East 72nd Street',
        apt: 'Apt 5B',
        city: 'New York',
        state: 'NY',
        zip: '10021',
        isDefault: true
      }
    ],
    paymentMethods: [
      {
        id: 1,
        type: 'Credit Card',
        cardType: 'Visa',
        lastFour: '4242',
        expiry: '05/27',
        isDefault: true
      }
    ]
  });
  
  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser && !isLoading) {
      navigate('/login');
    }
  }, [currentUser, navigate, isLoading]);
  
  // Initialize form data from user profile
  useEffect(() => {
    if (userProfile) {
      setFormData({
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        phoneNumber: userProfile.phoneNumber || '',
        email: currentUser?.email || '',
        displayName: currentUser?.displayName || ''
      });
      
      // If user has addresses in profile, use those
      if (userProfile.deliveryAddresses && userProfile.deliveryAddresses.length > 0) {
        setUserData(prevData => ({
          ...prevData,
          addresses: userProfile.deliveryAddresses
        }));
      }
    }
  }, [userProfile, currentUser]);

  // Sample order history
  const orderHistory = [
    {
      id: 'TM25792',
      date: 'April 23, 2025',
      status: 'Delivered',
      items: 3,
      total: 385.00,
      store: 'Saks Fifth Avenue'
    },
    {
      id: 'TM25684',
      date: 'April 15, 2025',
      status: 'Returned',
      items: 2,
      total: 210.00,
      store: 'Bloomingdale\'s'
    },
    {
      id: 'TM25432',
      date: 'March 30, 2025',
      status: 'Completed',
      items: 5,
      total: 750.00,
      store: 'Nordstrom'
    }
  ];

  // Sample saved items/favorites
  const savedItems = [
    {
      id: 'F1',
      name: 'Black Silk Evening Dress',
      store: 'Saks Fifth Avenue',
      price: 245.00,
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=200&h=200'
    },
    {
      id: 'F2',
      name: 'Navy Sequin Gown',
      store: 'Nordstrom',
      price: 320.00,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=200&h=200'
    },
    {
      id: 'F3',
      name: 'Burgundy Off-Shoulder Dress',
      store: 'Bloomingdale\'s',
      price: 195.00,
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=200&h=200'
    }
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleDeleteAddress = (addressId) => {
    setUserData({
      ...userData,
      addresses: userData.addresses.filter(addr => addr.id !== addressId)
    });
  };

  const handleDeletePayment = (paymentId) => {
    setUserData({
      ...userData,
      paymentMethods: userData.paymentMethods.filter(payment => payment.id !== paymentId)
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleProfileSave = async () => {
    setIsLoading(true);
    
    try {
      const profileData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber
      };
      
      const success = await updateUserProfile(profileData);
      
      if (success) {
        setSnackbar({
          open: true,
          message: 'Profile updated successfully!',
          severity: 'success'
        });
        setEditProfile(false);
      } else {
        setSnackbar({
          open: true,
          message: 'Failed to update profile. Please try again.',
          severity: 'error'
        });
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setSnackbar({
        open: true,
        message: 'An error occurred while updating your profile.',
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  const renderProfileTab = () => (
    <Grid container spacing={4}>
      {/* Loading state */}
      {!currentUser && (
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
            <CircularProgress />
          </Box>
        </Grid>
      )}
      
      {currentUser && (
        <>
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3, textAlign: 'center', p: 3 }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <IconButton 
                    size="small" 
                    sx={{ bgcolor: 'primary.main', color: 'white' }}
                    onClick={() => setEditProfile(true)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                }
              >
                <Avatar
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    margin: '0 auto 20px',
                    bgcolor: 'primary.main',
                    fontSize: '2.5rem'
                  }}
                >
                  {formData.firstName && formData.lastName 
                    ? `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`
                    : currentUser.email.charAt(0).toUpperCase()}
                </Avatar>
              </Badge>
              
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {formData.firstName && formData.lastName
                  ? `${formData.firstName} ${formData.lastName}`
                  : currentUser.displayName || 'TUHME User'}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body1" color="text.secondary">
                  {currentUser.email}
                </Typography>
              </Box>
              
              {formData.phoneNumber && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body1" color="text.secondary">
                    {formData.phoneNumber}
                  </Typography>
                </Box>
              )}
              
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                {currentUser.emailVerified ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                    <VerifiedIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">Email Verified</Typography>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'warning.main' }}>
                    <ErrorOutlineIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">Email Not Verified</Typography>
                  </Box>
                )}
              </Box>
              
              <Button 
                variant="outlined" 
                sx={{ mt: 3 }}
                onClick={() => setEditProfile(true)}
                startIcon={<EditIcon />}
              >
                Edit Profile
              </Button>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            {editProfile ? (
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Edit Profile
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      name="email"
                      value={formData.email}
                      disabled
                      helperText="Email cannot be changed"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                      <Button 
                        sx={{ mr: 2 }}
                        onClick={() => setEditProfile(false)}
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="contained"
                        onClick={handleProfileSave}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <CircularProgress size={24} />
                        ) : (
                          'Save Changes'
                        )}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            ) : (
              <>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" fontWeight="bold">
                        Addresses
                      </Typography>
                      <Button 
                        startIcon={<AddIcon />} 
                        size="small"
                      >
                        Add Address
                      </Button>
                    </Box>
                    
                    <Divider sx={{ mb: 2 }} />
                    
                    {userData.addresses.map((address) => (
                      <Paper 
                        key={address.id} 
                        elevation={0} 
                        sx={{ 
                          p: 2, 
                          mb: 2, 
                          border: '1px solid #eee',
                          borderLeft: address.isDefault ? '4px solid' : '1px solid',
                          borderLeftColor: address.isDefault ? 'primary.main' : '#eee'
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Box>
                            <Typography variant="subtitle1" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
                              <HomeIcon fontSize="small" sx={{ mr: 1 }} />
                              {address.type}
                              {address.isDefault && (
                                <Typography 
                                  variant="caption" 
                                  sx={{ 
                                    ml: 1, 
                                    bgcolor: 'primary.main', 
                                    color: 'white', 
                                    px: 1, 
                                    py: 0.5, 
                                    borderRadius: 1 
                                  }}
                                >
                                  Default
                                </Typography>
                              )}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              {address.street}, {address.apt}
                            </Typography>
                            <Typography variant="body2">
                              {address.city}, {address.state} {address.zip}
                            </Typography>
                          </Box>
                          <Box>
                            <IconButton size="small" color="primary">
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => handleDeleteAddress(address.id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      </Paper>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" fontWeight="bold">
                        Payment Methods
                      </Typography>
                      <Button 
                        startIcon={<AddIcon />} 
                        size="small"
                      >
                        Add Payment Method
                      </Button>
                    </Box>
                    
                    <Divider sx={{ mb: 2 }} />
                    
                    {userData.paymentMethods.map((payment) => (
                      <Paper 
                        key={payment.id} 
                        elevation={0} 
                        sx={{ 
                          p: 2, 
                          mb: 2, 
                          border: '1px solid #eee',
                          borderLeft: payment.isDefault ? '4px solid' : '1px solid',
                          borderLeftColor: payment.isDefault ? 'primary.main' : '#eee'
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Box>
                            <Typography variant="subtitle1" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
                              <CreditCardIcon fontSize="small" sx={{ mr: 1 }} />
                              {payment.cardType} •••• {payment.lastFour}
                              {payment.isDefault && (
                                <Typography 
                                  variant="caption" 
                                  sx={{ 
                                    ml: 1, 
                                    bgcolor: 'primary.main', 
                                    color: 'white', 
                                    px: 1, 
                                    py: 0.5, 
                                    borderRadius: 1 
                                  }}
                                >
                                  Default
                                </Typography>
                              )}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              Expires: {payment.expiry}
                            </Typography>
                          </Box>
                          <Box>
                            <IconButton size="small" color="primary">
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => handleDeletePayment(payment.id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      </Paper>
                    ))}
                  </CardContent>
                </Card>
              </>
            )}
          </Grid>
        </>
      )}
    </Grid>
  );

  const renderOrdersTab = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Your Order History
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        {orderHistory.length === 0 ? (
          <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
            You haven't placed any orders yet.
          </Typography>
        ) : (
          <List sx={{ width: '100%' }}>
            {orderHistory.map((order) => (
              <React.Fragment key={order.id}>
                <ListItem
                  secondaryAction={
                    <Button 
                      variant="outlined" 
                      size="small"
                      startIcon={<VisibilityIcon />}
                    >
                      View
                    </Button>
                  }
                  sx={{ 
                    py: 2,
                    borderLeft: '4px solid',
                    borderLeftColor: 
                      order.status === 'Delivered' ? '#2196f3' : 
                      order.status === 'Returned' ? '#f44336' : 
                      '#4caf50',
                    pl: 2
                  }}
                >
                  <ListItemIcon>
                    <ShoppingBagIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography fontWeight="bold">Order #{order.id}</Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            ml: 2, 
                            px: 1, 
                            py: 0.5, 
                            borderRadius: 1,
                            bgcolor: 
                              order.status === 'Delivered' ? '#e3f2fd' : 
                              order.status === 'Returned' ? '#ffebee' : 
                              '#e8f5e9',
                            color: 
                              order.status === 'Delivered' ? '#0d47a1' : 
                              order.status === 'Returned' ? '#b71c1c' : 
                              '#1b5e20',
                          }}
                        >
                          {order.status}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography variant="body2" component="span" color="text.primary">
                          {order.date} • {order.store}
                        </Typography>
                        <Typography variant="body2" component="div" sx={{ mt: 0.5 }}>
                          {order.items} items • ${order.total.toFixed(2)}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );

  const renderFavoritesTab = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Your Favorites
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        {savedItems.length === 0 ? (
          <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
            You haven't saved any favorites yet.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {savedItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    border: '1px solid #eee',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 3
                    }
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover',
                        borderRadius: 1,
                        mb: 2
                      }}
                    />
                    <Typography variant="subtitle1" fontWeight="bold" noWrap>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {item.store}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                      <Typography variant="h6" fontWeight="bold">
                        ${item.price.toFixed(2)}
                      </Typography>
                      <Button 
                        variant="contained" 
                        size="small"
                      >
                        Try On
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </CardContent>
    </Card>
  );

  if (!currentUser) {
    return (
      <Box sx={{ py: 8 }}>
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <CircularProgress />
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8 }}>
      <Container>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 4,
            fontSize: { xs: '2.5rem', md: '3rem' },
          }}
        >
          My Account
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile}
            allowScrollButtonsMobile
          >
            <Tab icon={<PersonIcon />} label="Profile" />
            <Tab icon={<HistoryIcon />} label="Orders" />
            <Tab icon={<FavoriteIcon />} label="Favorites" />
          </Tabs>
        </Box>

        {activeTab === 0 && renderProfileTab()}
        {activeTab === 1 && renderOrdersTab()}
        {activeTab === 2 && renderFavoritesTab()}
        
        {/* Success/Error Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleSnackbarClose} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default MyAccountPage;