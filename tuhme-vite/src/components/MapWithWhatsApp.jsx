import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import ManhattanMap from './ManhattanMap';
import StoreToWhatsAppModal from './StoreToWhatsAppModal';
import AirtableOrderModal from './AirtableOrderModal';

/**
 * MapWithWhatsApp Component
 * 
 * A wrapper for the ManhattanMap component that adds integration with WhatsApp
 * when stores are selected from the map.
 */
const MapWithWhatsApp = (props) => {
  // State
  const [selectedShops, setSelectedShops] = useState([]);
  const [storeModalOpen, setStoreModalOpen] = useState(false);
  const [airtableModalOpen, setAirtableModalOpen] = useState(false);
  const [currentStoreInfo, setCurrentStoreInfo] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  
  // Handle store selection from map
  const handleShopSelect = (shops) => {
    setSelectedShops(shops);
    
    // If there's a new shop selection
    if (shops.length > selectedShops.length) {
      // Find the newly added shop
      const newShop = shops.find(shop => !selectedShops.includes(shop));
      if (newShop) {
        openStoreModal(newShop);
      }
    }
  };
  
  // Listen for openStoreWebsite custom event from ManhattanMap
  useEffect(() => {
    const handleStoreWebsite = (event) => {
      const { storeName, storeUrl, storeType } = event.detail;
      
      // Open the WhatsApp modal with store info
      openStoreModal(storeName, storeUrl, storeType);
    };
    
    window.addEventListener('openStoreWebsite', handleStoreWebsite);
    
    return () => {
      window.removeEventListener('openStoreWebsite', handleStoreWebsite);
    };
  }, []);
  
  // Open store modal with provided info
  const openStoreModal = (storeName, storeUrl, storeType) => {
    setCurrentStoreInfo({
      storeName: typeof storeName === 'string' ? storeName : storeName || 'Selected Store',
      storeUrl: storeUrl || '',
      storeType: storeType || 'Shopping',
      regionId: 'manhattan' // Add default regionId to prevent undefined errors
    });
    setStoreModalOpen(true);
  };
  
  // Handle WhatsApp modal close
  const handleWhatsAppModalClose = () => {
    setStoreModalOpen(false);
  };
  
  // Handle Airtable modal open and close
  const handleAirtableModalOpen = () => {
    setAirtableModalOpen(true);
    // If WhatsApp modal is open, close it
    if (storeModalOpen) {
      setStoreModalOpen(false);
    }
  };
  
  const handleAirtableModalClose = () => {
    setAirtableModalOpen(false);
  };
  
  // Handle image uploads
  const handleImagesChange = (images) => {
    setUploadedImages(images);
  };
  
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Main Map Component */}
      <ManhattanMap 
        onShopSelect={handleShopSelect}
        initialSelectedShops={selectedShops}
        {...props}
      />
      
      {/* Store to WhatsApp Modal */}
      <StoreToWhatsAppModal
        open={storeModalOpen}
        onClose={handleWhatsAppModalClose}
        storeInfo={currentStoreInfo}
        uploadedImages={uploadedImages}
        onImagesChange={handleImagesChange}
        onAirtableOrder={handleAirtableModalOpen}
      />
      
      {/* Airtable Order Modal */}
      <AirtableOrderModal
        open={airtableModalOpen}
        onClose={handleAirtableModalClose}
        storeInfo={currentStoreInfo}
      />
      
      {/* Enhanced Top Banner */}
      <Paper
        elevation={3}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          py: 1,
          px: 2,
          zIndex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          color: 'white',
          borderBottom: '2px solid rgba(255,255,255,0.1)'
        }}
      >
        <Typography 
          variant="body2" 
          sx={{ 
            fontSize: { xs: '0.8rem', md: '0.9rem' },
            fontWeight: 500,
            letterSpacing: '0.5px',
            textAlign: 'center',
            animation: 'fadeIn 1.5s ease-in-out',
            '@keyframes fadeIn': {
              '0%': { opacity: 0 },
              '100%': { opacity: 1 }
            }
          }}
        >
          Find a luxury store & let TUHME bring items to you for try-on
        </Typography>
      </Paper>
    </Box>
  );
};

export default MapWithWhatsApp;