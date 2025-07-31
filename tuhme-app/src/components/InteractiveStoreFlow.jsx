import React, { useState, useEffect } from 'react';
import storeService from '../services/storeService';
import './InteractiveStoreFlow.css';

const InteractiveStoreFlow = () => {
  const [stores, setStores] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dailySeed, setDailySeed] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [saleStores, setSaleStores] = useState([]);

  // Generate daily seed for consistent randomization
  useEffect(() => {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    setDailySeed(seed);
  }, []);

  // Sales detection algorithm - simulates checking each store for sales
  const detectStoresSales = () => {
    const allStores = storeService.getAllStores();
    const salesStores = [];
    
    // Simulate sale detection algorithm
    allStores.forEach((store, index) => {
      // Use deterministic "randomness" based on store ID and daily seed
      const saleChance = (parseInt(store.id.replace(/\D/g, ''), 10) + dailySeed) % 100;
      const hasSale = saleChance < 25; // 25% chance of sale
      
      if (hasSale) {
        const salePercentage = 10 + (saleChance % 40); // 10-50% off
        salesStores.push({
          ...store,
          salePercentage,
          saleType: saleChance < 8 ? 'Flash Sale' : saleChance < 15 ? 'Weekend Special' : 'Daily Deal'
        });
      }
    });
    
    return salesStores;
  };

  // Shuffle array using daily seed for consistent randomization
  const shuffleWithSeed = (array, seed) => {
    const shuffled = [...array];
    let currentIndex = shuffled.length;
    let temporaryValue, randomIndex;
    
    // Simple seeded random function
    const seededRandom = (s) => {
      const x = Math.sin(s) * 10000;
      return x - Math.floor(x);
    };
    
    while (0 !== currentIndex) {
      randomIndex = Math.floor(seededRandom(seed + currentIndex) * currentIndex);
      currentIndex -= 1;
      
      temporaryValue = shuffled[currentIndex];
      shuffled[currentIndex] = shuffled[randomIndex];
      shuffled[randomIndex] = temporaryValue;
    }
    
    return shuffled;
  };

  // Initialize stores with sales detection and daily randomization
  useEffect(() => {
    if (dailySeed === 0) return;
    
    const salesStores = detectStoresSales();
    setSaleStores(salesStores);
    
    const allStores = storeService.getAllStores();
    const regularStores = allStores.filter(store => 
      !salesStores.find(saleStore => saleStore.id === store.id)
    );
    
    // Prioritize sale stores, then randomize the rest
    const shuffledRegular = shuffleWithSeed(regularStores, dailySeed);
    const finalStoreOrder = [...salesStores, ...shuffledRegular];
    
    setStores(finalStoreOrder);
  }, [dailySeed]);

  const nextStore = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % stores.length);
      setIsTransitioning(false);
    }, 150);
  };

  const prevStore = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + stores.length) % stores.length);
      setIsTransitioning(false);
    }, 150);
  };

  const goToStore = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 150);
  };

  if (stores.length === 0) {
    return (
      <div className="interactive-store-flow loading">
        <div className="loading-spinner"></div>
        <p>Loading stores...</p>
      </div>
    );
  }

  const currentStore = stores[currentIndex];
  const isOnSale = saleStores.find(store => store.id === currentStore.id);

  return (
    <div className="interactive-store-flow" style={{
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: 'var(--radius-2xl)',
      backdropFilter: 'blur(20px)',
      padding: 'var(--space-8)',
      margin: 'var(--space-8) 0'
    }}>
      <div className="store-flow-header" style={{ textAlign: 'center' }}>
        <h3 style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", system-ui, sans-serif',
          fontSize: 'var(--text-2xl)',
          fontWeight: '700',
          color: 'var(--theme-accent)',
          margin: '0 0 var(--space-3) 0'
        }}>Discover Stores</h3>
        <p style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", system-ui, sans-serif',
          fontSize: 'var(--text-sm)',
          color: 'var(--button-secondary-text)',
          opacity: '0.7',
          margin: '0'
        }}>
          {currentIndex + 1} of {stores.length}
        </p>
      </div>

      <div className="store-display-container">
        <button 
          className="nav-arrow nav-arrow-left" 
          onClick={prevStore}
          disabled={isTransitioning}
          aria-label="Previous store"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className={`store-card ${isTransitioning ? 'transitioning' : ''}`}>
          {isOnSale && (
            <div className="sale-badge">
              <span className="sale-percentage">{isOnSale.salePercentage}% OFF</span>
              <span className="sale-type">{isOnSale.saleType}</span>
            </div>
          )}
          
          <div className="store-image-placeholder">
            {storeService.generateStoreSVG(currentStore.id)?.svg ? (
              <div 
                dangerouslySetInnerHTML={{
                  __html: storeService.generateStoreSVG(currentStore.id).svg
                }}
              />
            ) : (
              <div className="default-store-icon">
                {currentStore.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="store-info">
            <h4 className="store-name">{currentStore.name}</h4>
            <p className="store-category">{currentStore.category}</p>
            <p className="store-neighborhood">{currentStore.neighborhood}</p>
            
            <div className="store-meta">
              <span className="store-rating">★ {currentStore.rating}</span>
              <span className="store-price">{currentStore.priceRange}</span>
              <span className={`store-status ${currentStore.isOpen ? 'open' : 'closed'}`}>
                {currentStore.isOpen ? 'Open' : 'Closed'}
              </span>
            </div>

            {currentStore.specialties && (
              <div className="store-specialties">
                {currentStore.specialties.slice(0, 3).map((specialty, idx) => (
                  <span key={idx} className="specialty-tag">{specialty}</span>
                ))}
              </div>
            )}
          </div>

          <button className="shop-now-btn">
            {isOnSale ? `Shop ${isOnSale.salePercentage}% Off Sale` : 'Shop Now'}
          </button>
        </div>

        <button 
          className="nav-arrow nav-arrow-right" 
          onClick={nextStore}
          disabled={isTransitioning}
          aria-label="Next store"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="store-dots">
        {stores.slice(0, 8).map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToStore(index)}
            aria-label={`Go to store ${index + 1}`}
          />
        ))}
        {stores.length > 8 && (
          <span className="dots-more">+{stores.length - 8}</span>
        )}
      </div>

      {saleStores.length > 0 && (
        <div className="sale-indicator">
          <span className="sale-icon">🔥</span>
          <span>{saleStores.length} stores on sale today</span>
        </div>
      )}
    </div>
  );
};

export default InteractiveStoreFlow;
