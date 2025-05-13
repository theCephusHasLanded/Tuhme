import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AirtableOrderForm from './AirtableOrderForm';

/**
 * AirtableOrderModal - A modal that contains the Airtable order form
 * This allows users to place orders directly through Airtable integration
 */
const AirtableOrderModal = ({ 
  open, 
  onClose, 
  storeInfo = null 
}) => {
  const [submitted, setSubmitted] = useState(false);
  
  // Handle form submission success
  const handleSubmitSuccess = () => {
    setSubmitted(true);
    // Close the modal after a short delay
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 3000);
  };
  
  return (
    <Dialog
      open={open}
      onClose={submitted ? onClose : undefined}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        bgcolor: 'black',
        color: 'white'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <StorefrontIcon sx={{ mr: 1.5 }} />
          <Typography variant="h6" component="div">
            {storeInfo?.storeName 
              ? `Express Order: ${storeInfo.storeName}` 
              : 'Create New TUHME Order'}
          </Typography>
        </Box>
        
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          disabled={submitted}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 0 }}>
        <AirtableOrderForm
          selectedStore={storeInfo}
          onSubmitSuccess={handleSubmitSuccess}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AirtableOrderModal;