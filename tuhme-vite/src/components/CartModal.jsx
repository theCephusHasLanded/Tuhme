import { useState, useEffect, useRef } from 'react';
import { 
  CloudUpload as CloudUploadIcon,
  AddLink as AddLinkIcon,
  Link as LinkIcon
} from '@mui/icons-material';
import { 
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  IconButton,
  Alert,
  Snackbar
} from '@mui/material';
import ImageUploader from './ImageUploader';
import { addCartItem } from '../utils/cartStorage';
import '../styles/components/cart-modal.css';

/**
 * Cart Modal Component
 * Neo-Scandinavian design with Jamaican Golf Culture elements
 * Follows design specifications for the UI overhaul
 */
const CartModal = ({ 
  open, 
  onClose, 
  cartItems = [], 
  uploadedImages = [], 
  onImagesChange, 
  onRemoveItem, 
  onClearCart,
  onQuantityChange
}) => {
  // Load user info from localStorage if available
  const getSavedUserInfo = (field) => {
    try {
      return localStorage.getItem(`tuhme_user_${field}`) || '';
    } catch (error) {
      return '';
    }
  };

  // State management
  const [name, setName] = useState(getSavedUserInfo('name'));
  const [email, setEmail] = useState(getSavedUserInfo('email'));
  const [phone, setPhone] = useState(getSavedUserInfo('phone'));
  const [address, setAddress] = useState(getSavedUserInfo('address'));
  const [notes, setNotes] = useState('');
  const [total, setTotal] = useState(0);
  const [activeTab, setActiveTab] = useState('cart');
  const modalRef = useRef(null);
  
  // Direct link input states
  const [directLinkUrl, setDirectLinkUrl] = useState('');
  const [directLinkName, setDirectLinkName] = useState('');
  const [directLinkBrand, setDirectLinkBrand] = useState('');
  const [directLinkPrice, setDirectLinkPrice] = useState('');
  const [directLinkNotes, setDirectLinkNotes] = useState('');
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  
  // Calculate total price of items in cart
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const sum = cartItems.reduce((acc, item) => {
        return acc + (item.price || 0) * (item.quantity || 1);
      }, 0);
      setTotal(sum);
    } else {
      setTotal(0);
    }
  }, [cartItems]);
  
  // Save user info to localStorage when it changes
  useEffect(() => {
    if (name) localStorage.setItem('tuhme_user_name', name);
    if (email) localStorage.setItem('tuhme_user_email', email);
    if (phone) localStorage.setItem('tuhme_user_phone', phone);
    if (address) localStorage.setItem('tuhme_user_address', address);
  }, [name, email, phone, address]);
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose]);
  
  // Handle changing tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Handle images change from the ImageUploader component
  const handleImagesChange = (images) => {
    if (onImagesChange) {
      onImagesChange(images);
    }
  };

  // Handle quantity change
  const handleQuantityChange = (itemId, delta) => {
    if (onQuantityChange) {
      onQuantityChange(itemId, delta);
    }
  };
  
  // Handle adding item from direct link
  const handleAddItemFromLink = () => {
    if (!directLinkUrl) {
      setNotification({
        open: true,
        message: 'Please enter a URL for the item',
        severity: 'error'
      });
      return;
    }
    
    if (!directLinkName) {
      setNotification({
        open: true,
        message: 'Please enter a name for the item',
        severity: 'error'
      });
      return;
    }
    
    // Create a new item object
    const newItem = {
      id: `item_${Date.now()}`,
      name: directLinkName,
      brand: directLinkBrand || 'Custom Link',
      price: parseFloat(directLinkPrice) || 0,
      notes: directLinkNotes,
      url: directLinkUrl,
      timestamp: new Date().toISOString()
    };
    
    // Add to cart
    const updatedItems = addCartItem(newItem);
    if (onQuantityChange) {
      // Just a way to update the parent component's state - could be improved
      onQuantityChange(newItem.id, 0);
    }
    
    // Clear inputs
    setDirectLinkUrl('');
    setDirectLinkName('');
    setDirectLinkBrand('');
    setDirectLinkPrice('');
    setDirectLinkNotes('');
    
    // Show success notification
    setNotification({
      open: true,
      message: `${newItem.name} added to your cart`,
      severity: 'success'
    });
    
    // Switch to cart tab to show the added item
    setActiveTab('cart');
  };
  
  // Handle notification close
  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  // Handle checkout via WhatsApp
  const handleWhatsAppCheckout = () => {
    // Format cart items for WhatsApp message
    const hasCartItems = cartItems && cartItems.length > 0;
    const hasImages = uploadedImages && uploadedImages.length > 0;
    
    let itemsList = '';
    if (hasCartItems) {
      itemsList = cartItems.map(item => {
        let itemText = `${item.name} (${item.store || item.brand}) - $${item.price ? item.price.toFixed(2) : '0.00'} x${item.quantity || 1}`;
        
        // Include the URL if available
        if (item.url) {
          itemText += `\nLink: ${item.url}`;
        }
        
        // Include notes if available
        if (item.notes) {
          itemText += `\nNotes: ${item.notes}`;
        }
        
        return itemText;
      }).join('\n\n');
    }
    
    // Create message with customer info and cart items
    const message = `
*TUHME Try-On Request*
    
*Customer Information:*
Name: ${name}
Email: ${email}
Phone: ${phone}
Address: ${address}

${hasCartItems ? `*Items from Cart:*
${itemsList}

*Total: $${total.toFixed(2)}*` : ''}

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
        alert('Please send your uploaded images to the WhatsApp chat that just opened. Since WhatsApp API doesn\'t allow direct image uploads, you\'ll need to save and upload them manually.');
      }, 1000);
    }
    
    // Close modal after opening WhatsApp
    onClose();
  };

  // Validation for checkout button
  const isCheckoutDisabled = !name || !email || !phone || !address || (cartItems.length === 0 && uploadedImages.length === 0);

  // If not open, don't render anything
  if (!open) return null;

  return (
    <div className={`cart-modal ${open ? 'cart-modal--active' : ''}`}>
      <div className="cart-modal__panel" ref={modalRef}>
        <div className="cart-modal__header">
          <h2 className="cart-modal__title">Your Try-On Selection</h2>
          <button 
            className="cart-modal__close"
            onClick={onClose}
            aria-label="Close cart"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="cart-modal__tabs">
          <button 
            className={`cart-modal__tab ${activeTab === 'cart' ? 'cart-modal__tab--active' : ''}`}
            onClick={() => handleTabChange('cart')}
          >
            <span className="cart-modal__tab-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            Cart Items
          </button>
          <button 
            className={`cart-modal__tab ${activeTab === 'upload' ? 'cart-modal__tab--active' : ''}`}
            onClick={() => handleTabChange('upload')}
          >
            <span className="cart-modal__tab-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.5 13V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.5 9V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.5 13V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            Upload Images
          </button>
          <button 
            className={`cart-modal__tab ${activeTab === 'direct-link' ? 'cart-modal__tab--active' : ''}`}
            onClick={() => handleTabChange('direct-link')}
          >
            <span className="cart-modal__tab-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 13C11.1046 13 12 12.1046 12 11C12 9.89543 11.1046 9 10 9C8.89543 9 8 9.89543 8 11C8 12.1046 8.89543 13 10 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 9L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13 5H15V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            Add Direct Link
          </button>
        </div>
        
        <div className="cart-modal__content">
          {activeTab === 'cart' && (
            <>
              {cartItems.length > 0 ? (
                <div className="cart-modal__items">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} className="cart-item__image" />
                      <div className="cart-item__content">
                        <div className="cart-item__header">
                          <div className="cart-item__store">{item.brand || item.store}</div>
                          <div className="cart-item__name">{item.name}</div>
                        </div>
                        <div className="cart-item__footer">
                          <div className="cart-item__price">${item.price ? item.price.toFixed(2) : '0.00'}</div>
                          <div className="cart-item__quantity">
                            <button 
                              className="cart-item__quantity-btn"
                              onClick={() => handleQuantityChange(item.id, -1)}
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="cart-item__quantity-value">{item.quantity || 1}</span>
                            <button 
                              className="cart-item__quantity-btn"
                              onClick={() => handleQuantityChange(item.id, 1)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <button 
                        className="cart-item__remove"
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="cart-modal__empty">
                  <div className="cart-modal__empty-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="cart-modal__empty-title">Your try-on cart is empty</h3>
                  <p className="cart-modal__empty-text">
                    Browse our collections or upload images of items you'd like to try.
                  </p>
                  <div>
                    <button 
                      className="cart-modal__empty-btn"
                      onClick={() => handleTabChange('upload')}
                    >
                      Upload Images
                    </button>
                    <button 
                      className="cart-modal__empty-btn"
                      onClick={onClose}
                    >
                      Browse Stores
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
          
          {activeTab === 'upload' && (
            <div className="cart-modal__upload">
              <h3 className="cart-modal__upload-title">Upload Images of Items You Want</h3>
              <p className="cart-modal__upload-text">
                Share screenshots or photos of luxury pieces you'd like to try on, and we'll source them for you.
              </p>
              
              <ImageUploader onImagesChange={handleImagesChange} initialImages={uploadedImages} />
            </div>
          )}
          
          {activeTab === 'direct-link' && (
            <div className="cart-modal__direct-link">
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Add Item by Direct Link
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Enter a direct link to an item you want to try on from any website. Our concierge team will source it for you.
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Item URL"
                      placeholder="https://www.example.com/product/item"
                      value={directLinkUrl}
                      onChange={(e) => setDirectLinkUrl(e.target.value)}
                      required
                      InputProps={{
                        startAdornment: <LinkIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Item Name"
                      placeholder="e.g. Wool Cashmere Sweater"
                      value={directLinkName}
                      onChange={(e) => setDirectLinkName(e.target.value)}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Brand/Store"
                      placeholder="e.g. Gucci, Saks Fifth Avenue"
                      value={directLinkBrand}
                      onChange={(e) => setDirectLinkBrand(e.target.value)}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Price (if known)"
                      placeholder="e.g. 299.99"
                      value={directLinkPrice}
                      onChange={(e) => setDirectLinkPrice(e.target.value)}
                      type="number"
                      InputProps={{
                        startAdornment: <Box component="span" sx={{ mr: 1 }}>$</Box>
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Notes (size, color, etc.)"
                      placeholder="e.g. Size M, Color: Navy, Specific style details"
                      value={directLinkNotes}
                      onChange={(e) => setDirectLinkNotes(e.target.value)}
                      multiline
                      rows={3}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Button 
                      fullWidth 
                      variant="contained" 
                      color="primary"
                      size="large"
                      onClick={handleAddItemFromLink}
                      startIcon={<AddLinkIcon />}
                      sx={{ 
                        mt: 2,
                        py: 1.5,
                        borderRadius: 2
                      }}
                    >
                      Add to Try-On List
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </div>
          )}
          
          <div className="cart-modal__info">
            <h3 className="cart-modal__info-title">Your Information</h3>
            <div className="cart-modal__form">
              <div className="cart-modal__form-field">
                <label className="cart-modal__form-label" htmlFor="name">Name</label>
                <input
                  id="name"
                  className="cart-modal__form-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="cart-modal__form-field">
                <label className="cart-modal__form-label" htmlFor="email">Email</label>
                <input
                  id="email"
                  className="cart-modal__form-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="cart-modal__form-field">
                <label className="cart-modal__form-label" htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  className="cart-modal__form-input"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="cart-modal__form-field">
                <label className="cart-modal__form-label" htmlFor="address">Delivery Address</label>
                <input
                  id="address"
                  className="cart-modal__form-input"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="cart-modal__form-field cart-modal__form-field--full">
                <label className="cart-modal__form-label" htmlFor="notes">Additional Notes</label>
                <textarea
                  id="notes"
                  className="cart-modal__form-textarea"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe your style preferences, sizes, or specific requests"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="cart-modal__footer">
          {cartItems.length > 0 && (
            <div className="cart-modal__summary">
              <span className="cart-modal__total-label">Total</span>
              <span className="cart-modal__total-value">${total.toFixed(2)}</span>
            </div>
          )}
          <div className="cart-modal__actions">
            {cartItems.length > 0 && (
              <button 
                className="cart-modal__clear"
                onClick={onClearCart}
              >
                Clear All
              </button>
            )}
            <button 
              className="cart-modal__checkout whatsapp-express"
              onClick={handleWhatsAppCheckout}
              disabled={isCheckoutDisabled}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.3547 4.5973C17.3204 2.5629 14.5457 1.4286 11.6139 1.4286C5.55437 1.4286 0.627792 6.35515 0.627792 12.4147C0.627792 14.3519 1.1332 16.2459 2.07684 17.9106L0.540649 23.5714L6.34158 22.0714C7.93684 22.9291 9.75148 23.3939 11.6048 23.3939H11.6139C17.6643 23.3939 22.5909 18.4674 22.5909 12.4079C22.5909 9.47608 21.389 6.63172 19.3547 4.5973ZM11.6139 21.5174C9.96879 21.5174 8.36263 21.0708 6.96514 20.2313L6.62513 20.0286L3.18873 20.8954L4.07244 17.5557L3.84873 17.1993C2.92513 15.7416 2.43244 14.102 2.43244 12.4147C2.43244 7.39172 6.59078 3.23337 11.6229 3.23337C14.0411 3.23337 16.3239 4.17701 18.0138 5.87608C19.7038 7.57515 20.7956 9.85798 20.7865 12.4079C20.7865 17.44 16.6371 21.5174 11.6139 21.5174ZM16.6189 14.8714C16.3419 14.7339 15.0128 14.0812 14.7539 13.9889C14.4951 13.8966 14.3072 13.8504 14.1194 14.1364C13.9315 14.4225 13.415 15.0209 13.2454 15.2088C13.0757 15.3966 12.9061 15.4159 12.6291 15.2784C11.0429 14.4851 9.99339 13.8596 8.9348 12.0737C8.65599 11.5809 9.22696 11.6193 9.7548 10.5663C9.84709 10.3784 9.80098 10.2139 9.7277 10.0764C9.65441 9.93886 9.10348 8.60977 8.86878 8.04699C8.64307 7.50244 8.40837 7.57572 8.22962 7.57572C8.06168 7.57572 7.87383 7.55665 7.68599 7.55665C7.49814 7.55665 7.19335 7.62994 6.93452 7.90696C6.67568 8.18398 5.97794 8.83665 5.97794 10.1657C5.97794 11.4948 6.96514 12.7777 7.10896 12.9656C7.2528 13.1534 9.08496 16.0392 11.952 17.2147C13.6958 17.9557 14.3666 17.9919 15.2231 17.8636C15.7379 17.7804 16.8023 17.2057 17.037 16.5511C17.2718 15.8966 17.2718 15.3429 17.1985 15.2178C17.134 15.0827 16.9462 15.009 16.6189 14.8714Z" fill="currentColor"/>
              </svg>
              {isCheckoutDisabled 
                ? "Add Items & Complete Form" 
                : "EXPRESS: Schedule via WhatsApp"}
              
              <div className="whatsapp-badge">fastest</div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleNotificationClose}
          severity={notification.severity}
          elevation={6}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CartModal;