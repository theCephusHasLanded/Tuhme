import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  IconButton, 
  Button, 
  CircularProgress,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Divider,
  Tooltip
} from '@mui/material';
import {
  Close as CloseIcon,
  AddShoppingCart as AddToCartIcon,
  Camera as CameraIcon,
  BookmarkAdd as SaveIcon,
  ArrowBack as BackIcon,
  ArrowForward as ForwardIcon,
  Refresh as RefreshIcon,
  Home as HomeIcon
} from '@mui/icons-material';

const StoreWebBrowser = ({ storeName, storeUrl, onClose, onSaveItem }) => {
  const [loading, setLoading] = useState(true);
  const [currentUrl, setCurrentUrl] = useState(storeUrl);
  const [inputUrl, setInputUrl] = useState(storeUrl);
  const [pageTitle, setPageTitle] = useState(storeName);
  const [captureMode, setCaptureMode] = useState(false);
  const [savedItemOpen, setSavedItemOpen] = useState(false);
  const [savedItemInfo, setSavedItemInfo] = useState({ name: '', price: '', notes: '' });
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const webViewRef = useRef(null);
  const captureAreaRef = useRef(null);

  // Handle iframe load event
  const handleIframeLoad = () => {
    setLoading(false);
    
    try {
      // Try to access iframe content to update title, URL, etc.
      // Note: This will only work for same-origin URLs due to browser security
      if (webViewRef.current && webViewRef.current.contentWindow) {
        const iframe = webViewRef.current;
        const iframeWindow = iframe.contentWindow;
        
        // Update title if possible
        if (iframeWindow.document.title) {
          setPageTitle(iframeWindow.document.title);
        }
        
        // Update URL in address bar
        if (iframeWindow.location.href) {
          setCurrentUrl(iframeWindow.location.href);
          setInputUrl(iframeWindow.location.href);
        }
        
        // Check navigation capabilities
        setCanGoBack(iframeWindow.history.length > 1);
        setCanGoForward(false); // We can't reliably detect this from iframe
        
        // Add event listeners to track navigation within iframe
        iframeWindow.addEventListener('popstate', () => {
          if (iframeWindow.location.href) {
            setCurrentUrl(iframeWindow.location.href);
            setInputUrl(iframeWindow.location.href);
          }
          
          setCanGoBack(iframeWindow.history.length > 1);
        });
      }
    } catch (error) {
      // Security errors will happen for cross-origin iframes
      console.warn('Could not access iframe content due to security restrictions');
    }
  };

  // Handle URL navigation
  const handleNavigate = (e) => {
    e.preventDefault();
    
    let urlToNavigate = inputUrl;
    
    // Add https:// prefix if missing
    if (!/^https?:\/\//i.test(urlToNavigate)) {
      urlToNavigate = 'https://' + urlToNavigate;
    }
    
    setCurrentUrl(urlToNavigate);
    setLoading(true);
  };

  // Handle browser navigation
  const handleBrowserNavigation = (action) => {
    if (!webViewRef.current) return;
    
    try {
      const iframe = webViewRef.current;
      
      switch (action) {
        case 'back':
          iframe.contentWindow.history.back();
          break;
        case 'forward':
          iframe.contentWindow.history.forward();
          break;
        case 'refresh':
          iframe.src = iframe.src;
          setLoading(true);
          break;
        case 'home':
          setCurrentUrl(storeUrl);
          setInputUrl(storeUrl);
          setLoading(true);
          break;
        default:
          break;
      }
    } catch (error) {
      console.warn('Navigation action failed due to security restrictions');
      
      // Fallback approach for cross-origin restrictions
      if (action === 'home') {
        setCurrentUrl(storeUrl);
        setInputUrl(storeUrl);
        setLoading(true);
      } else if (action === 'refresh') {
        setCurrentUrl(currentUrl);
        setLoading(true);
      }
    }
  };

  // Enter item capture mode
  const enterCaptureMode = () => {
    setCaptureMode(true);
    setNotification({ 
      open: true, 
      message: 'Click on an item to save it to your TUHME cart', 
      severity: 'info' 
    });
  };

  // Exit item capture mode
  const exitCaptureMode = () => {
    setCaptureMode(false);
  };

  // Handle click when in capture mode
  const handleCaptureClick = (e) => {
    if (!captureMode) return;
    
    // Get the click coordinates
    const x = e.clientX;
    const y = e.clientY;
    
    // Open the item saving dialog
    setSavedItemInfo({
      name: `Item from ${storeName}`,
      price: '',
      notes: `Selected from ${pageTitle}`
    });
    setSavedItemOpen(true);
    
    // Exit capture mode
    exitCaptureMode();
  };

  // Save item to TUHME cart
  const handleSaveItem = () => {
    const itemToSave = {
      ...savedItemInfo,
      store: storeName,
      url: currentUrl,
      timestamp: new Date().toISOString()
    };
    
    // Call the parent component's save handler
    if (onSaveItem) {
      onSaveItem(itemToSave);
    }
    
    // Close dialog
    setSavedItemOpen(false);
    
    // Show success notification
    setNotification({
      open: true,
      message: 'Item saved to your TUHME cart!',
      severity: 'success'
    });
  };

  // Handle notification close
  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Header with controls */}
      <Paper 
        elevation={1}
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 1,
          borderBottom: '1px solid #eee',
          gap: 1
        }}
      >
        {/* Navigation buttons */}
        <Tooltip title="Back">
          <span>
            <IconButton 
              size="small" 
              disabled={!canGoBack}
              onClick={() => handleBrowserNavigation('back')}
            >
              <BackIcon />
            </IconButton>
          </span>
        </Tooltip>
        
        <Tooltip title="Forward">
          <span>
            <IconButton 
              size="small" 
              disabled={!canGoForward}
              onClick={() => handleBrowserNavigation('forward')}
            >
              <ForwardIcon />
            </IconButton>
          </span>
        </Tooltip>
        
        <Tooltip title="Refresh">
          <IconButton 
            size="small"
            onClick={() => handleBrowserNavigation('refresh')}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Home">
          <IconButton 
            size="small"
            onClick={() => handleBrowserNavigation('home')}
          >
            <HomeIcon />
          </IconButton>
        </Tooltip>
        
        {/* URL bar */}
        <Box 
          component="form" 
          sx={{ flexGrow: 1 }}
          onSubmit={handleNavigate}
        >
          <TextField
            size="small"
            fullWidth
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Enter URL"
            InputProps={{
              sx: { 
                borderRadius: '16px',
                fontSize: '0.875rem',
                backgroundColor: '#f5f5f5'
              }
            }}
          />
        </Box>
        
        {/* Action buttons */}
        <Tooltip title="Take a picture of an item">
          <IconButton 
            color="primary" 
            onClick={enterCaptureMode}
          >
            <CameraIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Save item to TUHME cart">
          <IconButton 
            color="primary"
            onClick={() => {
              setSavedItemInfo({
                name: `Item from ${storeName}`,
                price: '',
                notes: `Selected from ${pageTitle}`
              });
              setSavedItemOpen(true);
            }}
          >
            <SaveIcon />
          </IconButton>
        </Tooltip>
        
        <Divider orientation="vertical" flexItem />
        
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Paper>
      
      {/* Web view */}
      <Box 
        sx={{ 
          position: 'relative',
          flexGrow: 1,
          overflow: 'hidden',
          bgcolor: '#fff'
        }}
        ref={captureAreaRef}
        onClick={captureMode ? handleCaptureClick : undefined}
      >
        {/* Loading indicator */}
        {loading && (
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 10
          }}>
            <CircularProgress />
          </Box>
        )}
        
        {/* Capture mode overlay */}
        {captureMode && (
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            zIndex: 5,
            cursor: 'crosshair',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Paper 
              elevation={3}
              sx={{
                p: 2,
                maxWidth: 400,
                textAlign: 'center',
                bgcolor: 'rgba(255, 255, 255, 0.9)'
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                Item Capture Mode
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Click on an item you'd like to add to your TUHME try-on list
              </Typography>
              <Button 
                variant="outlined" 
                onClick={exitCaptureMode}
                startIcon={<CloseIcon />}
              >
                Cancel
              </Button>
            </Paper>
          </Box>
        )}
        
        {/* Website iframe - note: many sites block iframe embedding */}
        <iframe
          ref={webViewRef}
          src={currentUrl}
          title={`${storeName} website`}
          onLoad={handleIframeLoad}
          style={{
            width: '100%',
            height: '100%',
            border: 'none'
          }}
          sandbox="allow-forms allow-scripts allow-same-origin"
        />
        
        {/* Fallback message for sites that block iframes */}
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 400,
            p: 3,
            display: 'none', // Only shown if iframe fails to load
            textAlign: 'center'
          }}
          className="iframe-fallback"
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Website cannot be displayed in TUHME
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            This website doesn't allow direct embedding. You can still use the TUHME app to save items from this store.
          </Typography>
          <Button 
            variant="contained"
            onClick={() => window.open(currentUrl, '_blank')}
          >
            Open in New Window
          </Button>
        </Box>
      </Box>
      
      {/* Save item dialog */}
      <Dialog 
        open={savedItemOpen} 
        onClose={() => setSavedItemOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Save Item to TUHME Cart
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="item-name"
            label="Item Name"
            fullWidth
            variant="outlined"
            value={savedItemInfo.name}
            onChange={(e) => setSavedItemInfo({ ...savedItemInfo, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            id="item-price"
            label="Price (if known)"
            fullWidth
            variant="outlined"
            value={savedItemInfo.price}
            onChange={(e) => setSavedItemInfo({ ...savedItemInfo, price: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            id="item-notes"
            label="Notes (size, color, etc.)"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={savedItemInfo.notes}
            onChange={(e) => setSavedItemInfo({ ...savedItemInfo, notes: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSavedItemOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleSaveItem} 
            variant="contained"
            startIcon={<AddToCartIcon />}
          >
            Add to TUHME Cart
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Notification */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleNotificationClose} 
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StoreWebBrowser;