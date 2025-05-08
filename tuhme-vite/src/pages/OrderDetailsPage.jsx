import React, { useState, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Chip,
  Button,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Container,
  Toolbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Link,
  Tabs,
  Tab
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  WhatsApp as WhatsAppIcon,
  Message as MessageIcon,
  Phone as PhoneIcon,
  LocalShipping as ShippingIcon,
  ShoppingCart as CartIcon,
  Receipt as ReceiptIcon
} from '@mui/icons-material';

// Sample order data
const mockOrderData = {
  'ORD001': {
    id: 'ORD001',
    client: {
      id: 'CLT001',
      name: 'Jessica Miller',
      phone: '+1 (212) 555-7890',
      email: 'jessica.m@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      address: '225 W 23rd St, Chelsea, New York, NY 10011'
    },
    type: 'Personal Shopping',
    createdAt: '04/10/2025',
    status: 'Pending',
    statusHistory: [
      { status: 'Request Received', date: '04/10/2025 09:30 AM' },
      { status: 'Shopper Assigned', date: '04/10/2025 10:15 AM' }
    ],
    items: [
      {
        id: 'ITM001',
        name: 'Silk Blouse - White',
        brand: 'Theory',
        size: 'S',
        price: '$195.00',
        image: 'https://i.imgur.com/3jdUiwY.jpg',
        status: 'Selected'
      },
      {
        id: 'ITM002',
        name: 'High-Rise Straight Leg Jeans',
        brand: 'Agolde',
        size: '27',
        price: '$220.00',
        image: 'https://i.imgur.com/XzLSNxz.jpg',
        status: 'Selected'
      },
      {
        id: 'ITM003',
        name: 'Wool Blazer - Navy',
        brand: 'J.Crew',
        size: '4',
        price: '$245.00',
        image: 'https://i.imgur.com/IjA6XtS.jpg',
        status: 'Selected'
      },
      {
        id: 'ITM004',
        name: 'Chelsea Boots - Black',
        brand: 'Sam Edelman',
        size: '7.5',
        price: '$180.00',
        image: 'https://i.imgur.com/Xjx7MX7.jpg',
        status: 'Selected'
      },
      {
        id: 'ITM005',
        name: 'Cashmere Sweater - Gray',
        brand: 'Vince',
        size: 'S',
        price: '$320.00',
        image: 'https://i.imgur.com/9qg85g0.jpg',
        status: 'Selected'
      }
    ],
    deliveryDate: 'To be scheduled',
    appointmentTime: 'To be scheduled',
    subtotal: '$1,160.00',
    tax: '$80.00',
    total: '$1,240.00',
    notes: "Client has requested business casual items that can be mixed and matched. Prefers neutral colors with occasional pops of color. No yellow tones as they don't complement her skin tone.",
    initialRequest: "Looking for business casual outfits for a new job. Prefer neutral colors that I can mix and match easily. I typically wear size S tops and size 27 jeans. Budget is around $1500 for 5-6 pieces."
  }
};

// Order status steps
const orderSteps = ['Request Received', 'Shopper Assigned', 'Items Selected', 'Delivery Scheduled', 'Delivered', 'Completed'];

// Status colors
const statusColors = {
  'Pending': 'warning',
  'Active': 'info',
  'Delivered': 'primary',
  'Completed': 'success',
  'Cancelled': 'error',
  'Selected': 'primary',
  'Returned': 'error',
  'Kept': 'success'
};

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  
  // In a real app, you would fetch this from your API
  const order = mockOrderData[orderId];
  
  // Get current step based on status
  const getCurrentStep = (status) => {
    switch(status) {
      case 'Pending': return 1;
      case 'Active': return 2;
      case 'Delivered': return 4;
      case 'Completed': return 5;
      default: return 0;
    }
  };
  
  // If order not found
  if (!order) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Order not found
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/dashboard/orders')}
        >
          Back to Orders
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
          onClick={() => navigate('/dashboard/orders')}
          sx={{ mr: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
          Order {order.id}
        </Typography>
        <Chip 
          label={order.status} 
          color={statusColors[order.status]} 
          sx={{ fontWeight: 600, mr: 2 }}
        />
        <Button 
          variant="outlined"
          startIcon={<EditIcon />}
          sx={{ mr: 1 }}
        >
          Edit Order
        </Button>
      </Toolbar>
      
      {/* Order progress */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stepper activeStep={getCurrentStep(order.status)} alternativeLabel>
          {orderSteps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>
      
      <Grid container spacing={3}>
        {/* Left column */}
        <Grid item xs={12} md={4}>
          {/* Client info */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Client Information
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar 
                src={order.client.avatar} 
                alt={order.client.name} 
                sx={{ width: 56, height: 56, mr: 2 }}
              />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {order.client.name}
                </Typography>
                <Link 
                  href={`/dashboard/clients/${order.client.id}`}
                  color="primary"
                  underline="hover"
                >
                  View Profile
                </Link>
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Phone:</strong> {order.client.phone}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Email:</strong> {order.client.email}
            </Typography>
            <Typography variant="body2">
              <strong>Address:</strong> {order.client.address}
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
          
          {/* Order info */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Order Details
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Order Type
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {order.type}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Date Created
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {order.createdAt}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Delivery Date
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {order.deliveryDate}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Appointment Time
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {order.appointmentTime}
                </Typography>
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Pricing
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Subtotal</Typography>
              <Typography variant="body2">{order.subtotal}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Tax</Typography>
              <Typography variant="body2">{order.tax}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
              <Typography variant="subtitle2">Total</Typography>
              <Typography variant="subtitle2">{order.total}</Typography>
            </Box>
          </Paper>
          
          {/* Initial request */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Initial Request
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontStyle: 'italic' }}>
              "{order.initialRequest}"
            </Typography>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Shopper Notes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {order.notes}
            </Typography>
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
              <Tab label="Selected Items" />
              <Tab label="Order Activity" />
            </Tabs>
            
            {/* Items tab */}
            {tabValue === 0 && (
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6">
                    Selected Items ({order.items.length})
                  </Typography>
                  <Button 
                    variant="contained"
                    startIcon={<CartIcon />}
                  >
                    Update Items
                  </Button>
                </Box>
                
                <Grid container spacing={2}>
                  {order.items.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                      <Card>
                        <CardMedia
                          component="img"
                          height="140"
                          image={item.image}
                          alt={item.name}
                        />
                        <CardContent sx={{ pb: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {item.brand} · Size {item.size}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                            <Typography variant="subtitle2">
                              {item.price}
                            </Typography>
                            <Chip 
                              label={item.status} 
                              size="small"
                              color={statusColors[item.status]}
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
            
            {/* Activity tab */}
            {tabValue === 1 && (
              <Box sx={{ p: 3 }}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Order Timeline
                  </Typography>
                  
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Status</TableCell>
                          <TableCell>Date & Time</TableCell>
                          <TableCell>Updated By</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {order.statusHistory.map((event, index) => (
                          <TableRow key={index}>
                            <TableCell>{event.status}</TableCell>
                            <TableCell>{event.date}</TableCell>
                            <TableCell>System</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            )}
          </Paper>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              startIcon={<ShippingIcon />}
              sx={{ mr: 1 }}
            >
              Schedule Delivery
            </Button>
            <Box>
              <Button
                variant="outlined"
                startIcon={<ReceiptIcon />}
                sx={{ mr: 1 }}
              >
                Generate Invoice
              </Button>
              <Button
                variant="contained"
                color="primary"
              >
                Process Order
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderDetailsPage;