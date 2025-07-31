import React, { useState, useEffect, useRef } from 'react';
import { getBrandSVG } from './BrandSVGs';
import storeService from '../services/storeService';
import tuhmeLogo from '../assets/tuhme.png';

const ImmersiveStoreDiscovery = () => {
  const [stores, setStores] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleStores, setVisibleStores] = useState(3);
  const [saleStores, setSaleStores] = useState([]);
  const [dailySeed, setDailySeed] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const containerRef = useRef(null);

  // Generate daily seed for consistent randomization
  useEffect(() => {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    setDailySeed(seed);
  }, []);

  // Shuffle array using daily seed
  const shuffleWithSeed = (array, seed) => {
  const shuffled = [...array];
  let currentIndex = shuffled.length;
  
  const seededRandom = (s) => {
  const x = Math.sin(s) * 10000;
  return x - Math.floor(x);
  };
  
  while (0 !== currentIndex) {
  const randomIndex = Math.floor(seededRandom(seed + currentIndex) * currentIndex);
  currentIndex -= 1;
  
  const temporaryValue = shuffled[currentIndex];
  shuffled[currentIndex] = shuffled[randomIndex];
  shuffled[randomIndex] = temporaryValue;
  }
  
  return shuffled;
  };

  // Initialize stores with sales detection
  useEffect(() => {
  if (dailySeed === 0) return;
  
  // Sales detection algorithm
  const detectStoresSales = () => {
  const allStores = storeService.getAllStores();
  const salesStores = [];
    
    allStores.forEach((store) => {
      const saleChance = (parseInt(store.id.replace(/\D/g, ''), 10) + dailySeed) % 100;
    const hasSale = saleChance < 25;
    
    if (hasSale) {
      const salePercentage = 10 + (saleChance % 40);
      salesStores.push({
        ...store,
          salePercentage,
          saleType: saleChance < 8 ? 'Flash Sale' : saleChance < 15 ? 'Weekend Special' : 'Daily Deal'
        });
        }
      });
      
      return salesStores;
  };
  
  const salesStores = detectStoresSales();
  setSaleStores(salesStores);
  
  const allStores = storeService.getAllStores();
  const regularStores = allStores.filter(store => 
  !salesStores.find(saleStore => saleStore.id === store.id)
  );
  
  const shuffledRegular = shuffleWithSeed(regularStores, dailySeed);
  const finalStoreOrder = [...salesStores, ...shuffledRegular];
  
  setStores(finalStoreOrder);
  }, [dailySeed]);

  // Determine visible stores based on container width
  useEffect(() => {
    const updateVisibleStores = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        if (width < 768) setVisibleStores(1);
        else if (width < 1200) setVisibleStores(2);
        else setVisibleStores(3);
      }
    };

    updateVisibleStores();
    window.addEventListener('resize', updateVisibleStores);
    return () => window.removeEventListener('resize', updateVisibleStores);
  }, []);

  const nextStore = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % stores.length);
      setIsTransitioning(false);
    }, 300);
  };

  const prevStore = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + stores.length) % stores.length);
      setIsTransitioning(false);
    }, 300);
  };



  const generateWebsitePreview = (store) => {
    // Generate a mock website preview based on store data
    return `https://api.microlink.io/?url=${encodeURIComponent(store.website)}&screenshot=true&meta=false&embed=screenshot.url`;
  };

  const generateUnsplashFallback = (store) => {
    // Generate category-based Unsplash images
    const categoryMap = {
      'Luxury Department Store': 'luxury+department+store',
      'Luxury Fashion': 'luxury+fashion+boutique',
      'Luxury Jewelry': 'luxury+jewelry+store',
      'Contemporary Fashion': 'fashion+boutique',
      'Streetwear': 'streetwear+store',
      'Sustainable Fashion': 'sustainable+fashion',
      'Activewear': 'activewear+store'
    };

    const searchTerm = categoryMap[store.category] || 'luxury+retail+store';
    return `https://source.unsplash.com/800x600/?${searchTerm}&sig=${store.id}`;
  };

  const getVisibleStoreIndices = () => {
    const indices = [];
    for (let i = 0; i < visibleStores; i++) {
      indices.push((currentIndex + i) % stores.length);
    }
    return indices;
  };

  const isStoreOnSale = (store) => {
    return saleStores.find(saleStore => saleStore.id === store.id);
  };

  if (stores.length === 0) {
    return (
      <div className="immersive-store-discovery loading">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p>Discovering amazing stores...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="immersive-store-discovery" ref={containerRef}>
      <div className="discovery-header">
        <h1 className="discovery-title">Discover Partner Stores</h1>
        <p className="discovery-subtitle">
          Explore {stores.length} curated luxury retailers with exclusive offers and previews
        </p>
        {saleStores.length > 0 && (
          <div className="sale-indicator">
            <span className="sale-icon">🔥</span>
            <span>{saleStores.length} stores on sale today</span>
          </div>
        )}
      </div>

      <div className="store-queue-container">
        <button
          className="nav-button nav-prev"
          onClick={prevStore}
          disabled={isTransitioning}
          aria-label="Previous store"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className={`store-queue ${isTransitioning ? 'transitioning' : ''}`}>
          {getVisibleStoreIndices().map((storeIndex, queuePosition) => {
            const store = stores[storeIndex];
            const saleInfo = isStoreOnSale(store);
            const isMainStore = queuePosition === 0;

            return (
              <div
              key={`${store.id}-${queuePosition}`}
              className={`store-card ${isMainStore ? 'main-store' : 'queue-store'} ${saleInfo ? 'on-sale' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(store.website, '_blank');
              }}
              style={{
                '--queue-position': queuePosition,
              cursor: 'pointer'
              }}
              >
                {saleInfo && (
                  <div className="sale-badge">
                    <span className="sale-percentage">{saleInfo.salePercentage}% OFF</span>
                    <span className="sale-type">{saleInfo.saleType}</span>
                  </div>
                )}

                <div className="store-preview-window">
                  <div className="website-preview">
                    {/* Website preview background */}
                    <div className="website-background">
                      <img
                        src={generateWebsitePreview(store)}
                        alt={`${store.name} website preview`}
                        className="website-preview-image"
                        onError={(e) => {
                          // Fallback to Unsplash if website preview fails
                          e.target.src = generateUnsplashFallback(store);
                        }}
                      />
                    </div>

                    {/* Opaque TUHME Logo Overlay */}
                    <div className="tuhme-logo-overlay">
                      <div className="overlay-backdrop"></div>
                      <div
                        className={`tuhme-logo-container animation-variant-${(storeIndex + queuePosition) % 4}`}
                        style={{
                          '--animation-delay': `${(storeIndex + queuePosition) * 0.3}s`,
                          '--store-accent': saleInfo ? '#d4af37' : '#8b9dc3'
                        }}
                      >
                        <img
                          src={tuhmeLogo}
                          alt="TUHME"
                          className="tuhme-logo-image"
                        />
                        <div className="logo-glow-ring"></div>
                        <div className="logo-particles">
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={i}
                              className="particle"
                              style={{ '--particle-delay': `${i * 0.5}s` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="brand-logo-overlay">
                      <div
                        className="brand-svg"
                        dangerouslySetInnerHTML={{
                          __html: getBrandSVG(store.id)
                        }}
                      />
                    </div>
                  </div>

                  <div className="preview-overlay">
                    <span className="preview-label">Click to visit {store.name}</span>
                  </div>
                </div>

                <div className="store-details">
                  <div className="store-header">
                    <h3 className="store-name">{store.name}</h3>
                    <div className="store-rating">
                      <span className="rating-stars">★ {store.rating}</span>
                      <span className={`status-indicator ${store.isOpen ? 'open' : 'closed'}`}>
                        {store.isOpen ? 'Open' : 'Closed'}
                      </span>
                    </div>
                  </div>

                  <div className="store-meta">
                    <p className="store-category">{store.category}</p>
                    <p className="store-location">{store.neighborhood}</p>
                    <p className="store-address">{store.address}</p>
                  </div>

                  {store.hours && (
                    <div className="store-hours">
                      <p className="hours-today">
                        Today: {store.hours[new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()]}
                      </p>
                    </div>
                  )}

                  {store.specialties && (
                    <div className="store-specialties">
                      {store.specialties.slice(0, 3).map((specialty, idx) => (
                        <span key={idx} className="specialty-tag">{specialty}</span>
                      ))}
                    </div>
                  )}

                  <div className="store-actions">
                    <button 
                      className="shop-btn primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(store.website, '_blank');
                      }}
                    >
                      {saleInfo ? `Shop ${saleInfo.salePercentage}% Off` : 'Shop Now'}
                    </button>
                    <button 
                      className="visit-btn secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(store.website, '_blank');
                      }}
                    >
                      Visit Store
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          className="nav-button nav-next"
          onClick={nextStore}
          disabled={isTransitioning}
          aria-label="Next store"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>



      <style jsx>{`
        .immersive-store-discovery {
          padding: 6rem 2rem;
          background: linear-gradient(135deg,
            var(--bg-luxury) 0%,
            var(--bg-primary) 50%,
            var(--bg-luxury) 100%);
          position: relative;
          overflow: visible;
          min-height: 80vh;
        }

        .discovery-header {
          text-align: center;
          margin-bottom: 4rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .discovery-title {
          /* Uses global font system - inherits from .brand-font */
          margin-bottom: 1rem;
        }

        .discovery-subtitle {
          font-size: var(--text-lg);
          color: var(--text-secondary);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .sale-indicator {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 110, 87, 0.1);
          border: 1px solid rgba(255, 110, 87, 0.3);
          border-radius: 50px;
          padding: 0.5rem 1rem;
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--color-primary-600);
        }

        .sale-icon {
          font-size: 1.2em;
        }

        .store-queue-container {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-bottom: 4rem;
          justify-content: center;
        }

        .nav-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .nav-button:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        .nav-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: scale(1);
        }

        .store-queue {
          display: flex;
          gap: 2rem;
          transition: all 0.3s ease;
          max-width: 1200px;
        }

        .store-queue.transitioning {
          opacity: 0.7;
          transform: scale(0.98);
        }

        .store-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.4s ease;
          position: relative;
          cursor: pointer;
        }

        .store-card.main-store {
          width: 450px;
          height: 600px;
          transform: scale(1);
          z-index: 3;
        }

        .store-card.queue-store {
          width: 350px;
          height: 520px;
          transform: scale(0.9);
          opacity: 0.8;
          z-index: calc(2 - var(--queue-position));
        }

        .store-card:hover {
          transform: scale(1.05) translateY(-10px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
          border-color: rgba(255, 110, 87, 0.3);
        }

        .store-card.on-sale {
          border-color: rgba(212, 175, 55, 0.4);
          background: rgba(212, 175, 55, 0.05);
        }

        .sale-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: linear-gradient(135deg, #ff6e57, #ff8c42);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 12px;
          font-size: var(--text-xs);
          font-weight: 700;
          z-index: 10;
          text-align: center;
          box-shadow: 0 4px 12px rgba(255, 110, 87, 0.3);
        }

        .sale-percentage {
          display: block;
          font-size: var(--text-sm);
        }

        .sale-type {
          display: block;
          font-size: var(--text-xs);
          opacity: 0.9;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .store-preview-window {
          height: 250px;
          position: relative;
          overflow: hidden;
          background: #f8f9fa;
        }

        .website-preview {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        /* Website Background */
        .website-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        }

        .website-preview-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
        }

        /* TUHME Logo Overlay */
        .tuhme-logo-overlay {
          position: absolute;
          top: 0;
        left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
        justify-content: center;
        z-index: 2;
        }

        .overlay-backdrop {
        position: absolute;
        top: 0;
        left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, 
          rgba(0, 0, 0, 0.7) 0%, 
            rgba(26, 26, 26, 0.8) 50%, 
            rgba(0, 0, 0, 0.7) 100%);
          backdrop-filter: blur(8px);
        }

        .brand-logo-overlay {
          position: absolute;
          top: 1rem;
          left: 1rem;
          width: 80px;
          height: 40px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3;
          transition: opacity 0.3s ease;
        }

        .store-card:hover .brand-logo-overlay {
          opacity: 0.7;
        }

        /* TUHME Logo Animation Container */
        .tuhme-logo-container {
          position: relative;
          width: 200px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tuhme-logo-image {
          width: 180px;
          height: auto;
          z-index: 3;
          position: relative;
          filter: drop-shadow(0 0 20px var(--store-accent, #d4af37));
          animation: logoFloat 3s ease-in-out infinite;
          animation-delay: var(--animation-delay, 0s);
        }

        /* Animation Variants */
        .animation-variant-0 .tuhme-logo-image {
          animation: logoFloat 3s ease-in-out infinite;
        }

        .animation-variant-1 .tuhme-logo-image {
          animation: logoPulse 2.5s ease-in-out infinite;
        }

        .animation-variant-2 .tuhme-logo-image {
          animation: logoSway 4s ease-in-out infinite;
        }

        .animation-variant-3 .tuhme-logo-image {
          animation: logoGlow 3.5s ease-in-out infinite;
        }

        /* Logo Glow Ring */
        .logo-glow-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 220px;
          height: 140px;
          border: 2px solid var(--store-accent, #d4af37);
          border-radius: 50%;
          opacity: 0.3;
          animation: ringPulse 4s ease-in-out infinite;
          animation-delay: var(--animation-delay, 0s);
        }

        /* Logo Particles */
        .logo-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: var(--store-accent, #d4af37);
          border-radius: 50%;
          opacity: 0;
          animation: particleFloat 6s ease-in-out infinite;
          animation-delay: var(--particle-delay, 0s);
        }

        .particle:nth-child(1) { top: 20%; left: 20%; }
        .particle:nth-child(2) { top: 30%; right: 25%; }
        .particle:nth-child(3) { bottom: 30%; left: 30%; }
        .particle:nth-child(4) { bottom: 25%; right: 20%; }
        .particle:nth-child(5) { top: 50%; left: 10%; }
        .particle:nth-child(6) { top: 40%; right: 15%; }

        /* Animation Keyframes */
        @keyframes logoFloat {
          0%, 100% {
            transform: translateY(0) scale(1);
            filter: drop-shadow(0 0 20px var(--store-accent, #d4af37));
          }
          50% {
            transform: translateY(-8px) scale(1.02);
            filter: drop-shadow(0 0 30px var(--store-accent, #d4af37));
          }
        }

        @keyframes logoPulse {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 15px var(--store-accent, #d4af37));
          }
          50% {
            transform: scale(1.05);
            filter: drop-shadow(0 0 35px var(--store-accent, #d4af37));
          }
        }

        @keyframes logoSway {
          0%, 100% {
            transform: rotate(0deg) translateY(0);
            filter: drop-shadow(0 0 18px var(--store-accent, #d4af37));
          }
          25% {
            transform: rotate(1deg) translateY(-3px);
            filter: drop-shadow(0 0 25px var(--store-accent, #d4af37));
          }
          75% {
            transform: rotate(-1deg) translateY(-3px);
            filter: drop-shadow(0 0 25px var(--store-accent, #d4af37));
          }
        }

        @keyframes logoGlow {
          0%, 100% {
            filter: drop-shadow(0 0 15px var(--store-accent, #d4af37)) brightness(1);
          }
          50% {
            filter: drop-shadow(0 0 40px var(--store-accent, #d4af37)) brightness(1.1);
          }
        }

        @keyframes ringPulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.6;
          }
        }

        @keyframes particleFloat {
          0%, 100% {
            opacity: 0;
            transform: translateY(0) scale(0.5);
          }
          25% {
            opacity: 0.8;
            transform: translateY(-15px) scale(1);
          }
          50% {
            opacity: 1;
            transform: translateY(-30px) scale(1.2);
          }
          75% {
            opacity: 0.6;
            transform: translateY(-20px) scale(0.8);
          }
        }

        .brand-logo {
          max-width: 120px;
          max-height: 80px;
        }

        .brand-svg {
          width: 100%;
          height: 100%;
          color: white;
        }

        .preview-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 1rem;
          z-index: 4;
        }

        .preview-label {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: var(--text-xs);
          font-weight: 500;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          opacity: 0.8;
          transition: all 0.3s ease;
        }

        .store-card:hover .preview-label {
          background: rgba(255, 255, 255, 0.2);
          opacity: 1;
        }

        .store-details {
          padding: 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .store-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .store-name {
          /* Uses global font system - inherits from h3/luxury-font */
          margin: 0;
        }

        .store-rating {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;
        }

        .rating-stars {
          color: #fbbf24;
          font-size: var(--text-sm);
          font-weight: 600;
        }

        .status-indicator {
          font-size: var(--text-xs);
          font-weight: 600;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-indicator.open {
          background: rgba(34, 197, 94, 0.15);
          color: #16a34a;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }

        .status-indicator.closed {
          background: rgba(239, 68, 68, 0.15);
          color: #dc2626;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .store-meta {
          margin-bottom: 1rem;
        }

        .store-category {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--color-primary-600);
          margin: 0 0 0.5rem 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .store-location {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          margin: 0 0 0.25rem 0;
          font-weight: 600;
        }

        .store-address {
          font-size: var(--text-xs);
          color: var(--text-secondary);
          margin: 0;
          opacity: 0.8;
        }

        .store-hours {
          margin-bottom: 1rem;
        }

        .hours-today {
          font-size: var(--text-xs);
          color: var(--text-secondary);
          margin: 0;
          font-weight: 500;
        }

        .store-specialties {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .specialty-tag {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-secondary);
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          font-size: var(--text-xs);
          font-weight: 500;
        }

        .store-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: auto;
        }

        .shop-btn, .visit-btn {
          flex: 1;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: var(--text-sm);
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }

        .shop-btn.primary {
          background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-500));
          color: white;
        }

        .shop-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 110, 87, 0.3);
        }

        .visit-btn.secondary {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .visit-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .discovery-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--color-primary-600);
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 500;
        }

        .store-preview-tooltip {
          position: fixed;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(20px);
          color: white;
          padding: 1rem;
          border-radius: 12px;
          font-size: var(--text-sm);
          max-width: 300px;
          z-index: 1000;
          pointer-events: none;
          transform: translateX(-50%);
        }

        .tooltip-content h4 {
          margin: 0 0 0.5rem 0;
          font-weight: 600;
        }

        .tooltip-content p {
          margin: 0 0 0.75rem 0;
          opacity: 0.9;
          line-height: 1.4;
        }

        .tooltip-tags {
          display: flex;
          gap: 0.5rem;
        }

        .tooltip-tag {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: var(--text-xs);
        }

        .tooltip-arrow {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid rgba(0, 0, 0, 0.9);
        }

        .loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
        }

        .loading-content {
          text-align: center;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255, 110, 87, 0.3);
          border-top: 3px solid var(--color-primary-600);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .store-card.main-store {
            width: 400px;
            height: 550px;
          }

          .store-card.queue-store {
            width: 300px;
            height: 450px;
          }
        }

        @media (max-width: 768px) {
          .immersive-store-discovery {
            padding: 4rem 1rem;
          }

          .store-queue-container {
            flex-direction: column;
            gap: 2rem;
          }

          .nav-button {
            width: 50px;
            height: 50px;
          }

          .store-card.main-store,
          .store-card.queue-store {
            width: 100%;
            max-width: 350px;
            height: auto;
            transform: scale(1);
            opacity: 1;
          }

          .discovery-stats {
            flex-wrap: wrap;
            gap: 2rem;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .store-card,
          .preview-image,
          .nav-button {
            transition: none;
          }

          .loading-spinner {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default ImmersiveStoreDiscovery;
