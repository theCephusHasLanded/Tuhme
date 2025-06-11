import { useState } from 'react';
import TuhmeIcon from './TuhmeIcon';

const StoreSearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleWebSearch = () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    
    // Create a Google search URL for the store
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery + ' store online shopping')}`;
    
    // Open in new tab
    window.open(searchUrl, '_blank');
    
    // Generate WhatsApp message
    const whatsappMessage = encodeURIComponent(
      `Hi! I'm looking for "${searchQuery}" which isn't in your partner store list. I found their website online and would like to place an order through TUHME. Can you help me shop from them?`
    );
    const whatsappUrl = `https://wa.me/16465889916?text=${whatsappMessage}`;
    
    // Small delay to let Google search open first
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setLoading(false);
      onClose();
      setSearchQuery('');
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleWebSearch();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay store-search-modal-overlay" onClick={onClose}>
      <div className="modal-content store-search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Search Online Stores</h3>
          <button className="modal-close" onClick={onClose}>
            <TuhmeIcon type="close" size={20} />
          </button>
        </div>
        
        <div className="modal-body">
          <p className="search-description">
            Can't find a store in our partner directory? No problem! 
            We can shop from almost any online retailer. Just tell us what store you're looking for.
          </p>
          
          <div className="search-input-container">
            <div className="search-input-group">
              <TuhmeIcon type="search" size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Enter store name (e.g., Zara, H&M, Anthropologie...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="store-search-input"
                autoFocus
              />
            </div>
          </div>
          
          <div className="search-features">
            <div className="feature-item">
              <TuhmeIcon type="globe" size={16} />
              <span>We'll help you find the store online</span>
            </div>
            <div className="feature-item">
              <TuhmeIcon type="shopping" size={16} />
              <span>Shop any items from their website</span>
            </div>
            <div className="feature-item">
              <TuhmeIcon type="delivery" size={16} />
              <span>Same try-before-you-buy service</span>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button 
            className="search-online-btn"
            onClick={handleWebSearch}
            disabled={!searchQuery.trim() || loading}
          >
            {loading ? (
              <>
                <div className="loading-spinner"></div>
                Opening Search...
              </>
            ) : (
              <>
                <TuhmeIcon type="search" size={16} />
                Search Online & Order
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreSearchModal;