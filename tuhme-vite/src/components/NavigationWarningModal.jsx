import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Stack,
  Divider,
  TextField,
  Alert,
  CircularProgress
} from '@mui/material';
import { 
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon,
  ContentCopy as ContentCopyIcon,
  WhatsApp as WhatsAppIcon
} from '@mui/icons-material';

/**
 * Navigation Warning Modal
 * 
 * Display when user is navigating away from the TUHME application to an external site.
 * Provides instructions on how to return to TUHME and collects user information for order processing.
 */
const NavigationWarningModal = ({ 
  open, 
  onClose, 
  destination, 
  destinationName = 'the store website',
  returnUrl = window.location.href
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Reset to step 1 when modal is opened
  if (!open && step !== 1) {
    setStep(1);
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleCopyReturnLink = () => {
    navigator.clipboard.writeText(returnUrl);
  };
  
  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
    } else {
      // Basic validation
      if (!formData.name || !formData.email || !formData.phone) {
        setError('Please fill in all required fields');
        return;
      }
      
      // Reset error if validation passes
      setError('');
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setStep(3);
      }, 1500);
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleWhatsAppRedirect = () => {
    // Format the message for WhatsApp
    const message = `*New TUHME Request*\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nStore: ${destinationName}\n\n${formData.notes ? `Notes: ${formData.notes}` : ''}`;
    
    // Encode the message for the URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the pre-filled message
    window.open(`https://api.whatsapp.com/send/?phone=16465889916&text=${encodedMessage}&type=phone_number&app_absent=0`, '_blank');
    
    // Close the modal and navigate
    if (destination) {
      window.open(destination, '_blank');
    }
    onClose();
  };
  
  const handleNavigate = () => {
    if (destination) {
      window.open(destination, '_blank');
    }
    onClose();
  };
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: 'hidden'
        }
      }}
    >
      {/* Custom header with title and close button */}
      <DialogTitle 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          bgcolor: 'primary.main',
          color: 'white',
          py: 2
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          {step > 1 && (
            <IconButton 
              size="small" 
              edge="start"
              onClick={handleBack}
              sx={{ color: 'white' }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="h6">
            {step === 1 ? 'You are leaving TUHME' : 
             step === 2 ? 'Share your details' :
             'Order Confirmed!'}
          </Typography>
        </Stack>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ py: 3 }}>
        {step === 1 && (
          <>
            <Typography variant="body1" paragraph>
              You're about to navigate to <strong>{destinationName}</strong>. To ensure we can assist with your shopping and returns, please follow these steps:
            </Typography>
            
            <Box sx={{ my: 3, p: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                How to return to TUHME:
              </Typography>
              <Typography variant="body2" paragraph>
                1. After selecting your items, return to TUHME using the link below.
              </Typography>
              <Typography variant="body2" paragraph>
                2. Share screenshots of your selected items with our concierge.
              </Typography>
              <Typography variant="body2">
                3. We'll handle the purchasing and delivery coordination for you.
              </Typography>
              
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1, bgcolor: 'action.hover', borderRadius: 1 }}>
                <Typography variant="body2" noWrap sx={{ maxWidth: '70%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {returnUrl}
                </Typography>
                <Button 
                  startIcon={<ContentCopyIcon />}
                  onClick={handleCopyReturnLink}
                  size="small"
                >
                  Copy Link
                </Button>
              </Box>
            </Box>
            
            <Typography variant="body2" color="text.secondary">
              TUHME provides a seamless shopping experience across luxury retailers. Our team coordinates purchases, try-ons, and returns so you can focus on finding what you love.
            </Typography>
          </>
        )}
        
        {step === 2 && (
          <>
            <Typography variant="body1" gutterBottom>
              Please share your details so we can help with your shopping request at <strong>{destinationName}</strong>.
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                {error}
              </Alert>
            )}
            
            <Box component="form" sx={{ mt: 3 }}>
              <TextField
                fullWidth
                label="Your Name *"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email Address *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Phone Number *"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                margin="normal"
                required
                helperText="We'll use this to contact you about your order"
              />
              <TextField
                fullWidth
                label="Additional Notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                margin="normal"
                multiline
                rows={3}
                placeholder="Specific sizes, colors, preferences, or questions..."
              />
            </Box>
          </>
        )}
        
        {step === 3 && (
          <>
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Box
                component="img"
                src="/tuhme-logo.png"
                alt="TUHME"
                sx={{ height: 60, mb: 3 }}
              />
              <Typography variant="h5" gutterBottom>
                Thank you, {formData.name}!
              </Typography>
              <Typography variant="body1" paragraph>
                Your shopping request has been received. Our concierge team will assist you with your selections from <strong>{destinationName}</strong>.
              </Typography>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="body1" fontWeight="medium" paragraph>
                For faster service, connect with us on WhatsApp:
              </Typography>
              
              <Button
                variant="contained"
                color="success"
                startIcon={<WhatsAppIcon />}
                onClick={handleWhatsAppRedirect}
                sx={{ mb: 2 }}
              >
                Continue on WhatsApp
              </Button>
              
              <Typography variant="body2" color="text.secondary">
                You'll be redirected to WhatsApp to chat with our concierge team directly.
              </Typography>
            </Box>
          </>
        )}
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3 }}>
        {step === 1 && (
          <>
            <Button onClick={onClose} color="inherit">
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleContinue}
            >
              Continue to Next Step
            </Button>
          </>
        )}
        
        {step === 2 && (
          <>
            <Button 
              onClick={handleBack} 
              color="inherit"
              disabled={isSubmitting}
            >
              Back
            </Button>
            <Button 
              variant="contained" 
              onClick={handleContinue}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Submit & Continue'
              )}
            </Button>
          </>
        )}
        
        {step === 3 && (
          <Button 
            variant="outlined" 
            fullWidth
            onClick={handleNavigate}
          >
            Continue to {destinationName}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default NavigationWarningModal;