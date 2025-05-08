import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import ClientsPage from './pages/ClientsPage';
import ClientDetailsPage from './pages/ClientDetailsPage';
import NotFoundPage from './pages/NotFoundPage';

// Protected Route component
import ProtectedRoute from './components/ProtectedRoute';

// Styles
import './App.css';

// Create a theme with TUHME colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#3a5199',
      light: '#4b67ba',
      dark: '#294178',
    },
    secondary: {
      main: '#f4b942',
    },
    background: {
      default: '#f9f9f9',
    },
  },
  typography: {
    fontFamily: 'Montserrat, Arial, sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/orders" element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/orders/:orderId" element={
              <ProtectedRoute>
                <OrderDetailsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/clients" element={
              <ProtectedRoute>
                <ClientsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/clients/:clientId" element={
              <ProtectedRoute>
                <ClientDetailsPage />
              </ProtectedRoute>
            } />
            
            {/* 404 and redirects */}
            <Route path="/dashboard/*" element={<Navigate to="/dashboard" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;