import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  CircularProgress,
  Button,
  Tooltip,
  IconButton
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  MyLocation as MyLocationIcon,
  Storefront as StorefrontIcon,
  Close as CloseIcon
} from '@mui/icons-material';

// Note: We're importing Leaflet CSS in our index.css file
// We don't import leaflet directly here to avoid SSR issues

const FreeMap = ({ onStoreSelect, initialSelectedShops = [], stores = [] }) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedShops, setSelectedShops] = useState(initialSelectedShops);
  const [nearbyStores, setNearbyStores] = useState([]);
  const [error, setError] = useState('');
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  // Manhattan coordinates as fallback
  const defaultLocation = { lat: 40.7831, lng: -73.9712 };

  // Initialize map when component mounts
  useEffect(() => {
    // Use Leaflet from global scope (already loaded from CDN)
    let L = window.L;
    
    if (!L) {
      console.error('Leaflet not loaded');
      setError('Map library not loaded. Please refresh the page.');
      setLoading(false);
      return;
    }
    
    const initializeMap = () => {
      try {
        // Only initialize if the container exists and map isn't already initialized
        if (mapContainerRef.current && !map) {
          // Create map centered on default location or user location if available
          const mapInstance = L.map(mapContainerRef.current).setView(
            userLocation ? [userLocation.lat, userLocation.lng] : [defaultLocation.lat, defaultLocation.lng],
            13
          );

          // Add OpenStreetMap tiles (free to use with attribution)
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
          }).addTo(mapInstance);

          setMap(mapInstance);
          setLoading(false);

          // Find stores near the initial location
          if (userLocation) {
            findNearbyStores(userLocation.lat, userLocation.lng, mapInstance, L);
          } else {
            findNearbyStores(defaultLocation.lat, defaultLocation.lng, mapInstance, L);
          }
        }
      } catch (error) {
        console.error('Error initializing map:', error);
        setError('Failed to load map. Please refresh the page.');
        setLoading(false);
      }
    };

    // Wait a bit to ensure the DOM is ready
    setTimeout(initializeMap, 100);

    // Cleanup function
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [userLocation]); // Re-initialize when user location changes
  
  // Listen for custom events to get user location
  useEffect(() => {
    const handleGetUserLocationEvent = () => {
      getUserLocation();
    };
    
    window.addEventListener('getUserLocation', handleGetUserLocationEvent);
    
    return () => {
      window.removeEventListener('getUserLocation', handleGetUserLocationEvent);
    };
  }, []);

  // Function to get user's current location
  const getUserLocation = () => {
    setLoading(true);
    
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        setLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setError('Unable to retrieve your location. Using default location instead.');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  // Function to find nearby stores
  const findNearbyStores = (lat, lng, mapInstance, L) => {
    // Clear existing markers
    if (markers.length > 0) {
      markers.forEach(marker => marker.remove());
      setMarkers([]);
    }

    // Use the stores prop if available, otherwise fall back to empty array
    const storesList = stores.length > 0 ? stores : [];

    // Filter stores based on distance from the user's location
    // In a real app, this would be done server-side
    const nearbyStoresList = storesList.filter(store => {
      // Calculate approximate distance using Haversine formula
      const R = 6371; // Earth's radius in km
      const dLat = (store.location.lat - lat) * Math.PI / 180;
      const dLng = (store.location.lng - lng) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat * Math.PI / 180) * Math.cos(store.location.lat * Math.PI / 180) * 
        Math.sin(dLng/2) * Math.sin(dLng/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c; // Distance in km
      
      // Return stores within 5km (this is a simplified approach)
      return distance < 5;
    });

    setNearbyStores(nearbyStoresList);
    
    // Create custom icon
    const storeIcon = L.divIcon({
      html: `<div style="background-color: #000000; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
               <span style="font-size: 16px;">📍</span>
             </div>`,
      className: 'custom-div-icon',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });

    // Add user's location marker if available
    if (userLocation) {
      const userIcon = L.divIcon({
        html: `<div style="background-color: #4285F4; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                 <span style="font-size: 16px;">👤</span>
               </div>`,
        className: 'custom-div-icon',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
      });

      const userMarker = L.marker(
        [userLocation.lat, userLocation.lng],
        { icon: userIcon }
      ).addTo(mapInstance);

      userMarker.bindPopup(`
        <div style="text-align: center;">
          <b>Your location</b>
        </div>
      `);

      markers.push(userMarker);
    }

    // Add markers for stores
    const newMarkers = nearbyStoresList.map(store => {
      const marker = L.marker(
        [store.location.lat, store.location.lng],
        { icon: storeIcon }
      ).addTo(mapInstance);

      // Create popup content
      const popupContent = `
        <div class="store-popup">
          <div style="font-weight: bold; font-size: 16px; margin-bottom: 5px;">${store.name}</div>
          <div style="color: #666; margin-bottom: 8px;">${store.category}</div>
          ${store.image ? `<img src="${store.image}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 4px; margin-bottom: 8px;">` : ''}
          <div style="margin-bottom: 8px;">${store.address}</div>
          <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <span style="margin-right: 5px;">⭐</span>
            <span>${store.rating ? store.rating : '4.5'}</span>
          </div>
          <div style="text-align: center;">
            <button id="view-store-${store.id}" style="background-color: #000; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; width: 100%;">Shop at ${store.name}</button>
          </div>
        </div>
      `;

      const popup = L.popup({
        closeButton: true,
        className: 'store-popup'
      }).setContent(popupContent);

      marker.bindPopup(popup);

      // Add click listener
      marker.on('click', () => {
        // Pass the complete store object to the parent component
        if (onStoreSelect) {
          onStoreSelect(store);
        }
      });

      // Add event listener to the View Store button after popup opens
      marker.on('popupopen', () => {
        const viewStoreButton = document.getElementById(`view-store-${store.id}`);
        if (viewStoreButton) {
          viewStoreButton.addEventListener('click', () => {
            // Fire a custom event that the parent component can listen for
            const openStoreEvent = new CustomEvent('openStoreWebsite', {
              detail: {
                storeName: store.name,
                storeUrl: store.website || store.url,
                storeType: store.category,
                regionId: store.location.lat > 40.7 && store.location.lat < 40.9 && 
                          store.location.lng > -74.0 && store.location.lng < -73.9 
                          ? 'manhattan' : 'other'
              }
            });
            window.dispatchEvent(openStoreEvent);
            
            // Close the popup
            marker.closePopup();
          });
        }
      });

      return marker;
    });

    setMarkers([...markers, ...newMarkers]);

    // Fit the map to include all markers
    if (newMarkers.length > 0) {
      const group = new L.featureGroup(newMarkers);
      mapInstance.fitBounds(group.getBounds().pad(0.2)); // Add some padding
    }
  };

  // Handle removal of a shop from selection
  const handleRemoveShop = (shopToRemove) => {
    const updatedShops = selectedShops.filter(shop => shop !== shopToRemove);
    setSelectedShops(updatedShops);
    if (onStoreSelect) {
      onStoreSelect(updatedShops);
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Map container with loading indicator */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 500,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Box
          ref={mapContainerRef}
          sx={{
            width: '100%',
            height: '100%',
            opacity: loading ? 0.7 : 1,
            transition: 'opacity 0.3s'
          }}
        />

        {loading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.5)',
              zIndex: 2
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255,255,255,0.9)',
              padding: 2,
              borderRadius: 1,
              zIndex: 2
            }}
          >
            <Typography color="error">{error}</Typography>
            <Button 
              variant="contained" 
              sx={{ mt: 1 }}
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
          </Box>
        )}

        {/* Location button */}
        <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}>
          <Tooltip title="Use your current location">
            <IconButton
              onClick={getUserLocation}
              sx={{
                bgcolor: 'white',
                '&:hover': { bgcolor: '#f5f5f5' },
                boxShadow: 2
              }}
            >
              <MyLocationIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Store count */}
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            zIndex: 1000,
            bgcolor: 'white',
            borderRadius: 2,
            p: 1,
            boxShadow: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <StorefrontIcon sx={{ mr: 1, fontSize: 18 }} />
          <Typography variant="body2" fontWeight="medium">
            {nearbyStores.length} luxury stores nearby
          </Typography>
        </Box>
      </Box>

      {/* Selected shops display */}
      {selectedShops.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            left: 16,
            p: 2,
            zIndex: 1000,
            maxWidth: { xs: 'calc(100% - 32px)', md: '400px' },
            maxHeight: '40%',
            overflow: 'auto',
            borderRadius: 2,
            margin: { xs: '0 auto', md: '0 0 0 auto' }
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1,
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <LocationIcon sx={{ mr: 1, fontSize: 18 }} />
            Selected Stores
          </Typography>

          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1
          }}>
            {selectedShops.map(shop => (
              <Chip
                key={shop}
                label={shop}
                size="small"
                onDelete={() => handleRemoveShop(shop)}
              />
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default FreeMap;