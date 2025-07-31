import React, { useState, useEffect } from 'react';
import storeService from '../services/storeService';
import './AIStoreFinder.css';

const AIStoreFinder = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  // Popular search suggestions
  const popularSearches = [
    "Designer handbags", "Wedding dresses", "Men's formal suits", 
    "Luxury watches", "Vintage jewelry", "Designer shoes",
    "Evening gowns", "Casual streetwear", "Business attire",
    "Workout clothes", "Winter coats", "Summer dresses"
  ];

  // NYC neighborhood suggestions
  const nycNeighborhoods = [
    "SoHo", "Upper East Side", "Midtown", "Chelsea", "Tribeca",
    "Brooklyn Heights", "Williamsburg", "DUMBO", "Park Slope",
    "Flatiron District", "Greenwich Village", "Nolita"
  ];

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setUseCurrentLocation(true);
          setLocation('📍 Current Location');
          setIsLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoading(false);
        }
      );
    }
  };

  // AI-powered store matching based on query
  const analyzeQuery = (searchQuery) => {
    const query = searchQuery.toLowerCase();
    let matchedStores = [];
    let itemCategories = [];

    // Item category mapping
    const itemMappings = {
      'handbag': ['Luxury Fashion', 'Department Store'],
      'dress': ['Luxury Fashion', 'Contemporary Fashion', 'Department Store'],
      'suit': ['Luxury Fashion', 'Contemporary Fashion', 'Department Store'],
      'watch': ['Luxury Jewelry', 'Department Store'],
      'jewelry': ['Luxury Jewelry', 'Tiffany & Co.'],
      'shoe': ['Luxury Fashion', 'Contemporary Fashion', 'Department Store'],
      'coat': ['Luxury Fashion', 'Contemporary Fashion', 'Department Store'],
      'casual': ['Contemporary Fashion', 'Streetwear'],
      'formal': ['Luxury Fashion', 'Department Store'],
      'business': ['Contemporary Fashion', 'Department Store'],
      'workout': ['Activewear', 'Contemporary Fashion'],
      'streetwear': ['Streetwear', 'Contemporary Fashion'],
      'luxury': ['Luxury Fashion', 'Luxury Department Store', 'Luxury Jewelry'],
      'designer': ['Luxury Fashion', 'Luxury Department Store'],
      'vintage': ['Contemporary Fashion', 'Boutique'],
      'wedding': ['Luxury Fashion', 'Department Store'],
      'evening': ['Luxury Fashion', 'Department Store']
    };

    // Brand mapping
    const brandMappings = {
      'chanel': ['chanel-57th'],
      'gucci': ['gucci-fifth'],
      'prada': ['prada-broadway'],
      'louis vuitton': ['louis-vuitton-fifth'],
      'tiffany': ['tiffany-co'],
      'hermes': ['hermes-madison'],
      'dior': ['dior-57th'],
      'zara': ['zara-fifth-avenue', 'zara-soho'],
      'miu miu': ['miu-miu-soho']
    };

    // Check for specific brands
    Object.keys(brandMappings).forEach(brand => {
      if (query.includes(brand)) {
        const stores = storeService.getAllStores().filter(store => 
          brandMappings[brand].includes(store.id)
        );
        matchedStores.push(...stores);
      }
    });

    // Check for item categories
    Object.keys(itemMappings).forEach(item => {
      if (query.includes(item)) {
        itemCategories.push(...itemMappings[item]);
        const stores = storeService.getAllStores().filter(store => 
          itemMappings[item].some(category => 
            store.category.includes(category) || 
            store.specialties.some(specialty => 
              specialty.toLowerCase().includes(item)
            )
          )
        );
        matchedStores.push(...stores);
      }
    });

    // Remove duplicates
    const uniqueStores = matchedStores.filter((store, index, self) => 
      index === self.findIndex(s => s.id === store.id)
    );

    // If no specific matches, fall back to general search
    if (uniqueStores.length === 0) {
      uniqueStores.push(...storeService.searchStores(searchQuery));
    }

    return {
      stores: uniqueStores,
      categories: [...new Set(itemCategories)],
      confidence: uniqueStores.length > 0 ? 'high' : 'medium'
    };
  };

  // Find stores beyond partner list (simulated)
  const findAdditionalStores = (query, location) => {
    // This would integrate with real APIs like Google Places, Yelp, etc.
    // For now, we'll simulate some additional stores
    const additionalStores = [
      {
        id: 'external-1',
        name: 'Century 21',
        category: 'Department Store',
        address: '22 Cortlandt St, New York, NY 10007',
        neighborhood: 'Financial District',
        rating: 4.2,
        priceRange: '$$',
        isPartner: false,
        distance: userLocation ? '0.8 miles' : null,
        description: 'Designer discount department store'
      },
      {
        id: 'external-2',
        name: 'Sample Sale',
        category: 'Designer Outlet',
        address: '261 W 36th St, New York, NY 10018',
        neighborhood: 'Garment District',
        rating: 4.0,
        priceRange: '$$$',
        isPartner: false,
        distance: userLocation ? '1.2 miles' : null,
        description: 'Designer sample sales and discounted luxury items'
      },
      {
        id: 'external-3',
        name: 'Crossroads Trading',
        category: 'Consignment',
        address: '53 E 8th St, New York, NY 10003',
        neighborhood: 'Greenwich Village',
        rating: 4.1,
        priceRange: '$$',
        isPartner: false,
        distance: userLocation ? '0.5 miles' : null,
        description: 'Contemporary secondhand and vintage clothing'
      }
    ];

    return additionalStores.filter(store => 
      store.name.toLowerCase().includes(query.toLowerCase()) ||
      store.category.toLowerCase().includes(query.toLowerCase()) ||
      store.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setShowResults(true);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const analysis = analyzeQuery(query);
    const additionalStores = findAdditionalStores(query, location);

    // Combine partner stores and additional stores
    const allResults = [
      ...analysis.stores.map(store => ({ ...store, isPartner: true })),
      ...additionalStores
    ];

    // Sort by relevance (partner stores first, then by rating)
    allResults.sort((a, b) => {
      if (a.isPartner && !b.isPartner) return -1;
      if (!a.isPartner && b.isPartner) return 1;
      return b.rating - a.rating;
    });

    setResults(allResults);
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="ai-store-finder">
      <div className="finder-header">
        <h2 className="finder-title">Find Any Store with AI</h2>
        <p className="finder-subtitle">
          Describe what you're looking for and we'll find the perfect stores, 
          including our 53+ partners and beyond
        </p>
      </div>

      <div className="search-container">
        <div className="search-input-group">
          <div className="input-wrapper">
            <div className="input-icon">🔍</div>
            <input
              type="text"
              placeholder="e.g., 'Designer handbags for a wedding' or 'Vintage Chanel jacket'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="search-input"
            />
            {query && (
              <button 
                className="clear-btn"
                onClick={() => setQuery('')}
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div className="location-group">
          <div className="input-wrapper">
            <div className="input-icon">📍</div>
            <input
              type="text"
              placeholder="Enter neighborhood or use current location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setUseCurrentLocation(false);
              }}
              className="location-input"
            />
            <button 
              className="location-btn"
              onClick={getCurrentLocation}
              disabled={isLoading}
            >
              {isLoading ? '⟳' : '📍'}
            </button>
          </div>
        </div>

        <button 
          className="search-btn"
          onClick={handleSearch}
          disabled={!query.trim() || isLoading}
        >
          {isLoading ? 'Finding Stores...' : 'Find Stores'}
        </button>
      </div>

      {!showResults && (
        <div className="suggestions">
          <div className="suggestion-group">
            <h4>Popular Searches</h4>
            <div className="suggestion-tags">
              {popularSearches.slice(0, 6).map((suggestion, index) => (
                <button
                  key={index}
                  className="suggestion-tag"
                  onClick={() => setQuery(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div className="suggestion-group">
            <h4>NYC Neighborhoods</h4>
            <div className="suggestion-tags">
              {nycNeighborhoods.slice(0, 6).map((neighborhood, index) => (
                <button
                  key={index}
                  className="suggestion-tag location-tag"
                  onClick={() => setLocation(neighborhood)}
                >
                  {neighborhood}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="loading-container">
          <div className="ai-loading">
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p>AI is analyzing your request...</p>
          </div>
        </div>
      )}

      {showResults && !isLoading && (
        <div className="results-container">
          <div className="results-header">
            <h3>Found {results.length} stores for "{query}"</h3>
            {location && <p>Near {location}</p>}
          </div>

          <div className="results-grid">
            {results.map((store, index) => (
              <div key={store.id} className={`store-result-card ${store.isPartner ? 'partner' : 'external'}`}>
                {store.isPartner && (
                  <div className="partner-badge">Partner Store</div>
                )}
                
                <div className="store-result-header">
                  <h4 className="store-result-name">{store.name}</h4>
                  <div className="store-result-meta">
                    <span className="store-rating">★ {store.rating}</span>
                    <span className="store-price">{store.priceRange}</span>
                  </div>
                </div>

                <p className="store-result-category">{store.category}</p>
                <p className="store-result-address">{store.address || store.neighborhood}</p>
                
                {store.distance && (
                  <p className="store-distance">{store.distance} away</p>
                )}

                {store.description && (
                  <p className="store-description">{store.description}</p>
                )}

                <div className="store-result-actions">
                  {store.isPartner ? (
                    <button className="shop-btn partner-btn">
                      Shop with Tuhme
                    </button>
                  ) : (
                    <button className="shop-btn external-btn">
                      Request Shopping
                    </button>
                  )}
                  <button className="info-btn">Info</button>
                </div>
              </div>
            ))}
          </div>

          {results.length === 0 && (
            <div className="no-results">
              <h3>No stores found</h3>
              <p>Try a different search term or location</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIStoreFinder;
