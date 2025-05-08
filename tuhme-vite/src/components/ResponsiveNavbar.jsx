import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Container,
  Collapse,
  ListItemButton
} from '@mui/material';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InfoIcon from '@mui/icons-material/Info';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useAuth } from '../contexts/AuthContext';

/**
 * Responsive Navigation Bar Component
 * 
 * A modern, responsive navigation bar with:
 * - Mobile drawer menu
 * - Desktop horizontal menu
 * - User authentication UI
 * - Cart indicator
 * - Notification indicator
 */
const ResponsiveNavbar = ({ 
  cartItems = [], 
  onCartOpen, 
  notificationCount = 0,
  onNotificationsOpen
}) => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Auth context
  const { currentUser, userProfile, logout } = useAuth();
  
  // State
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [shopSubmenuOpen, setShopSubmenuOpen] = useState(false);
  const [infoSubmenuOpen, setInfoSubmenuOpen] = useState(false);
  
  // Effect to close drawer when route changes (mobile)
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);
  
  // Toggle drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  // User menu handlers
  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };
  
  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      handleUserMenuClose();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  // Toggle submenu
  const toggleShopSubmenu = () => {
    setShopSubmenuOpen(!shopSubmenuOpen);
  };
  
  const toggleInfoSubmenu = () => {
    setInfoSubmenuOpen(!infoSubmenuOpen);
  };
  
  // Navigation items
  const mainNavItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Store Locator', path: '/store-locator', icon: <LocationOnIcon /> },
  ];
  
  const shopNavItems = [
    { text: 'How It Works', path: '/how-it-works', icon: <InfoIcon /> },
    { text: 'My Orders', path: '/orders', icon: <ShoppingBagIcon />, authRequired: true },
  ];
  
  const infoNavItems = [
    { text: 'About Us', path: '/about', icon: <PeopleIcon /> },
    { text: 'Pricing', path: '/pricing', icon: <MonetizationOnIcon /> },
    { text: 'Membership', path: '/membership', icon: <CardMembershipIcon /> },
    { text: 'Careers', path: '/careers', icon: <WorkIcon /> },
  ];
  
  // Check if path is active
  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };
  
  // Cart count
  const cartCount = cartItems?.length || 0;
  
  // Drawer content (mobile menu)
  const drawerContent = (
    <Box sx={{ width: 280, pt: 2 }} role="presentation">
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column',
        py: 2,
        mb: 2,
        borderBottom: '1px solid rgba(0,0,0,0.1)'
      }}>
        <Typography variant="h6" component="div">
          TUHME
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Try Before You Buy
        </Typography>
      </Box>
      
      <List>
        {/* Main Nav Items */}
        {mainNavItems.map((item) => (
          <ListItem
            key={item.text}
            component={RouterLink}
            to={item.path}
            selected={isActivePath(item.path)}
            disablePadding
            sx={{
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            <ListItemButton selected={isActivePath(item.path)}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        
        {/* Shop Submenu */}
        <ListItem disablePadding>
          <ListItemButton onClick={toggleShopSubmenu}>
            <ListItemIcon>
              <LocalMallIcon />
            </ListItemIcon>
            <ListItemText primary="Shopping" />
            {shopSubmenuOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={shopSubmenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {shopNavItems.map((item) => (
              (!item.authRequired || currentUser) && (
                <ListItem
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  selected={isActivePath(item.path)}
                  disablePadding
                  sx={{
                    pl: 4,
                    color: 'inherit',
                    textDecoration: 'none'
                  }}
                >
                  <ListItemButton selected={isActivePath(item.path)}>
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              )
            ))}
          </List>
        </Collapse>
        
        {/* Info Submenu */}
        <ListItem disablePadding>
          <ListItemButton onClick={toggleInfoSubmenu}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Information" />
            {infoSubmenuOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={infoSubmenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {infoNavItems.map((item) => (
              <ListItem
                key={item.text}
                component={RouterLink}
                to={item.path}
                selected={isActivePath(item.path)}
                disablePadding
                sx={{
                  pl: 4,
                  color: 'inherit',
                  textDecoration: 'none'
                }}
              >
                <ListItemButton selected={isActivePath(item.path)}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
      
      <Divider sx={{ my: 2 }} />
      
      {/* User Authentication */}
      <List>
        {currentUser ? (
          // Logged in user
          <>
            <ListItem
              component={RouterLink}
              to="/account"
              selected={isActivePath('/account')}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="My Account" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding button onClick={handleLogout}>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          // Not logged in
          <ListItem
            component={RouterLink}
            to="/login"
            selected={isActivePath('/login')}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );
  
  return (
    <AppBar 
      position="sticky" 
      color="inherit" 
      elevation={1}
      sx={{ 
        backgroundColor: 'white',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: 70 }}>
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          {/* TUHME Logo */}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              fontWeight: 700,
              textDecoration: 'none',
              color: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              flexGrow: isMobile ? 1 : 0,
              mr: isMobile ? 0 : 4
            }}
          >
            TUHME
          </Typography>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              {mainNavItems.map((item) => (
                <Button
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  color={isActivePath(item.path) ? 'primary' : 'inherit'}
                  sx={{ 
                    mx: 1,
                    fontWeight: isActivePath(item.path) ? 600 : 500
                  }}
                  startIcon={item.icon}
                >
                  {item.text}
                </Button>
              ))}
              
              {/* Shop Menu */}
              <Button
                color={shopNavItems.some(item => isActivePath(item.path)) ? 'primary' : 'inherit'}
                sx={{ 
                  mx: 1,
                  fontWeight: shopNavItems.some(item => isActivePath(item.path)) ? 600 : 500
                }}
                startIcon={<LocalMallIcon />}
                aria-controls="shop-menu"
                aria-haspopup="true"
                onClick={(e) => setShopSubmenuOpen(!shopSubmenuOpen)}
                endIcon={shopSubmenuOpen ? <ExpandLess /> : <ExpandMore />}
              >
                Shopping
              </Button>
              <Menu
                id="shop-menu"
                anchorEl={document.getElementById('shop-menu')}
                open={shopSubmenuOpen}
                onClose={() => setShopSubmenuOpen(false)}
                MenuListProps={{
                  'aria-labelledby': 'shop-button',
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                sx={{ mt: 1 }}
              >
                {shopNavItems.map((item) => (
                  (!item.authRequired || currentUser) && (
                    <MenuItem 
                      key={item.text}
                      component={RouterLink}
                      to={item.path}
                      onClick={() => setShopSubmenuOpen(false)}
                      selected={isActivePath(item.path)}
                      sx={{ 
                        minWidth: 180,
                        py: 1
                      }}
                    >
                      <ListItemIcon>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText>{item.text}</ListItemText>
                    </MenuItem>
                  )
                ))}
              </Menu>
              
              {/* Info Menu */}
              <Button
                color={infoNavItems.some(item => isActivePath(item.path)) ? 'primary' : 'inherit'}
                sx={{ 
                  mx: 1,
                  fontWeight: infoNavItems.some(item => isActivePath(item.path)) ? 600 : 500
                }}
                startIcon={<InfoIcon />}
                aria-controls="info-menu"
                aria-haspopup="true"
                onClick={(e) => setInfoSubmenuOpen(!infoSubmenuOpen)}
                endIcon={infoSubmenuOpen ? <ExpandLess /> : <ExpandMore />}
              >
                Information
              </Button>
              <Menu
                id="info-menu"
                anchorEl={document.getElementById('info-menu')}
                open={infoSubmenuOpen}
                onClose={() => setInfoSubmenuOpen(false)}
                MenuListProps={{
                  'aria-labelledby': 'info-button',
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                sx={{ mt: 1 }}
              >
                {infoNavItems.map((item) => (
                  <MenuItem 
                    key={item.text}
                    component={RouterLink}
                    to={item.path}
                    onClick={() => setInfoSubmenuOpen(false)}
                    selected={isActivePath(item.path)}
                    sx={{ 
                      minWidth: 180,
                      py: 1
                    }}
                  >
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText>{item.text}</ListItemText>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          
          {/* Right Side - Auth, Cart, Notifications */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Notifications */}
            <IconButton 
              color="inherit"
              onClick={onNotificationsOpen}
              sx={{ ml: 1 }}
            >
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            
            {/* Cart */}
            <IconButton 
              color="inherit"
              onClick={onCartOpen}
              sx={{ ml: 1 }}
            >
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            
            {/* User Profile */}
            {currentUser ? (
              <>
                <IconButton
                  onClick={handleUserMenuOpen}
                  sx={{ ml: 2 }}
                >
                  <Avatar 
                    alt={(userProfile?.firstName && userProfile?.lastName) 
                      ? `${userProfile.firstName} ${userProfile.lastName}`
                      : currentUser.displayName || "User"} 
                    src={currentUser.photoURL || "/avatar-placeholder.png"}
                    sx={{ 
                      width: 32, 
                      height: 32,
                      bgcolor: 'primary.main' 
                    }}
                  >
                    {userProfile?.firstName
                      ? `${userProfile.firstName.charAt(0)}${userProfile.lastName ? userProfile.lastName.charAt(0) : ''}`
                      : currentUser.displayName
                        ? currentUser.displayName.split(' ').map(n => n[0]).join('').substring(0, 2)
                        : currentUser.email.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={userMenuAnchor}
                  open={Boolean(userMenuAnchor)}
                  onClose={handleUserMenuClose}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem 
                    component={RouterLink} 
                    to="/account"
                    onClick={handleUserMenuClose}
                  >
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    My Account
                  </MenuItem>
                  <MenuItem 
                    component={RouterLink} 
                    to="/orders"
                    onClick={handleUserMenuClose}
                  >
                    <ListItemIcon>
                      <ShoppingBagIcon fontSize="small" />
                    </ListItemIcon>
                    My Orders
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex' }}>
                <Button 
                  variant="outlined"
                  color="primary"
                  component={RouterLink}
                  to="/login"
                  sx={{ ml: 2, display: { xs: isMobile ? 'none' : 'flex', sm: 'flex' } }}
                  startIcon={<LoginIcon />}
                >
                  {isMobile ? '' : 'Login'}
                </Button>
                <Button 
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/register"
                  sx={{ ml: 1 }}
                >
                  {isMobile ? '' : 'Sign Up'}
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
      
      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};

export default ResponsiveNavbar;