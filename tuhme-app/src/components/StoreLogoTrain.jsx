import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { getBrandSVG } from './BrandSVGs';
import storeService from '../services/storeService';

const StoreLogoTrain = () => {
  const [stores, setStores] = useState([]);
  const [currentStoreIndex, setCurrentStoreIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('next');
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const trainViewportRef = useRef(null);

  // Initialize stores data and detect mobile
  useEffect(() => {
    console.log('🚂 Initializing store data...');
    const allStores = storeService.getAllStores();
    const featuredStores = allStores.filter(store => store.featured);
    const regularStores = allStores.filter(store => !store.featured);
    
    // Mix featured and regular stores for better variety
    const mixedStores = [...featuredStores, ...regularStores];
    console.log('🏪 Total stores loaded:', mixedStores.length);
    console.log('⭐ Featured stores:', featuredStores.length);
    
    setStores(mixedStores);
    
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const totalStores = stores.length;
  const currentStore = stores[currentStoreIndex];

  // Calculate visible stores for train effect
  const visibleStores = useMemo(() => {
    if (stores.length === 0) return [];
    
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentStoreIndex + i + stores.length) % stores.length;
      visible.push({
        ...stores[index],
        position: i,
        isCenter: i === 0,
        displayIndex: index
      });
    }
    
    console.log('👁️ Visible stores updated:', visible.map(s => s.name));
    return visible;
  }, [stores, currentStoreIndex]);

  const nextStore = useCallback(() => {
    if (isTransitioning || totalStores <= 1) {
      console.log('⏭️ Next blocked - transitioning:', isTransitioning, 'total:', totalStores);
      return;
    }
    
    console.log('⏭️ Moving to next store from index:', currentStoreIndex);
    setDirection('next');
    setIsTransitioning(true);
    setCurrentStoreIndex(prev => {
      const newIndex = (prev + 1) % totalStores;
      console.log('📍 New store index:', newIndex);
      return newIndex;
    });
    
    setTimeout(() => {
      setIsTransitioning(false);
      console.log('✅ Transition completed');
    }, 300); // Much faster transition
  }, [isTransitioning, totalStores, currentStoreIndex]);

  const prevStore = useCallback(() => {
    if (isTransitioning || totalStores <= 1) {
      console.log('⏮️ Prev blocked - transitioning:', isTransitioning, 'total:', totalStores);
      return;
    }
    
    console.log('⏮️ Moving to previous store from index:', currentStoreIndex);
    setDirection('prev');
    setIsTransitioning(true);
    setCurrentStoreIndex(prev => {
      const newIndex = (prev - 1 + totalStores) % totalStores;
      console.log('📍 New store index:', newIndex);
      return newIndex;
    });
    
    setTimeout(() => {
      setIsTransitioning(false);
      console.log('✅ Transition completed');
    }, 300); // Much faster transition
  }, [isTransitioning, totalStores, currentStoreIndex]);

  const jumpToStore = useCallback((index) => {
    if (isTransitioning || index === currentStoreIndex || index < 0 || index >= totalStores) {
      console.log('🚫 Jump blocked - transitioning:', isTransitioning, 'same index:', index === currentStoreIndex);
      return;
    }
    
    console.log('🎯 Jumping to store index:', index);
    setDirection(index > currentStoreIndex ? 'next' : 'prev');
    setIsTransitioning(true);
    setCurrentStoreIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
      console.log('✅ Jump completed');
    }, 300); // Much faster jump
  }, [isTransitioning, currentStoreIndex, totalStores]);

  // Auto-play functionality - fixed dependencies
  useEffect(() => {
    if (!isAutoPlay || stores.length <= 1) return;
    
    console.log('⏰ Setting up autoplay interval');
    const interval = setInterval(() => {
      console.log('🔄 Autoplay tick - transitioning:', isTransitioning);
      if (!isTransitioning) {
        nextStore();
      }
    }, 2500); // Faster autoplay - 2.5 seconds instead of 4
    
    return () => {
      console.log('🛑 Clearing autoplay interval');
      clearInterval(interval);
    };
  }, [isAutoPlay, stores.length, isTransitioning, nextStore]);

  const handleStoreClick = (store) => {
    console.log('🖱️ Store click handler called for:', store.name);
    console.log('🌐 Store website:', store.website);
    
    if (store.website) {
      console.log('🚀 Opening store website:', store.website);
      window.open(store.website, '_blank', 'noopener,noreferrer');
    } else {
      console.log('❌ No website available for:', store.name);
      alert(`Sorry, no website is available for ${store.name}`);
    }
  };

  const handleMouseEnter = () => {
    console.log('🐭 Mouse entered - pausing autoplay');
    setIsAutoPlay(false);
  };

  const handleMouseLeave = () => {
    console.log('🐭 Mouse left - resuming autoplay');
    setIsAutoPlay(true);
  };

  // Touch gesture handlers for mobile
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlay(false);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && !isTransitioning) {
      console.log('👆 Swipe left - next store');
      nextStore();
    }
    if (isRightSwipe && !isTransitioning) {
      console.log('👆 Swipe right - previous store');
      prevStore();
    }
    
    // Resume autoplay after touch interaction
    setTimeout(() => setIsAutoPlay(true), 2000);
  };

  if (!currentStore) {
    console.log('⏳ Waiting for store data...');
    return (
      <section className="focal-partners-section">
        <div className="partners-container">
          <div className="loading-state">Loading amazing stores...</div>
        </div>
      </section>
    );
  }

  console.log('🎨 Rendering carousel with store:', currentStore.name, 'index:', currentStoreIndex);

  return (
    <section className="focal-partners-section" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="partners-container">
        {/* Enhanced Header */}
        <div className="partners-header">
          <div className="header-content">
            <span className="header-badge">EXCLUSIVE PARTNERS</span>
            <h2 className="partners-title">NYC's Finest Luxury Boutiques</h2>
            <p className="partners-subtitle">
              Hand-selected premium stores and designer brands across Manhattan & Brooklyn
            </p>
          </div>
          
          <div className="header-controls">
            <div className="store-counter">
              <span className="counter-current">{String(currentStoreIndex + 1).padStart(2, '0')}</span>
              <span className="counter-divider">/</span>
              <span className="counter-total">{String(totalStores).padStart(2, '0')}</span>
            </div>
            
            <button 
              className={`autoplay-toggle ${isAutoPlay ? 'active' : ''}`}
              onClick={() => {
                console.log('🎮 Toggling autoplay:', !isAutoPlay);
                setIsAutoPlay(!isAutoPlay);
              }}
              title={isAutoPlay ? 'Pause autoplay' : 'Resume autoplay'}
            >
              {isAutoPlay ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
                  <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <polygon points="5,3 19,12 5,21" fill="currentColor"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Train Display */}
        <div className="train-display">
          <button 
            className="train-nav train-nav-left"
            onClick={() => {
              console.log('⬅️ Previous button clicked');
              prevStore();
            }}
            disabled={totalStores <= 1 || isTransitioning}
            title="Previous store"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div 
            className="train-viewport"
            ref={trainViewportRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="train-track">
              {visibleStores.map((store, index) => {
                const isActive = store.position === 0;
                const spacing = isMobile ? 280 : 360; // Much more spacious
                const transformValue = store.position * spacing;
                
                console.log('🚂 Rendering car:', store.name, 'position:', store.position, 'active:', isActive);
                
                return (
                  <div
                    key={`store-${store.id}-${store.displayIndex}`} // Stable key
                    className={`train-car ${isActive ? 'active' : ''} ${store.featured ? 'featured' : ''} ${isTransitioning ? 'transitioning' : ''}`}
                    style={{
                      transform: `translateX(${transformValue}px) scale(${isActive ? 1 : 0.85})`,
                      opacity: Math.abs(store.position) > 1 ? 0.4 : 1,
                      zIndex: isActive ? 20 : 10 - Math.abs(store.position)
                    }}
                    onClick={() => {
                      if (!isActive) {
                        console.log('🎯 Clicked non-active store, jumping to:', store.displayIndex);
                        jumpToStore(store.displayIndex);
                      }
                    }}
                  >
                    <div className="car-content">
                      <div className="car-logo-section">
                        <div
                          className="car-logo"
                          dangerouslySetInnerHTML={{
                            __html: getBrandSVG(store.id)
                          }}
                        />
                        {store.featured && <div className="featured-badge">★</div>}
                      </div>
                      
                      {isActive && (
                        <div className="car-details">
                          <h3 className="car-name">{store.name}</h3>
                          <p className="car-category">{store.category}</p>
                          <p className="car-location">{store.neighborhood}</p>
                          
                          <div className="car-status">
                            <span className={`status-indicator ${store.isOpen ? 'open' : 'closed'}`}>
                              <span className="status-dot"></span>
                              {store.isOpen ? 'Open Now' : 'Closed'}
                            </span>
                          </div>
                          
                          <button 
                            className="car-visit-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('🏪 Visit store button clicked');
                              handleStoreClick(store);
                            }}
                          >
                            <span>Visit Store</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M7 17l10-10M17 7H7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="car-glow"></div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <button 
            className="train-nav train-nav-right"
            onClick={() => {
              console.log('➡️ Next button clicked');
              nextStore();
            }}
            disabled={totalStores <= 1 || isTransitioning}
            title="Next store"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Progress Track */}
        <div className="progress-track">
          {stores.map((_, index) => (
            <button
              key={`progress-${index}`}
              className={`progress-dot ${index === currentStoreIndex ? 'active' : ''}`}
              onClick={() => {
                console.log('🔘 Progress dot clicked for index:', index);
                jumpToStore(index);
              }}
              disabled={isTransitioning}
            />
          ))}
        </div>

        {/* Enhanced Stats */}
        <div className="partners-stats">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🏪</div>
              <div className="stat-content">
                <span className="stat-number">{totalStores}</span>
                <span className="stat-label">Partner Stores</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <span className="stat-number">{storeService.getFeaturedStores().length}</span>
                <span className="stat-label">Featured Partners</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📍</div>
              <div className="stat-content">
                <span className="stat-number">2</span>
                <span className="stat-label">NYC Boroughs</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⚡</div>
              <div className="stat-content">
                <span className="stat-number">{storeService.getAverageRating()}</span>
                <span className="stat-label">Avg Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .focal-partners-section {
          padding: var(--space-3xl) 0;
          background: linear-gradient(135deg,
            var(--primary-bg) 0%,
            var(--secondary-bg) 25%,
            var(--primary-bg) 50%,
            var(--secondary-bg) 75%,
            var(--primary-bg) 100%);
          position: relative;
          overflow: hidden;
          border-top: 1px solid var(--border-light);
          border-bottom: 1px solid var(--border-light);
        }

        .focal-partners-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 20%, var(--accent-primary)08 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, var(--accent-primary)05 0%, transparent 50%),
            linear-gradient(90deg, transparent 0%, var(--accent-primary)02 50%, transparent 100%);
          pointer-events: none;
          z-index: 1;
        }

        .partners-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--space-lg);
          position: relative;
          z-index: 2;
        }

        .loading-state {
          text-align: center;
          padding: var(--space-3xl);
          font-size: var(--text-xl);
          color: var(--secondary-text);
        }

        /* Enhanced Header */
        .partners-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-3xl);
          gap: var(--space-lg);
        }

        .header-content {
          flex: 1;
        }

        .header-badge {
          display: inline-block;
          padding: var(--space-xs) var(--space-md);
          background: var(--accent-primary);
          color: var(--primary-bg);
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border-radius: 20px;
          margin-bottom: var(--space-sm);
        }

        .partners-title {
          font-family: var(--font-family-primary);
          font-size: var(--text-4xl);
          font-weight: 700;
          color: var(--primary-text);
          margin: 0 0 var(--space-sm) 0;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .partners-subtitle {
          font-family: var(--font-family-secondary);
          font-size: var(--text-lg);
          color: var(--tertiary-text);
          max-width: 600px;
          margin: 0;
          line-height: 1.6;
        }

        .header-controls {
          display: flex;
          align-items: center;
          gap: var(--space-lg);
        }

        .store-counter {
          display: flex;
          align-items: baseline;
          gap: var(--space-xs);
          font-family: var(--font-family-primary);
          font-weight: 700;
        }

        .counter-current {
          font-size: var(--text-3xl);
          color: var(--accent-primary);
        }

        .counter-divider {
          font-size: var(--text-xl);
          color: var(--border-medium);
        }

        .counter-total {
          font-size: var(--text-xl);
          color: var(--secondary-text);
        }

        .autoplay-toggle {
          width: 48px;
          height: 48px;
          background: var(--btn-secondary-bg);
          border: 1px solid var(--border-medium);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-normal);
          color: var(--secondary-text);
        }

        .autoplay-toggle:hover,
        .autoplay-toggle.active {
          background: var(--accent-primary);
          color: var(--primary-bg);
          border-color: var(--accent-primary);
        }

        /* Enhanced Train Display */
        .train-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2xl);
          margin: var(--space-3xl) 0;
          min-height: 550px;
          position: relative;
          padding: 0 var(--space-lg);
        }

        .train-nav {
          width: 64px;
          height: 64px;
          background: var(--btn-primary-bg);
          color: var(--btn-primary-text);
          border: 1px solid var(--btn-primary-border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-normal);
          flex-shrink: 0;
          z-index: 20;
          box-shadow: var(--shadow-medium);
        }

        .train-nav:hover:not(:disabled) {
          background: var(--btn-primary-hover-bg);
          color: var(--btn-primary-hover-text);
          transform: scale(1.05);
        }

        .train-nav:disabled {
          opacity: 0.3;
          cursor: not-allowed;
          transform: none;
        }

        .train-viewport {
          flex: 1;
          height: 450px;
          position: relative;
          overflow: hidden;
          perspective: 1000px;
          max-width: 1000px;
          touch-action: pan-y;
          cursor: grab;
        }
        
        .train-viewport:active {
          cursor: grabbing;
        }

        .train-track {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          width: 100%;
        }

        .train-car {
          position: absolute;
          width: 300px;
          height: 380px;
          background: var(--tertiary-bg);
          border: 1px solid var(--border-light);
          border-radius: 20px;
          padding: var(--space-xl);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          transform-origin: center;
          box-shadow: var(--shadow-medium);
          backdrop-filter: var(--blur-subtle);
          user-select: none;
        }

        .train-car:hover {
          border-color: var(--border-medium);
          box-shadow: var(--shadow-strong);
        }

        .train-car.active {
          background: var(--primary-bg);
          border-color: var(--accent-primary);
          cursor: default;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1), 0 0 0 1px var(--accent-primary)30;
        }

        .train-car.featured {
          border-color: var(--accent-primary)50;
          background: linear-gradient(135deg, var(--tertiary-bg), var(--accent-primary)08);
        }

        .train-car.transitioning {
          opacity: 0.8;
        }

        .car-content {
          display: flex;
          flex-direction: column;
          height: 100%;
          position: relative;
          z-index: 2;
          gap: var(--space-sm);
        }

        .car-logo-section {
          position: relative;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-lg);
          padding: var(--space-md);
        }

        .car-logo {
          width: 100%;
          max-width: 100px;
          height: auto;
          color: var(--primary-text);
          opacity: 0.9;
          transition: all var(--transition-normal);
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
        }

        .train-car.active .car-logo {
          opacity: 1;
          transform: scale(1.1);
        }

        .featured-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          width: 24px;
          height: 24px;
          background: var(--accent-primary);
          color: var(--primary-bg);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
        }

        .car-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          opacity: 0;
          transform: translateY(20px);
          animation: slideIn 0.3s ease forwards 0.1s;
          padding: var(--space-sm) 0;
        }

        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .car-name {
          font-family: var(--font-family-primary);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--primary-text);
          margin: 0;
          line-height: 1.2;
        }

        .car-category {
          font-family: var(--font-family-secondary);
          font-size: var(--text-sm);
          color: var(--accent-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
          margin: 0;
        }

        .car-location {
          font-family: var(--font-family-secondary);
          font-size: var(--text-sm);
          color: var(--secondary-text);
          margin: 0;
        }

        .car-status {
          margin: var(--space-sm) 0;
        }

        .status-indicator {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          padding: var(--space-xs) var(--space-sm);
          border-radius: 12px;
          font-size: var(--text-xs);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .status-indicator.open {
          background: #22c55e20;
          color: #22c55e;
        }

        .status-indicator.closed {
          background: #ef444420;
          color: #ef4444;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          animation: pulse 2s infinite;
        }

        .car-visit-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-sm) var(--space-md);
          background: var(--btn-primary-bg);
          color: var(--btn-primary-text);
          border: none;
          border-radius: 12px;
          font-family: var(--font-family-secondary);
          font-size: var(--text-sm);
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-normal);
          margin-top: auto;
        }

        .car-visit-btn:hover {
          background: var(--btn-primary-hover-bg);
          transform: translateY(-1px);
        }

        .car-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, var(--accent-primary)10 0%, transparent 70%);
          opacity: 0;
          transition: opacity var(--transition-normal);
          border-radius: 20px;
          pointer-events: none;
        }

        .train-car.active .car-glow {
          opacity: 1;
        }

        /* Progress Track */
        .progress-track {
          display: flex;
          justify-content: center;
          gap: var(--space-sm);
          margin: var(--space-2xl) 0;
        }

        .progress-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--border-medium);
          border: none;
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        .progress-dot:hover {
          background: var(--secondary-text);
          transform: scale(1.2);
        }

        .progress-dot.active {
          background: var(--accent-primary);
          transform: scale(1.4);
        }

        /* Enhanced Stats */
        .partners-stats {
          margin-top: var(--space-3xl);
          padding-top: var(--space-2xl);
          border-top: 1px solid var(--border-light);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--space-lg);
          max-width: 800px;
          margin: 0 auto;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: var(--space-lg);
          background: var(--tertiary-bg);
          border: 1px solid var(--border-light);
          border-radius: 16px;
          transition: all var(--transition-normal);
        }

        .stat-card:hover {
          border-color: var(--border-medium);
          transform: translateY(-2px);
          box-shadow: var(--shadow-medium);
        }

        .stat-icon {
          font-size: var(--text-2xl);
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--accent-primary)15;
          border-radius: 12px;
        }

        .stat-content {
          flex: 1;
        }

        .stat-number {
          display: block;
          font-family: var(--font-family-primary);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--accent-primary);
          line-height: 1;
        }

        .stat-label {
          font-family: var(--font-family-secondary);
          font-size: var(--text-sm);
          color: var(--secondary-text);
          font-weight: 500;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* Mobile Responsive Design */
        @media (max-width: 768px) {
          .focal-partners-section {
            padding: var(--space-2xl) 0;
          }

          .partners-header {
            flex-direction: column;
            text-align: center;
            gap: var(--space-md);
            margin-bottom: var(--space-2xl);
          }

          .partners-title {
            font-size: var(--text-3xl);
          }

          .train-display {
            flex-direction: row;
            gap: var(--space-lg);
            min-height: 380px;
            padding: 0 var(--space-md);
          }

          .train-nav {
            width: 48px;
            height: 48px;
            flex-shrink: 0;
          }

          .train-viewport {
            height: 380px;
            max-width: none;
            flex: 1;
          }

          .train-car {
            width: 260px;
            height: 340px;
            padding: var(--space-lg);
          }

          .car-logo-section {
            height: 100px;
            margin-bottom: var(--space-md);
            padding: var(--space-sm);
          }

          .car-logo {
            max-width: 80px;
          }

          .car-name {
            font-size: var(--text-lg);
          }

          .car-category {
            font-size: var(--text-xs);
          }

          .car-visit-btn {
            padding: var(--space-xs) var(--space-sm);
            font-size: var(--text-xs);
          }

          .progress-track {
            margin: var(--space-xl) 0;
            justify-content: center;
            flex-wrap: wrap;
            max-height: 60px;
            overflow-y: auto;
            gap: var(--space-sm);
          }

          .progress-dot {
            width: 8px;
            height: 8px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-sm);
          }
          
          .stat-card {
            padding: var(--space-sm);
          }
        }

        @media (max-width: 480px) {
          .train-display {
            gap: var(--space-sm);
            padding: 0 var(--space-xs);
            min-height: 320px;
          }

          .train-nav {
            width: 40px;
            height: 40px;
          }

          .train-viewport {
            height: 320px;
          }

          .train-car {
            width: 200px;
            height: 280px;
            padding: var(--space-md);
          }

          .car-logo-section {
            height: 80px;
            padding: var(--space-xs);
          }

          .car-name {
            font-size: var(--text-base);
          }

          .partners-container {
            padding: 0 var(--space-sm);
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .train-car,
          .car-glow,
          .progress-dot,
          .stat-card {
            transition: none;
            animation: none;
          }

          .car-details {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
};

export default StoreLogoTrain;