import { useState, useEffect } from 'react';
import storeService from '../services/storeService.js';
import { getBrandSVG } from './BrandSVGs';

const HorizontalStoreCarousel = () => {
  const [stores, setStores] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Get all stores and shuffle them for variety
    const allStores = storeService.getAllStores();
    const shuffled = [...allStores].sort(() => Math.random() - 0.5);
    setStores(shuffled);
  }, []);

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

  return (
    <div className="horizontal-store-carousel">
      <div className="carousel-header">
        <h4>Our Partner Stores</h4>
        <span className="store-count">{stores.length} stores available</span>
      </div>
      
      <div 
        className={`carousel-track ${isPaused ? 'paused' : ''}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* First set of stores */}
        <div className="carousel-set">
          {stores.map((store) => {
            const hoursInfo = getStoreHours(store);
            
            return (
              <div 
                key={`first-${store.id}`}
                className="store-card-horizontal"
                onClick={() => handleStoreClick(store)}
              >
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
          })}
        </div>
        
        {/* Duplicate set for seamless loop */}
        <div className="carousel-set">
          {stores.map((store) => {
            const hoursInfo = getStoreHours(store);
            
            return (
              <div 
                key={`second-${store.id}`}
                className="store-card-horizontal"
                onClick={() => handleStoreClick(store)}
              >
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
          })}
        </div>
      </div>
      
      <div className="carousel-controls">
        <span className="control-hint">Hover to pause • Click any store to shop</span>
      </div>
    </div>
  );
};

export default HorizontalStoreCarousel;