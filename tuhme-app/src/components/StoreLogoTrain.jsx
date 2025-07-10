import { useState, useEffect, useMemo } from 'react';
import { getBrandSVG } from './BrandSVGs';
import storeService from '../services/storeService';

const StoreLogoTrain = () => {
  const [stores, setStores] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'carousel'
  const storesPerPage = 6;

  useEffect(() => {
    const allStores = storeService.getAllStores();
    const featuredStores = allStores.filter(store => store.featured);
    const regularStores = allStores.filter(store => !store.featured);

    // Mix featured and regular stores for better variety
    const mixedStores = [...featuredStores, ...regularStores];
    setStores(mixedStores);
  }, []);

  const totalPages = Math.ceil(stores.length / storesPerPage);
  const currentStores = useMemo(() => {
    const startIndex = currentPage * storesPerPage;
    return stores.slice(startIndex, startIndex + storesPerPage);
  }, [stores, currentPage, storesPerPage]);

  const handleStoreClick = (store) => {
    if (store.website) {
      window.open(store.website, '_blank', 'noopener,noreferrer');
    } else {
      alert(`Sorry, no website is available for ${store.name}`);
    }
  };

  const nextPage = () => {
    setCurrentPage(prev => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage(prev => (prev - 1 + totalPages) % totalPages);
  };

  const jumpToPage = (page) => {
    setCurrentPage(page);
  };

  if (stores.length === 0) {
    return (
      <section className="store-section">
        <div className="store-container">
          <div className="loading-state">Loading stores...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="store-section">
      <div className="store-container">
        {/* Header */}
        <div className="store-header">
          <div className="header-content">
            <span className="header-badge">PARTNER STORES</span>
            <h2 className="store-title">Our Local Partners</h2>
            <p className="store-subtitle">
              {stores.length} carefully selected stores across Manhattan & Brooklyn
            </p>
          </div>

          <div className="header-controls">
            <div className="page-counter">
              <span>{currentPage + 1} / {totalPages}</span>
            </div>

            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid view"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                  <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                  <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                  <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              <button
                className={`view-btn ${viewMode === 'carousel' ? 'active' : ''}`}
                onClick={() => setViewMode('carousel')}
                title="Carousel view"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="6" width="20" height="4" stroke="currentColor" strokeWidth="2"/>
                  <rect x="2" y="14" width="20" height="4" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="navigation-controls">
          <button
            className="nav-btn"
            onClick={prevPage}
            disabled={totalPages <= 1}
            title="Previous stores"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Previous
          </button>

          <div className="page-dots">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`page-dot ${index === currentPage ? 'active' : ''}`}
                onClick={() => jumpToPage(index)}
                title={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          <button
            className="nav-btn"
            onClick={nextPage}
            disabled={totalPages <= 1}
            title="Next stores"
          >
            Next
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Store Display */}
        <div className={`store-display ${viewMode}`}>
          {currentStores.map((store) => (
            <div
              key={store.id}
              className={`store-card ${store.featured ? 'featured' : ''}`}
              onClick={() => handleStoreClick(store)}
            >
              <div className="store-visual">
                <div
                  className="store-logo"
                  dangerouslySetInnerHTML={{
                    __html: getBrandSVG(store.id)
                  }}
                />
                {store.featured && (
                  <div className="featured-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                    </svg>
                  </div>
                )}
              </div>

              <div className="store-info">
                <h3 className="store-name">{store.name}</h3>
                <p className="store-category">{store.category}</p>
                <p className="store-location">{store.neighborhood}</p>

                <div className="store-meta">
                  <span className="store-rating">⭐ {store.rating}</span>
                  <span className="store-price">{store.priceRange}</span>
                  <span className={`store-status ${storeService.isStoreOpen(store.id) ? 'open' : 'closed'}`}>
                    {storeService.isStoreOpen(store.id) ? 'Open' : 'Closed'}
                  </span>
                </div>

                <button
                  className="visit-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStoreClick(store);
                  }}
                >
                  Visit Store
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17l10-10M17 7H7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Store Stats */}
        <div className="store-stats">
          <div className="stat-item">
            <span className="stat-number">{stores.length}</span>
            <span className="stat-label">Partner Stores</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stores.filter(s => s.featured).length}</span>
            <span className="stat-label">Featured</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">2</span>
            <span className="stat-label">Boroughs</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{storeService.getAverageRating()}</span>
            <span className="stat-label">Avg Rating</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .store-section {
          padding: var(--space-3xl) 0;
          background: var(--primary-bg);
          border-top: 1px solid var(--border-light);
          border-bottom: 1px solid var(--border-light);
        }

        .store-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--space-lg);
        }

        .loading-state {
          text-align: center;
          padding: var(--space-3xl);
          font-size: var(--text-xl);
          color: var(--secondary-text);
        }

        /* Header */
        .store-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-2xl);
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

        .store-title {
          font-family: var(--font-family-primary);
          font-size: var(--text-4xl);
          font-weight: 700;
          color: var(--primary-text);
          margin: 0 0 var(--space-sm) 0;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .store-subtitle {
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

        .page-counter {
          font-family: var(--font-family-primary);
          font-weight: 700;
          font-size: var(--text-lg);
          color: var(--secondary-text);
        }

        .view-toggle {
          display: flex;
          gap: var(--space-xs);
        }

        .view-btn {
          width: 40px;
          height: 40px;
          background: var(--btn-secondary-bg);
          border: 1px solid var(--border-medium);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-normal);
          color: var(--secondary-text);
        }

        .view-btn:hover,
        .view-btn.active {
          background: var(--accent-primary);
          color: var(--primary-bg);
          border-color: var(--accent-primary);
        }

        /* Navigation Controls */
        .navigation-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-xl);
          padding: var(--space-lg);
          background: var(--tertiary-bg);
          border: 1px solid var(--border-light);
          border-radius: 12px;
        }

        .nav-btn {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-sm) var(--space-lg);
          background: var(--btn-primary-bg);
          color: var(--btn-primary-text);
          border: none;
          border-radius: 8px;
          font-family: var(--font-family-secondary);
          font-size: var(--text-sm);
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        .nav-btn:hover:not(:disabled) {
          background: var(--btn-primary-hover-bg);
          transform: translateY(-1px);
        }

        .nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
          transform: none;
        }

        .page-dots {
          display: flex;
          gap: var(--space-sm);
          align-items: center;
        }

        .page-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--border-medium);
          border: none;
          cursor: pointer;
          transition: all var(--transition-normal);
        }

        .page-dot:hover {
          background: var(--secondary-text);
          transform: scale(1.2);
        }

        .page-dot.active {
          background: var(--accent-primary);
          transform: scale(1.4);
        }

        /* Store Display */
        .store-display {
          margin-bottom: var(--space-3xl);
          min-height: 600px;
        }

        .store-display.grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: var(--space-2xl);
          align-items: start;
          justify-content: center;
        }

        .store-display.carousel {
          display: flex;
          gap: var(--space-xl);
          overflow-x: auto;
          padding-bottom: var(--space-sm);
          scroll-behavior: smooth;
        }

        .store-display.carousel .store-card {
          flex: 0 0 380px;
        }

        .store-card {
          background: var(--tertiary-bg);
          border: 1px solid var(--border-light);
          border-radius: 20px;
          padding: var(--space-2xl);
          cursor: pointer;
          transition: all var(--transition-normal);
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
          position: relative;
          overflow: hidden;
          min-height: 520px;
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          box-shadow: var(--shadow-medium);
        }

        .store-card:hover {
          border-color: var(--border-medium);
          transform: translateY(-4px);
          box-shadow: var(--shadow-strong);
        }

        .store-card.featured {
          border-color: var(--accent-primary)50;
          background: linear-gradient(135deg, var(--tertiary-bg), var(--accent-primary)08);
        }

        .store-visual {
          position: relative;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-lg);
          padding: var(--space-md);
          background: var(--secondary-bg);
          border-radius: 12px;
          border: 1px solid var(--border-light);
        }

        .store-logo {
          width: 100%;
          max-width: 120px;
          height: auto;
          color: var(--primary-text);
          opacity: 0.9;
          transition: all var(--transition-normal);
        }

        .store-card:hover .store-logo {
          opacity: 1;
          transform: scale(1.05);
        }

        .featured-badge {
          position: absolute;
          top: -16px;
          right: -12px;
          width: 40px;
          height: 40px;
          background: var(--accent-primary);
          color: var(--primary-bg);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          box-shadow: var(--shadow-medium);
          border: 2px solid var(--primary-bg);
          z-index: 10;
        }

        .store-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }

        .store-name {
          font-family: var(--font-family-primary);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--primary-text);
          margin: 0;
          line-height: 1.2;
        }

        .store-category {
          font-family: var(--font-family-secondary);
          font-size: var(--text-sm);
          color: var(--accent-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
          margin: 0;
        }

        .store-location {
          font-family: var(--font-family-secondary);
          font-size: var(--text-sm);
          color: var(--secondary-text);
          margin: 0;
        }

        .store-meta {
          display: flex;
          gap: var(--space-sm);
          align-items: center;
          flex-wrap: wrap;
          margin: var(--space-sm) 0;
          justify-content: flex-start;
        }

        .store-rating {
          font-size: var(--text-sm);
          color: var(--primary-text);
        }

        .store-price {
          font-size: var(--text-sm);
          color: var(--secondary-text);
          font-weight: 600;
        }

        .store-status {
          font-size: var(--text-xs);
          padding: var(--space-xs) var(--space-sm);
          border-radius: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          position: relative;
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          min-width: fit-content;
        }

        .store-status.open {
          background: #22c55e20;
          color: #22c55e;
          box-shadow: 0 0 8px rgba(34, 197, 94, 0.3);
          border: 1px solid rgba(34, 197, 94, 0.2);
        }

        .store-status.closed {
          background: #ef444420;
          color: #ef4444;
        }

        .visit-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-sm) var(--space-md);
          background: var(--btn-primary-bg);
          color: var(--btn-primary-text);
          border: none;
          border-radius: 8px;
          font-family: var(--font-family-secondary);
          font-size: var(--text-sm);
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-normal);
          margin-top: auto;
        }

        .visit-btn:hover {
          background: var(--btn-primary-hover-bg);
          transform: translateY(-1px);
        }

        /* Store Stats */
        .store-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: var(--space-lg);
          padding-top: var(--space-2xl);
          border-top: 1px solid var(--border-light);
        }

        .stat-item {
          text-align: center;
          padding: var(--space-lg);
          background: var(--tertiary-bg);
          border: 1px solid var(--border-light);
          border-radius: 12px;
          transition: all var(--transition-normal);
        }

        .stat-item:hover {
          border-color: var(--border-medium);
          transform: translateY(-2px);
        }

        .stat-number {
          display: block;
          font-family: var(--font-family-primary);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--accent-primary);
          line-height: 1;
          margin-bottom: var(--space-xs);
        }

        .stat-label {
          font-family: var(--font-family-secondary);
          font-size: var(--text-sm);
          color: var(--secondary-text);
          font-weight: 500;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .store-section {
            padding: var(--space-2xl) 0;
          }

          .store-container {
            padding: 0 var(--space-md);
          }

          .store-header {
            flex-direction: column;
            text-align: center;
            gap: var(--space-md);
            margin-bottom: var(--space-xl);
          }

          .store-title {
            font-size: var(--text-3xl);
          }

          .header-controls {
            justify-content: center;
            flex-wrap: wrap;
          }

          .navigation-controls {
            flex-direction: column;
            gap: var(--space-md);
            padding: var(--space-md);
          }

          .page-dots {
            order: -1;
            margin-bottom: var(--space-md);
          }

          .nav-btn {
            width: 100%;
            justify-content: center;
            max-width: 200px;
            margin: 0 auto;
          }

          .store-display {
            min-height: auto;
          }

          .store-display.grid {
            grid-template-columns: 1fr;
            gap: var(--space-lg);
            padding: 0 var(--space-xs);
          }

          .store-display.carousel {
            gap: var(--space-md);
            padding: 0 var(--space-xs);
            scroll-snap-type: x mandatory;
          }

          .store-display.carousel .store-card {
            flex: 0 0 280px;
            scroll-snap-align: center;
          }

          .store-card {
            padding: var(--space-lg);
            min-height: 420px;
            margin: 0 auto;
            max-width: 100%;
          }

          .store-visual {
            height: 120px;
            margin-bottom: var(--space-md);
          }

          .store-logo {
            max-width: 80px;
          }

          .store-info {
            gap: var(--space-sm);
          }

          .store-meta {
            gap: var(--space-xs);
            justify-content: center;
            text-align: center;
          }

          .store-rating,
          .store-price {
            font-size: var(--text-xs);
          }

          .store-status {
            font-size: 10px;
            padding: 4px 8px;
            margin: 0 auto;
          }

          .visit-btn {
            padding: var(--space-sm) var(--space-md);
            font-size: var(--text-xs);
            margin-top: var(--space-md);
          }

          .store-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-md);
          }
        }

        @media (max-width: 480px) {
          .store-container {
            padding: 0 var(--space-sm);
          }

          .store-header {
            margin-bottom: var(--space-lg);
          }

          .header-controls {
            flex-direction: column;
            gap: var(--space-sm);
          }

          .navigation-controls {
            padding: var(--space-sm);
            margin-bottom: var(--space-lg);
          }

          .nav-btn {
            padding: var(--space-xs) var(--space-md);
            font-size: var(--text-xs);
            max-width: 180px;
          }

          .page-dots {
            flex-wrap: wrap;
            justify-content: center;
            gap: var(--space-xs);
          }

          .page-dot {
            width: 8px;
            height: 8px;
          }

          .store-display.grid {
            padding: 0;
            gap: var(--space-md);
          }

          .store-display.carousel {
            padding: 0;
            gap: var(--space-sm);
          }

          .store-display.carousel .store-card {
            flex: 0 0 260px;
          }

          .store-card {
            padding: var(--space-md);
            min-height: 380px;
            border-radius: 12px;
          }

          .store-visual {
            height: 100px;
            margin-bottom: var(--space-sm);
          }

          .store-logo {
            max-width: 60px;
          }

          .store-name {
            font-size: var(--text-lg);
          }

          .store-category,
          .store-location {
            font-size: var(--text-xs);
          }

          .store-meta {
            flex-direction: column;
            gap: var(--space-xs);
            align-items: center;
          }

          .store-status {
            font-size: 10px;
            padding: 4px 8px;
            border-radius: 8px;
            margin-bottom: var(--space-xs);
          }

          .visit-btn {
            padding: var(--space-xs) var(--space-sm);
            font-size: 10px;
            border-radius: 8px;
          }

          .stat-item {
            padding: var(--space-sm);
            text-align: center;
          }

          .stat-number {
            font-size: var(--text-lg);
          }

          .stat-label {
            font-size: var(--text-xs);
          }
        }
      `}</style>
    </section>
  );
};

export default StoreLogoTrain;
