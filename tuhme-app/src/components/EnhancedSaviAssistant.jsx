import React, { useState, useEffect, useRef } from 'react';
import tuhmeLogo from '../assets/tuhme.png';

const EnhancedSaviAssistant = ({ isOpen = false }) => {
  const [isExpanded, setIsExpanded] = useState(isOpen);

  // React to external isOpen prop changes
  useEffect(() => {
    if (isOpen) {
      setIsExpanded(true);
    }
  }, [isOpen]);

  // Listen for global SAVI open events
  useEffect(() => {
    const handleOpenSavi = () => {
      setIsExpanded(true);
      setStatus('online');
      setShowQuickActions(true);
    };

    window.addEventListener('openSavi', handleOpenSavi);
    return () => window.removeEventListener('openSavi', handleOpenSavi);
  }, []);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [status, setStatus] = useState('online'); // online, generating, complete
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('dark');
  const messagesEndRef = useRef(null);

  // Gemini API configuration
  const GEMINI_API_KEY = 'AIzaSyBMv658ft_Ts0Zk2TdisYbZz_JrOCoR_vU';
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

  // Enhanced TUHME Knowledge Base
  const tuhmeBusiness = {
    concept: "TUHME is revolutionizing luxury shopping by bringing the store experience directly to customers' homes. We partner with Manhattan's finest boutiques to offer a try-before-you-buy service where customers can browse items online, have them delivered for a 15-minute private viewing session, and only pay for what they love.",
    
    businessModel: {
      core: "Personal shopping and home try-on service",
      revenue: "Per-item fees, membership subscriptions, and future commission partnerships",
      target: "Fashion-conscious consumers who value convenience and luxury experiences",
      differentiation: "Zero upfront payment, curated selection, personalized service"
    },

    services: {
      standard: "Screenshot any item, we source and deliver for $9.99 per item (3-5 items) or $7.99 per item (5-10 items)",
      premium: "TUHME Now membership at $49.99/month with 50% off all items, unlimited shopping, priority service, extended try-on time",
      express: "Same-day delivery available for orders placed before noon, rush orders in 2-4 hours"
    },

    futureGoals: {
      expansion: "Scaling to LA, Chicago, and Miami by 2025",
      technology: "AI-powered style recommendations, AR try-on integration, smart sizing",
      partnerships: "Direct partnerships with luxury brands, exclusive collections, early access programs",
      sustainability: "Reducing fashion waste through try-before-buy model, sustainable packaging"
    },

    initiatives: {
      current: [
        "Building AI-powered size and style matching",
        "Expanding partner store network",
        "Developing mobile app with AR features",
        "Creating exclusive capsule collections"
      ],
      upcoming: [
        "International shipping for luxury items",
        "Celebrity stylist collaborations", 
        "Pop-up try-on lounges in key markets",
        "Sustainable fashion marketplace"
      ]
    }
  };

  // Quick action buttons
  const quickActions = [
    { text: "How it works", action: "explain", icon: "💡" },
    { text: "Pricing & Plans", action: "pricing", icon: "💰" },
    { text: "Partner Stores", action: "stores", icon: "🏪" },
    { text: "Start Shopping", action: "order", icon: "🛍️" },
    { text: "TUHME Now", action: "membership", icon: "👑" },
    { text: "Future Plans", action: "future", icon: "🚀" }
  ];

  // Detect current theme
  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme') || 'dark';
      setCurrentTheme(theme);
    };

    updateTheme();
    
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-theme'] 
    });

    return () => observer.disconnect();
  }, []);

  // Initialize with greeting
  useEffect(() => {
    if (messages.length === 0 && isExpanded) {
      setMessages([{
        type: 'savi',
        text: "Hey there! 👋 I'm SAVI, your personal shopping companion at TUHME. I'm here to help you discover the magic of luxury shopping delivered to your door. What would you like to know about our revolutionary try-before-you-buy experience?",
        timestamp: new Date()
      }]);
      setShowQuickActions(true);
    }
  }, [messages.length, isExpanded]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isTyping) {
      scrollToBottom();
    }
  }, [isTyping]);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest'
        });
      }
    }, 100);
  };

  const getStatusColor = () => {
    switch (status) {
      case 'online': return '#22c55e';
      case 'generating': return '#f59e0b';
      case 'complete': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'online': return 'Online';
      case 'generating': return 'Thinking...';
      case 'complete': return 'Ready';
      default: return 'Offline';
    }
  };

  // Text-to-Speech with Google Cloud TTS API
  const speakText = async (text) => {
    setIsSpeaking(true);
    
    try {
      // Use Google Cloud TTS API with the provided key
      const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: { text: text },
          voice: {
            languageCode: 'en-US',
            name: 'en-US-Neural2-F', // Female neural voice (Zephyr-like)
            ssmlGender: 'FEMALE'
          },
          audioConfig: {
            audioEncoding: 'MP3',
            pitch: 2.0,
            speakingRate: 0.95
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const audioContent = data.audioContent;
        
        // Create audio from base64 data
        const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
        audio.onended = () => setIsSpeaking(false);
        audio.onerror = () => {
          console.log('TTS API failed, falling back to browser speech');
          fallbackToWebSpeech(text);
        };
        await audio.play();
      } else {
        throw new Error('TTS API request failed');
      }
    } catch (error) {
      console.log('TTS API error, using fallback:', error);
      fallbackToWebSpeech(text);
    }
  };

  // Fallback to browser speech synthesis
  const fallbackToWebSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Try to use best available voice
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('zephyr') ||
        voice.name.toLowerCase().includes('samantha') ||
        voice.name.toLowerCase().includes('female') ||
        voice.name.toLowerCase().includes('karen') ||
        voice.name.toLowerCase().includes('alex')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
    } else {
      setIsSpeaking(false);
    }
  };

  // Gemini API integration
  const callGeminiAPI = async (userMessage) => {
    try {
      const systemPrompt = `You are SAVI, TUHME's friendly and knowledgeable AI shopping assistant. Your personality is warm, enthusiastic, and fashion-savvy. 

TUHME Business Context:
${JSON.stringify(tuhmeBusiness, null, 2)}

Key Rules:
1. Always maintain an enthusiastic, personal tone like talking to a close friend
2. Focus on TUHME's luxury shopping experience and try-before-you-buy model
3. Mention specific details about pricing, services, and future plans when relevant
4. Use emojis naturally but don't overdo it
5. Keep responses conversational and helpful
6. If asked about things outside TUHME, politely redirect to TUHME services

User Message: ${userMessage}

Respond as SAVI in a helpful, enthusiastic way:`;

      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: systemPrompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || "I'm having trouble connecting right now, but I'm still here to help! Try asking me about TUHME's services. 😊";
      
    } catch (error) {
      console.error('Gemini API Error:', error);
      return getFallbackResponse(userMessage);
    }
  };

  // Fallback responses for when API fails
  const getFallbackResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('how') && (input.includes('work') || input.includes('does'))) {
      return "TUHME works like magic! ✨ Just screenshot any item you love, send it to us via WhatsApp (+1 646-588-9916), and we'll source it from the store and bring it right to your door. You get 15 minutes to try everything on in your own space, then only pay for what you keep!";
    }
    
    if (input.includes('price') || input.includes('cost') || input.includes('expensive')) {
      return "Our pricing is super transparent! For occasional shopping, it's $9.99 per item (3-5 pieces) or $7.99 per item (5-10 pieces). But most of our fashion lovers go for TUHME Now at $49.99/month - you get 50% off everything plus unlimited shopping! 💎";
    }
    
    if (input.includes('store') || input.includes('shop') || input.includes('brand')) {
      return "We can shop literally anywhere! Gucci, Prada, Saks, Bloomingdale's, that cute boutique you found on Instagram - you name it! Our personal shoppers are like fashion detectives who can find anything. 🕵️‍♀️✨";
    }
    
    if (input.includes('future') || input.includes('plan') || input.includes('coming')) {
      return "Exciting things ahead! We're expanding to LA, Chicago, and Miami by 2025, building AI-powered style recommendations, AR try-on features, and even planning celebrity stylist collaborations! The future of shopping is getting even more amazing! 🚀";
    }

    return "I love chatting about TUHME! Whether you're curious about our try-before-you-buy magic, our amazing partner stores, future plans, or just want to start shopping - I'm here to help make your luxury shopping dreams come true! ✨";
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = {
      type: 'user',
      text: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);
    setStatus('generating');
    setShowQuickActions(false);

    try {
      const response = await callGeminiAPI(currentMessage);
      
      setTimeout(() => {
        const saviMessage = {
          type: 'savi',
          text: response,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, saviMessage]);
        setIsTyping(false);
        setStatus('complete');
        
        setTimeout(() => setStatus('online'), 1500);
      }, 800);
      
    } catch (error) {
      console.error('Error:', error);
      setIsTyping(false);
      setStatus('online');
    }
  };

  const handleQuickAction = async (actionType) => {
    console.log('Quick action triggered:', actionType);
    setStatus('generating');
    setIsTyping(true);
    setShowQuickActions(false);
    
    const actionPrompts = {
      explain: "Explain how TUHME's try-before-you-buy service works",
      pricing: "Tell me about TUHME's pricing and membership options",
      stores: "What stores and brands can TUHME shop from?",
      order: "How do I start shopping with TUHME?",
      membership: "Tell me about TUHME Now membership benefits",
      future: "What are TUHME's future plans and upcoming features?"
    };

    try {
      const response = await callGeminiAPI(actionPrompts[actionType] || "Tell me about TUHME");
      
      setTimeout(() => {
        const saviMessage = {
          type: 'savi',
          text: response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, saviMessage]);
        setIsTyping(false);
        setStatus('complete');
        setTimeout(() => setStatus('online'), 1500);
      }, 800);
    } catch (error) {
      console.error('Quick action error:', error);
      setTimeout(() => {
        const errorMessage = {
          type: 'savi',
          text: "I'm having trouble processing that request right now, but I'm still here to help! Feel free to ask me anything about TUHME! 😊",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
        setStatus('online');
      }, 800);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setStatus('online');
      setShowQuickActions(true);
    }
  };

  const getThemeStyles = () => {
    const isLight = currentTheme.includes('light');
    
    return {
      container: {
        '--bg-primary': isLight ? 'rgba(255, 255, 255, 0.98)' : 'rgba(0, 0, 0, 0.95)',
        '--bg-secondary': isLight ? 'rgba(248, 250, 252, 0.8)' : 'rgba(26, 26, 26, 0.9)',
        '--bg-header': isLight ? 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' : 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
        '--text-primary': isLight ? '#1a1a1a' : '#ffffff',
        '--text-secondary': isLight ? '#64748b' : '#cbd5e1',
        '--border-color': isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
        '--message-bg': isLight ? 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' : 'linear-gradient(135deg, #374151 0%, #4b5563 100%)',
        '--user-message-bg': isLight ? 'linear-gradient(135deg, #1f2937 0%, #374151 100%)' : 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)',
        '--accent-color': 'var(--theme-accent, #d4af37)'
      }
    };
  };

  const themeStyles = getThemeStyles();

  return (
    <div className="enhanced-savi-container" style={themeStyles.container}>
      {/* Floating Toggle Button */}
      <div 
        className={`savi-toggle-button ${isExpanded ? 'expanded' : ''}`}
        onClick={toggleExpanded}
      >
        <div className="toggle-avatar">
          <img src={tuhmeLogo} alt="SAVI" />
          <div 
            className="status-indicator"
            style={{ backgroundColor: getStatusColor() }}
          />
        </div>
        {!isExpanded && (
          <div className="toggle-text">
            <span>SAVI</span>
            <small>{getStatusText()}</small>
          </div>
        )}
      </div>

      {/* Expanded Chat Interface */}
      {isExpanded && (
        <div className="savi-chat-expanded">
          <div className="savi-header">
            <div className="savi-info">
              <div className="savi-avatar">
                <img src={tuhmeLogo} alt="SAVI" />
                <div 
                  className="status-dot"
                  style={{ backgroundColor: getStatusColor() }}
                />
              </div>
              <div className="savi-details">
                <h4>SAVI Assistant</h4>
                <span className="savi-status" style={{ color: getStatusColor() }}>
                  {getStatusText()}
                </span>
              </div>
            </div>
            <div className="header-actions">
              <button 
                className="quick-actions-toggle"
                onClick={() => setShowQuickActions(!showQuickActions)}
                title="Quick suggestions"
              >
                💡
              </button>
              {isSpeaking && (
                <button 
                  className="speaking-indicator"
                  onClick={() => speechSynthesis.cancel()}
                  title="Stop speaking"
                >
                  🔊
                </button>
              )}
              <button 
                className="savi-minimize"
                onClick={() => setIsExpanded(false)}
                title="Minimize"
              >
                ─
              </button>
            </div>
          </div>

          <div className="savi-chat">
            <div className="savi-messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.type}`}>
                  {message.type === 'savi' && (
                    <div className="message-avatar">
                      <img src={tuhmeLogo} alt="SAVI" />
                    </div>
                  )}
                  <div className="message-content">
                    <div className="message-text">{message.text}</div>
                    <div className="message-actions">
                      <div className="message-time">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      {message.type === 'savi' && (
                        <button 
                          className="speak-button"
                          onClick={() => speakText(message.text)}
                          disabled={isSpeaking}
                          title="Listen to message"
                        >
                          🔊
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="message savi">
                  <div className="message-avatar">
                    <img src={tuhmeLogo} alt="SAVI" />
                  </div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Quick Actions */}
            {showQuickActions && (
              <div className="savi-quick-actions">
                <div className="quick-actions-header">
                  <span>Quick Actions</span>
                  <button onClick={() => setShowQuickActions(false)}>×</button>
                </div>
                <div className="quick-actions-grid">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      className="quick-action-btn"
                      onClick={() => handleQuickAction(action.action)}
                    >
                      <span className="action-icon">{action.icon}</span>
                      <span className="action-text">{action.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced Input Area */}
            <div className="savi-input">
              <div className="input-container">
                <textarea
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask SAVI anything about TUHME..."
                  rows="1"
                  disabled={isTyping}
                />
                <button 
                  className="send-button"
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim() || isTyping}
                >
                  {isTyping ? (
                    <div className="sending-spinner" />
                  ) : (
                    <span>→</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .enhanced-savi-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1000;
          font-family: var(--font-family-primary, 'Inter', system-ui, sans-serif);
        }

        .savi-toggle-button {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--bg-header);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
          border-radius: 28px;
          padding: 12px 16px;
          cursor: pointer;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            0 4px 16px rgba(0, 0, 0, 0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          min-width: 64px;
          justify-content: center;
          backdrop-filter: blur(20px);
        }

        .savi-toggle-button:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.4),
            0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .savi-toggle-button.expanded {
          border-radius: 16px 16px 0 0;
        }

        .toggle-avatar {
          position: relative;
          width: 40px;
          height: 40px;
          flex-shrink: 0;
        }

        .toggle-avatar img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .status-indicator {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid var(--bg-primary);
          animation: pulse 2s infinite;
        }

        .toggle-text {
          display: flex;
          flex-direction: column;
          text-align: left;
          min-width: 0;
        }

        .toggle-text span {
          font-weight: 600;
          font-size: 14px;
          line-height: 1.2;
          color: var(--text-primary);
        }

        .toggle-text small {
          font-size: 11px;
          opacity: 0.8;
          line-height: 1;
          color: var(--text-secondary);
        }

        .savi-chat-expanded {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 380px;
          height: 520px;
          background: var(--bg-primary);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: expandUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes expandUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .savi-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          background: var(--bg-header);
          color: var(--text-primary);
          border-radius: 16px 16px 0 0;
          border-bottom: 1px solid var(--border-color);
        }

        .savi-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .savi-avatar {
          position: relative;
          width: 36px;
          height: 36px;
        }

        .savi-avatar img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .status-dot {
          position: absolute;
          bottom: -1px;
          right: -1px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid var(--bg-primary);
        }

        .savi-details h4 {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.2;
          color: var(--text-primary);
        }

        .savi-status {
          font-size: 11px;
          opacity: 0.9;
          line-height: 1;
          margin-top: 2px;
        }

        .header-actions {
          display: flex;
          gap: 8px;
        }

        .quick-actions-toggle,
        .speaking-indicator,
        .savi-minimize {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          width: 28px;
          height: 28px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .quick-actions-toggle:hover,
        .speaking-indicator:hover,
        .savi-minimize:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: scale(1.05);
        }

        .speaking-indicator {
          animation: pulse 1s infinite;
        }

        .savi-chat {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 0;
        }

        .savi-messages {
          flex: 1;
          padding: 16px;
          padding-bottom: 24px;
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-height: 0;
          max-height: calc(520px - 180px);
          scroll-behavior: smooth;
        }

        .savi-messages::-webkit-scrollbar {
          width: 4px;
        }

        .savi-messages::-webkit-scrollbar-track {
          background: transparent;
        }

        .savi-messages::-webkit-scrollbar-thumb {
          background: var(--border-color);
          border-radius: 4px;
        }

        .message {
          display: flex;
          gap: 8px;
          max-width: 90%;
          animation: slideIn 0.3s ease-out;
        }

        .message.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .message-avatar {
          width: 28px;
          height: 28px;
          flex-shrink: 0;
          margin-top: 4px;
        }

        .message-avatar img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .message-content {
          flex: 1;
          min-width: 0;
        }

        .message-text {
          background: var(--message-bg);
          border: 1px solid var(--border-color);
          padding: 10px 14px;
          border-radius: 16px 16px 16px 4px;
          font-size: 14px;
          line-height: 1.4;
          color: var(--text-primary);
          word-wrap: break-word;
        }

        .message.user .message-text {
          background: var(--user-message-bg);
          color: white;
          border-radius: 16px 16px 4px 16px;
          border: none;
        }

        .message-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 4px;
          padding: 0 4px;
        }

        .message-time {
          font-size: 10px;
          color: var(--text-secondary);
        }

        .speak-button {
          background: none;
          border: none;
          font-size: 12px;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.2s ease;
        }

        .speak-button:hover {
          opacity: 1;
        }

        .speak-button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 12px 16px;
          background: var(--message-bg);
          border: 1px solid var(--border-color);
          border-radius: 16px 16px 16px 4px;
          width: fit-content;
        }

        .typing-indicator span {
          width: 6px;
          height: 6px;
          background: var(--text-secondary);
          border-radius: 50%;
          animation: typing 1.4s infinite ease-in-out;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-8px);
            opacity: 1;
          }
        }

        .savi-quick-actions {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          padding: 12px 16px;
          animation: slideDown 0.3s ease-out;
        }

        .quick-actions-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .quick-actions-header span {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .quick-actions-header button {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 16px;
          padding: 0;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .quick-actions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .quick-action-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 8px 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 12px;
          text-align: left;
          color: var(--text-primary);
        }

        .quick-action-btn:hover {
          background: var(--message-bg);
          transform: translateY(-1px);
        }

        .action-icon {
          font-size: 14px;
          flex-shrink: 0;
        }

        .action-text {
          color: var(--text-primary);
          font-weight: 500;
          line-height: 1.2;
        }

        .savi-input {
          padding: 12px 16px;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
        }

        .input-container {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }

        .input-container textarea {
          flex: 1;
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 10px 16px;
          font-size: 14px;
          line-height: 1.4;
          resize: none;
          min-height: 40px;
          max-height: 80px;
          background: var(--bg-primary);
          color: var(--text-primary);
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .input-container textarea:focus {
          outline: none;
          border-color: var(--accent-color);
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
        }

        .input-container textarea:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .input-container textarea::placeholder {
          color: var(--text-secondary);
        }

        .send-button {
          width: 40px;
          height: 40px;
          background: var(--accent-color);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .send-button:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
        }

        .send-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .sending-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .enhanced-savi-container {
            bottom: 20px;
            right: 20px;
          }
          
          .savi-chat-expanded {
            width: calc(100vw - 40px);
            max-width: 360px;
            height: 480px;
          }
          
          .toggle-text {
            display: none;
          }
          
          .savi-toggle-button {
            width: 64px;
            height: 64px;
            padding: 12px;
          }
        }

        @media (max-width: 480px) {
          .savi-chat-expanded {
            width: calc(100vw - 20px);
            height: calc(100vh - 100px);
            bottom: 10px;
            right: 10px;
          }
          
          .quick-actions-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default EnhancedSaviAssistant;
