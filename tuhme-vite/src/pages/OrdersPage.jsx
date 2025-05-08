import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Container,
  Toolbar
} from '@mui/material';
import {
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  FilterList as FilterListIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

// Sample data for orders
const orders = [
  {
    id: 'ORD001',
    client: 'Jessica Miller',
    type: 'Personal Shopping',
    date: '04/10/2025',
    status: 'Pending',
    items: 8,
    total: '$1,240.00'
  },
  {
    id: 'ORD002',
    client: 'Robert King',
    type: 'Styling Session',
    date: '04/08/2025',
    status: 'Active',
    items: 5,
    total: '$920.00'
  },
  {
    id: 'ORD003',
    client: 'Alisha Thomas',
    type: 'Personal Shopping',
    date: '04/07/2025',
    status: 'Delivered',
    items: 4,
    total: '$750.00'
  },
  {
    id: 'ORD004',
    client: 'Maya Lopez',
    type: 'Wardrobe Refresh',
    date: '04/05/2025',
    status: 'Completed',
    items: 10,
    total: '$1,850.00'
  },
  {
    id: 'ORD005',
    client: 'James Fisher',
    type: 'Personal Shopping',
    date: '04/03/2025',
    status: 'Completed',
    items: 3,
    total: '$480.00'
  },
  {
    id: 'ORD006',
    client: 'Sarah Martinez',
    type: 'Styling Session',
    date: '04/01/2025',
    status: 'Completed',
    items: 6,
    total: '$1,100.00'
  },
  {
    id: 'ORD007',
    client: 'David Wilson',
    type: 'Personal Shopping',
    date: '03/29/2025',
    status: 'Completed',
    items: 7,
    total: '$1,320.00'
  },
  {
    id: 'ORD008',
    client: 'Tara Johnson',
    type: 'Wardrobe Refresh',
    date: '03/25/2025',
    status: 'Completed',
    items: 12,
    total: '$2,100.00'
  }
];

// Status colors
const statusColors = {
  'Pending': 'warning',
  'Active': 'info',
  'Delivered': 'primary',
  'Completed': 'success',
  'Cancelled': 'error'
};

const OrdersPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(0);
  };
  
  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };
  
  // Filter orders based on tab and search
  const filteredOrders = orders.filter(order => {
    // Filter by tab value (status)
    let tabFilter = true;
    if (tabValue === 1) tabFilter = order.status === 'Pending';
    if (tabValue === 2) tabFilter = order.status === 'Active';
    if (tabValue === 3) tabFilter = order.status === 'Delivered';
    if (tabValue === 4) tabFilter = order.status === 'Completed';
    
    // Filter by search term
    const searchFilter = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.client.toLowerCase().includes(searchTerm.toLowerCase());
    
    return tabFilter && searchFilter;
  });
  
  // Create a sliced set of rows for the current page
  const displayedOrders = filteredOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  
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
          Orders Management
        </Typography>
        <Button 
          variant="contained"
          sx={{ ml: 2 }}
          onClick={() => navigate('/dashboard/orders/new')}
        >
          New Order
        </Button>
      </Toolbar>
      
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="All Orders" />
            <Tab label="Pending" />
            <Tab label="Active" />
            <Tab label="Delivered" />
            <Tab label="Completed" />
          </Tabs>
          
          <TextField
            placeholder="Search orders"
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
            sx={{ width: '250px' }}
          />
        </Box>
        
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-label="orders table">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Items</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedOrders.map((order) => (
                <TableRow
                  key={order.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {order.id}
                  </TableCell>
                  <TableCell>{order.client}</TableCell>
                  <TableCell>{order.type}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Chip 
                      label={order.status} 
                      color={statusColors[order.status]} 
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell align="right">{order.items}</TableCell>
                  <TableCell align="right">{order.total}</TableCell>
                  <TableCell align="right">
                    <IconButton 
                      size="small"
                      onClick={() => navigate(`/dashboard/orders/${order.id}`)}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default OrdersPage;