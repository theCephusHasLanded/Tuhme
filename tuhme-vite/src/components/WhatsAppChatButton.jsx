import { useState } from 'react';
import { Fab, Tooltip, Badge, Zoom } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import WhatsAppChat from './WhatsAppChat';

/**
 * WhatsAppChatButton - A floating action button that opens the WhatsApp chat
 * This can be placed anywhere in the app to provide quick access to chat
 */
const WhatsAppChatButton = ({ 
  storeInfo = null,
  customerInfo = null,
  orderDetails = null,
  uploadedImages = [],
  hasNotification = false
}) => {
  const [chatOpen, setChatOpen] = useState(false);
  
  const handleOpenChat = () => {
    setChatOpen(true);
  };
  
  const handleCloseChat = () => {
    setChatOpen(false);
  };
  
  return (
    <>
      <Tooltip 
        title="Chat with TUHME" 
        placement="left"
        TransitionComponent={Zoom}
      >
        <Badge 
          color="error" 
          variant="dot" 
          invisible={!hasNotification}
          overlap="circular"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 999
          }}
        >
          <Fab
            color="primary"
            aria-label="chat"
            onClick={handleOpenChat}
            sx={{
              backgroundColor: '#25D366',
              '&:hover': {
                backgroundColor: '#128C7E'
              },
              animation: hasNotification 
                ? 'pulse 2s infinite' 
                : 'none',
              '@keyframes pulse': {
                '0%': { boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.7)' },
                '70%': { boxShadow: '0 0 0 10px rgba(37, 211, 102, 0)' },
                '100%': { boxShadow: '0 0 0 0 rgba(37, 211, 102, 0)' }
              }
            }}
          >
            <WhatsAppIcon />
          </Fab>
        </Badge>
      </Tooltip>
      
      <WhatsAppChat
        open={chatOpen}
        onClose={handleCloseChat}
        storeInfo={storeInfo}
        customerInfo={customerInfo}
        orderDetails={orderDetails}
        uploadedImages={uploadedImages}
      />
    </>
  );
};

export default WhatsAppChatButton;