import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Avatar,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ShoppingBag as ShoppingBagIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  BarChart as BarChartIcon,
  ExitToApp as LogoutIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

// Dashboard navigation items
const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Orders', icon: <ShoppingBagIcon />, path: '/dashboard/orders' },
  { text: 'Clients', icon: <PersonIcon />, path: '/dashboard/clients' },
  { text: 'Calendar', icon: <CalendarIcon />, path: '/dashboard/calendar' },
  { text: 'Analytics', icon: <BarChartIcon />, path: '/dashboard/analytics' },
];

// Sample dashboard data
const dashboardData = {
  pendingRequests: 3,
  activeOrders: 5,
  upcomingAppointments: 2,
  totalClients: 42
};

// Sample recent requests
const recentRequests = [
  {
    id: 'REQ001',
    client: 'Jessica M.',
    message: 'Looking for business casual outfits for a new job. Prefer neutral colors.',
    time: '2 hours ago'
  },
  {
    id: 'REQ002',
    client: 'Robert K.',
    message: 'Need a couple of casual but sophisticated weekend looks.',
    time: '4 hours ago'
  },
  {
    id: 'REQ003',
    client: 'Alisha T.',
    message: 'I have a cocktail event next Friday and need something statement but elegant.',
    time: 'Yesterday'
  }
];

// Sample upcoming appointments
const upcomingAppointments = [
  {
    id: 'APT001',
    client: 'Maya L.',
    time: 'Today, 4:00 PM',
    address: '225 W 23rd St, Chelsea'
  },
  {
    id: 'APT002',
    client: 'James F.',
    time: 'Tomorrow, 6:30 PM',
    address: '42 W 72nd St, Upper West Side'
  }
];

const drawerWidth = 240;

const DashboardPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Handle drawer toggle
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
          TUHME
        </Typography>
      </Toolbar>
      
      <Divider />
      
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ flexGrow: 1 }} />
      
      <Divider />
      
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
      
      {/* User profile at bottom */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40, mr: 2 }}>
          {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
        </Avatar>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {currentUser?.displayName || 'Stylist'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
            {currentUser?.email || 'stylist@tuhme.com'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: 'white',
          color: 'text.primary',
          boxShadow: 1
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 8, md: 8 },
          backgroundColor: 'background.default',
          minHeight: '100vh'
        }}
      >
        <Container maxWidth="lg">
          {/* Overview cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    New Requests
                  </Typography>
                  <Typography variant="h3" component="div" sx={{ mb: 1, fontWeight: 700 }}>
                    {dashboardData.pendingRequests}
                  </Typography>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => handleNavigation('/dashboard/orders')}
                    sx={{ textTransform: 'none' }}
                  >
                    View requests
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Active Orders
                  </Typography>
                  <Typography variant="h3" component="div" sx={{ mb: 1, fontWeight: 700 }}>
                    {dashboardData.activeOrders}
                  </Typography>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => handleNavigation('/dashboard/orders')}
                    sx={{ textTransform: 'none' }}
                  >
                    Manage orders
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Upcoming Appointments
                  </Typography>
                  <Typography variant="h3" component="div" sx={{ mb: 1, fontWeight: 700 }}>
                    {dashboardData.upcomingAppointments}
                  </Typography>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => handleNavigation('/dashboard/calendar')}
                    sx={{ textTransform: 'none' }}
                  >
                    View calendar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Total Clients
                  </Typography>
                  <Typography variant="h3" component="div" sx={{ mb: 1, fontWeight: 700 }}>
                    {dashboardData.totalClients}
                  </Typography>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => handleNavigation('/dashboard/clients')}
                    sx={{ textTransform: 'none' }}
                  >
                    View clients
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          <Grid container spacing={4}>
            {/* Recent requests */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Recent Requests</Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleNavigation('/dashboard/orders')}
                  >
                    View All
                  </Button>
                </Box>
                
                <List>
                  {recentRequests.map((request, index) => (
                    <Fragment key={request.id}>
                      <ListItem
                        sx={{
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          gap: 1,
                          py: 2,
                          px: 0
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                          <Typography variant="subtitle1">{request.client}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {request.time}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ width: '100%' }}>
                          {request.message}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mt: 1 }}>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleNavigation(`/dashboard/orders/${request.id}`)}
                          >
                            Claim Request
                          </Button>
                        </Box>
                      </ListItem>
                      {index < recentRequests.length - 1 && <Divider />}
                    </Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>
            
            {/* Upcoming appointments */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Today's Appointments</Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleNavigation('/dashboard/calendar')}
                  >
                    View Calendar
                  </Button>
                </Box>
                
                {upcomingAppointments.length > 0 ? (
                  <List>
                    {upcomingAppointments.map((appointment, index) => (
                      <Fragment key={appointment.id}>
                        <ListItem
                          sx={{
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: 1,
                            py: 2,
                            px: 0
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Typography variant="subtitle1">{appointment.client}</Typography>
                            <Typography
                              variant="subtitle2"
                              color="primary"
                              sx={{ fontWeight: 600 }}
                            >
                              {appointment.time}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {appointment.address}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mt: 1, gap: 1 }}>
                            <Button
                              variant="outlined"
                              size="small"
                            >
                              Get Directions
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleNavigation(`/dashboard/orders/${appointment.id}`)}
                            >
                              View Details
                            </Button>
                          </Box>
                        </ListItem>
                        {index < upcomingAppointments.length - 1 && <Divider />}
                      </Fragment>
                    ))}
                  </List>
                ) : (
                  <Box sx={{ py: 4, textAlign: 'center' }}>
                    <Typography color="text.secondary">
                      No appointments scheduled for today.
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardPage;