import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
  Grid,
  FormHelperText
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ImageUploader from './ImageUploader';

/**
 * AirtableOrderForm component that integrates with Airtable for order creation
 * This form will collect user information and product details
 * and submit the data to Airtable, then connect to WhatsApp
 */
const AirtableOrderForm = ({ 
  selectedStore = null, 
  onSubmitSuccess = () => {},
  onCancel = () => {}
}) => {
  // Form steps
  const steps = ['Customer Info', 'Order Details', 'Confirm & Submit'];
  
  // State for form and steps
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  
  // Customer information
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  
  // Order information
  const [orderType, setOrderType] = useState('express');
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productSize, setProductSize] = useState('');
  const [productColor, setProductColor] = useState('');
  const [budget, setBudget] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  // Errors tracking for validation
  const [errors, setErrors] = useState({});
  
  // Load saved customer info from localStorage if available
  useEffect(() => {
    try {
      const savedFirstName = localStorage.getItem('tuhme_user_firstName') || '';
      const savedLastName = localStorage.getItem('tuhme_user_lastName') || '';
      const savedEmail = localStorage.getItem('tuhme_user_email') || '';
      const savedPhone = localStorage.getItem('tuhme_user_phone') || '';
      const savedAddress = localStorage.getItem('tuhme_user_address') || '';
      const savedCity = localStorage.getItem('tuhme_user_city') || '';
      const savedZipCode = localStorage.getItem('tuhme_user_zipCode') || '';
      
      setFirstName(savedFirstName);
      setLastName(savedLastName);
      setEmail(savedEmail);
      setPhone(savedPhone);
      setAddress(savedAddress);
      setCity(savedCity);
      setZipCode(savedZipCode);
    } catch (error) {
      console.error('Error loading saved user data:', error);
    }
  }, []);
  
  // Save customer info to localStorage when it changes
  useEffect(() => {
    try {
      if (firstName) localStorage.setItem('tuhme_user_firstName', firstName);
      if (lastName) localStorage.setItem('tuhme_user_lastName', lastName);
      if (email) localStorage.setItem('tuhme_user_email', email);
      if (phone) localStorage.setItem('tuhme_user_phone', phone);
      if (address) localStorage.setItem('tuhme_user_address', address);
      if (city) localStorage.setItem('tuhme_user_city', city);
      if (zipCode) localStorage.setItem('tuhme_user_zipCode', zipCode);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  }, [firstName, lastName, email, phone, address, city, zipCode]);
  
  // Handle images change
  const handleImagesChange = (images) => {
    setUploadedImages(images);
  };
  
  // Validate current step
  const validateStep = () => {
    const newErrors = {};
    
    if (activeStep === 0) {
      // Validate customer info
      if (!firstName) newErrors.firstName = 'First name is required';
      if (!lastName) newErrors.lastName = 'Last name is required';
      if (!email) newErrors.email = 'Email is required';
      if (email && !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
      if (!phone) newErrors.phone = 'Phone number is required';
      if (!address) newErrors.address = 'Address is required';
      if (!city) newErrors.city = 'City is required';
      if (!zipCode) newErrors.zipCode = 'ZIP code is required';
    } else if (activeStep === 1) {
      // Validate order info
      if (!productCategory) newErrors.productCategory = 'Category is required';
      if (!productDescription) newErrors.productDescription = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle next step
  const handleNext = () => {
    if (validateStep()) {
      if (activeStep === steps.length - 1) {
        handleSubmit();
      } else {
        setActiveStep(activeStep + 1);
      }
    }
  };
  
  // Handle going back
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  
  // Handle form submission to Airtable
  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    
    try {
      // In a real implementation, we would post to Airtable's API
      // For now, we'll simulate the API call with a delay
      
      // Prepare the data to submit to Airtable
      const formData = {
        customerInfo: {
          firstName,
          lastName,
          email,
          phone,
          address,
          city,
          zipCode
        },
        orderInfo: {
          store: selectedStore?.storeName || 'Not specified',
          type: orderType,
          category: productCategory,
          description: productDescription,
          size: productSize,
          color: productColor,
          budget,
          specialInstructions,
          images: uploadedImages.length 
        },
        metadata: {
          submittedAt: new Date().toISOString(),
          source: 'TUHME Web App'
        }
      };
      
      console.log('Submitting form data to Airtable:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // If successful, initiate WhatsApp communication
      setSuccess(true);
      setLoading(false);
      
      // Format WhatsApp message
      const message = `
*TUHME Order Request*

*Customer:* ${firstName} ${lastName}
*Phone:* ${phone}
*Email:* ${email}
*Address:* ${address}, ${city} ${zipCode}

*Order Details:*
Store: ${selectedStore?.storeName || 'Not specified'}
Type: ${orderType === 'express' ? 'Express Service' : 'Standard Service'}
Category: ${productCategory}
Description: ${productDescription}
${productSize ? `Size: ${productSize}` : ''}
${productColor ? `Color: ${productColor}` : ''}
${budget ? `Budget: $${budget}` : ''}

${specialInstructions ? `*Special Instructions:*\n${specialInstructions}` : ''}

${uploadedImages.length > 0 ? `*${uploadedImages.length} image(s) will be shared separately*` : ''}

*This order was submitted via TUHME Web App*
      `;
      
      // Prepare WhatsApp URL
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://api.whatsapp.com/send/?phone=16465889916&text=${encodedMessage}&type=phone_number&app_absent=0`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Notify parent component of success
      onSubmitSuccess();
      
    } catch (error) {
      console.error('Error submitting to Airtable:', error);
      setError('Failed to submit your order. Please try again.');
      setLoading(false);
    }
  };
  
  // Get content based on current step
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Customer Information
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  fullWidth
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  required
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  fullWidth
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  required
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  fullWidth
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone"
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  required
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label="Delivery Address"
                  fullWidth
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  error={!!errors.address}
                  helperText={errors.address}
                  required
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  fullWidth
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  error={!!errors.city}
                  helperText={errors.city}
                  required
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="ZIP Code"
                  fullWidth
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  error={!!errors.zipCode}
                  helperText={errors.zipCode}
                  required
                  margin="normal"
                />
              </Grid>
            </Grid>
          </Box>
        );
        
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Order Details
            </Typography>
            
            {selectedStore && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Selected Store
                </Typography>
                <Chip 
                  label={selectedStore.storeName} 
                  color="primary" 
                  variant="outlined" 
                  sx={{ mt: 1 }}
                />
              </Box>
            )}
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel id="order-type-label">Service Type</InputLabel>
                  <Select
                    labelId="order-type-label"
                    value={orderType}
                    onChange={(e) => setOrderType(e.target.value)}
                    label="Service Type"
                  >
                    <MenuItem value="express">Express Service (Same Day)</MenuItem>
                    <MenuItem value="standard">Standard Service (1-2 days)</MenuItem>
                  </Select>
                  <FormHelperText>Express service has priority handling</FormHelperText>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <FormControl 
                  fullWidth 
                  margin="normal" 
                  required
                  error={!!errors.productCategory}
                >
                  <InputLabel id="product-category-label">Product Category</InputLabel>
                  <Select
                    labelId="product-category-label"
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    label="Product Category"
                  >
                    <MenuItem value="clothing">Clothing</MenuItem>
                    <MenuItem value="shoes">Shoes</MenuItem>
                    <MenuItem value="accessories">Accessories</MenuItem>
                    <MenuItem value="jewelry">Jewelry</MenuItem>
                    <MenuItem value="bags">Bags & Purses</MenuItem>
                    <MenuItem value="beauty">Beauty & Fragrance</MenuItem>
                    <MenuItem value="home">Home Goods</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  {errors.productCategory && (
                    <FormHelperText error>{errors.productCategory}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label="Product Description"
                  fullWidth
                  multiline
                  rows={3}
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  error={!!errors.productDescription}
                  helperText={errors.productDescription || "Describe the item(s) you'd like us to find for you"}
                  required
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Size (if applicable)"
                  fullWidth
                  value={productSize}
                  onChange={(e) => setProductSize(e.target.value)}
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Color Preference"
                  fullWidth
                  value={productColor}
                  onChange={(e) => setProductColor(e.target.value)}
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label="Budget Range (USD)"
                  fullWidth
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. $100-200"
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle1" gutterBottom>
                  Upload Images (Optional)
                </Typography>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  Share photos of items you're looking for to help us find exactly what you want.
                </Typography>
                
                <ImageUploader 
                  onImagesChange={handleImagesChange} 
                  initialImages={uploadedImages}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label="Special Instructions"
                  fullWidth
                  multiline
                  rows={3}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  margin="normal"
                  placeholder="Any additional details or preferences?"
                />
              </Grid>
            </Grid>
          </Box>
        );
        
      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Review Your Order
            </Typography>
            
            <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Customer Information
                  </Typography>
                  
                  <Typography variant="body2">
                    <strong>Name:</strong> {firstName} {lastName}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Email:</strong> {email}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Phone:</strong> {phone}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Address:</strong> {address}, {city} {zipCode}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Order Information
                  </Typography>
                  
                  <Typography variant="body2">
                    <strong>Store:</strong> {selectedStore?.storeName || 'Not specified'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Service Type:</strong> {orderType === 'express' ? 'Express Service' : 'Standard Service'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Category:</strong> {productCategory}
                  </Typography>
                  {productSize && (
                    <Typography variant="body2">
                      <strong>Size:</strong> {productSize}
                    </Typography>
                  )}
                  {productColor && (
                    <Typography variant="body2">
                      <strong>Color:</strong> {productColor}
                    </Typography>
                  )}
                  {budget && (
                    <Typography variant="body2">
                      <strong>Budget:</strong> ${budget}
                    </Typography>
                  )}
                </Grid>
                
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Product Description
                  </Typography>
                  
                  <Typography variant="body2">
                    {productDescription}
                  </Typography>
                  
                  {specialInstructions && (
                    <>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
                        Special Instructions
                      </Typography>
                      <Typography variant="body2">
                        {specialInstructions}
                      </Typography>
                    </>
                  )}
                  
                  {uploadedImages.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Uploaded Images
                      </Typography>
                      <Chip 
                        label={`${uploadedImages.length} image(s) attached`} 
                        color="primary" 
                        size="small"
                      />
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Paper>
            
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                After submitting this form, your order details will be sent to Airtable and you'll be connected with a TUHME shopper on WhatsApp.
              </Typography>
            </Alert>
            
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            
            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Your order has been submitted successfully! You're being connected with a TUHME shopper on WhatsApp.
              </Alert>
            )}
          </Box>
        );
        
      default:
        return 'Unknown step';
    }
  };
  
  return (
    <Box sx={{ width: '100%', p: { xs: 2, md: 3 } }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {getStepContent(activeStep)}
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          color="inherit"
          onClick={activeStep === 0 ? onCancel : handleBack}
          sx={{ mr: 1 }}
        >
          {activeStep === 0 ? 'Cancel' : 'Back'}
        </Button>
        
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={loading}
          startIcon={
            activeStep === steps.length - 1 && !success ? (
              loading ? <CircularProgress size={24} /> : <WhatsAppIcon />
            ) : null
          }
          sx={
            activeStep === steps.length - 1 
              ? { 
                  backgroundColor: '#25D366',
                  '&:hover': { backgroundColor: '#128C7E' }
                } 
              : {}
          }
        >
          {activeStep === steps.length - 1 
            ? (success ? 'Done' : 'Submit & Connect to WhatsApp') 
            : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};

export default AirtableOrderForm;