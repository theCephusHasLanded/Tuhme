import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Chip,
  CircularProgress,
  Slide,
  IconButton,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MinimizeIcon from '@mui/icons-material/Minimize';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

/**
 * WhatsAppChat - A component that provides a WhatsApp-like chat interface
 * for seamless integration with TUHME's WhatsApp service
 */
const WhatsAppChat = ({ 
  open, 
  onClose, 
  storeInfo = null,
  customerInfo = null,
  orderDetails = null,
  uploadedImages = []
}) => {
  // State
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const [connected, setConnected] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [showImagesDialog, setShowImagesDialog] = useState(false);
  
  // Generate welcome message when opened
  useEffect(() => {
    if (open && messages.length === 0) {
      // Initial welcome messages from TUHME
      const initialMessages = [
        {
          id: 1,
          sender: 'tuhme',
          text: 'Welcome to TUHME! How can we help you today?',
          timestamp: new Date().toISOString(),
          status: 'read'
        }
      ];
      
      // Add context-specific message if we have store info
      if (storeInfo) {
        initialMessages.push({
          id: 2,
          sender: 'tuhme',
          text: `I see you're interested in shopping at ${storeInfo.storeName}. I'd be happy to help you find what you're looking for!`,
          timestamp: new Date(Date.now() + 1000).toISOString(),
          status: 'read'
        });
      }
      
      setMessages(initialMessages);
      setConnected(true);
    }
  }, [open, storeInfo]);
  
  // Format timestamp for display
  const formatTime = (timestamp) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return '';
    }
  };
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: messageText,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };
    
    setMessages([...messages, userMessage]);
    setSending(true);
    setMessageText('');
    
    // Simulate sending to WhatsApp
    setTimeout(() => {
      // Update message status to delivered
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'delivered' } 
            : msg
        )
      );
      
      setSending(false);
      
      // Simulate response from TUHME after a delay
      setTimeout(() => {
        // Generate response based on message content
        let responseText = "Thanks for your message! A TUHME personal shopper will assist you shortly.";
        
        if (messageText.toLowerCase().includes('price') || messageText.toLowerCase().includes('cost')) {
          responseText = "Our personal shopping service has no additional fees beyond the cost of your items. We're happy to provide price information for any specific products you're interested in.";
        } else if (messageText.toLowerCase().includes('time') || messageText.toLowerCase().includes('delivery')) {
          responseText = "We offer same-day delivery for most Manhattan locations when ordered before 3pm. Would you like to schedule a specific delivery time?";
        } else if (messageText.toLowerCase().includes('return')) {
          responseText = "Our return policy is hassle-free! You can try on the items, and we'll return any unwanted pieces at no additional cost. Is there something specific you'd like to try?";
        }
        
        const tuhmeBotMessage = {
          id: Date.now(),
          sender: 'tuhme',
          text: responseText,
          timestamp: new Date().toISOString(),
          status: 'read'
        };
        
        setMessages(prev => [...prev, tuhmeBotMessage]);
      }, 1500);
    }, 1000);
  };
  
  // Handle minimize/maximize
  const toggleMinimize = () => {
    setMinimized(!minimized);
  };
  
  // Handle image dialog
  const handleOpenImagesDialog = () => {
    setShowImagesDialog(true);
  };
  
  const handleCloseImagesDialog = () => {
    setShowImagesDialog(false);
  };
  
  // Handle continue to real WhatsApp
  const handleContinueToWhatsApp = () => {
    // Prepare message content
    let whatsappText = "Hello TUHME, I'd like assistance with shopping";
    
    if (storeInfo) {
      whatsappText += ` at ${storeInfo.storeName}`;
    }
    
    if (customerInfo) {
      whatsappText += `\n\nMy details:\nName: ${customerInfo.name}\nPhone: ${customerInfo.phone}`;
      if (customerInfo.address) {
        whatsappText += `\nAddress: ${customerInfo.address}`;
      }
    }
    
    if (orderDetails) {
      whatsappText += `\n\nI'm looking for: ${orderDetails.description}`;
    }
    
    if (messages.length > 2) {
      whatsappText += "\n\nFrom our previous chat:";
      // Add the last 3 user messages
      const userMessages = messages
        .filter(msg => msg.sender === 'user')
        .slice(-3);
      
      userMessages.forEach(msg => {
        whatsappText += `\n- ${msg.text}`;
      });
    }
    
    // Add note about images if any
    if (uploadedImages && uploadedImages.length > 0) {
      whatsappText += `\n\nI have ${uploadedImages.length} image(s) to share with you as reference.`;
    }
    
    // Format WhatsApp URL with message
    const encodedMessage = encodeURIComponent(whatsappText);
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=16465889916&text=${encodedMessage}&type=phone_number&app_absent=0`;
    
    // Open WhatsApp in new window
    window.open(whatsappUrl, '_blank');
    
    // Close the chat after a brief delay
    setTimeout(() => {
      onClose();
    }, 500);
  };
  
  // If minimized, just show floating button
  if (minimized) {
    return (
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
          width: 60,
          height: 60,
          borderRadius: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#25D366',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onClick={toggleMinimize}
      >
        <WhatsAppIcon sx={{ color: 'white', fontSize: 30 }} />
      </Paper>
    );
  }
  
  return (
    <>
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Paper
          elevation={3}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 1000,
            width: { xs: '90%', sm: 400 },
            maxWidth: { xs: 'calc(100% - 40px)', sm: 400 },
            height: 500,
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 2,
              backgroundColor: '#075E54',
              color: 'white'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                src="/tuhme-logo.png"
                alt="TUHME"
                sx={{ marginRight: 1.5 }}
              />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  TUHME Personal Shopping
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.75rem', opacity: 0.9 }}>
                  {connected ? 'Online' : 'Connecting...'}
                </Typography>
              </Box>
            </Box>
            
            <Box>
              <IconButton
                size="small"
                color="inherit"
                onClick={toggleMinimize}
                sx={{ mr: 1 }}
              >
                <MinimizeIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                color="inherit"
                onClick={onClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          
          {/* Chat area */}
          <Box
            sx={{
              flexGrow: 1,
              padding: 2,
              overflowY: 'auto',
              backgroundColor: '#ECE5DD',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5
            }}
          >
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '75%'
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    padding: 1.5,
                    backgroundColor: message.sender === 'user' ? '#DCF8C6' : 'white',
                    borderRadius: 2,
                    position: 'relative'
                  }}
                >
                  <Typography variant="body2">{message.text}</Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      textAlign: 'right',
                      color: 'text.secondary',
                      mt: 0.5,
                      fontSize: '0.675rem'
                    }}
                  >
                    {formatTime(message.timestamp)}
                    {message.sender === 'user' && (
                      <Box
                        component="span"
                        sx={{ ml: 0.5, display: 'inline-flex', verticalAlign: 'middle' }}
                      >
                        {message.status === 'sent' && '✓'}
                        {message.status === 'delivered' && '✓✓'}
                        {message.status === 'read' && (
                          <span style={{ color: '#34B7F1' }}>✓✓</span>
                        )}
                      </Box>
                    )}
                  </Typography>
                </Paper>
              </Box>
            ))}
            
            {sending && (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
                <CircularProgress size={20} />
              </Box>
            )}
          </Box>
          
          {/* Input area */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: 1,
              backgroundColor: '#F0F0F0',
              gap: 1
            }}
          >
            <IconButton color="default" onClick={handleOpenImagesDialog}>
              <AttachFileIcon />
            </IconButton>
            
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message"
              size="small"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              InputProps={{
                sx: {
                  borderRadius: 4,
                  backgroundColor: 'white'
                }
              }}
            />
            
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
              sx={{
                backgroundColor: '#25D366',
                color: 'white',
                '&:hover': { backgroundColor: '#128C7E' },
                '&.Mui-disabled': { backgroundColor: '#A9A9A9', color: 'white' }
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
          
          {/* Continue to real WhatsApp button */}
          <Box
            sx={{
              padding: 1.5,
              backgroundColor: '#F0F0F0',
              borderTop: '1px solid #E0E0E0',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Button
              variant="contained"
              startIcon={<WhatsAppIcon />}
              onClick={handleContinueToWhatsApp}
              sx={{
                backgroundColor: '#25D366',
                '&:hover': { backgroundColor: '#128C7E' },
                borderRadius: 2,
                width: { xs: '100%', sm: 'auto' }
              }}
            >
              Continue in WhatsApp
            </Button>
          </Box>
        </Paper>
      </Slide>
      
      {/* Dialog for showing images */}
      <Dialog
        open={showImagesDialog}
        onClose={handleCloseImagesDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Reference Images</Typography>
            <IconButton onClick={handleCloseImagesDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent dividers>
          {uploadedImages.length > 0 ? (
            <List>
              {uploadedImages.map((image, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Image ${index + 1}`}
                    secondary="Will be shared when you connect to WhatsApp"
                  />
                  <CheckCircleIcon color="success" />
                </ListItem>
              ))}
            </List>
          ) : (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography color="text.secondary">
                No images attached. You can upload images through the order form.
              </Typography>
            </Box>
          )}
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="body2" color="text.secondary" paragraph>
            These images will be available for you to send directly in WhatsApp after clicking "Continue in WhatsApp".
          </Typography>
          
          <Button
            variant="outlined"
            fullWidth
            onClick={handleCloseImagesDialog}
            sx={{ mt: 1 }}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WhatsAppChat;