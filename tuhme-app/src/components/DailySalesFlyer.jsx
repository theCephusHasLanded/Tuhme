import { useState, useEffect } from 'react';
import { useModal } from '../contexts/ModalContext';
import salesMonitoringService from '../services/salesMonitoringService';
import colorSchemeManager from '../utils/colorSchemeManager';
import './DailySalesFlyer.css';

const DailySalesFlyer = () => {
  const { modals, closeModal } = useModal();
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Use same luxury palettes as Hero
  const luxuryPalettes = [
    { primary: '#0a0a0a', secondary: '#1a1a1a', accent: '#ffffff', name: 'Midnight Mono' },
    { primary: '#1a0f1a', secondary: '#2a1a2a', accent: '#e6c2a6', name: 'Champagne Dusk' },
    { primary: '#0f1419', secondary: '#1a2129', accent: '#8b9dc3', name: 'Sapphire Night' },
    { primary: '#191414', secondary: '#2a2125', accent: '#dda15e', name: 'Cognac Dream' },
    { primary: '#0d1421', secondary: '#1a2332', accent: '#a8dadc', name: 'Tiffany Dawn' },
    { primary: '#1a1a0f', secondary: '#2a2a1a', accent: '#f1faee', name: 'Pearl Morning' },
    { primary: '#1a0f14', secondary: '#2a1a25', accent: '#ffb3ba', name: 'Rose Aurora' },
    { primary: '#0f1a14', secondary: '#1a2a25', accent: '#c7f9cc', name: 'Emerald Mist' },
    { primary: '#14141a', secondary: '#25252a', accent: '#bde0ff', name: 'Crystal Blue' },
    { primary: '#1a140f', secondary: '#2a251a', accent: '#ffd23f', name: 'Saffron Luxury' },
    { primary: '#141a1a', secondary: '#252a2a', accent: '#a663cc', name: 'Amethyst Elite' },
    { primary: '#1a1914', secondary: '#2a2925', accent: '#ffffff', name: 'Mono Prestige' },
    { primary: '#0f141a', secondary: '#1a252a', accent: '#4ecdc4', name: 'Turquoise Calm' },
    { primary: '#1a0f0f', secondary: '#2a1a1a', accent: '#e6c2a6', name: 'Coral Sunset' },
    { primary: '#14141a', secondary: '#25252a', accent: '#f8f32b', name: 'Citrine Bright' },
    { primary: '#1a1a14', secondary: '#2a2a25', accent: '#95e1d3', name: 'Mint Elegance' },
    { primary: '#191014', secondary: '#2a1a25', accent: '#f38ba8', name: 'Peony Blush' },
    { primary: '#141a19', secondary: '#252a29', accent: '#74c0fc', name: 'Azure Luxury' },
    { primary: '#1a1414', secondary: '#2a2525', accent: '#ffd43b', name: 'Topaz Glow' },
    { primary: '#0f1a1a', secondary: '#1a2a2a', accent: '#b197fc', name: 'Lavender Dusk' },
    { primary: '#1a190f', secondary: '#2a291a', accent: '#69db7c', name: 'Jade Prosperity' },
    { primary: '#1a0f19', secondary: '#2a1a29', accent: '#f1faee', name: 'Blush Elegance' },
    { primary: '#0f1a0f', secondary: '#1a2a1a', accent: '#82c91e', name: 'Peridot Fresh' },
    { primary: '#1a1a1a', secondary: '#2a2a2a', accent: '#ffffff', name: 'Classic Mono' }
  ];

  const currentPalette = luxuryPalettes[currentHour % luxuryPalettes.length];

  useEffect(() => {
    if (modals.dailySalesFlyer) {
      loadSalesData();
    }
  }, [modals.dailySalesFlyer]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (modals.dailySalesFlyer) {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [modals.dailySalesFlyer]);

  const loadSalesData = async () => {
    setLoading(true);
    try {
      await salesMonitoringService.fetchAllStoreSales();
      const data = salesMonitoringService.generateDailyFlyerData();
      setSalesData(data);
    } catch (error) {
      console.error('Error loading sales data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStoreImage = (storeName, category) => {
    const storeImageMap = {
      // Luxury Department Stores
      'Nordstrom': 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop&crop=center',
      'Bergdorf Goodman': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop&crop=center',
      'Saks Fifth Avenue': 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop&crop=center',
      
      // Luxury Fashion Houses
      'Tiffany & Co.': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop&crop=center',
      'Chanel': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop&crop=center',
      'Louis Vuitton': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop&crop=center',
      'Gucci': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop&crop=center',
      'Prada': 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop&crop=center',
      'Hermès': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop&crop=center',
      'Dior': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop&crop=center',
      'Miu Miu': 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop&crop=center',
      'Kenzo': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop&crop=center',
      'Loro Piana': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop&crop=center',
      'Brunello Cucinelli': 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop&crop=center',
      'Max Mara': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
      
      // Contemporary Fashion
      'The Webster': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
      'Polène': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop&crop=center',
      'Polène Madison Avenue': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop&crop=center',
      'Zara 5th Avenue Flagship': 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=600&fit=crop&crop=center',
      'Zara SoHo': 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=600&fit=crop&crop=center',
      'Rag & Bone': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
      'Rag & Bone Madison Avenue': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
      'A.P.C. SoHo': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
      'A.P.C. Lower East Side': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
      'Alice + Olivia': 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=600&fit=crop&crop=center',
      'Free People SoHo': 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=600&fit=crop&crop=center',
      'Free People West Village': 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=600&fit=crop&crop=center',
      'J.Crew Rockefeller Center': 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&h=600&fit=crop&crop=center',
      'J.Crew SoHo': 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&h=600&fit=crop&crop=center',
      'James Perse': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
      'Vince SoHo': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
      'Vince Madison Avenue': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
      'Hugo Boss': 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&h=600&fit=crop&crop=center',
      'Hugo Boss SoHo': 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&h=600&fit=crop&crop=center',
      
      // Activewear & Athletic
      'Arc\'teryx': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop&crop=center',
      'Alo SoHo': 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=600&fit=crop&crop=center',
      'Alo Flatiron': 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=600&fit=crop&crop=center',
      'Nike SoHo': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop&crop=center',
      'New Balance': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop&crop=center',
      
      // Sustainable Fashion
      'Allbirds SoHo': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
      'Allbirds Flatiron': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
      'Reformation': 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=600&fit=crop&crop=center',
      
      // Beauty & Fragrance
      'Diptyque': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop&crop=center',
      
      // Luxury Footwear
      'Golden Goose': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop&crop=center',
      
      // Jewelry
      'Pandora': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop&crop=center',
      
      // Leather Goods
      'Wilsons Leather': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop&crop=center',
      
      // Brooklyn Stores
      'Bird Brooklyn': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
      'Catbird': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop&crop=center',
      'Sincerely Tommy': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop&crop=center',
      'Pilgrim Surf + Supply': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop&crop=center',
      'Maryam Nassir Zadeh': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
      'Frankie Shop Brooklyn': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
      'Kith Brooklyn': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop&crop=center'
    };
    
    // NYC Fashion-focused category fallbacks
    const categoryImages = {
      'Luxury Department Store': 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop&crop=center',
      'Luxury Fashion': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop&crop=center',
      'Contemporary Fashion': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
      'Department Store': 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop&crop=center',
      'Luxury Jewelry': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop&crop=center',
      'Jewelry': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop&crop=center',
      'Activewear': 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=600&fit=crop&crop=center',
      'Athletic Wear': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop&crop=center',
      'Streetwear': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop&crop=center',
      'Sustainable Fashion': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
      'Beauty & Fragrance': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop&crop=center',
      'Luxury Footwear': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop&crop=center',
      'Leather Goods': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop&crop=center',
      'Designer Fashion': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop&crop=center',
      'Jewelry & Accessories': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop&crop=center',
      'Lifestyle & Surf': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop&crop=center'
    };
    
    return storeImageMap[storeName] || categoryImages[category] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&crop=center';
  };
  
  const handleStoreClick = (storeWebsite) => {
    if (storeWebsite) {
      window.open(storeWebsite, '_blank', 'noopener,noreferrer');
    }
  };

  const generateWhatsAppLink = () => {
    const storeNames = salesData?.activeSales.slice(0, 3).map(sale => sale.storeName).join(', ') || 'featured stores';
    const message = encodeURIComponent(
      `Hi! I saw your daily sales flyer featuring ${storeNames}. I'd like to start a Tuhme order with screenshots of items I want to try on.`
    );
    return `https://wa.me/16465889916?text=${message}`;
  };

  const backgroundStyle = {
    background: `
      radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%,
        ${currentPalette.accent}15 0%,
        ${currentPalette.primary}95 50%,
        ${currentPalette.secondary}98 100%),
      linear-gradient(135deg,
        ${currentPalette.primary} 0%,
        ${currentPalette.secondary} 100%)
    `,
  };

  if (!modals.dailySalesFlyer) return null;

  return (
    <div className="daily-sales-flyer-overlay">
      <div className="daily-sales-flyer-modal" style={backgroundStyle}>
        {/* Close Button */}
        <button 
          className="flyer-close-btn"
          onClick={() => closeModal('dailySalesFlyer')}
          style={{ color: currentPalette.accent }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Luxury Particles - Same as Hero */}
        <div className="flyer-particles">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="flyer-particle"
              style={{
                '--delay': `${i * 0.3}s`,
                '--accent-color': currentPalette.accent,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`
              }}
            />
          ))}
        </div>

        {/* Floating Elements - Same as Hero */}
        <div className="flyer-floating-elements">
          <div
            className="flyer-floating-ring"
            style={{ '--accent-color': currentPalette.accent }}
          ></div>
          <div
            className="flyer-floating-diamond"
            style={{ '--accent-color': currentPalette.accent }}
          ></div>
        </div>

        <div className="flyer-content">
          {/* Header Section */}
          <div className="flyer-header">
            <div className="flyer-palette-indicator">
              <span className="flyer-palette-name">{currentPalette.name}</span>
              <div className="flyer-time-indicator">{String(currentHour).padStart(2, '0')}:00</div>
            </div>

            <div className="flyer-brand-section">
              <h1 className="flyer-brand-name">TUHME</h1>
              <div className="flyer-brand-line" style={{ background: currentPalette.accent }}></div>
              <p className="flyer-brand-essence">Daily Sales Digest</p>
            </div>
          </div>

          {/* Sales Content */}
          <div className="flyer-main">
            <div className="flyer-title-section">
              <h2 className="flyer-title promotional-title">
                <span className="title-main">TODAY'S HOTTEST</span>
                <span className="title-accent" style={{ color: currentPalette.accent }}>STORE SALES</span>
                <span className="title-sub">Limited Time Offers</span>
              </h2>
              <div className="title-decoration" style={{ background: currentPalette.accent }}></div>
            </div>

            {loading ? (
              <div className="flyer-loading">
                <div className="loading-spinner" style={{ borderTopColor: currentPalette.accent }}></div>
                <p>Curating today's best deals...</p>
              </div>
            ) : salesData?.activeSales.length > 0 ? (
              <>
                <div className="flyer-stats">
                  <div className="stat-item">
                    <span className="stat-number" style={{ color: currentPalette.accent }}>
                      {salesData.activeSales.length}
                    </span>
                    <span className="stat-label">Stores with Active Sales</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number" style={{ color: currentPalette.accent }}>
                      {salesData.stats.avgDiscount}%
                    </span>
                    <span className="stat-label">Average Discount</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number" style={{ color: currentPalette.accent }}>
                      {salesData.urgentSales.length}
                    </span>
                    <span className="stat-label">Ending Today</span>
                  </div>
                </div>

                <div className="flyer-sales-grid">
                  {salesData.activeSales.slice(0, 6).map((sale, index) => {
                    const storeImage = getStoreImage(sale.storeName, sale.category);
                    return (
                      <div 
                        key={sale.storeId} 
                        className="flyer-sale-card promotional-card"
                        style={{
                          animationDelay: `${index * 0.1}s`,
                          borderColor: sale.urgency === 'high' ? currentPalette.accent : 'rgba(255,255,255,0.1)',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleStoreClick(sale.website)}
                      >
                        <div className="sale-image-container">
                          <img 
                            src={storeImage} 
                            alt={`${sale.storeName} sale`}
                            className="sale-store-image"
                            loading="lazy"
                          />
                          <div className="sale-overlay">
                            {sale.urgency === 'high' && (
                              <span className="urgency-badge flash-badge" style={{ background: currentPalette.accent }}>
                                LIMITED TIME
                              </span>
                            )}
                            <div className="sale-discount-badge" style={{ 
                              background: `linear-gradient(135deg, ${currentPalette.accent} 0%, ${currentPalette.accent}CC 100%)`,
                              color: currentPalette.primary
                            }}>
                              {sale.discount}
                              <span className="discount-text">OFF</span>
                            </div>
                          </div>
                        </div>
                        <div className="sale-content">
                          <h3 className="sale-store-name">{sale.storeName}</h3>
                          <div className="sale-category">{sale.category}</div>
                          <div className="sale-type">{sale.saleType}</div>
                          <div className="sale-neighborhood">{sale.neighborhood}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flyer-process">
                  <h3 style={{ color: currentPalette.accent }}>How It Works</h3>
                  <div className="process-steps">
                    <div className="process-step">
                      <span className="step-icon" style={{ color: currentPalette.accent }}>◆</span>
                      <span>Screenshot items you want</span>
                    </div>
                    <div className="process-step">
                      <span className="step-icon" style={{ color: currentPalette.accent }}>◆</span>
                      <span>We shop & deliver same day</span>
                    </div>
                    <div className="process-step">
                      <span className="step-icon" style={{ color: currentPalette.accent }}>◆</span>
                      <span>Try at home, pay for keeps</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flyer-no-sales">
                <h3 style={{ color: currentPalette.accent }}>No Active Sales Today</h3>
                <p>Check back tomorrow for new deals, or start a regular order!</p>
              </div>
            )}

            {/* CTA Section */}
            <div className="flyer-cta-section">
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flyer-primary-cta"
                style={{
                  background: `linear-gradient(135deg, ${currentPalette.accent} 0%, ${currentPalette.accent}CC 100%)`,
                  color: currentPalette.primary
                }}
              >
                <span className="cta-text">Start Your Order via WhatsApp</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17l10-10M17 7H7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </a>

              <button
                className="flyer-secondary-cta"
                onClick={() => closeModal('dailySalesFlyer')}
                style={{ 
                  borderColor: currentPalette.accent, 
                  color: currentPalette.accent 
                }}
              >
                <span>Continue Browsing</span>
              </button>
            </div>

            {/* Footer */}
            <div className="flyer-footer">
              <div className="footer-item">
                <span className="footer-icon" style={{ color: currentPalette.accent }}>📱</span>
                <span>Contact us via WhatsApp</span>
              </div>
              <div className="footer-item">
                <span className="footer-icon" style={{ color: currentPalette.accent }}>📍</span>
                <span>Manhattan & Brooklyn</span>
              </div>
              <div className="footer-item">
                <span className="footer-icon" style={{ color: currentPalette.accent }}>⚡</span>
                <span>Same Day Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailySalesFlyer;