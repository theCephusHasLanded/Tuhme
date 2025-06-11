import { useState, useEffect } from 'react';
import { getBrandSVG } from './BrandSVGs';
import storeService from '../services/storeService';

const StoreLogoTrain = ({ speed = 50, direction = 'left' }) => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    // Get all stores and duplicate for seamless loop
    const allStores = storeService.getAllStores();
    const featuredStores = allStores.filter(store => store.featured);
    const regularStores = allStores.filter(store => !store.featured);
    
    // Mix featured and regular stores for variety
    const mixedStores = [...featuredStores, ...regularStores].slice(0, 20);
    
    // Duplicate for seamless scrolling
    setStores([...mixedStores, ...mixedStores, ...mixedStores]);
  }, []);

  const animationStyle = {
    '--scroll-speed': `${speed}s`,
    '--scroll-direction': direction === 'left' ? 'scroll-left' : 'scroll-right'
  };

  return (
    <section className="store-logo-train">
      <div className="train-container">
        <div className="train-header">
          <h3 className="train-title">Our Luxury Partners</h3>
          <p className="train-subtitle">Curated selection of NYC's finest boutiques and brands</p>
        </div>
        
        <div className="train-track" style={animationStyle}>
          <div className="train-cars">
            {stores.map((store, index) => (
              <div 
                key={`${store.id}-${index}`} 
                className={`train-car ${store.featured ? 'featured' : ''}`}
                title={`${store.name} - ${store.neighborhood}`}
              >
                <div className="car-content">
                  <div className="brand-logo">
                    <div 
                      className="brand-svg"
                      dangerouslySetInnerHTML={{ 
                        __html: getBrandSVG(store.id) 
                      }}
                    />
                  </div>
                  <div className="store-meta">
                    <span className="store-name">{store.name}</span>
                    <span className="store-category">{store.category}</span>
                    <span className="store-neighborhood">{store.neighborhood}</span>
                  </div>
                </div>
                
                <div className="car-glow"></div>
                <div className="car-reflection"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="train-stats">
          <div className="stat">
            <span className="stat-number">{storeService.getAllStores().length}</span>
            <span className="stat-label">Partner Stores</span>
          </div>
          <div className="stat">
            <span className="stat-number">{storeService.getFeaturedStores().length}</span>
            <span className="stat-label">Featured Partners</span>
          </div>
          <div className="stat">
            <span className="stat-number">2</span>
            <span className="stat-label">NYC Boroughs</span>
          </div>
          <div className="stat">
            <span className="stat-number">{storeService.getAverageRating()}</span>
            <span className="stat-label">Avg Rating</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .store-logo-train {
          padding: 4rem 0;
          background: linear-gradient(135deg, 
            var(--bg-luxury) 0%, 
            var(--bg-primary) 50%, 
            var(--bg-luxury) 100%);
          position: relative;
          overflow: hidden;
        }

        .store-logo-train::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6e57' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
          opacity: 0.5;
          z-index: -1;
        }

        .train-container {
          max-width: 100%;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .train-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .train-title {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: var(--weight-bold);
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          letter-spacing: var(--tracking-tight);
        }

        .train-subtitle {
          font-family: var(--font-primary);
          font-size: var(--text-lg);
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
          line-height: var(--leading-relaxed);
        }

        .train-track {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 2rem 0;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .train-cars {
          display: flex;
          gap: 2rem;
          animation: var(--scroll-direction) var(--scroll-speed) linear infinite;
          will-change: transform;
        }

        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .train-car {
          min-width: 280px;
          height: 120px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 110, 87, 0.15);
          border-radius: 16px;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .train-car:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 110, 87, 0.3);
          box-shadow: 
            0 15px 35px rgba(0, 0, 0, 0.1),
            0 0 25px rgba(255, 110, 87, 0.15);
        }

        .train-car.featured {
          border-color: rgba(212, 175, 55, 0.3);
          background: rgba(212, 175, 55, 0.05);
        }

        .train-car.featured:hover {
          border-color: rgba(212, 175, 55, 0.5);
          box-shadow: 
            0 15px 35px rgba(0, 0, 0, 0.1),
            0 0 25px rgba(212, 175, 55, 0.15);
        }

        .car-content {
          display: flex;
          flex-direction: column;
          height: 100%;
          z-index: 2;
          position: relative;
        }

        .brand-logo {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .brand-svg {
          width: 100%;
          max-width: 160px;
          height: auto;
          color: var(--text-primary);
          opacity: 0.9;
        }

        .store-meta {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          text-align: center;
        }

        .store-name {
          font-family: var(--font-display);
          font-size: var(--text-sm);
          font-weight: var(--weight-semibold);
          color: var(--text-primary);
          letter-spacing: var(--tracking-wide);
        }

        .store-category {
          font-family: var(--font-primary);
          font-size: var(--text-xs);
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wider);
        }

        .store-neighborhood {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--text-tertiary);
          letter-spacing: var(--tracking-normal);
        }

        .car-glow {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, 
            rgba(255, 110, 87, 0.2) 0%, 
            rgba(255, 140, 66, 0.1) 25%,
            rgba(87, 212, 255, 0.1) 50%,
            rgba(255, 110, 87, 0.2) 75%,
            rgba(212, 175, 55, 0.1) 100%);
          background-size: 400% 400%;
          border-radius: 18px;
          animation: shimmer 6s linear infinite;
          opacity: 0;
          z-index: -1;
          transition: opacity 0.3s ease;
        }

        .train-car:hover .car-glow {
          opacity: 1;
        }

        .car-reflection {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s ease;
          z-index: 1;
        }

        .train-car:hover .car-reflection {
          left: 100%;
        }

        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .train-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 110, 87, 0.1);
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: var(--weight-bold);
          color: var(--color-primary-600);
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-family: var(--font-primary);
          font-size: var(--text-sm);
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wider);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .train-container {
            padding: 0 1rem;
          }

          .train-car {
            min-width: 240px;
            height: 100px;
            padding: 1rem;
          }

          .train-stats {
            gap: 1.5rem;
            flex-wrap: wrap;
          }

          .stat-number {
            font-size: var(--text-xl);
          }

          .stat-label {
            font-size: var(--text-xs);
          }
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .train-cars {
            animation: none;
          }
          
          .car-glow {
            animation: none;
          }
        }

        /* Dark mode adjustments */
        @media (prefers-color-scheme: dark) {
          .train-car {
            background: rgba(0, 0, 0, 0.2);
          }

          .brand-svg {
            color: var(--text-primary);
          }
        }
      `}</style>
    </section>
  );
};

export default StoreLogoTrain;