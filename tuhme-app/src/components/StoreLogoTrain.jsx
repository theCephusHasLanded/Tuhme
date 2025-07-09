import { useState, useEffect } from 'react';
import { getBrandSVG } from './BrandSVGs';
import storeService from '../services/storeService';

const StoreLogoTrain = () => {
  const [stores, setStores] = useState([]);
  const [currentStoreIndex, setCurrentStoreIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Get all stores
    const allStores = storeService.getAllStores();
    const featuredStores = allStores.filter(store => store.featured);
    const regularStores = allStores.filter(store => !store.featured);
    
    // Mix featured and regular stores
    const mixedStores = [...featuredStores, ...regularStores];
    setStores(mixedStores);
  }, []);

  const currentStore = stores[currentStoreIndex];
  const totalStores = stores.length;

  const nextStore = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentStoreIndex(prev => (prev + 1) % totalStores);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevStore = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentStoreIndex(prev => (prev - 1 + totalStores) % totalStores);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleStoreClick = (store) => {
    // Direct navigation to store website
    console.log('Store click handler called for:', store.name);
    console.log('Store website:', store.website);
    
    if (store.website) {
      console.log('Opening store website:', store.website);
      window.open(store.website, '_blank', 'noopener,noreferrer');
    } else {
      console.log('No website available for:', store.name);
      alert(`Sorry, no website is available for ${store.name}`);
    }
  };

  if (!currentStore) {
    return null;
  }

  return (
    <section className="luxury-partners-section">
      <div className="partners-container">
        <div className="partners-header">
          <h2 className="partners-title">Our Luxury Partners</h2>
          <p className="partners-subtitle">
            Curated selection of NYC's finest boutiques and brands
          </p>
          <div className="partners-counter">
            <span className="counter-text">
              {currentStoreIndex + 1} of {totalStores} stores
            </span>
          </div>
        </div>

        <div className="panoramic-display">
          <button 
            className="panoramic-nav panoramic-nav-left"
            onClick={prevStore}
            disabled={totalStores <= 1 || isTransitioning}
            title="Previous store"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className="panoramic-viewport">
            <div className={`panoramic-store ${currentStore.featured ? 'featured' : ''} ${isTransitioning ? 'transitioning' : ''}`}>
              <div className="panoramic-content">
                <div className="panoramic-brand">
                  <div
                    className="panoramic-logo"
                    onClick={() => handleStoreClick(currentStore)}
                    title={`Visit ${currentStore.name}`}
                    dangerouslySetInnerHTML={{
                      __html: getBrandSVG(currentStore.id)
                    }}
                  />
                </div>
                
                <div className="panoramic-info">
                  <h3 className="panoramic-name">{currentStore.name}</h3>
                  <p className="panoramic-category">{currentStore.category}</p>
                  <p className="panoramic-neighborhood">{currentStore.neighborhood}</p>
                  
                  <div className="panoramic-status">
                    <span className={`status-badge ${currentStore.isOpen ? 'open' : 'closed'}`}>
                      <span className="status-dot"></span>
                      {currentStore.isOpen ? 'Open Now' : 'Closed'}
                    </span>
                  </div>
                  
                  <div className="panoramic-actions">
                    <button 
                      className="panoramic-visit-btn"
                      onClick={() => handleStoreClick(currentStore)}
                    >
                      <span className="btn-icon">🏪</span>
                      <span className="btn-text">Visit Store</span>
                      <span className="btn-arrow">→</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="panoramic-glow"></div>
            </div>
          </div>
          
          <button 
            className="panoramic-nav panoramic-nav-right"
            onClick={nextStore}
            disabled={totalStores <= 1 || isTransitioning}
            title="Next store"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="partners-stats">
          <div className="stat-item">
            <span className="stat-number">{storeService.getAllStores().length}</span>
            <span className="stat-label">Partner Stores</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{storeService.getFeaturedStores().length}</span>
            <span className="stat-label">Featured Partners</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">2</span>
            <span className="stat-label">NYC Boroughs</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{storeService.getAverageRating()}</span>
            <span className="stat-label">Avg Rating</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .luxury-partners-section {
          padding: 6rem 0;
          background: linear-gradient(135deg,
            var(--bg-luxury, #0a0a0a) 0%,
            var(--bg-primary, #1a1a1a) 50%,
            var(--bg-luxury, #0a0a0a) 100%);
          position: relative;
          overflow: hidden;
          text-align: center;
        }

        .luxury-partners-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(212, 175, 55, 0.03) 0%, transparent 50%);
          pointer-events: none;
          z-index: 1;
        }

        .partners-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 2;
        }

        .partners-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .partners-title {
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 700;
          color: var(--text-primary, #ffffff);
          margin-bottom: 1rem;
          letter-spacing: var(--tracking-tight);
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .partners-subtitle {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          color: var(--text-secondary, rgba(255, 255, 255, 0.8));
          max-width: 600px;
          margin: 0 auto 2rem;
          line-height: var(--leading-relaxed);
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .partners-counter {
          margin-top: 1.5rem;
        }

        .counter-text {
          font-family: var(--font-display);
          font-size: var(--text-base);
          color: var(--text-secondary, rgba(255, 255, 255, 0.7));
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 25px;
          padding: 0.75rem 1.5rem;
          display: inline-block;
          font-weight: 500;
        }

        .panoramic-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3rem;
          margin: 4rem 0;
          min-height: 400px;
        }

        .panoramic-viewport {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1000px;
          max-width: 700px;
        }

        .panoramic-store {
          width: 100%;
          height: 350px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(24px) saturate(180%) brightness(110%);
          -webkit-backdrop-filter: blur(24px) saturate(180%) brightness(110%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 32px;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          z-index: 1;
          box-shadow: 
            0 15px 60px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transform: scale(1);
        }

        .panoramic-store:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .panoramic-store.transitioning {
          opacity: 0.7;
          transform: scale(0.98);
        }

        .panoramic-store.featured {
          border-color: rgba(212, 175, 55, 0.3);
          background: rgba(212, 175, 55, 0.08);
        }

        .panoramic-store.featured::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent, rgba(212, 175, 55, 0.05), transparent);
          border-radius: 32px;
          pointer-events: none;
        }

        .panoramic-content {
          display: flex;
          height: 100%;
          gap: 2.5rem;
          align-items: center;
          z-index: 2;
          position: relative;
        }

        .panoramic-brand {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .panoramic-logo {
          width: 100%;
          max-width: 240px;
          height: auto;
          color: var(--text-primary, #ffffff);
          opacity: 0.9;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 1.5rem;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .panoramic-logo:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .panoramic-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1.25rem;
          text-align: left;
        }

        .panoramic-name {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--text-primary, #ffffff);
          margin: 0;
          letter-spacing: var(--tracking-tight);
          text-shadow: 0 3px 6px rgba(0, 0, 0, 0.4);
        }

        .panoramic-category {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          color: var(--text-secondary, rgba(255, 255, 255, 0.8));
          text-transform: uppercase;
          letter-spacing: var(--tracking-wider);
          font-weight: 600;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .panoramic-neighborhood {
          font-family: var(--font-display);
          font-size: var(--text-base);
          color: var(--text-secondary, rgba(255, 255, 255, 0.7));
          font-weight: 500;
          margin: 0;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }

        .panoramic-status {
          margin: 0.5rem 0;
        }

        .status-badge {
          font-family: var(--font-display);
          font-size: var(--text-sm);
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: var(--tracking-wider);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
          animation: pulse 2s infinite;
        }

        .status-badge.open {
          background: rgba(34, 197, 94, 0.15);
          color: #22c55e;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }

        .status-badge.open .status-dot {
          background: #22c55e;
          box-shadow: 0 0 8px rgba(34, 197, 94, 0.4);
        }

        .status-badge.closed {
          background: rgba(239, 68, 68, 0.15);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .status-badge.closed .status-dot {
          background: #ef4444;
          box-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
        }

        .panoramic-actions {
          display: flex;
          gap: 1rem;
        }

        .panoramic-visit-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%);
          border: none;
          border-radius: 16px;
          color: white;
          font-family: var(--font-display);
          font-size: var(--text-base);
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: 0 8px 32px rgba(212, 175, 55, 0.3);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        .panoramic-visit-btn:hover {
          background: linear-gradient(135deg, #e6c547 0%, #c9971b 100%);
        }

        .panoramic-visit-btn .btn-arrow {
          font-size: 1.2rem;
          transition: transform 0.3s ease;
        }

        .panoramic-visit-btn:hover .btn-arrow {
          transform: translateX(4px);
        }

        .panoramic-nav {
          width: 72px;
          height: 72px;
          background: rgba(212, 175, 55, 0.15);
          backdrop-filter: blur(20px) saturate(180%) brightness(110%);
          -webkit-backdrop-filter: blur(20px) saturate(180%) brightness(110%);
          border: 2px solid rgba(212, 175, 55, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: rgba(255, 255, 255, 0.9);
          flex-shrink: 0;
          z-index: 10;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .panoramic-nav:hover:not(:disabled) {
          background: rgba(212, 175, 55, 0.25);
          border-color: rgba(212, 175, 55, 0.5);
          color: #ffffff;
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
        }

        .panoramic-nav:disabled {
          opacity: 0.3;
          cursor: not-allowed;
          transform: none;
        }

        .panoramic-nav svg {
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        .panoramic-glow {
          display: none;
        }

        .partners-stats {
          display: flex;
          justify-content: center;
          gap: 4rem;
          margin-top: 4rem;
          padding-top: 3rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 700;
          color: var(--accent-color, #d4af37);
          margin-bottom: 0.5rem;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .stat-label {
          font-family: var(--font-display);
          font-size: var(--text-sm);
          color: var(--text-secondary, rgba(255, 255, 255, 0.7));
          text-transform: uppercase;
          letter-spacing: var(--tracking-wider);
          font-weight: 600;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }


        /* Mobile Responsive */
        @media (max-width: 768px) {
          .partners-container {
            padding: 0 1rem;
          }

          .panoramic-display {
            flex-direction: column;
            gap: 2rem;
            margin: 3rem 0;
          }

          .panoramic-nav {
            width: 60px;
            height: 60px;
          }

          .panoramic-store {
            height: 300px;
            padding: 2rem;
          }

          .panoramic-content {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
          }

          .panoramic-brand {
            flex: none;
            height: 120px;
          }

          .panoramic-logo {
            max-width: 180px;
          }

          .panoramic-info {
            text-align: center;
          }

          .panoramic-name {
            font-size: var(--text-2xl);
          }

          .panoramic-category {
            font-size: var(--text-base);
          }

          .panoramic-visit-btn {
            padding: 0.75rem 1.5rem;
            font-size: var(--text-sm);
          }

          .partners-stats {
            gap: 2rem;
            flex-wrap: wrap;
          }

          .stat-number {
            font-size: var(--text-2xl);
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .panoramic-store,
          .panoramic-glow,
          .panoramic-nav,
          .panoramic-logo,
          .status-dot {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
};

export default StoreLogoTrain;