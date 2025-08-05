import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

// Google Gemini API configuration (reuse from SAVI Assistant)
const GEMINI_API_KEY = '[REDACTED:api-key]';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

const AIProductSearchEngine = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [sortBy, setSortBy] = useState('relevance');
  const [searchHistory, setSearchHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const screenshotRef = useRef(null);

  // Real product categories with actual brand data
  const productCategories = [
    {
      id: 'luxury-handbags',
      name: 'Luxury Handbags',
      icon: '👜',
      brands: ['Hermès', 'Chanel', 'Louis Vuitton', 'Bottega Veneta', 'Celine', 'Dior']
    },
    {
      id: 'designer-fashion',
      name: 'Designer Fashion',
      icon: '👗',
      brands: ['The Row', 'Khaite', 'Toteme', 'Fear of God', 'Ganni', 'Acne Studios']
    },
    {
      id: 'luxury-jewelry',
      name: 'Luxury Jewelry',
      icon: '💎',
      brands: ['Tiffany & Co.', 'Cartier', 'Van Cleef & Arpels', 'Bulgari', 'David Yurman']
    },
    {
      id: 'premium-shoes',
      name: 'Premium Footwear',
      icon: '👠',
      brands: ['Manolo Blahnik', 'Louboutin', 'Jimmy Choo', 'Valentino', 'Saint Laurent']
    },
    {
      id: 'luxury-watches',
      name: 'Luxury Watches',
      icon: '⌚',
      brands: ['Rolex', 'Patek Philippe', 'Audemars Piguet', 'Omega', 'Cartier']
    },
    {
      id: 'beauty-skincare',
      name: 'Beauty & Skincare',
      icon: '💄',
      brands: ['La Mer', 'SK-II', 'Tom Ford', 'Charlotte Tilbury', 'Augustinus Bader']
    }
  ];

  // Sample product database with real product examples
  const productDatabase = [
    {
      id: 1,
      name: 'Birkin 30 Bag',
      brand: 'Hermès',
      price: 12500,
      category: 'luxury-handbags',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400',
      store: 'Hermès Madison Avenue',
      description: 'Iconic handcrafted leather handbag in Togo leather',
      availability: 'Limited',
      rating: 5.0
    },
    {
      id: 2,
      name: 'Classic Flap Bag Medium',
      brand: 'Chanel',
      price: 8800,
      category: 'luxury-handbags',
      image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400',
      store: 'Chanel Boutique',
      description: 'Quilted lambskin with gold-tone hardware',
      availability: 'In Stock',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Margaux 15 Bag',
      brand: 'The Row',
      price: 4690,
      category: 'luxury-handbags',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      store: 'Bergdorf Goodman',
      description: 'Minimalist leather tote bag in black calfskin',
      availability: 'In Stock',
      rating: 4.8
    },
    {
      id: 4,
      name: 'Manolo BB Pumps',
      brand: 'Manolo Blahnik',
      price: 795,
      category: 'premium-shoes',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400',
      store: 'Manolo Blahnik',
      description: 'Classic pointed-toe pumps in nude suede',
      availability: 'In Stock',
      rating: 4.9
    },
    {
      id: 5,
      name: 'Pigalle 85 Pumps',
      brand: 'Christian Louboutin',
      price: 895,
      category: 'premium-shoes',
      image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400',
      store: 'Louboutin Boutique',
      description: 'Patent leather pumps with signature red sole',
      availability: 'In Stock',
      rating: 4.7
    },
    {
      id: 6,
      name: 'Tiffany T Wire Bracelet',
      brand: 'Tiffany & Co.',
      price: 1850,
      category: 'luxury-jewelry',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
      store: 'Tiffany & Co.',
      description: '18k rose gold wire bracelet with diamonds',
      availability: 'In Stock',
      rating: 4.8
    },
    {
      id: 7,
      name: 'Love Bracelet',
      brand: 'Cartier',
      price: 7350,
      category: 'luxury-jewelry',
      image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400',
      store: 'Cartier Madison',
      description: '18k yellow gold bracelet with screw motif',
      availability: 'Limited',
      rating: 5.0
    },
    {
      id: 8,
      name: 'Cashmere Ribbed Sweater',
      brand: 'The Row',
      price: 1290,
      category: 'designer-fashion',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400',
      store: 'Net-A-Porter',
      description: 'Ultra-soft cashmere in minimalist design',
      availability: 'In Stock',
      rating: 4.9
    }
  ];

  // Google AI-powered search function
  const callGeminiForSearch = async (searchQuery, category) => {
    const categoryContext = category ? ` in the ${category.replace('-', ' ')} category` : '';
    const prompt = `As a luxury retail expert, help find luxury stores and products for: "${searchQuery}"${categoryContext}.

    Provide 5-8 realistic luxury store/product recommendations in this JSON format:
    {
      "products": [
        {
          "name": "Product Name",
          "brand": "Brand Name",
          "price": estimated_price_number,
          "category": "category-id",
          "store": "Store Name & Location",
          "description": "Brief description",
          "availability": "In Stock" or "Limited" or "Made to Order",
          "rating": 4.8,
          "image": "https://images.unsplash.com/photo-suitable-image-id?w=400"
        }
      ]
    }

    Focus on real luxury brands and realistic pricing. Include diverse options from department stores like Bergdorf Goodman, Saks, Neiman Marcus, as well as boutique stores.`;

    try {
      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          }
        })
      });

      if (!response.ok) throw new Error('Gemini API request failed');
      
      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      // Extract JSON from AI response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const aiResults = JSON.parse(jsonMatch[0]);
        return aiResults.products || [];
      }
      
      return [];
    } catch (error) {
      console.error('Gemini search error:', error);
      return [];
    }
  };

  // Enhanced AI-powered search function
  const performSearch = async (query, category = null, filters = {}) => {
    setIsSearching(true);
    
    let results = [];
    
    try {
      // If we have a search query, use AI to find real stores/products
      if (query && query.trim()) {
        const aiResults = await callGeminiForSearch(query, category);
        
        // Add unique IDs and ensure required fields
        const enhancedAiResults = aiResults.map((product, index) => ({
          id: `ai-${Date.now()}-${index}`,
          name: product.name || 'Luxury Item',
          brand: product.brand || 'Premium Brand',
          price: product.price || 1000,
          category: product.category || category || 'luxury-goods',
          image: product.image || `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&sig=${Date.now() + index}`,
          store: product.store || 'Luxury Boutique',
          description: product.description || 'Exquisite luxury item',
          availability: product.availability || 'In Stock',
          rating: product.rating || 4.5
        }));
        
        results = [...enhancedAiResults];
      }
      
      // Supplement with local database results
      let localResults = [...productDatabase];
      
      // Filter local database by category
      if (category) {
        localResults = localResults.filter(product => product.category === category);
      }
      
      // Filter local database by search query
      if (query) {
        const searchTerms = query.toLowerCase().split(' ');
        localResults = localResults.filter(product => {
          const searchableText = `${product.name} ${product.brand} ${product.description}`.toLowerCase();
          return searchTerms.some(term => searchableText.includes(term));
        });
      }
      
      // Combine AI results with local results (AI results first)
      results = [...results, ...localResults.slice(0, 4)];
      
      // Remove duplicates based on name and brand
      const uniqueResults = results.filter((product, index, self) => 
        index === self.findIndex(p => 
          p.name.toLowerCase() === product.name.toLowerCase() && 
          p.brand.toLowerCase() === product.brand.toLowerCase()
        )
      );
      
      results = uniqueResults;
      
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to local database on error
      results = [...productDatabase];
      
      if (category) {
        results = results.filter(product => product.category === category);
      }
      
      if (query) {
        const searchTerms = query.toLowerCase().split(' ');
        results = results.filter(product => {
          const searchableText = `${product.name} ${product.brand} ${product.description}`.toLowerCase();
          return searchTerms.some(term => searchableText.includes(term));
        });
      }
    }
    
    // Filter by price range
    results = results.filter(product => 
      product.price >= (filters.minPrice || 0) && product.price <= (filters.maxPrice || 50000)
    );
    
    // Sort results
    switch (filters.sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Relevance sorting (keep current order)
        break;
    }
    
    setSearchResults(results);
    setIsSearching(false);
    
    // Add to search history
    if (query) {
      setSearchHistory(prev => [
        { query, timestamp: Date.now(), results: results.length },
        ...prev.slice(0, 4)
      ]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    performSearch(searchQuery, selectedCategory?.id, {
      minPrice: priceRange.min || 0,
      maxPrice: priceRange.max || 50000,
      sortBy: sortBy
    });
  };

  // Handle category selection with immediate search
  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    await performSearch(searchQuery, category.id, {
      minPrice: priceRange.min || 0,
      maxPrice: priceRange.max || 50000,
      sortBy: sortBy
    });
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const captureResults = async () => {
    if (!screenshotRef.current || searchResults.length === 0) return;
    
    try {
      const canvas = await html2canvas(screenshotRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const link = document.createElement('a');
      link.download = `tuhme-search-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Prepare WhatsApp sharing
      const searchSummary = `🔍 TUHME Search Results
      
Query: "${searchQuery}"
Found ${searchResults.length} luxury items

🛍️ Featured Items:
${searchResults.slice(0, 3).map((item, i) => 
`${i + 1}. ${item.name} - ${item.brand}
   💰 $${item.price.toLocaleString()} | 🏪 ${item.store}`
).join('\n\n')}

✨ Delivered worldwide by TUHME
📱 Contact us for instant ordering!`;

      navigator.clipboard.writeText(searchSummary).then(() => {
        const whatsappURL = `https://wa.me/16465889916?text=${encodeURIComponent(searchSummary)}`;
        window.open(whatsappURL, '_blank');
      });
    } catch (error) {
      console.error('Screenshot failed:', error);
    }
  };

  // Popular searches and trending
  const popularSearches = [
    'Hermès Birkin', 'Chanel Classic Flap', 'Manolo Pumps', 
    'Cartier Love Bracelet', 'The Row Margaux', 'Louboutin Heels'
  ];

  return (
    <div className="ai-product-search-engine">
      {/* Hero-style Background with Particles */}
      <div className="search-particles">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="search-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="search-container">
        {/* Hero-style Header */}
        <div className="search-header">
          <h1 className="search-title">TUHME AI DISCOVERY</h1>
          <p className="search-subtitle">Find luxury items from stores worldwide • Powered by Google AI</p>
          <div className="ai-features">
            <span className="ai-feature">🌐 Global Store Search</span>
            <span className="ai-feature">🤖 AI Recommendations</span>
            <span className="ai-feature">💎 Real Luxury Products</span>
          </div>
        </div>

        {/* Main Search Interface */}
        <div className="search-interface">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-container">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for luxury stores & products... (e.g., 'Chanel boutiques in NYC' or 'diamond earrings under $5000')"
                className="search-input"
              />
              <button 
                type="submit" 
                className="search-button"
                disabled={isSearching}
              >
                {isSearching ? '🔍' : '🚀'}
              </button>
            </div>
          </form>

          {/* Category Selection */}
          <div className="category-section">
            <h3 className="section-label">Browse by Category</h3>
            <div className="category-grid">
              {productCategories.map(category => (
                <button
                  key={category.id}
                  className={`category-btn ${selectedCategory?.id === category.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCategorySelect(category);
                  }}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-name">{category.name}</span>
                  <div className="category-brands">
                    {category.brands.slice(0, 3).join(' • ')}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Popular Searches */}
          <div className="popular-section">
            <h3 className="section-label">Trending Searches</h3>
            <div className="popular-tags">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  className="popular-tag"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSearchQuery(search);
                    performSearch(search, selectedCategory?.id, {
                      minPrice: priceRange.min || 0,
                      maxPrice: priceRange.max || 50000,
                      sortBy: sortBy
                    });
                  }}
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search Results */}
        {(searchResults.length > 0 || isSearching) && (
          <div ref={screenshotRef} className="search-results">
            <div className="results-header">
              <h2 className="results-title">
                {isSearching ? 'AI is searching...' : `Found ${searchResults.length} luxury items`}
              </h2>
              {searchResults.length > 0 && (
                <div className="results-actions">
                  <button className="screenshot-btn" onClick={captureResults}>
                    📸 Screenshot & Share
                  </button>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="relevance">Most Relevant</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              )}
            </div>

            {isSearching ? (
              <div className="searching-animation">
                <div className="search-spinner"></div>
                <p>🤖 AI is discovering luxury stores and products worldwide...</p>
                <div className="search-progress">
                  <span>• Analyzing luxury retailers</span>
                  <span>• Finding matching products</span>
                  <span>• Checking availability</span>
                </div>
              </div>
            ) : (
              <div className="products-grid">
                {searchResults.map(product => (
                  <div key={product.id} className="product-card">
                    <div className="product-image-container">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="product-image"
                        loading="lazy"
                      />
                      <button 
                        className={`favorite-btn ${favorites.includes(product.id) ? 'active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(product.id);
                        }}
                      >
                        {favorites.includes(product.id) ? '❤️' : '🤍'}
                      </button>
                      <div className="availability-badge">
                        {product.availability}
                      </div>
                    </div>
                    
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-brand">{product.brand}</p>
                      <p className="product-description">{product.description}</p>
                      
                      <div className="product-meta">
                        <div className="price-section">
                          <span className="product-price">${product.price.toLocaleString()}</span>
                          <div className="rating">
                            {'★'.repeat(Math.floor(product.rating))} {product.rating}
                          </div>
                        </div>
                        <p className="product-store">📍 {product.store}</p>
                      </div>
                      
                      <button 
                        className="order-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const orderText = `🛍️ TUHME Order Request

Product: ${product.name}
Brand: ${product.brand}
Price: $${product.price.toLocaleString()}
Store: ${product.store}

Please help me purchase this item!

Found via TUHME AI Discovery ✨`;
                          
                          navigator.clipboard.writeText(orderText).then(() => {
                            const whatsappURL = `https://wa.me/16465889916?text=${encodeURIComponent(orderText)}`;
                            window.open(whatsappURL, '_blank');
                          });
                        }}
                      >
                        Order via TUHME
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Search History */}
        {searchHistory.length > 0 && (
          <div className="search-history">
            <h3 className="section-label">Recent Searches</h3>
            <div className="history-items">
              {searchHistory.map((item, index) => (
                <button
                  key={index}
                  className="history-item"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSearchQuery(item.query);
                    performSearch(item.query, selectedCategory?.id, {
                      minPrice: priceRange.min || 0,
                      maxPrice: priceRange.max || 50000,
                      sortBy: sortBy
                    });
                  }}
                >
                  <span className="history-query">{item.query}</span>
                  <span className="history-results">{item.results} results</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .ai-product-search-engine {
          position: relative;
          min-height: 100vh;
          background: var(--primary-bg);
          color: var(--primary-text);
          overflow: hidden;
          padding: 2rem 0;
          will-change: scroll-position;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }

        /* Hero-style particles */
        .search-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .search-particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: var(--accent-color, #d4af37);
          border-radius: 50%;
          opacity: 0.2;
          animation: float-particle infinite linear;
          will-change: transform;
        }

        @keyframes float-particle {
          0% { 
            transform: translate3d(0, 100vh, 0) scale(0);
            opacity: 0;
          }
          10% { 
            opacity: 0.2;
            transform: translate3d(0, 90vh, 0) scale(1);
          }
          90% { 
            opacity: 0.2;
          }
          100% { 
            transform: translate3d(200px, -100px, 0) scale(0);
            opacity: 0;
          }
        }

        .search-container {
          position: relative;
          z-index: 10;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* Hero-style Header */
        .search-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .search-title {
          font-family: var(--font-display, 'Inter', sans-serif);
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          letter-spacing: 0.05em;
          margin: 0 0 1rem 0;
          color: var(--text-primary);
          text-shadow: 0 0 30px rgba(212, 175, 55, 0.4);
          animation: glow-pulse 3s ease-in-out infinite alternate;
          filter: none;
          -webkit-text-stroke: 0;
        }

        @keyframes glow-pulse {
          0% { 
            text-shadow: 0 0 60px rgba(212, 175, 55, 0.3);
          }
          100% { 
            text-shadow: 0 0 80px rgba(212, 175, 55, 0.5);
          }
        }

        .search-subtitle {
          font-size: 1.2rem;
          color: var(--text-secondary);
          font-weight: 300;
          letter-spacing: 0.05em;
          margin: 0 0 1.5rem 0;
        }

        .ai-features {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .ai-feature {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 25px;
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
          color: var(--text-primary);
          font-weight: 500;
          backdrop-filter: blur(10px);
        }

        /* Search Interface */
        .search-interface {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 3rem;
          margin-bottom: 3rem;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .search-form {
          margin-bottom: 3rem;
        }

        .search-input-container {
          position: relative;
          display: flex;
          max-width: 800px;
          margin: 0 auto;
        }

        .search-input {
          flex: 1;
          padding: 1.5rem 2rem;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px 0 0 16px;
          color: var(--primary-text);
          font-size: 1.1rem;
          outline: none;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .search-input:focus {
          border-color: var(--accent-color);
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2);
          background: rgba(255, 255, 255, 0.08);
        }

        .search-input::placeholder {
          color: var(--secondary-text);
        }

        .search-button {
          padding: 1.5rem 2rem;
          background: linear-gradient(135deg, var(--accent-color) 0%, #b8941f 100%);
          border: none;
          border-radius: 0 16px 16px 0;
          color: var(--primary-bg);
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 80px;
        }

        .search-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(212, 175, 55, 0.3);
        }

        .search-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Section Labels */
        .section-label {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 1.5rem 0;
          text-align: center;
          letter-spacing: 0.05em;
          filter: none;
          -webkit-text-stroke: 0;
        }

        /* Category Section */
        .category-section {
          margin-bottom: 3rem;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
        }

        .category-btn {
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
          color: var(--primary-text);
        }

        .category-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .category-btn.active {
          background: rgba(212, 175, 55, 0.1);
          border-color: var(--accent-color);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
        }

        .category-icon {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          display: block;
        }

        .category-name {
          font-weight: 600;
          font-size: 1rem;
          display: block;
          margin-bottom: 0.5rem;
        }

        .category-brands {
          font-size: 0.875rem;
          color: var(--secondary-text);
          line-height: 1.4;
        }

        /* Popular Tags */
        .popular-section {
          text-align: center;
        }

        .popular-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
        }

        .popular-tag {
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 25px;
          color: var(--primary-text);
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .popular-tag:hover {
          background: var(--accent-color);
          color: var(--primary-bg);
          transform: translateY(-1px);
        }

        /* Search Results */
        .search-results {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 3rem;
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .results-title {
          font-size: 1.5rem;
          font-weight: 300;
          color: var(--primary-text);
          margin: 0;
        }

        .results-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .screenshot-btn {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 8px;
          color: white;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .screenshot-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }

        .sort-select {
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: var(--primary-text);
          cursor: pointer;
        }

        /* Searching Animation */
        .searching-animation {
          text-align: center;
          padding: 4rem 2rem;
        }

        .search-spinner {
          width: 60px;
          height: 60px;
          border: 3px solid rgba(212, 175, 55, 0.3);
          border-top: 3px solid var(--accent-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 2rem auto;
        }

        .search-progress {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          align-items: center;
        }

        .search-progress span {
          color: var(--text-secondary);
          font-size: 0.9rem;
          opacity: 0.8;
          animation: fadeInOut 2s ease-in-out infinite;
        }

        .search-progress span:nth-child(2) {
          animation-delay: 0.7s;
        }

        .search-progress span:nth-child(3) {
          animation-delay: 1.4s;
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Products Grid */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }

        .product-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }

        .product-image-container {
          position: relative;
          width: 100%;
          height: 250px;
          overflow: hidden;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.05);
        }

        .favorite-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.5);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          cursor: pointer;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }

        .favorite-btn:hover {
          transform: scale(1.1);
          background: rgba(0, 0, 0, 0.7);
        }

        .availability-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: var(--accent-color);
          color: var(--primary-bg);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .product-info {
          padding: 1.5rem;
        }

        .product-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--primary-text);
          margin: 0 0 0.5rem 0;
        }

        .product-brand {
          color: var(--accent-color);
          font-weight: 500;
          margin: 0 0 0.75rem 0;
        }

        .product-description {
          color: var(--secondary-text);
          font-size: 0.9rem;
          line-height: 1.4;
          margin: 0 0 1rem 0;
        }

        .product-meta {
          margin-bottom: 1.5rem;
        }

        .price-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .product-price {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--primary-text);
        }

        .rating {
          color: #ffd700;
          font-size: 0.9rem;
        }

        .product-store {
          color: var(--secondary-text);
          font-size: 0.875rem;
          margin: 0;
        }

        .order-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, var(--accent-color) 0%, #b8941f 100%);
          border: none;
          border-radius: 8px;
          color: var(--primary-bg);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .order-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
        }

        /* Search History */
        .search-history {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
        }

        .history-items {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }

        .history-item {
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }

        .history-item:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-1px);
        }

        .history-query {
          color: var(--primary-text);
          font-weight: 500;
        }

        .history-results {
          color: var(--secondary-text);
          font-size: 0.8rem;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .search-container {
            padding: 0 1rem;
          }

          .search-interface {
            padding: 2rem 1.5rem;
          }

          .search-input-container {
            flex-direction: column;
          }

          .search-input {
            border-radius: 16px 16px 0 0;
          }

          .search-button {
            border-radius: 0 0 16px 16px;
          }

          .category-grid {
            grid-template-columns: 1fr;
          }

          .products-grid {
            grid-template-columns: 1fr;
          }

          .results-header {
            flex-direction: column;
            align-items: stretch;
          }

          .results-actions {
            justify-content: center;
          }

          .ai-features {
            gap: 1rem;
          }

          .ai-feature {
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AIProductSearchEngine;
