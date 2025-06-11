import { useState, useEffect, useMemo } from 'react';
import storeService from '../services/storeService.js';
import unsplashService from '../services/unsplashService.js';
import StoreLogoTrain from './StoreLogoTrain';
import StoreSearchModal from './StoreSearchModal';
import { getBrandSVG } from './BrandSVGs';

const StoreDirectory = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isLoading, setIsLoading] = useState(true);
  const [ambientPhotos, setAmbientPhotos] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);

  useEffect(() => {
    const initializeStores = async () => {
      try {
        setIsLoading(true);
        
        // Load stores
        const allStores = storeService.getAllStores();
        setStores(allStores);
        setFilteredStores(allStores);

        // Load ambient photos for background
        const photos = await unsplashService.getStoreAmbientPhotos();
        setAmbientPhotos(photos.results || []);
      } catch (error) {
        console.error('Error initializing stores:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeStores();
  }, []);

  // Filter stores based on search and filters
  useEffect(() => {
    let filtered = stores;

    // Search filter
    if (searchQuery) {
      filtered = storeService.searchStores(searchQuery);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(store => 
        store.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Location filter
    if (selectedLocation !== 'all') {
      if (selectedLocation === 'manhattan') {
        filtered = filtered.filter(store => 
          storeService.getManhattanStores().some(ms => ms.id === store.id)
        );
      } else if (selectedLocation === 'brooklyn') {
        filtered = filtered.filter(store => 
          storeService.getBrooklynStores().some(bs => bs.id === store.id)
        );
      } else {
        filtered = filtered.filter(store => 
          store.neighborhood.toLowerCase().includes(selectedLocation.toLowerCase())
        );
      }
    }

    // Price range filter
    if (selectedPriceRange !== 'all') {
      filtered = filtered.filter(store => store.priceRange === selectedPriceRange);
    }

    setFilteredStores(filtered);
  }, [stores, searchQuery, selectedCategory, selectedLocation, selectedPriceRange]);

  // Get unique categories and neighborhoods for filters
  const categories = useMemo(() => {
    const cats = [...new Set(stores.map(store => store.category))];
    return cats.sort();
  }, [stores]);

  const neighborhoods = useMemo(() => {
    const hoods = [...new Set(stores.map(store => store.neighborhood))];
    return hoods.sort();
  }, [stores]);

  const handleStoreClick = (store) => {
    // Generate WhatsApp link for the store
    const whatsappLink = storeService.generateStoreWhatsAppLink(
      store.id,
      `Hi! I'd like to shop at ${store.name} through Tuhme. Can you help me place an order?`
    );
    
    if (whatsappLink) {
      window.open(whatsappLink, '_blank');
    }
  };

  const getStoreHours = (store) => {
    const isOpen = storeService.isStoreOpen(store.id);
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const todayHours = store.hours[today];
    
    return {
      isOpen,
      todayHours,
      status: isOpen ? 'Open' : 'Closed'
    };
  };

  if (isLoading) {
    return (
      <div className="store-directory loading">
        <div className="loading-header">
          <div className="loading-skeleton title-skeleton"></div>
          <div className="loading-skeleton subtitle-skeleton"></div>
        </div>
        <div className="loading-filters">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="loading-skeleton filter-skeleton"></div>
          ))}
        </div>
        <div className="loading-grid">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="loading-skeleton store-card-skeleton"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="store-directory luxury-section">
      {/* Background ambient photos */}
      {ambientPhotos.length > 0 && (
        <div className="ambient-background">
          {ambientPhotos.slice(0, 3).map((photo, index) => (
            <div 
              key={photo.id} 
              className={`ambient-photo ambient-photo-${index + 1}`}
              style={{
                backgroundImage: `url(${photo.optimized.large})`,
                opacity: 0.03
              }}
            />
          ))}
        </div>
      )}

      <div className="container">
        {/* Store Logo Train */}
        <StoreLogoTrain speed={60} direction="left" />
        
        <div className="luxury-section-header">
          <h2 className="luxury-title">Exclusive Store Partners</h2>
          <p className="luxury-subtitle">
            Discover Manhattan and Brooklyn's most prestigious boutiques and department stores. 
            Our curated network of luxury retailers awaits your personal shopping experience.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="store-filters">
          <div className="search-section">
            <div className="search-input-group">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM20 20l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search stores, brands, or neighborhoods..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button 
                  className="clear-search"
                  onClick={() => setSearchQuery('')}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div className="filter-section">
            <div className="filter-group">
              <label>Category</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Location</label>
              <select 
                value={selectedLocation} 
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Locations</option>
                <option value="manhattan">Manhattan</option>
                <option value="brooklyn">Brooklyn</option>
                <optgroup label="Neighborhoods">
                  {neighborhoods.map(neighborhood => (
                    <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div className="filter-group">
              <label>Price Range</label>
              <select 
                value={selectedPriceRange} 
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Ranges</option>
                <option value="$$">$$ - Mid Range</option>
                <option value="$$$">$$$ - High End</option>
                <option value="$$$$">$$$$ - Luxury</option>
              </select>
            </div>

            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="2" width="6" height="6" fill="currentColor"/>
                  <rect x="12" y="2" width="6" height="6" fill="currentColor"/>
                  <rect x="2" y="12" width="6" height="6" fill="currentColor"/>
                  <rect x="12" y="12" width="6" height="6" fill="currentColor"/>
                </svg>
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="results-summary">
          <p>
            Showing {filteredStores.length} of {stores.length} stores
            {searchQuery && <span> for "{searchQuery}"</span>}
          </p>
        </div>

        {/* Store Grid/List */}
        <div className={`stores-container ${viewMode}`}>
          {filteredStores.length > 0 ? (
            filteredStores.map((store) => {
              const hoursInfo = getStoreHours(store);
              
              return (
                <div key={store.id} className="store-card" onClick={() => handleStoreClick(store)}>
                  <div className="store-visual">
                    <div 
                      className="store-svg"
                      dangerouslySetInnerHTML={{ __html: getBrandSVG(store.id) }}
                    />
                    {store.featured && (
                      <div className="featured-badge">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9l-3 1.5.5-3.5L1 5l3.5-.5L6 1z" fill="currentColor"/>
                        </svg>
                        Featured
                      </div>
                    )}
                  </div>

                  <div className="store-content">
                    <div className="store-header">
                      <h3 className="store-name">{store.name}</h3>
                      <div className="store-status">
                        <span className={`status-indicator ${hoursInfo.isOpen ? 'open' : 'closed'}`}>
                          {hoursInfo.status}
                        </span>
                      </div>
                    </div>

                    <div className="store-meta">
                      <span className="store-category">{store.category}</span>
                      <span className="store-price-range">{store.priceRange}</span>
                      <span className="store-rating">
                        ⭐ {store.rating}
                      </span>
                    </div>

                    <p className="store-description">{store.description}</p>

                    <div className="store-details">
                      <div className="store-location">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M7 1a4 4 0 0 1 4 4c0 3-4 8-4 8s-4-5-4-8a4 4 0 0 1 4-4z" stroke="currentColor" strokeWidth="1.5"/>
                          <circle cx="7" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                        <span>{store.neighborhood}</span>
                      </div>

                      <div className="store-hours">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M7 3v4l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        <span>{hoursInfo.todayHours}</span>
                      </div>
                    </div>

                    <div className="store-specialties">
                      {store.specialties.slice(0, 3).map((specialty, index) => (
                        <span key={index} className="specialty-tag">{specialty}</span>
                      ))}
                      {store.specialties.length > 3 && (
                        <span className="specialty-tag more">+{store.specialties.length - 3}</span>
                      )}
                    </div>

                    <div className="store-actions">
                      <button className="action-btn primary" onClick={(e) => {
                        e.stopPropagation();
                        handleStoreClick(store);
                      }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M2 6h12l-1 6H3L2 6zM2 6L1 2H0M6 10v2M10 10v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        Shop Now
                      </button>

                      <button 
                        className="action-btn secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(store.website, '_blank');
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1z" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M1 8h14M8 1s3 3 3 7-3 7-3 7M8 1s-3 3-3 7 3 7 3 7" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                        Visit Site
                      </button>

                      {store.instagram && (
                        <button 
                          className="action-btn secondary"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://instagram.com/${store.instagram.replace('@', '')}`, '_blank');
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <rect x="1" y="1" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                            <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
                            <circle cx="12" cy="4" r="0.5" fill="currentColor"/>
                          </svg>
                          @{store.instagram.replace('@', '')}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-results">
              <div className="no-results-icon">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="28" cy="28" r="16" stroke="currentColor" strokeWidth="4"/>
                  <path d="40 40l16 16" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>No stores found</h3>
              <p>Try adjusting your search criteria, browse all stores, or search for any store online.</p>
              <div className="no-results-actions">
                <button 
                  className="reset-filters-btn"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedLocation('all');
                    setSelectedPriceRange('all');
                  }}
                >
                  Reset Filters
                </button>
                <button 
                  className="search-any-store-btn"
                  onClick={() => setShowSearchModal(true)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="14 14l-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Search Any Store Online
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Store Stats */}
        <div className="store-stats">
          <div className="stat-item">
            <span className="stat-number">{stores.length}</span>
            <span className="stat-label">Total Stores</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{storeService.getFeaturedStores().length}</span>
            <span className="stat-label">Featured Partners</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{storeService.getAverageRating()}</span>
            <span className="stat-label">Avg Rating</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">2</span>
            <span className="stat-label">Boroughs</span>
          </div>
        </div>
      </div>
      
      {/* Store Search Modal */}
      <StoreSearchModal 
        isOpen={showSearchModal} 
        onClose={() => setShowSearchModal(false)} 
      />
    </section>
  );
};

export default StoreDirectory;