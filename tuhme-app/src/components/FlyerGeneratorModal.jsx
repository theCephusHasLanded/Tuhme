import { useState, useEffect } from 'react';
import { useModal } from '../contexts/ModalContext';
import salesMonitoringService from '../services/salesMonitoringService';
import flyerPromptGenerator from '../utils/flyerPromptGenerator';
// Store service removed - flyer generation simplified
import './FlyerGeneratorModal.css';

const FlyerGeneratorModal = () => {
  const { modals, closeModal } = useModal();
  const [selectedStores, setSelectedStores] = useState([]);
  const [promptType, setPromptType] = useState('detailed');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [flyerData, setFlyerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [salesStats, setSalesStats] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Initialize data on modal open
  useEffect(() => {
    if (modals.flyerGenerator) {
      initializeFlyerData();
    }
  }, [modals.flyerGenerator]);

  const initializeFlyerData = async () => {
    setLoading(true);
    try {
      // Simplified flyer data initialization without store service
      const mockData = {
        activeSales: [],
        totalSales: 0,
        lastUpdated: new Date().toISOString()
      };
      setFlyerData(mockData);
      
      // Mock sales statistics
      const mockStats = {
        totalStores: 0,
        storesOnSale: 0,
        averageDiscount: 0
      };
      setSalesStats(mockStats);
      
    } catch (error) {
      console.error('Error initializing flyer data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredStores = () => {
    // Simplified store filtering without store service
    return [];
  };

  const handleStoreToggle = (store) => {
    setSelectedStores(prev => {
      const isSelected = prev.some(s => s.id === store.id);
      if (isSelected) {
        return prev.filter(s => s.id !== store.id);
      } else {
        return [...prev, store];
      }
    });
  };

  const handleSelectAll = () => {
    const filteredStores = getFilteredStores();
    setSelectedStores(filteredStores);
  };

  const handleClearAll = () => {
    setSelectedStores([]);
  };

  const handleGeneratePrompt = () => {
    if (selectedStores.length === 0) {
      alert('Please select at least one store');
      return;
    }

    const prompt = flyerPromptGenerator.generatePrompt(
      promptType,
      selectedStores,
      flyerData
    );
    
    setGeneratedPrompt(prompt);
  };

  const handleCopyPrompt = async () => {
    if (!generatedPrompt) return;
    
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy prompt:', error);
    }
  };

  const handleOpenClaude = () => {
    const claudeUrl = 'https://claude.ai/chat';
    window.open(claudeUrl, '_blank', 'noopener,noreferrer');
  };

  const getStoresSaleInfo = (storeId) => {
    return flyerData?.activeSales.find(sale => sale.storeId === storeId);
  };

  const categories = ['all', 'on-sale', 'Fashion', 'Beauty', 'Department Store', 'Sportswear'];

  if (!modals.flyerGenerator) return null;

  return (
    <div className="flyer-modal-overlay" onClick={() => closeModal('flyerGenerator')}>
      <div className="flyer-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flyer-modal-header">
          <div className="header-content">
            <h2 className="modal-title">Daily Sales Flyer Generator</h2>
            <p className="modal-subtitle">Create Claude AI prompts for luxury sale flyers</p>
          </div>
          <button 
            className="modal-close-btn"
            onClick={() => closeModal('flyerGenerator')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Sales Statistics */}
        {salesStats && (
          <div className="sales-stats-banner">
            <div className="stat-item">
              <span className="stat-number">{salesStats.storesWithSales}</span>
              <span className="stat-label">Stores with Active Sales</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{salesStats.salesPercentage}%</span>
              <span className="stat-label">of Partner Stores</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{salesStats.urgentSales}</span>
              <span className="stat-label">Urgent Deals</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{salesStats.avgDiscount}%</span>
              <span className="stat-label">Avg Discount</span>
            </div>
          </div>
        )}

        <div className="flyer-modal-body">
          {/* Store Selection */}
          <div className="store-selection-section">
            <div className="section-header">
              <h3>Select Stores</h3>
              <div className="store-controls">
                <div className="filter-controls">
                  <select 
                    value={filterCategory} 
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="category-filter"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === 'all' ? 'All Stores' : cat === 'on-sale' ? 'On Sale' : cat}
                      </option>
                    ))}
                  </select>
                  
                  <div className="view-toggle">
                    <button 
                      className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                        <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                        <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                        <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </button>
                    <button 
                      className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                      onClick={() => setViewMode('list')}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <line x1="8" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2"/>
                        <line x1="8" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2"/>
                        <line x1="8" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2"/>
                        <line x1="3" y1="6" x2="3.01" y2="6" stroke="currentColor" strokeWidth="2"/>
                        <line x1="3" y1="12" x2="3.01" y2="12" stroke="currentColor" strokeWidth="2"/>
                        <line x1="3" y1="18" x2="3.01" y2="18" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="bulk-actions">
                  <button onClick={handleSelectAll} className="bulk-btn">
                    Select All
                  </button>
                  <button onClick={handleClearAll} className="bulk-btn">
                    Clear All
                  </button>
                </div>
              </div>
            </div>

            <div className="selected-count">
              {selectedStores.length} stores selected
            </div>

            <div className={`stores-grid ${viewMode}`}>
              {getFilteredStores().map(store => {
                const saleInfo = getStoresSaleInfo(store.id);
                const isSelected = selectedStores.some(s => s.id === store.id);
                
                return (
                  <div 
                    key={store.id}
                    className={`store-card ${isSelected ? 'selected' : ''} ${saleInfo ? 'on-sale' : ''}`}
                    onClick={() => handleStoreToggle(store)}
                  >
                    <div className="store-checkbox">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleStoreToggle(store)}
                      />
                      <div className="checkmark"></div>
                    </div>
                    
                    <div className="store-info">
                      <h4 className="store-name">{store.name}</h4>
                      <p className="store-category">{store.category}</p>
                      <p className="store-location">{store.neighborhood}</p>
                      
                      {saleInfo && (
                        <div className="sale-badge">
                          <span className="sale-discount">{saleInfo.discount} off</span>
                          <span className="sale-type">{saleInfo.saleType}</span>
                        </div>
                      )}
                    </div>
                    
                    {saleInfo && (
                      <div className="sale-indicator">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Prompt Configuration */}
          <div className="prompt-config-section">
            <h3>Prompt Configuration</h3>
            
            <div className="prompt-types">
              {flyerPromptGenerator.getPromptTypes().map(type => (
                <label key={type.id} className="prompt-type-option">
                  <input
                    type="radio"
                    name="promptType"
                    value={type.id}
                    checked={promptType === type.id}
                    onChange={(e) => setPromptType(e.target.value)}
                  />
                  <div className="prompt-type-card">
                    <h4>{type.name}</h4>
                    <p>{type.description}</p>
                  </div>
                </label>
              ))}
            </div>

            <div className="generate-section">
              <button 
                onClick={handleGeneratePrompt}
                className="generate-btn"
                disabled={selectedStores.length === 0}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Generate Prompt
              </button>
            </div>
          </div>

          {/* Generated Prompt */}
          {generatedPrompt && (
            <div className="generated-prompt-section">
              <h3>Generated Prompt</h3>
              
              <div className="prompt-actions">
                <button 
                  onClick={handleCopyPrompt}
                  className={`copy-btn ${copied ? 'copied' : ''}`}
                >
                  {copied ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      Copy to Clipboard
                    </>
                  )}
                </button>
                
                <button 
                  onClick={handleOpenClaude}
                  className="claude-btn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Open Claude AI
                </button>
              </div>
              
              <div className="prompt-display">
                <textarea
                  value={generatedPrompt}
                  readOnly
                  className="prompt-textarea"
                  placeholder="Generated prompt will appear here..."
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlyerGeneratorModal;