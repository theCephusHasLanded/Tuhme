import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  CircularProgress,
  Alert,
  IconButton,
  Divider,
  Paper,
  Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StorefrontIcon from '@mui/icons-material/Storefront';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import ImageUploader from './ImageUploader';

/**
 * StoreToWhatsAppModal - A modal that handles the flow from selecting a store on the map
 * to submitting a request via WhatsApp. It includes:
 * 1. A notification that the user is about to leave TUHME
 * 2. Option to upload images of desired items
 * 3. Form for user information
 * 4. Submission to WhatsApp with context preservation
 */
const StoreToWhatsAppModal = ({ 
  open, 
  onClose, 
  storeInfo = null,
  uploadedImages = [],
  onImagesChange,
  onAirtableOrder
}) => {
  // User information (load from localStorage if available)
  const getSavedUserInfo = (field) => {
    try {
      return localStorage.getItem(`tuhme_user_${field}`) || '';
    } catch (error) {
      return '';
    }
  };

  // State
  const [step, setStep] = useState(1); // Step 1: Initial notice, Step 2: Form, Step 3: Confirmation
  const [name, setName] = useState(getSavedUserInfo('name'));
  const [email, setEmail] = useState(getSavedUserInfo('email'));
  const [phone, setPhone] = useState(getSavedUserInfo('phone'));
  const [address, setAddress] = useState(getSavedUserInfo('address'));
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Handle closing
  const handleClose = () => {
    if (step === 3) {
      // If in confirmation step, just close without warning
      onClose();
      return;
    }
    
    // Ask for confirmation in other steps
    if (window.confirm('Are you sure you want to cancel this request? Your progress will be lost.')) {
      onClose();
      setStep(1);
    }
  };
  
  // Save user info to localStorage when it changes
  useEffect(() => {
    if (name) localStorage.setItem('tuhme_user_name', name);
    if (email) localStorage.setItem('tuhme_user_email', email);
    if (phone) localStorage.setItem('tuhme_user_phone', phone);
    if (address) localStorage.setItem('tuhme_user_address', address);
  }, [name, email, phone, address]);
  
  // Handle images change
  const handleImagesChange = (images) => {
    if (onImagesChange) {
      onImagesChange(images);
    }
  };
  
  // Handle moving to next step
  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      // Validate form before proceeding
      if (!name || !email || !phone) {
        setError('Please fill in all required fields (name, email, phone)');
        return;
      }
      
      setError('');
      setStep(3);
    }
  };
  
  // Handle going back a step
  const handlePrevStep = () => {
    setStep(step - 1);
  };
  
  // Handle WhatsApp submission
  const handleWhatsAppSubmit = () => {
    setLoading(true);
    
    try {
      // Format message for WhatsApp
      const hasImages = uploadedImages && uploadedImages.length > 0;
      
      // Create message with customer info and store details
      const message = `
*TUHME Store Try-On Request*
      
*Customer Information:*
Name: ${name}
Email: ${email}
Phone: ${phone}
Address: ${address}

*Selected Store: ${storeInfo?.storeName || 'N/A'}*
${storeInfo?.storeUrl ? `Store URL: ${storeInfo.storeUrl}` : ''}
${storeInfo?.storeType ? `Store Type: ${storeInfo.storeType}` : ''}

${hasImages ? `*Customer has uploaded ${uploadedImages.length} image${uploadedImages.length > 1 ? 's' : ''} of desired items*` : ''}

*Additional Notes:*
${notes || 'No additional notes provided.'}
`;
      
      // Format WhatsApp URL with message
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://api.whatsapp.com/send/?phone=16465889916&text=${encodedMessage}&type=phone_number&app_absent=0`;
      
      // Open WhatsApp in new window
      window.open(whatsappUrl, '_blank');
      
      // If customer uploaded images, inform them to manually send the images
      if (hasImages) {
        setTimeout(() => {
          alert('Please send your uploaded images to the WhatsApp chat that just opened. After sending, please return to TUHME to continue your shopping experience.');
        }, 1000);
      }
      
      // Close modal after opening WhatsApp
      setTimeout(() => {
        setLoading(false);
        onClose();
        setStep(1);
      }, 2000);
      
    } catch (error) {
      setLoading(false);
      setError('Failed to open WhatsApp. Please try again.');
      console.error('WhatsApp error:', error);
    }
  };
  
  // Handle visit store directly
  const handleVisitStore = () => {
    if (storeInfo?.storeUrl) {
      // First show alert
      alert('You are about to leave TUHME to visit the store website. Remember to return to TUHME when you find your items!');
      
      // Then open store in new tab
      window.open(storeInfo.storeUrl, '_blank');
    }
  };
  
  // Validation for submit button
  const isSubmitDisabled = step === 2 && (!name || !email || !phone);
  
  // Title based on step
  const getStepTitle = () => {
    switch (step) {
      case 1:
        return `Shop at ${storeInfo?.storeName || 'Selected Store'}`;
      case 2:
        return "Your Information";
      case 3:
        return "Confirm Request";
      default:
        return "TUHME Shopping";
    }
  };
  
  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        pb: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {step > 1 && (
            <IconButton 
              edge="start" 
              color="inherit" 
              onClick={handlePrevStep}
              sx={{ mr: 1 }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div">
            {getStepTitle()}
          </Typography>
        </Box>
        <IconButton edge="end" color="inherit" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ px: { xs: 2, sm: 3 }, py: 3 }}>
        {/* Step 1: Initial notice */}
        {step === 1 && (
          <>
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              mb: 3
            }}>
              <Box sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2
              }}>
                <StorefrontIcon sx={{ fontSize: 40, color: '#2E8B57' }} />
              </Box>
              
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                {storeInfo?.storeName || 'Selected Store'}
              </Typography>
              
              <Typography variant="body1" color="text.secondary" paragraph>
                You've selected to shop at this store through TUHME's personal shopping service.
              </Typography>
            </Box>
            
            <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                How TUHME Personal Shopping Works:
              </Typography>
              
              <Typography variant="body2" component="ol" sx={{ pl: 2 }}>
                <li>Describe what items you want to try</li>
                <li>Our shoppers will visit the store for you</li>
                <li>We'll deliver items to your door to try on</li>
                <li>Keep what you love, we'll return the rest</li>
              </Typography>
            </Paper>
            
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Choose how you'd like to proceed:
            </Typography>
            
            <Stack spacing={2}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                fullWidth
                startIcon={<WhatsAppIcon />}
                onClick={handleNextStep}
                sx={{ 
                  py: 1.5,
                  borderRadius: 2,
                  backgroundColor: '#2E8B57',
                  '&:hover': {
                    backgroundColor: '#246B44'
                  }
                }}
              >
                Request Through WhatsApp
              </Button>
              
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={onAirtableOrder}
                sx={{ 
                  py: 1.5,
                  borderRadius: 2,
                  mt: 2,
                  bgcolor: 'black',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#333'
                  }
                }}
              >
                Create Express Order
              </Button>
              
              <Button
                variant="outlined"
                color="inherit"
                fullWidth
                onClick={handleVisitStore}
                sx={{ 
                  py: 1.5,
                  borderRadius: 2,
                  mt: 2
                }}
              >
                Visit Store Website Directly
              </Button>
            </Stack>
            
            <Box sx={{ 
              mt: 3, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <Typography variant="body2" color="text.secondary">
                It's faster and easier to let TUHME do the shopping for you!
              </Typography>
            </Box>
          </>
        )}
        
        {/* Step 2: Form */}
        {step === 2 && (
          <>
            <Typography variant="body1" color="text.secondary" paragraph>
              Please provide your information to continue your shopping request at {storeInfo?.storeName || 'the selected store'}.
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Your Details
              </Typography>
              
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                variant="outlined"
                size="small"
              />
              
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                variant="outlined"
                size="small"
              />
              
              <TextField
                label="Phone"
                fullWidth
                margin="normal"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                variant="outlined"
                size="small"
              />
              
              <TextField
                label="Delivery Address"
                fullWidth
                margin="normal"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                variant="outlined"
                size="small"
              />
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Box>
              <Typography variant="subtitle1" gutterBottom sx={{ 
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center'
              }}>
                <FileUploadIcon sx={{ mr: 1 }} />
                Upload Images (Optional)
              </Typography>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                Share screenshots or photos of items you'd like to try on from this store.
              </Typography>
              
              <ImageUploader 
                onImagesChange={handleImagesChange} 
                initialImages={uploadedImages}
              />
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Box>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Additional Notes
              </Typography>
              
              <TextField
                label="Specific items, brands, sizes, etc."
                fullWidth
                multiline
                rows={3}
                margin="normal"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                variant="outlined"
                placeholder="Describe what you're looking for at this store..."
              />
            </Box>
          </>
        )}
        
        {/* Step 3: Confirmation */}
        {step === 3 && (
          <>
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              mb: 3
            }}>
              <Box sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: '#e7f5e7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2
              }}>
                <WhatsAppIcon sx={{ fontSize: 40, color: '#25D366' }} />
              </Box>
              
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                Almost There!
              </Typography>
              
              <Typography variant="body1" paragraph>
                Your request is ready to send via WhatsApp.
              </Typography>
            </Box>
            
            <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Request Summary:
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Store:</Typography>
                <Typography variant="body2" color="text.secondary">{storeInfo?.storeName || 'Selected Store'}</Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Customer:</Typography>
                <Typography variant="body2" color="text.secondary">{name}</Typography>
              </Box>
              
              {uploadedImages.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Images:</Typography>
                  <Typography variant="body2" color="text.secondary">{uploadedImages.length} image(s) attached</Typography>
                </Box>
              )}
              
              {notes && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Notes:</Typography>
                  <Typography variant="body2" color="text.secondary">{notes}</Typography>
                </Box>
              )}
            </Paper>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2">
                <strong>Next Steps:</strong> After clicking "Send via WhatsApp", please:
              </Typography>
              <ol style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                <li>Complete the WhatsApp message</li>
                {uploadedImages.length > 0 && <li>Send your images in the WhatsApp chat</li>}
                <li>Return to TUHME to continue browsing</li>
              </ol>
            </Alert>
          </>
        )}
      </DialogContent>
      
      <DialogActions sx={{ 
        px: { xs: 2, sm: 3 }, 
        py: 2, 
        borderTop: '1px solid rgba(0,0,0,0.1)'
      }}>
        {step === 1 && (
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
        )}
        
        {step === 2 && (
          <>
            <Button onClick={handlePrevStep} color="inherit">
              Back
            </Button>
            <Button 
              onClick={handleNextStep} 
              variant="contained" 
              disabled={isSubmitDisabled}
            >
              Continue
            </Button>
          </>
        )}
        
        {step === 3 && (
          <>
            <Button onClick={handlePrevStep} color="inherit">
              Back
            </Button>
            <Button 
              onClick={handleWhatsAppSubmit} 
              variant="contained" 
              color="primary"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <WhatsAppIcon />}
              sx={{ 
                backgroundColor: '#25D366',
                '&:hover': {
                  backgroundColor: '#128C7E'
                }
              }}
            >
              Send via WhatsApp
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default StoreToWhatsAppModal;