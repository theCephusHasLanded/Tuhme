import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import storeService from '../services/storeService';

const FuturisticAIStyler = () => {
  const [activeMode, setActiveMode] = useState('discover'); // discover, generate, style
  const [isProcessing, setIsProcessing] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [generatedLook, setGeneratedLook] = useState(null);
  const [aiResponse, setAiResponse] = useState('');
  const [voiceActive, setVoiceActive] = useState(false);
  const [particles, setParticles] = useState([]);
  const screenshotRef = useRef(null);
  const [isScreenshotting, setIsScreenshotting] = useState(false);

  // AI Style Categories
  const styleCategories = [
    {
      id: 'business-luxe',
      name: 'Business Luxe',
      icon: '💼',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: 'Professional meets luxury'
    },
    {
      id: 'casual-chic',
      name: 'Casual Chic',
      icon: '✨',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      description: 'Effortlessly stylish'
    },
    {
      id: 'evening-glam',
      name: 'Evening Glam',
      icon: '🌙',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      description: 'Red carpet ready'
    },
    {
      id: 'street-luxe',
      name: 'Street Luxe',
      icon: '🔥',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      description: 'Urban meets luxury'
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      icon: '⚪',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      description: 'Less is more'
    },
    {
      id: 'vintage-modern',
      name: 'Vintage Modern',
      icon: '🎨',
      gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      description: 'Timeless with a twist'
    }
  ];

  // Generate floating particles for animation
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 3 + 2,
          opacity: Math.random() * 0.3 + 0.05
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  // Simulate AI processing with realistic delay and responses
  const processAIRequest = async (userQuery, category) => {
    setIsProcessing(true);
    setAiResponse('');

    // Simulate AI thinking process
    const thinkingSteps = [
      "Analyzing your style preferences...",
      "Scanning fashion trends...",
      "Matching with luxury retailers...",
      "Curating your perfect look...",
      "Finalizing recommendations..."
    ];

    for (let step of thinkingSteps) {
      setAiResponse(step);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Generate actual outfit recommendation
    const outfit = generateOutfit(userQuery, category);
    setGeneratedLook(outfit);
    setAiResponse(`✨ I've curated the perfect ${category?.name || 'look'} for you! Here's what I recommend:`);
    setIsProcessing(false);
  };

  // Generate outfit based on input
  const generateOutfit = (query, category) => {
    const occasions = {
      'business-luxe': {
        items: [
          { name: 'Tailored Blazer', brand: 'Theory', price: '$495', store: 'Nordstrom' },
          { name: 'Silk Blouse', brand: 'Equipment', price: '$290', store: 'Saks Fifth Avenue' },
          { name: 'Wool Trousers', brand: 'Max Mara', price: '$395', store: 'Bergdorf Goodman' },
          { name: 'Leather Pumps', brand: 'Manolo Blahnik', price: '$795', store: 'Bergdorf Goodman' },
          { name: 'Structured Handbag', brand: 'Celine', price: '$2,850', store: 'Celine Madison' }
        ],
        totalPrice: '$4,825',
        vibe: 'Commanding boardroom presence with luxury details'
      },
      'casual-chic': {
        items: [
          { name: 'Cashmere Sweater', brand: 'Brunello Cucinelli', price: '$1,295', store: 'Bergdorf Goodman' },
          { name: 'High-Rise Jeans', brand: 'Mother', price: '$238', store: 'Nordstrom' },
          { name: 'White Sneakers', brand: 'Common Projects', price: '$425', store: 'MR PORTER' },
          { name: 'Crossbody Bag', brand: 'Bottega Veneta', price: '$1,850', store: 'Bottega Veneta' },
          { name: 'Gold Jewelry', brand: 'Jennifer Meyer', price: '$895', store: 'Bergdorf Goodman' }
        ],
        totalPrice: '$4,703',
        vibe: 'Effortlessly polished with luxury comfort'
      },
      'evening-glam': {
        items: [
          { name: 'Silk Midi Dress', brand: 'The Row', price: '$1,690', store: 'Bergdorf Goodman' },
          { name: 'Statement Heels', brand: 'Jimmy Choo', price: '$850', store: 'Saks Fifth Avenue' },
          { name: 'Evening Clutch', brand: 'Judith Leiber', price: '$1,995', store: 'Bergdorf Goodman' },
          { name: 'Diamond Earrings', brand: 'Tiffany & Co.', price: '$2,500', store: 'Tiffany & Co.' },
          { name: 'Silk Wrap', brand: 'Hermès', price: '$845', store: 'Hermès Madison' }
        ],
        totalPrice: '$7,880',
        vibe: 'Red carpet glamour with timeless elegance'
      }
    };

    const defaultOutfit = occasions['casual-chic'];
    return occasions[category?.id] || defaultOutfit;
  };

  // Screenshot functionality
  const captureScreenshot = async () => {
    if (!screenshotRef.current || !generatedLook) return;

    setIsScreenshotting(true);
    try {
      const canvas = await html2canvas(screenshotRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true
      });

      // Create download link
      const link = document.createElement('a');
      link.download = `tuhme-style-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      
      // Auto-click download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Prepare WhatsApp message
      prepareWhatsAppOrder();
    } catch (error) {
      console.error('Screenshot failed:', error);
    } finally {
      setIsScreenshotting(false);
    }
  };

  // Prepare WhatsApp order with structured data
  const prepareWhatsAppOrder = () => {
    if (!generatedLook) return;

    const orderText = `🎨 TUHME AI Style Request

${generatedLook.vibe}

📋 OUTFIT DETAILS:
${generatedLook.items.map((item, i) => 
  `${i + 1}. ${item.name} - ${item.brand}
   💰 ${item.price} | 🏪 ${item.store}`
).join('\n\n')}

💎 Total Look: ${generatedLook.totalPrice}

🛍️ Please help me find and deliver these items!

Generated by TUHME AI Stylist ✨`;

    // Copy to clipboard
    navigator.clipboard.writeText(orderText).then(() => {
      // Open WhatsApp with pre-filled message
      const whatsappURL = `https://wa.me/16465889916?text=${encodeURIComponent(orderText)}`;
      window.open(whatsappURL, '_blank');
    });
  };

  // Voice input simulation
  const toggleVoiceInput = () => {
    setVoiceActive(!voiceActive);
    if (!voiceActive) {
      // Simulate voice recognition
      setTimeout(() => {
        setQuery("I need an outfit for a business dinner next week");
        setVoiceActive(false);
      }, 3000);
    }
  };

  return (
    <div className="futuristic-ai-styler">
      {/* Animated background particles */}
      <div className="particle-field">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDuration: `${particle.speed}s`
            }}
          />
        ))}
      </div>

      {/* Main Interface */}
      <div className="ai-interface">
        <div className="interface-header">
          <div className="ai-logo">
            <div className="logo-pulse"></div>
            <span className="ai-text">TUHME AI STYLIST</span>
          </div>
          <div className="neural-wave"></div>
        </div>

        {/* Mode Selector */}
        <div className="mode-selector">
          {[
            { id: 'discover', name: 'Discover', icon: '🔍' },
            { id: 'generate', name: 'Generate Look', icon: '✨' },
            { id: 'style', name: 'Style Quiz', icon: '🎯' }
          ].map(mode => (
            <button
              key={mode.id}
              className={`mode-btn ${activeMode === mode.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveMode(mode.id);
              }}
            >
              <span className="mode-icon">{mode.icon}</span>
              <span className="mode-name">{mode.name}</span>
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="content-area">
          {activeMode === 'generate' && (
            <div className="generate-section">
              {/* Input Interface */}
              <div className="ai-input-section">
                <div className="input-container">
                  <div className="holographic-input">
                    <input
                      type="text"
                      placeholder="Describe your ideal look... (e.g., 'Chic outfit for art gallery opening')"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="neural-input"
                    />
                    <button 
                      className={`voice-btn ${voiceActive ? 'active' : ''}`}
                      onClick={toggleVoiceInput}
                    >
                      🎤
                    </button>
                  </div>
                  
                  {voiceActive && (
                    <div className="voice-indicator">
                      <div className="voice-wave"></div>
                      <span>Listening...</span>
                    </div>
                  )}
                </div>

                {/* Style Categories */}
                <div className="style-categories">
                  <h3 className="section-title">Choose Your Vibe</h3>
                  <div className="category-grid">
                    {styleCategories.map(category => (
                      <button
                        key={category.id}
                        className={`category-card ${selectedStyle?.id === category.id ? 'selected' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedStyle(category);
                        }}
                        style={{ background: category.gradient }}
                      >
                        <div className="category-icon">{category.icon}</div>
                        <div className="category-info">
                          <h4>{category.name}</h4>
                          <p>{category.description}</p>
                        </div>
                        <div className="holographic-overlay"></div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  className="generate-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    processAIRequest(query, selectedStyle);
                  }}
                  disabled={isProcessing || (!query && !selectedStyle)}
                >
                  <div className="btn-content">
                    {isProcessing ? (
                      <>
                        <div className="processing-spinner"></div>
                        <span>AI is creating your look...</span>
                      </>
                    ) : (
                      <>
                        <span className="btn-icon">🚀</span>
                        <span>Generate My Look</span>
                      </>
                    )}
                  </div>
                </button>
              </div>

              {/* AI Response Area */}
              {(isProcessing || generatedLook) && (
                <div className="ai-response-area">
                  <div className="ai-thinking">
                    <div className="ai-avatar">
                      <div className="avatar-pulse"></div>
                      🤖
                    </div>
                    <div className="response-bubble">
                      <p>{aiResponse}</p>
                      {isProcessing && (
                        <div className="typing-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Generated Look Display */}
                  {generatedLook && (
                    <div ref={screenshotRef} className="generated-look">
                      <div className="look-header">
                        <h2 className="look-title">Your Curated Look</h2>
                        <div className="look-vibe">{generatedLook.vibe}</div>
                      </div>

                      <div className="outfit-grid">
                        {generatedLook.items.map((item, index) => (
                          <div key={index} className="outfit-item">
                            <div className="item-number">{index + 1}</div>
                            <div className="item-details">
                              <h4 className="item-name">{item.name}</h4>
                              <p className="item-brand">{item.brand}</p>
                              <div className="item-meta">
                                <span className="item-price">{item.price}</span>
                                <span className="item-store">📍 {item.store}</span>
                              </div>
                            </div>
                            <div className="item-glow"></div>
                          </div>
                        ))}
                      </div>

                      <div className="look-summary">
                        <div className="total-price">
                          <span className="total-label">Total Investment:</span>
                          <span className="total-amount">{generatedLook.totalPrice}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="look-actions">
                        <button 
                          className="action-btn screenshot-btn"
                          onClick={captureScreenshot}
                          disabled={isScreenshotting}
                        >
                          {isScreenshotting ? (
                            <>📸 Capturing...</>
                          ) : (
                            <>📸 Screenshot & Order</>
                          )}
                        </button>
                        
                        <button 
                          className="action-btn whatsapp-btn"
                          onClick={prepareWhatsAppOrder}
                        >
                          💬 Send to WhatsApp
                        </button>
                        
                        <button 
                          className="action-btn regenerate-btn"
                          onClick={() => processAIRequest(query, selectedStyle)}
                        >
                          🔄 Generate New Look
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Other modes placeholder */}
          {activeMode === 'discover' && (
            <div className="discover-section">
              <div className="coming-soon">
                <h3>🔍 Store Discovery</h3>
                <p>AI-powered store recommendations coming soon...</p>
              </div>
            </div>
          )}

          {activeMode === 'style' && (
            <div className="style-quiz-section">
              <div className="coming-soon">
                <h3>🎯 Style Quiz</h3>
                <p>Personalized style analysis coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .futuristic-ai-styler {
          position: relative;
          padding: 4rem 2rem;
          background: var(--secondary-bg);
          border-radius: 0;
          margin: 0;
        }

        /* Simplified Particles */
        .particle-field {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          opacity: 0.1;
        }

        .particle {
          position: absolute;
          background: var(--theme-accent);
          border-radius: 50%;
          animation: float infinite linear;
        }

        @keyframes float {
          0% { transform: translateY(200px) rotate(0deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-200px) rotate(360deg); opacity: 0; }
        }

        /* Main Interface */
        .ai-interface {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          margin: 0 auto;
          background: var(--primary-bg);
          border: 1px solid var(--border-light);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        /* Header */
        .interface-header {
          text-align: center;
          margin-bottom: 3rem;
          position: relative;
        }

        .ai-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .logo-pulse {
          width: 20px;
          height: 20px;
          background: linear-gradient(45deg, #00ff88, #0099ff);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
        }

        .ai-text {
          font-family: 'SF Pro Display', -apple-system, sans-serif;
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--theme-accent);
          letter-spacing: 1px;
        }

        .neural-wave {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--theme-accent), transparent);
          animation: wave 4s infinite;
          margin-top: 1rem;
        }

        @keyframes wave {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* Mode Selector */
        .mode-selector {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .mode-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: var(--tertiary-bg);
          border: 1px solid var(--border-light);
          border-radius: 12px;
          color: var(--primary-text);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mode-btn:hover {
          background: var(--secondary-bg);
          transform: translateY(-2px);
        }

        .mode-btn.active {
          background: var(--theme-accent);
          border-color: var(--theme-accent);
          color: var(--primary-bg);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px var(--theme-accent-shadow, rgba(0, 0, 0, 0.2));
        }

        .mode-icon {
          font-size: 1.5rem;
        }

        .mode-name {
          font-weight: 600;
          font-size: 0.9rem;
        }

        /* Content Area */
        .content-area {
          min-height: 400px;
        }

        /* Generate Section */
        .ai-input-section {
          margin-bottom: 3rem;
        }

        .input-container {
          margin-bottom: 2rem;
        }

        .holographic-input {
          position: relative;
          display: flex;
          align-items: center;
          background: var(--tertiary-bg);
          border: 1px solid var(--border-medium);
          border-radius: 12px;
          padding: 1rem 1.5rem;
          transition: all 0.3s ease;
        }

        .holographic-input:focus-within {
          border-color: var(--theme-accent);
          box-shadow: 0 0 0 3px var(--theme-accent-bg, rgba(0, 0, 0, 0.1));
        }

        .neural-input {
          flex: 1;
          background: none;
          border: none;
          color: var(--primary-text);
          font-size: 1.1rem;
          outline: none;
          font-family: inherit;
        }

        .neural-input::placeholder {
          color: var(--secondary-text);
        }

        .voice-btn {
          background: var(--theme-accent);
          border: none;
          border-radius: 8px;
          width: 40px;
          height: 40px;
          cursor: pointer;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          color: var(--primary-bg);
        }

        .voice-btn:hover {
          transform: scale(1.05);
        }

        .voice-btn.active {
          animation: pulse 1.5s infinite;
        }

        .voice-indicator {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;
          color: #00ff88;
        }

        .voice-wave {
          width: 30px;
          height: 20px;
          background: linear-gradient(45deg, #00ff88, #0099ff);
          animation: wave-pulse 1.5s infinite;
          border-radius: 4px;
        }

        @keyframes wave-pulse {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.5); }
        }

        /* Style Categories */
        .style-categories {
          margin-bottom: 2rem;
        }

        .section-title {
          color: var(--primary-text);
          font-size: 1.3rem;
          margin-bottom: 1.5rem;
          text-align: center;
          font-weight: 600;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
        }

        .category-card {
          position: relative;
          padding: 1.5rem;
          border: none;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
          text-align: left;
          overflow: hidden;
        }

        .category-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }

        .category-card.selected {
          transform: translateY(-6px) scale(1.05);
          box-shadow: 0 20px 40px rgba(0, 255, 136, 0.3);
          border: 2px solid #00ff88;
        }

        .category-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .category-info h4 {
          margin: 0 0 0.5rem 0;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .category-info p {
          margin: 0;
          opacity: 0.9;
          font-size: 0.9rem;
        }

        .holographic-overlay {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .category-card:hover .holographic-overlay {
          left: 100%;
        }

        /* Generate Button */
        .generate-btn {
          width: 100%;
          padding: 1.5rem;
          background: linear-gradient(45deg, #00ff88, #0099ff);
          border: none;
          border-radius: 16px;
          color: white;
          font-size: 1.2rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .generate-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 255, 136, 0.3);
        }

        .generate-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .processing-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* AI Response */
        .ai-response-area {
          margin-top: 3rem;
        }

        .ai-thinking {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .ai-avatar {
          position: relative;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(45deg, #00ff88, #0099ff);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .avatar-pulse {
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          border: 2px solid #00ff88;
          border-radius: 50%;
          animation: pulse-ring 2s infinite;
        }

        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.3); opacity: 0; }
        }

        .response-bubble {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1rem 1.5rem;
          color: white;
          backdrop-filter: blur(10px);
        }

        .typing-indicator {
          display: flex;
          gap: 0.3rem;
          margin-top: 0.5rem;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          background: #00ff88;
          border-radius: 50%;
          animation: typing 1.5s infinite;
        }

        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }

        /* Generated Look */
        .generated-look {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          backdrop-filter: blur(15px);
        }

        .look-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .look-title {
          color: white;
          font-size: 2rem;
          margin: 0 0 1rem 0;
          font-weight: 600;
        }

        .look-vibe {
          color: #00ff88;
          font-size: 1.1rem;
          font-style: italic;
        }

        .outfit-grid {
          display: grid;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .outfit-item {
          position: relative;
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1rem;
          transition: all 0.3s ease;
        }

        .outfit-item:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(10px);
        }

        .item-number {
          width: 30px;
          height: 30px;
          background: linear-gradient(45deg, #00ff88, #0099ff);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
        }

        .item-details {
          flex: 1;
        }

        .item-name {
          color: white;
          margin: 0 0 0.25rem 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .item-brand {
          color: #00ff88;
          margin: 0 0 0.5rem 0;
          font-weight: 500;
        }

        .item-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.9rem;
        }

        .item-price {
          color: #0099ff;
          font-weight: 600;
        }

        .item-store {
          color: rgba(255, 255, 255, 0.7);
        }

        .look-summary {
          text-align: center;
          margin-bottom: 2rem;
          padding: 1rem;
          background: rgba(0, 255, 136, 0.1);
          border: 1px solid rgba(0, 255, 136, 0.3);
          border-radius: 12px;
        }

        .total-price {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
        }

        .total-label {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.1rem;
        }

        .total-amount {
          color: #00ff88;
          font-size: 1.5rem;
          font-weight: 700;
        }

        /* Action Buttons */
        .look-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .action-btn {
          padding: 1rem 2rem;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
        }

        .screenshot-btn {
          background: linear-gradient(45deg, #ff0099, #ff6b35);
          color: white;
        }

        .whatsapp-btn {
          background: linear-gradient(45deg, #25d366, #128c7e);
          color: white;
        }

        .regenerate-btn {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        /* Coming Soon */
        .coming-soon {
          text-align: center;
          padding: 4rem 2rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .coming-soon h3 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: white;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .futuristic-ai-styler {
            padding: 2rem 1rem;
          }

          .ai-interface {
            padding: 1.5rem;
          }

          .mode-selector {
            gap: 0.5rem;
          }

          .mode-btn {
            padding: 0.75rem 1rem;
            font-size: 0.9rem;
          }

          .category-grid {
            grid-template-columns: 1fr;
          }

          .look-actions {
            flex-direction: column;
          }

          .ai-text {
            font-size: 1.4rem;
          }

          .content-area {
            min-height: 300px;
          }
        }
      `}</style>
    </div>
  );
};

export default FuturisticAIStyler;
