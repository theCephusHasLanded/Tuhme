import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  DialogActions,
  useTheme,
  Paper,
  Grid,
  Divider,
  Slide
} from '@mui/material';
import {
  Link as LinkIcon,
  Screenshot as ScreenshotIcon,
  ContentCut as SelectIcon,
  WhatsApp as WhatsAppIcon,
  Share as ShareIcon,
  InsertPhoto as ImageIcon,
  Notes as NotesIcon,
  Check as CheckIcon
} from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ExpressOrderModal = ({ open, onClose, storeName }) => {
  const theme = useTheme();

  const handleStartWhatsApp = () => {
    window.open('https://api.whatsapp.com/send/?phone=16465889916&type=phone_number&app_absent=0', '_blank');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{ 
        p: 0,
        position: 'relative',
        bgcolor: theme.palette.primary.main,
        color: 'white',
        py: 3,
        px: 4
      }}>
        <Box sx={{ position: 'absolute', right: 16, top: 16 }}>
          <Box component="span" sx={{ 
            display: 'inline-block',
            px: 2,
            py: 0.5,
            bgcolor: 'white',
            color: theme.palette.primary.main,
            borderRadius: 5,
            fontSize: '0.75rem',
            fontWeight: 'bold',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            boxShadow: theme.shadows.md
          }}>
            Express Service
          </Box>
        </Box>
        <Typography variant="h5" component="div" sx={{ fontWeight: 700, mb: 1 }}>
          WhatsApp Express Order
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 400, opacity: 0.9 }}>
          {storeName ? `For ${storeName}` : 'For Manhattan Luxury Stores'}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              How It Works
            </Typography>
            
            <List sx={{ mb: 3 }}>
              <ListItem sx={{ pb: 2 }}>
                <ListItemIcon sx={{ 
                  minWidth: 40,
                  color: theme.palette.primary.main
                }}>
                  <ScreenshotIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Take Screenshot" 
                  secondary="Take a screenshot of the item you want to try on" 
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItem>
              
              <ListItem sx={{ pb: 2 }}>
                <ListItemIcon sx={{ 
                  minWidth: 40,
                  color: theme.palette.primary.main
                }}>
                  <LinkIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Copy Link" 
                  secondary="Copy the URL of the item page for reference" 
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItem>
              
              <ListItem sx={{ pb: 2 }}>
                <ListItemIcon sx={{ 
                  minWidth: 40,
                  color: theme.palette.primary.main
                }}>
                  <SelectIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Note Details" 
                  secondary="Size, color, and any special requirements" 
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon sx={{ 
                  minWidth: 40,
                  color: theme.palette.primary.main
                }}>
                  <WhatsAppIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Send via WhatsApp" 
                  secondary="Share everything with our concierge team" 
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItem>
            </List>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ 
              p: 3, 
              bgcolor: theme.palette.grey[50], 
              borderRadius: 2,
              border: `1px solid ${theme.palette.grey[200]}`
            }}>
              <Typography variant="h6" sx={{ 
                mb: 2, 
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center' 
              }}>
                <WhatsAppIcon sx={{ 
                  mr: 1, 
                  color: '#25D366'
                }} />
                Send to our concierge
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Our WhatsApp concierge team is ready to assist you with your express order.
                They'll help source the items you want and arrange delivery to your door.
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                  Include:
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      fontSize: '0.875rem',
                      mb: 1
                    }}>
                      <CheckIcon sx={{ color: theme.palette.success.main, mr: 1, fontSize: '1rem' }} />
                      Screenshot
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      fontSize: '0.875rem',
                      mb: 1
                    }}>
                      <CheckIcon sx={{ color: theme.palette.success.main, mr: 1, fontSize: '1rem' }} />
                      Item link
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      fontSize: '0.875rem',
                      mb: 1
                    }}>
                      <CheckIcon sx={{ color: theme.palette.success.main, mr: 1, fontSize: '1rem' }} />
                      Size & color
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      fontSize: '0.875rem',
                      mb: 1
                    }}>
                      <CheckIcon sx={{ color: theme.palette.success.main, mr: 1, fontSize: '1rem' }} />
                      Delivery address
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleStartWhatsApp}
                startIcon={<WhatsAppIcon />}
                sx={{
                  borderRadius: 2,
                  bgcolor: '#25D366',
                  py: 1.5,
                  '&:hover': {
                    bgcolor: '#128C7E'
                  }
                }}
              >
                Start WhatsApp Chat
              </Button>
            </Paper>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            The TUHME guarantee: Try before you buy. We'll deliver items for you to try on, 
            and you only pay for what you decide to keep.
          </Typography>
          
          <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
            Same-day delivery available in Manhattan for orders placed before 3pm.
          </Typography>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, bgcolor: theme.palette.grey[50] }}>
        <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2 }}>
          Continue Browsing
        </Button>
        <Button
          onClick={handleStartWhatsApp}
          variant="contained"
          startIcon={<WhatsAppIcon />}
          sx={{ borderRadius: 2 }}
        >
          Contact Our Team
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpressOrderModal;