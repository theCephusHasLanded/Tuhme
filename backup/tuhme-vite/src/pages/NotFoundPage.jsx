import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container, Paper } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
      <Paper
        sx={{
          py: 6,
          px: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" component="h1" sx={{ mb: 2, fontSize: { xs: '4rem', md: '6rem' }, fontWeight: 700 }}>
          404
        </Typography>
        
        <Typography variant="h4" component="h2" sx={{ mb: 2, color: 'text.secondary' }}>
          Page Not Found
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4, maxWidth: 500 }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
        
        <Button
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Return to Home
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFoundPage;