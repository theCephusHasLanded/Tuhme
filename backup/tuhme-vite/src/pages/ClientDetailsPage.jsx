import React, { useState, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Divider,
  Chip,
  Container,
  Toolbar,
  IconButton,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  WhatsApp as WhatsAppIcon,
  Message as MessageIcon,
  Phone as PhoneIcon,
  ShoppingBag as ShoppingBagIcon,
  Event as EventIcon,
  LocalShipping as ShippingIcon,
  FavoriteBorder as FavoriteIcon,
  Comment as CommentIcon,
  Payment as PaymentIcon
} from '@mui/icons-material';

// Sample client data
const mockClientData = {
  'CLT001': {
    id: 'CLT001',
    name: 'Jessica Miller',
    email: 'jessica.m@example.com',
    phone: '+1 (212) 555-7890',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    address: '225 W 23rd St, Chelsea, New York, NY 10011',
    status: 'Active',
    tags: ['VIP', 'Business Casual'],
    joinDate: '01/15/2025',
    totalSpent: '$3,240.00',
    orders: [
      {
        id: 'ORD001',
        date: '04/10/2025',
        type: 'Personal Shopping',
        items: 5,
        status: 'Pending',
        total: '$1,240.00'
      },
      {
        id: 'ORD002',
        date: '03/05/2025',
        type: 'Styling Session',
        items: 6,
        status: 'Completed',
        total: '$1,100.00'
      },
      {
        id: 'ORD003',
        date: '02/18/2025',
        type: 'Personal Shopping',
        items: 4,
        status: 'Completed',
        total: '$900.00'
      }
    ],
    preferences: {
      sizes: {
        tops: 'S',
        bottoms: '27',
        dresses: '4',
        shoes: '7.5'
      },
      styles: ['Business Casual', 'Weekend Casual', 'Minimalist'],
      colors: ['Neutrals', 'Blues', 'Greens'],
      avoidColors: ['Yellow', 'Orange'],
      brands: ['Theory', 'Vince', 'J.Crew', 'Agolde'],
      budget: 'Mid-range ($100-300 per item)'
    },
    notes: "Jessica prefers clean lines and structured silhouettes. She has a corporate job but enjoys more relaxed styles on weekends. She's looking to build a versatile wardrobe that can transition from work to social events. Sensitive to synthetic fabrics, prefers natural materials.",
    appointments: [
      {
        id: 'APT001',
        date: '04/15/2025',
        time: '4:00 PM',
        type: 'Delivery',
        address: '225 W 23rd St, Chelsea'
      }
    ],
    activity: [
      {
        type: 'Order Created',
        date: '04/10/2025',
        description: 'New personal shopping order created'
      },
      {
        type: 'Message',
        date: '04/10/2025',
        description: 'Sent confirmation message about new order'
      },
      {
        type: 'Order Completed',
        date: '03/05/2025',
        description: 'Styling session order completed'
      },
      {
        type: 'Payment',
        date: '03/05/2025',
        description: 'Payment of $1,100.00 received'
      },
      {
        type: 'Order Completed',
        date: '02/18/2025',
        description: 'Personal shopping order completed'
      },
      {
        type: 'Payment',
        date: '02/18/2025',
        description: 'Payment of $900.00 received'
      },
      {
        type: 'Client Created',
        date: '01/15/2025',
        description: 'Client profile created'
      }
    ]
  }
};

// Status colors
const statusColors = {
  'Pending': 'warning',
  'Active': 'info',
  'Delivered': 'primary',
  'Completed': 'success',
  'Cancelled': 'error'
};

// Activity icons
const activityIcons = {
  'Order Created': <ShoppingBagIcon />,
  'Order Completed': <ShoppingBagIcon />,
  'Message': <CommentIcon />,
  'Payment': <PaymentIcon />,
  'Client Created': <FavoriteIcon />,
  'Appointment': <EventIcon />,
  'Delivery': <ShippingIcon />
};

const ClientDetailsPage = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  
  // In a real app, you would fetch this from your API
  const client = mockClientData[clientId];
  
  // If client not found
  if (!client) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Client not found
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/dashboard/clients')}
        >
          Back to Clients
        </Button>
      </Container>
    );
  }
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Toolbar disableGutters sx={{ mb: 2 }}>
        <IconButton 
          edge="start" 
          color="inherit" 
          onClick={() => navigate('/dashboard/clients')}
          sx={{ mr: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
          Client Profile
        </Typography>
        <Chip 
          label={client.status} 
          color={client.status === 'Active' ? 'success' : 'default'}
          sx={{ fontWeight: 600, mr: 2 }}
        />
        <Button 
          variant="outlined"
          startIcon={<EditIcon />}
          sx={{ mr: 1 }}
        >
          Edit Profile
        </Button>
        <Button 
          variant="contained"
          startIcon={<ShoppingBagIcon />}
          onClick={() => navigate(`/dashboard/orders/new?client=${client.id}`)}
        >
          New Order
        </Button>
      </Toolbar>
      
      <Grid container spacing={3}>
        {/* Left column */}
        <Grid item xs={12} md={4}>
          {/* Client info */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar 
                src={client.avatar} 
                alt={client.name} 
                sx={{ width: 80, height: 80, mr: 2 }}
              />
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {client.name}
                </Typography>
                {client.tags.map(tag => (
                  <Chip 
                    key={tag} 
                    label={tag} 
                    size="small" 
                    sx={{ mr: 0.5, mt: 1 }}
                  />
                ))}
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Phone:</strong> {client.phone}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Email:</strong> {client.email}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Address:</strong> {client.address}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Client Since:</strong> {client.joinDate}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Total Spent:</strong> {client.totalSpent}
            </Typography>
            
            <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
              <Button 
                variant="outlined" 
                size="small" 
                startIcon={<WhatsAppIcon />}
              >
                WhatsApp
              </Button>
              <Button 
                variant="outlined" 
                size="small" 
                startIcon={<MessageIcon />}
              >
                Text
              </Button>
              <Button 
                variant="outlined" 
                size="small" 
                startIcon={<PhoneIcon />}
              >
                Call
              </Button>
            </Box>
          </Paper>
          
          {/* Style preferences */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Style Preferences
            </Typography>
            
            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
              Sizes
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="body2" color="text.secondary">
                  Tops
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {client.preferences.sizes.tops}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2" color="text.secondary">
                  Bottoms
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {client.preferences.sizes.bottoms}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2" color="text.secondary">
                  Dresses
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {client.preferences.sizes.dresses}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2" color="text.secondary">
                  Shoes
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {client.preferences.sizes.shoes}
                </Typography>
              </Grid>
            </Grid>
            
            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
              Preferred Styles
            </Typography>
            <Box sx={{ mb: 2 }}>
              {client.preferences.styles.map(style => (
                <Chip 
                  key={style} 
                  label={style} 
                  size="small" 
                  variant="outlined"
                  sx={{ mr: 0.5, mb: 0.5 }}
                />
              ))}
            </Box>
            
            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
              Color Preferences
            </Typography>
            <Box sx={{ mb: 2 }}>
              {client.preferences.colors.map(color => (
                <Chip 
                  key={color} 
                  label={color} 
                  size="small" 
                  variant="outlined"
                  color="primary"
                  sx={{ mr: 0.5, mb: 0.5 }}
                />
              ))}
            </Box>
            
            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
              Colors to Avoid
            </Typography>
            <Box sx={{ mb: 2 }}>
              {client.preferences.avoidColors.map(color => (
                <Chip 
                  key={color} 
                  label={color} 
                  size="small" 
                  variant="outlined"
                  color="error"
                  sx={{ mr: 0.5, mb: 0.5 }}
                />
              ))}
            </Box>
            
            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
              Preferred Brands
            </Typography>
            <Box sx={{ mb: 2 }}>
              {client.preferences.brands.map(brand => (
                <Chip 
                  key={brand} 
                  label={brand} 
                  size="small" 
                  variant="outlined"
                  sx={{ mr: 0.5, mb: 0.5 }}
                />
              ))}
            </Box>
            
            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
              Budget
            </Typography>
            <Typography variant="body2">
              {client.preferences.budget}
            </Typography>
          </Paper>
          
          {/* Stylist notes */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Stylist Notes
            </Typography>
            <Typography variant="body2">
              {client.notes}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button 
                variant="text" 
                startIcon={<EditIcon />}
                size="small"
              >
                Edit Notes
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        {/* Right column */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ mb: 3 }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Orders" />
              <Tab label="Appointments" />
              <Tab label="Activity" />
            </Tabs>
            
            {/* Orders tab */}
            {tabValue === 0 && (
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6">
                    Orders ({client.orders.length})
                  </Typography>
                  <Button 
                    variant="contained"
                    startIcon={<ShoppingBagIcon />}
                    onClick={() => navigate(`/dashboard/orders/new?client=${client.id}`)}
                  >
                    Create Order
                  </Button>
                </Box>
                
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="orders table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Items</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {client.orders.map((order) => (
                        <TableRow
                          key={order.id}
                          hover
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {order.id}
                          </TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.type}</TableCell>
                          <TableCell>{order.items}</TableCell>
                          <TableCell>
                            <Chip 
                              label={order.status} 
                              color={statusColors[order.status]} 
                              size="small"
                              sx={{ fontWeight: 600 }}
                            />
                          </TableCell>
                          <TableCell align="right">{order.total}</TableCell>
                          <TableCell align="right">
                            <Button 
                              variant="text" 
                              size="small"
                              onClick={() => navigate(`/dashboard/orders/${order.id}`)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
            
            {/* Appointments tab */}
            {tabValue === 1 && (
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6">
                    Upcoming Appointments ({client.appointments.length})
                  </Typography>
                  <Button 
                    variant="contained"
                    startIcon={<EventIcon />}
                  >
                    Schedule Appointment
                  </Button>
                </Box>
                
                {client.appointments.length > 0 ? (
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="appointments table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Appointment ID</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Time</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Location</TableCell>
                          <TableCell align="right">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {client.appointments.map((appointment) => (
                          <TableRow
                            key={appointment.id}
                            hover
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {appointment.id}
                            </TableCell>
                            <TableCell>{appointment.date}</TableCell>
                            <TableCell>{appointment.time}</TableCell>
                            <TableCell>{appointment.type}</TableCell>
                            <TableCell>{appointment.address}</TableCell>
                            <TableCell align="right">
                              <Button 
                                variant="text" 
                                size="small"
                                onClick={() => {}}
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography color="text.secondary">
                      No upcoming appointments scheduled.
                    </Typography>
                    <Button 
                      variant="contained" 
                      startIcon={<EventIcon />}
                      sx={{ mt: 2 }}
                    >
                      Schedule Appointment
                    </Button>
                  </Box>
                )}
              </Box>
            )}
            
            {/* Activity tab */}
            {tabValue === 2 && (
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  Client Activity
                </Typography>
                
                <List>
                  {client.activity.map((activity, index) => (
                    <Fragment key={index}>
                      <ListItem alignItems="flex-start">
                        <ListItemIcon>
                          {activityIcons[activity.type] || <CommentIcon />}
                        </ListItemIcon>
                        <ListItemText
                          primary={activity.type}
                          secondary={
                            <Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {activity.date}
                              </Typography>
                              {" — "}{activity.description}
                            </Fragment>
                          }
                        />
                      </ListItem>
                      {index < client.activity.length - 1 && <Divider variant="inset" component="li" />}
                    </Fragment>
                  ))}
                </List>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ClientDetailsPage;