import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
  Alert
} from '@mui/material';
import { Close as CloseIcon, InfoOutlined as InfoIcon } from '@mui/icons-material';

const ReplacementModal = ({ open, onClose, onApprove, onDecline, replacementItem, originalItem }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 1
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Typography variant="h6" fontWeight="bold">Replacement Needed</Typography>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Alert 
          severity="info" 
          icon={<InfoIcon />}
          sx={{ mb: 3 }}
        >
          The {originalItem?.name || 'Black Silk Evening Dress'} is unavailable. Would you like this alternative?
        </Alert>
        
        <Box sx={{ textAlign: 'center' }}>
          <Box
            component="img"
            src={replacementItem?.image || "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&q=80&w=400&h=300"}
            alt={replacementItem?.name || "Replacement Item"}
            sx={{
              maxHeight: 200,
              objectFit: 'contain',
              borderRadius: 2,
              mb: 2
            }}
          />
          
          <Typography variant="h6" fontWeight="bold">
            {replacementItem?.name || "Black Satin Cocktail Dress"}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {replacementItem?.store || "Neiman Marcus"} - ${replacementItem?.price || "225"}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, justifyContent: 'center', gap: 2 }}>
        <Button
          onClick={onDecline}
          variant="outlined"
          sx={{ 
            borderRadius: 50, 
            px: 4,
            width: '50%'
          }}
        >
          Decline
        </Button>
        <Button
          onClick={onApprove}
          variant="contained"
          color="primary"
          sx={{
            borderRadius: 50,
            px: 4,
            fontWeight: 600,
            width: '50%'
          }}
        >
          Approve
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReplacementModal;