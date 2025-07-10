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
    { primary: '#0a0a0a', secondary: '#1a1a1a', accent: '#d4af37', name: 'Midnight Gold' },
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
    { primary: '#1a1914', secondary: '#2a2925', accent: '#d4af37', name: 'Amber Prestige' },
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
    { primary: '#1a1a1a', secondary: '#2a2a2a', accent: '#d4af37', name: 'Classic Gold' }
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
            <h2 className="flyer-title">
              <span className="flyer-title-line" style={{ color: currentPalette.accent }}>
                Today's Exclusive Store Sales
              </span>
            </h2>

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
                  {salesData.activeSales.slice(0, 6).map((sale, index) => (
                    <div 
                      key={sale.storeId} 
                      className="flyer-sale-card"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        borderColor: sale.urgency === 'high' ? currentPalette.accent : 'rgba(255,255,255,0.1)'
                      }}
                    >
                      <div className="sale-header">
                        <h3 className="sale-store-name">{sale.storeName}</h3>
                        {sale.urgency === 'high' && (
                          <span className="urgency-badge" style={{ background: currentPalette.accent }}>
                            URGENT
                          </span>
                        )}
                      </div>
                      <div className="sale-discount" style={{ color: currentPalette.accent }}>
                        {sale.discount} off
                      </div>
                      <div className="sale-category">{sale.category}</div>
                      <div className="sale-type">{sale.saleType}</div>
                    </div>
                  ))}
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
                <span>(646) 588-9916</span>
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