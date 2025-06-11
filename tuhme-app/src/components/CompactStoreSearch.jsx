import { useState } from 'react';
import StoreSearchModal from './StoreSearchModal';
import TuhmeIcon from './TuhmeIcon';

const CompactStoreSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // If there's a search query, open the search modal for any store
      setShowSearchModal(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className="compact-store-search">
      <div className="search-container">
        <div className="search-header">
          <h3>Find Any Store</h3>
          <p>Search our 53+ partner stores or request any store online</p>
        </div>
        
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-group">
            <TuhmeIcon type="search" size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search stores (Zara, Nike, Gucci...) or enter any store name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="search-input"
            />
            <button 
              type="submit" 
              className="search-button"
              disabled={!searchQuery.trim()}
            >
              <TuhmeIcon type="delivery" size={16} />
              Search
            </button>
          </div>
        </form>
        
        <div className="search-features">
          <div className="feature-item">
            <TuhmeIcon type="shopping" size={14} />
            <span>53+ Partner Stores</span>
          </div>
          <div className="feature-item">
            <TuhmeIcon type="globe" size={14} />
            <span>Any Store Online</span>
          </div>
          <div className="feature-item">
            <TuhmeIcon type="secure" size={14} />
            <span>Same Service</span>
          </div>
        </div>
      </div>
      
      {/* Store Search Modal */}
      <StoreSearchModal 
        isOpen={showSearchModal} 
        onClose={() => setShowSearchModal(false)} 
      />
    </div>
  );
};

export default CompactStoreSearch;