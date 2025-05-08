import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Divider,
  Chip,
  Container,
  Toolbar,
  IconButton
} from '@mui/material';
import {
  Search as SearchIcon,
  ArrowBack as ArrowBackIcon,
  FilterList as FilterListIcon,
  Add as AddIcon,
  WhatsApp as WhatsAppIcon
} from '@mui/icons-material';

// Sample clients data
const clients = [
  {
    id: 'CLT001',
    name: 'Jessica Miller',
    email: 'jessica.m@example.com',
    phone: '+1 (212) 555-7890',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    totalOrders: 3,
    lastOrder: '04/10/2025',
    tags: ['VIP', 'Business Casual'],
    status: 'Active'
  },
  {
    id: 'CLT002',
    name: 'Robert King',
    email: 'robert.k@example.com',
    phone: '+1 (212) 555-3456',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    totalOrders: 2,
    lastOrder: '04/08/2025',
    tags: ['Casual'],
    status: 'Active'
  },
  {
    id: 'CLT003',
    name: 'Alisha Thomas',
    email: 'alisha.t@example.com',
    phone: '+1 (212) 555-9012',
    avatar: 'https://randomuser.me/api/portraits/women/66.jpg',
    totalOrders: 1,
    lastOrder: '04/07/2025',
    tags: ['Evening Wear'],
    status: 'Active'
  },
  {
    id: 'CLT004',
    name: 'Maya Lopez',
    email: 'maya.l@example.com',
    phone: '+1 (212) 555-5678',
    avatar: 'https://randomuser.me/api/portraits/women/79.jpg',
    totalOrders: 4,
    lastOrder: '04/05/2025',
    tags: ['VIP', 'Business Casual', 'Active Wear'],
    status: 'Active'
  },
  {
    id: 'CLT005',
    name: 'James Fisher',
    email: 'james.f@example.com',
    phone: '+1 (212) 555-8901',
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
    totalOrders: 2,
    lastOrder: '04/03/2025',
    tags: ['Casual'],
    status: 'Active'
  },
  {
    id: 'CLT006',
    name: 'Sarah Martinez',
    email: 'sarah.m@example.com',
    phone: '+1 (212) 555-2345',
    avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
    totalOrders: 3,
    lastOrder: '04/01/2025',
    tags: ['Business Casual'],
    status: 'Inactive'
  },
  {
    id: 'CLT007',
    name: 'David Wilson',
    email: 'david.w@example.com',
    phone: '+1 (212) 555-6789',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    totalOrders: 1,
    lastOrder: '03/29/2025',
    tags: ['Casual'],
    status: 'Active'
  },
  {
    id: 'CLT008',
    name: 'Tara Johnson',
    email: 'tara.j@example.com',
    phone: '+1 (212) 555-0123',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    totalOrders: 5,
    lastOrder: '03/25/2025',
    tags: ['VIP', 'Weekend Casual', 'Formal'],
    status: 'Active'
  }
];

const ClientsPage = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  
  // Filter clients based on tab and search
  const filteredClients = clients.filter(client => {
    // Filter by tab value (status)
    let tabFilter = true;
    if (tabValue === 1) tabFilter = client.status === 'Active';
    if (tabValue === 2) tabFilter = client.status === 'Inactive';
    if (tabValue === 3) tabFilter = client.tags.includes('VIP');
    
    // Filter by search term
    const searchFilter = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm);
    
    return tabFilter && searchFilter;
  });
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Toolbar disableGutters sx={{ mb: 2 }}>
        <IconButton 
          edge="start" 
          color="inherit" 
          onClick={() => navigate('/dashboard')}
          sx={{ mr: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
          Clients
        </Typography>
        <Button 
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ ml: 2 }}
          onClick={() => navigate('/dashboard/clients/new')}
        >
          Add Client
        </Button>
      </Toolbar>
      
      <Paper sx={{ width: '100%', mb: 3 }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="All Clients" />
            <Tab label="Active" />
            <Tab label="Inactive" />
            <Tab label="VIP" />
          </Tabs>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              placeholder="Search clients"
              size="small"
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                )
              }}
              sx={{ width: '250px', mr: 1 }}
            />
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Box>
        </Box>
        
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {filteredClients.map(client => (
              <Grid item xs={12} sm={6} md={4} key={client.id}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                    }
                  }}
                  onClick={() => navigate(`/dashboard/clients/${client.id}`)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar 
                        src={client.avatar} 
                        alt={client.name} 
                        sx={{ width: 64, height: 64, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {client.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {client.email}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {client.phone}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Divider sx={{ mb: 2 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Total Orders
                        </Typography>
                        <Typography variant="h6">
                          {client.totalOrders}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary" align="right">
                          Last Order
                        </Typography>
                        <Typography variant="h6" align="right">
                          {client.lastOrder}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      {client.tags.map(tag => (
                        <Chip 
                          key={tag} 
                          label={tag} 
                          size="small" 
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Chip 
                        label={client.status} 
                        color={client.status === 'Active' ? 'success' : 'default'}
                        size="small"
                      />
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<WhatsAppIcon />}
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle WhatsApp click
                        }}
                      >
                        Message
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {filteredClients.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No clients found
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                sx={{ mt: 2 }}
                onClick={() => navigate('/dashboard/clients/new')}
              >
                Add New Client
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default ClientsPage;