import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Button,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Manhattan neighborhoods with coordinates and shopping areas
const manhattanNeighborhoods = [
  {
    id: 'soho',
    name: 'SoHo',
    center: { lat: 40.7243, lng: -74.0018 },
    description: 'Trendy shopping district with designer boutiques and flagship stores',
    shops: [
      {
        name: 'Aritzia',
        position: { lat: 40.7232, lng: -73.9988 },
        type: 'clothing',
        items: [
          { name: 'Wilfred Free Cardigan', price: '$128' },
          { name: 'TNA Cozy Fleece Sweatpants', price: '$70' },
          { name: 'Babaton Contour Bodysuit', price: '$58' }
        ]
      },
      {
        name: 'Glossier',
        position: { lat: 40.7241, lng: -73.9973 },
        type: 'beauty',
        items: [
          { name: 'Cloud Paint Blush', price: '$20' },
          { name: 'Boy Brow Grooming Pomade', price: '$16' },
          { name: 'Balm Dotcom Universal Skin Salve', price: '$12' }
        ]
      },
      {
        name: 'Reformation',
        position: { lat: 40.7219, lng: -74.0001 },
        type: 'clothing',
        items: [
          { name: 'Cynthia High Rise Straight Jeans', price: '$148' },
          { name: 'Kourtney Dress', price: '$248' },
          { name: 'Classic Sweatshirt', price: '$68' }
        ]
      },
      {
        name: 'Rag & Bone',
        position: { lat: 40.7228, lng: -73.9994 },
        type: 'clothing',
        items: [
          { name: 'Fit 2 Slim-Fit Jeans', price: '$195' },
          { name: 'Standard Issue Henley', price: '$95' },
          { name: 'Classic Leather Belt', price: '$150' }
        ]
      },
      {
        name: 'Celine',
        position: { lat: 40.7254, lng: -74.0037 },
        type: 'luxury',
        items: [
          { name: 'Small Triomphe Bag', price: '$2,700' },
          { name: 'Triomphe Sunglasses', price: '$460' },
          { name: 'Triomphe Belt in Calfskin', price: '$570' }
        ]
      }
    ]
  },
  {
    id: 'upperEastSide',
    name: 'Upper East Side',
    center: { lat: 40.7735, lng: -73.9565 },
    description: 'Upscale shopping area with high-end department stores and boutiques',
    shops: [
      { name: 'Bloomingdale\'s', position: { lat: 40.7623, lng: -73.9669 }, type: 'department' },
      { name: 'Ralph Lauren', position: { lat: 40.7718, lng: -73.9650 }, type: 'luxury' },
      { name: 'Intermix', position: { lat: 40.7751, lng: -73.9573 }, type: 'clothing' },
      { name: 'Theory', position: { lat: 40.7691, lng: -73.9626 }, type: 'clothing' },
      { name: 'Stuart Weitzman', position: { lat: 40.7728, lng: -73.9608 }, type: 'accessories' }
    ]
  },
  {
    id: 'chelsea',
    name: 'Chelsea',
    center: { lat: 40.7465, lng: -74.0014 },
    description: 'Artistic neighborhood with eclectic shops and boutiques',
    shops: [
      { name: 'Anthropologie', position: { lat: 40.7422, lng: -74.0045 }, type: 'clothing' },
      { name: 'Story', position: { lat: 40.7457, lng: -74.0019 }, type: 'concept' },
      { name: 'Barneys New York', position: { lat: 40.7414, lng: -74.0044 }, type: 'department' },
      { name: 'Comme des Garçons', position: { lat: 40.7468, lng: -74.0030 }, type: 'luxury' },
      { name: 'Warby Parker', position: { lat: 40.7433, lng: -74.0025 }, type: 'accessories' }
    ]
  },
  {
    id: 'fifthAvenue',
    name: 'Fifth Avenue',
    center: { lat: 40.7580, lng: -73.9780 },
    description: 'World-famous shopping destination with luxury flagship stores',
    shops: [
      { name: 'Saks Fifth Avenue', position: { lat: 40.7587, lng: -73.9776 }, type: 'department' },
      { name: 'Bergdorf Goodman', position: { lat: 40.7633, lng: -73.9740 }, type: 'luxury' },
      { name: 'Tiffany & Co.', position: { lat: 40.7625, lng: -73.9739 }, type: 'jewelry' },
      { name: 'Zara', position: { lat: 40.7539, lng: -73.9800 }, type: 'clothing' },
      { name: 'Gucci', position: { lat: 40.7635, lng: -73.9729 }, type: 'luxury' }
    ]
  },
  {
    id: 'tribeca',
    name: 'Tribeca',
    center: { lat: 40.7163, lng: -74.0086 },
    description: 'Trendy neighborhood with designer boutiques and upscale shops',
    shops: [
      { name: 'Nili Lotan', position: { lat: 40.7169, lng: -74.0063 }, type: 'clothing' },
      { name: 'J.Crew', position: { lat: 40.7152, lng: -74.0095 }, type: 'clothing' },
      { name: 'Steven Alan', position: { lat: 40.7182, lng: -74.0103 }, type: 'clothing' },
      { name: 'The Westside', position: { lat: 40.7179, lng: -74.0082 }, type: 'clothing' },
      { name: 'Shinola', position: { lat: 40.7193, lng: -74.0085 }, type: 'accessories' }
    ]
  },
  {
    id: 'meatpacking',
    name: 'Meatpacking District',
    center: { lat: 40.7395, lng: -74.0076 },
    description: 'Fashion-forward district with designer boutiques and concept stores',
    shops: [
      { name: 'Jeffrey', position: { lat: 40.7407, lng: -74.0078 }, type: 'luxury' },
      { name: 'Alexander McQueen', position: { lat: 40.7403, lng: -74.0086 }, type: 'luxury' },
      { name: 'Diane von Furstenberg', position: { lat: 40.7414, lng: -74.0079 }, type: 'clothing' },
      { name: 'Levi\'s', position: { lat: 40.7392, lng: -74.0058 }, type: 'clothing' },
      { name: 'Kith', position: { lat: 40.7399, lng: -74.0056 }, type: 'clothing' }
    ]
  }
];

// Shop types with colors
const shopTypes = [
  { id: 'clothing', name: 'Clothing', color: '#4285F4' },
  { id: 'luxury', name: 'Luxury', color: '#EA4335' },
  { id: 'department', name: 'Department', color: '#FBBC05' },
  { id: 'accessories', name: 'Accessories', color: '#34A853' },
  { id: 'beauty', name: 'Beauty', color: '#FF6D91' },
  { id: 'concept', name: 'Concept', color: '#AF7AC5' },
  { id: 'jewelry', name: 'Jewelry', color: '#FFD700' }
];

const ManhattanMap = ({ onShopSelect, initialSelectedShops = [] }) => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  const [selectedShops, setSelectedShops] = useState(initialSelectedShops);
  const [activeFilters, setActiveFilters] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Manhattan boundaries
  const manhattanBounds = {
    north: 40.8820,  // Upper Manhattan
    south: 40.6980,  // Lower Manhattan
    west: -74.0200,  // Hudson River
    east: -73.9150   // East River
  };

  // Handle Google Maps API loading with a singleton pattern
  useEffect(() => {
    // If Maps is already fully loaded, we're good to go
    if (window.google && window.google.maps) {
      setMapLoaded(true);
      return;
    }

    // Create or use a global loading promise to prevent multiple loads
    if (!window.googleMapsLoadPromise) {
      // Define a global callback for the API
      const callbackName = 'initGoogleMaps';

      window.googleMapsLoadPromise = new Promise(resolve => {
        // Set the callback function that the Google Maps API will call
        window[callbackName] = () => {
          resolve(window.google);
        };

        // Create the script only if it doesn't exist
        if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
          const script = document.createElement('script');
          // API key should come from environment variables in production
          script.src = `https://maps.googleapis.com/maps/api/js?key=${
            import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
          }&callback=${callbackName}`;
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);
        } else if (window.google && window.google.maps) {
          // If script exists and maps is already loaded, resolve immediately
          resolve(window.google);
        }
      });
    }

    // Use the promise to set the loaded state
    window.googleMapsLoadPromise
      .then(() => {
        setMapLoaded(true);
      })
      .catch(error => {
        console.error('Error loading Google Maps API:', error);
      });
  }, []);

  // Initialize map when loaded
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;
    setLoading(true);

    try {
      // Create map centered on Manhattan
      const mapOptions = {
        center: { lat: 40.7831, lng: -73.9712 }, // Manhattan center
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_TOP
        },
        restriction: {
          latLngBounds: manhattanBounds,
          strictBounds: false
        },
        styles: [
          // Apply grayscale to all elements
          {
            stylers: [
              { saturation: -100 },  // Full grayscale
              { lightness: 40 }      // Adjust contrast for better visibility
            ]
          },
          // Keep POI labels visible for shopping areas
          {
            featureType: "poi.business",
            elementType: "labels",
            stylers: [{ visibility: "simplified" }]
          },
          // Highlight shopping areas
          {
            featureType: "poi.business",
            elementType: "geometry",
            stylers: [
              { lightness: 10 },
              { visibility: "on" }
            ]
          },
          // Main roads should be visible but subdued
          {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [
              { color: "#575757" },
              { visibility: "on" }
            ]
          },
          // Water in light gray
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              { color: "#e9e9e9" },
              { visibility: "on" }
            ]
          },
          // Parks in light green-gray
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [
              { color: "#d1d1d1" },
              { visibility: "on" }
            ]
          },
          // Keep some neighborhood labels
          {
            featureType: "administrative.neighborhood",
            elementType: "labels.text",
            stylers: [
              { visibility: "simplified" },
              { color: "#7a7a7a" }
            ]
          }
        ]
      };

      const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
      setMap(newMap);

      // Add Manhattan neighborhood polygons
      addNeighborhoodPolygons(newMap);

      // If Places API is available, perform a search for shopping-related POIs
      if (window.google.maps.places) {
        const service = new window.google.maps.places.PlacesService(newMap);

        // Search for shopping-related establishments
        service.nearbySearch({
          location: newMap.getCenter(),
          radius: 1500,  // Search within 1.5km
          type: ['shopping_mall', 'department_store', 'clothing_store', 'jewelry_store', 'shoe_store']
        }, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            // Add custom markers for the results
            results.forEach(place => {
              // Create a single info window to reuse
              const infoWindow = new window.google.maps.InfoWindow();

              // Create marker for store
              const marker = new window.google.maps.Marker({
                map: newMap,
                position: place.geometry.location,
                title: place.name,
                // Custom styled marker
                icon: {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  fillColor: '#000000',
                  fillOpacity: 0.9,
                  strokeWeight: 2,
                  strokeColor: '#FFFFFF'
                },
                animation: window.google.maps.Animation.DROP
              });

              // Add click listener
              marker.addListener('click', () => {
                // Create info window content with place details
                const content = `
                  <div style="padding: 12px; max-width: 300px; font-family: 'Montserrat', Arial, sans-serif;">
                    <h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 600;">${place.name}</h3>
                    ${place.vicinity ? `<p style="margin: 0 0 8px; font-size: 14px; color: #666;">${place.vicinity}</p>` : ''}
                    ${place.rating ? `
                      <div style="display: flex; align-items: center; margin-bottom: 8px;">
                        <span style="font-weight: 500; margin-right: 6px;">${place.rating}</span>
                        <span style="color: #000; font-size: 16px;">★</span>
                        <span style="margin-left: 6px; color: #666; font-size: 13px;">(${place.user_ratings_total || 0} reviews)</span>
                      </div>
                    ` : ''}
                    <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-top: 10px; margin-bottom: 15px;">
                      ${place.types?.slice(0, 3).map(type =>
                        `<span style="display: inline-block; padding: 3px 8px; background: #f0f0f0; border-radius: 12px; font-size: 12px;">${type.replace(/_/g, ' ')}</span>`
                      ).join('') || ''}
                    </div>
                    <div style="text-align: center; margin-top: 15px;">
                      <button
                        id="shop-now-${place.place_id}"
                        style="background: #000000; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-weight: 500; width: 100%;"
                      >View in TUHME</button>
                    </div>
                  </div>
                `;

                infoWindow.setContent(content);
                infoWindow.open(newMap, marker);

                // Add event listener for the shop button
                window.google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
                  const shopButton = document.getElementById(`shop-now-${place.place_id}`);
                  if (shopButton) {
                    shopButton.addEventListener('click', () => {
                      // Fire a custom event that the parent component can listen for
                      const openStoreEvent = new CustomEvent('openStoreWebsite', {
                        detail: {
                          storeName: place.name,
                          storeUrl: place.website || `https://www.google.com/search?q=${encodeURIComponent(place.name)}`,
                          storeType: place.types?.[0] || 'shopping'
                        }
                      });
                      window.dispatchEvent(openStoreEvent);

                      // If we're in the standalone window, handle differently
                      if (window.location.pathname === '/manhattan-map') {
                        const shopParams = new URLSearchParams();
                        shopParams.append('shop', place.name);
                        shopParams.append('category', place.types?.[0] || 'shopping');

                        // Open a new window with the chatbot interface
                        window.open(
                          `/shop-chatbot?${shopParams.toString()}`,
                          'ShopChatbot',
                          'width=400,height=600,resizable=yes,scrollbars=yes'
                        );
                      }
                    });
                  }
                });
              });
            });
          }
        });
      }

      setMapInitialized(true);
    } catch (error) {
      console.error('Failed to initialize map:', error);
    } finally {
      setLoading(false);
    }
  }, [mapLoaded]);

  // Update markers when selection or filters change
  useEffect(() => {
    if (!map) return;

    // Clear all markers
    markers.forEach(marker => marker.setMap(null));
    const newMarkers = [];

    // Get shops to display
    let shopsToDisplay = [];

    if (selectedNeighborhood) {
      const neighborhood = manhattanNeighborhoods.find(n => n.id === selectedNeighborhood);
      if (neighborhood) {
        shopsToDisplay = neighborhood.shops;
      }
    } else {
      // Show all shops if no neighborhood is selected
      manhattanNeighborhoods.forEach(neighborhood => {
        shopsToDisplay = [...shopsToDisplay, ...neighborhood.shops];
      });
    }

    // Apply type filters if any
    if (activeFilters.length > 0) {
      shopsToDisplay = shopsToDisplay.filter(shop => activeFilters.includes(shop.type));
    }

    // Add markers for shops
    shopsToDisplay.forEach(shop => {
      const shopType = shopTypes.find(type => type.id === shop.type);
      const isSelected = selectedShops.includes(shop.name);

      // Use a simpler marker configuration to prevent deprecation warnings
      const marker = new window.google.maps.Marker({
        position: shop.position,
        map: map,
        title: shop.name,
        // Custom SVG circle as icon to avoid deprecated features
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="7" fill="${shopType ? shopType.color : '#000000'}"
              stroke="${isSelected ? '#000000' : '#FFFFFF'}" stroke-width="2"/>
            </svg>`,
          scaledSize: new window.google.maps.Size(24, 24),
          anchor: new window.google.maps.Point(12, 12)
        },
        animation: isSelected ? window.google.maps.Animation.BOUNCE : null
      });

      // Stop the bouncing animation after a short period
      if (isSelected) {
        setTimeout(() => {
          marker.setAnimation(null);
        }, 1500);
      }

      // Create an info window for this shop
      const shopInfo = `
        <div style="padding: 10px; max-width: 250px;">
          <h3 style="margin: 0 0 8px; font-size: 16px; font-weight: 600;">${shop.name}</h3>
          <p style="margin: 0 0 8px; font-size: 14px; color: #666;">Category: ${shopType ? shopType.name : 'General'}</p>
          ${shop.items ? `
            <p style="margin: 0 0 8px; font-size: 14px;">Featured items:</p>
            <ul style="margin: 0 0 10px; padding-left: 20px; font-size: 13px;">
              ${shop.items.map(item => `<li>${item.name} - $${item.price}</li>`).join('')}
            </ul>
          ` : ''}
          <div style="text-align: center; margin-top: 10px;">
            <button
              id="shop-now-${shop.name.replace(/\s+/g, '-').toLowerCase()}"
              style="background: #3a5199; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-weight: 500;"
            >Shop Now</button>
          </div>
        </div>
      `;

      const infoWindow = new window.google.maps.InfoWindow({
        content: shopInfo,
        maxWidth: 300
      });

      // Add click listener
      marker.addListener('click', () => {
        // Close any open info windows
        if (window.currentOpenInfoWindow) {
          window.currentOpenInfoWindow.close();
        }

        // Open this info window
        infoWindow.open(map, marker);
        window.currentOpenInfoWindow = infoWindow;

        // Add shop to selection
        if (!selectedShops.includes(shop.name)) {
          const updatedShops = [...selectedShops, shop.name];
          setSelectedShops(updatedShops);

          // Call the callback with updated shops
          if (onShopSelect) {
            onShopSelect(updatedShops);
          }

          // Briefly animate the marker
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(() => {
            marker.setAnimation(null);
          }, 1500);

          // Update marker appearance
          marker.setIcon({
            url: `data:image/svg+xml;charset=UTF-8,
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="7" fill="${shopType ? shopType.color : '#000000'}"
                stroke="#000000" stroke-width="2"/>
              </svg>`,
            scaledSize: new window.google.maps.Size(24, 24),
            anchor: new window.google.maps.Point(12, 12)
          });
        }

        // Add event listener to the Shop Now button after the info window is opened
        window.google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
          const shopButton = document.getElementById(`shop-now-${shop.name.replace(/\s+/g, '-').toLowerCase()}`);
          if (shopButton) {
            shopButton.addEventListener('click', () => {
              // Get store website URL based on name
              let storeUrl;
              switch(shop.name) {
                case 'Saks Fifth Avenue':
                  storeUrl = 'https://www.https://www.google.com/aclk?sa=l&ai=DChcSEwj14sOa_4qNAxU2TUcBHfJIDDwYABBJGgJxdQ&ae=2&aspm=1&co=1&ase=5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMn-ksHN3kZlvQaioEc8n90e2peaS00cSdGDF-oYbgGaaHPiR1OBxEaAq8FEALw_wcB&ei=ofsXaJTIB9Kq5NoPyJrtiAE&sig=AOD64_1oStaWDh4aKGjmGA_8nbD-JnghVQ&q&sqi=2&adurl&ved=2ahUKEwjUnL2a_4qNAxVSFVkFHUhNGxEQ0Qx6BAgLEAE.com';
                  break;
                case 'Bloomingdale\'s':
                  storeUrl = 'https://www.https://www.google.com/aclk?sa=l&ai=DChcSEwj14sOa_4qNAxU2TUcBHfJIDDwYABBJGgJxdQ&ae=2&aspm=1&co=1&ase=5&gclid=Cj0KCQjwoNzABhDbARIsALfY8VMn-ksHN3kZlvQaioEc8n90e2peaS00cSdGDF-oYbgGaaHPiR1OBxEaAq8FEALw_wcB&ei=ofsXaJTIB9Kq5NoPyJrtiAE&sig=AOD64_1oStaWDh4aKGjmGA_8nbD-JnghVQ&q&sqi=2&adurl&ved=2ahUKEwjUnL2a_4qNAxVSFVkFHUhNGxEQ0Qx6BAgLEAE.com';
                  break;
                case 'Bergdorf Goodman':
                  storeUrl = 'https://www.bergdorfgoodman.com';
                  break;
                case 'Ralph Lauren':
                  storeUrl = 'https://www.ralphlauren.com';
                  break;
                case 'Theory':
                  storeUrl = 'https://www.theory.com';
                  break;
                case 'Gucci':
                  storeUrl = 'https://www.gucci.com';
                  break;
                case 'Reformation':
                  storeUrl = 'https://www.thereformation.com';
                  break;
                case 'Rag & Bone':
                  storeUrl = 'https://www.rag-bone.com';
                  break;
                case 'Celine':
                  storeUrl = 'https://www.celine.com';
                  break;
                case 'Tiffany & Co.':
                  storeUrl = 'https://www.tiffany.com';
                  break;
                default:
                  // For stores without specific URLs, use a search URL
                  storeUrl = `https://www.google.com/search?q=${encodeURIComponent(shop.name + ' official site')}`;
              }

              // Fire a custom event that the parent component can listen for
              const openStoreEvent = new CustomEvent('openStoreWebsite', {
                detail: {
                  storeName: shop.name,
                  storeUrl,
                  storeType: shopType ? shopType.name : 'General'
                }
              });
              window.dispatchEvent(openStoreEvent);

              // If the event handler doesn't work or we're in a standalone window, fallback to the chatbot
              if (window.location.pathname === '/manhattan-map') {
                const shopParams = new URLSearchParams();
                shopParams.append('shop', shop.name);
                shopParams.append('category', shopType ? shopType.name : 'General');

                // Open a new window with the chatbot interface
                const chatWindow = window.open(
                  `/shop-chatbot?${shopParams.toString()}`,
                  'ShopChatbot',
                  'width=400,height=600,resizable=yes,scrollbars=yes'
                );

                if (!chatWindow) {
                  alert(`Opening shopping assistant for ${shop.name}. TUHME will help you complete your order.`);
                }
              }
            });
          }
        });
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);

  }, [map, selectedNeighborhood, activeFilters, selectedShops]);

  // Add Manhattan neighborhood polygons
  const addNeighborhoodPolygons = (map) => {
    // In a production app, we would load actual GeoJSON data for precise boundaries
    // This is a simplified version with improved polygon shapes

    manhattanNeighborhoods.forEach(neighborhood => {
      // Create more realistic neighborhood shapes using polygons instead of circles
      // These are simplified polygon coordinates - in production, use actual GeoJSON data
      let polygonCoords;

      switch(neighborhood.id) {
        case 'soho':
          // Simple polygon approximation for SoHo
          polygonCoords = [
            { lat: 40.7280, lng: -74.0050 },
            { lat: 40.7280, lng: -73.9950 },
            { lat: 40.7220, lng: -73.9950 },
            { lat: 40.7220, lng: -74.0050 },
          ];
          break;
        case 'upperEastSide':
          // Simple polygon approximation for Upper East Side
          polygonCoords = [
            { lat: 40.7850, lng: -73.9650 },
            { lat: 40.7850, lng: -73.9470 },
            { lat: 40.7630, lng: -73.9470 },
            { lat: 40.7630, lng: -73.9650 },
          ];
          break;
        default:
          // For other neighborhoods, create a circle approximation
          const radius = 300; // meters
          const numPoints = 8; // number of points to create our polygon
          polygonCoords = [];

          for (let i = 0; i < numPoints; i++) {
            const angle = (i / numPoints) * 2 * Math.PI;
            const dx = radius * Math.cos(angle) / 111320; // Convert meters to degrees (approximate)
            const dy = radius * Math.sin(angle) / (111320 * Math.cos(neighborhood.center.lat * Math.PI/180));
            polygonCoords.push({
              lat: neighborhood.center.lat + dy,
              lng: neighborhood.center.lng + dx
            });
          }
      }

      // Create polygon for the neighborhood
      const polygon = new window.google.maps.Polygon({
        paths: polygonCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.2,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.1,
        map: map,
        clickable: true
      });

      const infowindow = new window.google.maps.InfoWindow({
        content: `<div style="padding:5px"><h3 style="margin:0;padding:0;font-size:16px">${neighborhood.name}</h3><p style="margin:5px 0 0">${neighborhood.description}</p></div>`,
        maxWidth: 300
      });

      polygon.addListener('click', () => {
        infowindow.setPosition(neighborhood.center);
        infowindow.open(map);
        setSelectedNeighborhood(neighborhood.id);
        map.setCenter(neighborhood.center);
        map.setZoom(15);
      });
    });
  };

  // Handle neighborhood selection
  const handleNeighborhoodChange = (event, newNeighborhood) => {
    setSelectedNeighborhood(newNeighborhood);

    if (newNeighborhood && map) {
      const neighborhood = manhattanNeighborhoods.find(n => n.id === newNeighborhood);
      if (neighborhood) {
        map.setCenter(neighborhood.center);
        map.setZoom(15);
      }
    } else if (map) {
      // Reset to Manhattan overview if nothing selected
      map.setCenter({ lat: 40.7831, lng: -73.9712 });
      map.setZoom(12);
    }
  };

  // Handle filter change
  const handleFilterChange = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;

    if (checked) {
      setActiveFilters([...activeFilters, value]);
    } else {
      setActiveFilters(activeFilters.filter(filter => filter !== value));
    }
  };

  // Check if running in standalone map mode
  const isStandalone = window.location.pathname === '/manhattan-map';

  // Close the popup window
  const handleClose = () => {
    if (window.opener && isStandalone) {
      window.close();
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Close button for standalone mode */}
      {isStandalone && (
        <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1001 }}>
          <IconButton
            onClick={handleClose}
            sx={{
              bgcolor: 'white',
              '&:hover': { bgcolor: '#f5f5f5' },
              boxShadow: 2
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      {/* Map container with loading indicator */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: isStandalone ? '100vh' : 500,
          borderRadius: isStandalone ? 0 : 2,
          overflow: 'hidden'
        }}
      >
        <Box
          ref={mapRef}
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
      </Box>

      {/* Neighborhood selector - improved responsive positioning */}
      <Paper
        elevation={3}
        sx={{
          position: 'absolute',
          top: { xs: 70, sm: 70, md: 16 }, /* Adjusted for the banner overlay */
          left: 16,
          p: { xs: 1.5, md: 2 },
          zIndex: 1,
          maxWidth: isMobile ? 'calc(100% - 32px)' : 400,
          maxHeight: { xs: '30%', sm: '35%', md: 'auto' },
          overflow: 'auto',
          borderRadius: 2,
          display: { xs: selectedNeighborhood || activeFilters.length > 0 ? 'block' : 'none', md: 'block' }
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            mb: 1,
            fontWeight: 600,
            fontSize: { xs: '0.85rem', md: '1rem' }
          }}
        >
          Manhattan Shopping Districts
        </Typography>

        <ToggleButtonGroup
          value={selectedNeighborhood}
          exclusive
          onChange={handleNeighborhoodChange}
          aria-label="neighborhood selection"
          size="small"
          sx={{
            mb: { xs: 1, md: 2 },
            flexWrap: 'wrap',
            '& .MuiToggleButton-root': {
              padding: { xs: '4px 8px', md: '6px 12px' },
              fontSize: { xs: '0.7rem', md: '0.8rem' }
            }
          }}
        >
          {manhattanNeighborhoods.map((neighborhood) => (
            <ToggleButton
              key={neighborhood.id}
              value={neighborhood.id}
              sx={{ m: { xs: 0.25, md: 0.5 } }}
            >
              {neighborhood.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Typography
          variant="subtitle2"
          sx={{
            mb: 1,
            fontSize: { xs: '0.75rem', md: '0.875rem' }
          }}
        >
          Filter by Store Type
        </Typography>

        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: 0.5, md: 1 }
        }}>
          {shopTypes.map((type) => (
            <FormControlLabel
              key={type.id}
              control={
                <Checkbox
                  size="small"
                  value={type.id}
                  checked={activeFilters.includes(type.id)}
                  onChange={handleFilterChange}
                  sx={{
                    color: type.color,
                    '&.Mui-checked': {
                      color: type.color,
                    },
                    padding: { xs: 0.5, md: 1 }
                  }}
                />
              }
              label={type.name}
              sx={{
                margin: 0,
                fontSize: { xs: '0.7rem', md: '0.8rem' }
              }}
            />
          ))}
        </Box>

        {/* Mobile-only View All/Reset Button */}
        {isMobile && (
          <Button
            size="small"
            fullWidth
            variant="outlined"
            sx={{ mt: 1, fontSize: '0.7rem' }}
            onClick={() => {
              setSelectedNeighborhood('');
              setActiveFilters([]);
              if (map) {
                map.setCenter({ lat: 40.7831, lng: -73.9712 });
                map.setZoom(12);
              }
            }}
          >
            Reset View
          </Button>
        )}
      </Paper>

      {/* Selected shops display - improved responsive positioning */}
      {selectedShops.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            bottom: { xs: 16, md: 16 },
            right: { xs: 16, md: 16 },
            left: { xs: 16, md: 'auto' },
            p: { xs: 1.5, md: 2 },
            zIndex: 1,
            maxWidth: { xs: 'calc(100% - 32px)', md: 300 },
            maxHeight: { xs: '25%', md: '40%' },
            overflow: 'auto',
            borderRadius: 2
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              mb: 1,
              fontWeight: 600,
              fontSize: { xs: '0.85rem', md: '1rem' }
            }}
          >
            Selected Stores
          </Typography>

          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: 0.5, md: 1 }
          }}>
            {selectedShops.map(shop => (
              <Chip
                key={shop}
                label={shop}
                size={isMobile ? "small" : "medium"}
                sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}
                onDelete={() => {
                  setSelectedShops(selectedShops.filter(name => name !== shop));
                  if (onShopSelect) {
                    onShopSelect(selectedShops.filter(name => name !== shop));
                  }
                }}
              />
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ManhattanMap;
