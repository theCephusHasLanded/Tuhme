import React, { useState, useEffect, useRef } from 'react';
import tuhmeLogo from '../assets/tuhme.png';
import '../styles/savi-optimized.css';
import '../styles/liquid-glass-system.css';

const SaviAssistant = ({ isOpen = false, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(isOpen);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [status, setStatus] = useState('online'); // online, generating, complete
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [proactiveNotification, setProactiveNotification] = useState(null);
  const [userInteractionCount, setUserInteractionCount] = useState(0);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const [sessionStartTime] = useState(Date.now());
  const messagesEndRef = useRef(null);
  const notificationTimeoutRef = useRef(null);

  // Luxury color palettes that match Hero component
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
    { primary: '#1a1914', secondary: '#2a2925', accent: '#ff6b35', name: 'Amber Prestige' },
    { primary: '#0f141a', secondary: '#1a252a', accent: '#4ecdc4', name: 'Turquoise Calm' },
    { primary: '#1a0f0f', secondary: '#2a1a1a', accent: '#ff9a8b', name: 'Coral Sunset' },
    { primary: '#14141a', secondary: '#25252a', accent: '#f8f32b', name: 'Citrine Bright' },
    { primary: '#1a1a14', secondary: '#2a2a25', accent: '#95e1d3', name: 'Mint Elegance' },
    { primary: '#191014', secondary: '#2a1a25', accent: '#f38ba8', name: 'Peony Blush' },
    { primary: '#141a19', secondary: '#252a29', accent: '#74c0fc', name: 'Azure Luxury' },
    { primary: '#1a1414', secondary: '#2a2525', accent: '#ffd43b', name: 'Topaz Glow' },
    { primary: '#0f1a1a', secondary: '#1a2a2a', accent: '#b197fc', name: 'Lavender Dusk' },
    { primary: '#1a190f', secondary: '#2a291a', accent: '#69db7c', name: 'Jade Prosperity' },
    { primary: '#1a0f19', secondary: '#2a1a29', accent: '#ffa8a8', name: 'Blush Elegance' },
    { primary: '#0f1a0f', secondary: '#1a2a1a', accent: '#82c91e', name: 'Peridot Fresh' },
    { primary: '#1a1a1a', secondary: '#2a2a2a', accent: '#ffffff', name: 'Classic Mono' }
  ];

  const currentPalette = luxuryPalettes[currentHour % luxuryPalettes.length];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  // Proactive notification system
  useEffect(() => {
    if (!isExpanded) {
      const scheduleProactiveNotification = () => {
        const timeSinceStart = Date.now() - sessionStartTime;
        const timeSinceLastInteraction = Date.now() - lastInteractionTime;
        
        // Clear any existing timeout
        if (notificationTimeoutRef.current) {
          clearTimeout(notificationTimeoutRef.current);
        }
        
        let notificationDelay;
        let notificationMessage;
        
        // First-time visitor (no interactions yet)
        if (userInteractionCount === 0) {
          if (timeSinceStart > 15000) { // After 15 seconds
            notificationMessage = {
              text: "👋 New here? I can show you how TUHME works!",
              action: "how does tuhme work",
              type: "welcome"
            };
            notificationDelay = 1000;
          } else if (timeSinceStart > 30000) { // After 30 seconds
            notificationMessage = {
              text: "💡 Want to see our pricing? It's super transparent!",
              action: "pricing", 
              type: "pricing"
            };
            notificationDelay = 1000;
          } else if (timeSinceStart > 45000) { // After 45 seconds
            notificationMessage = {
              text: "🏪 Curious which stores we can shop from?",
              action: "stores",
              type: "stores"
            };
            notificationDelay = 1000;
          }
        }
        // Returning user (has interacted before)
        else if (userInteractionCount >= 1) {
          if (timeSinceLastInteraction > 60000) { // After 1 minute of inactivity
            notificationMessage = {
              text: "💬 Have any questions about delivery or fitting?",
              action: "delivery",
              type: "followup"
            };
            notificationDelay = 1000;
          } else if (timeSinceLastInteraction > 120000) { // After 2 minutes
            notificationMessage = {
              text: "🚀 Ready to start your first order?",
              action: "whatsapp",
              type: "cta"
            };
            notificationDelay = 1000;
          }
        }
        
        if (notificationMessage && notificationDelay) {
          notificationTimeoutRef.current = setTimeout(() => {
            setProactiveNotification(notificationMessage);
            
            // Auto-hide notification after 8 seconds
            setTimeout(() => {
              setProactiveNotification(null);
            }, 8000);
          }, notificationDelay);
        }
      };
      
      scheduleProactiveNotification();
      
      return () => {
        if (notificationTimeoutRef.current) {
          clearTimeout(notificationTimeoutRef.current);
        }
      };
    }
  }, [isExpanded, userInteractionCount, lastInteractionTime, sessionStartTime]);

  const saviKnowledge = {
    greeting: "Hey there! 👋 I'm SAVI, your personal shopping companion at TUHME. Think of me as your fashion-savvy friend who's here to make luxury shopping effortless for you. I have all the answers to your questions, so ask me anything! What can I help you discover today?",
    
    faq: {
      // Core Service Questions
      "how does tuhme work": "Oh, it's actually super simple! Here's the magic: You see something gorgeous online? Just screenshot it and send it to us on WhatsApp. We'll go grab it from the store and bring it right to your door. You get 15 minutes to try everything on in your own space, then only pay for what you absolutely love. It's like having a personal shopper who brings the entire store to you! ✨",
      
      "pricing": "So here's the deal - we keep it transparent and fair! For occasional shopping, it's $9.99 per item for 3-5 pieces, or if you're a bit more adventurous, $7.99 per item for 5-10 pieces. But honestly? Most of our fashion lovers go for TUHME Now at $49.99/month - you get 50% off everything plus unlimited shopping. It pays for itself after just one good haul! 💎",
      
      "areas": "Right now we're bringing the magic to Manhattan and Brooklyn! If you place your order before noon, we can actually get everything to you the same day (pretty amazing, right?). After 12 PM, we'll have it to you by the next day. We're working on expanding to more neighborhoods because honestly, everyone deserves this level of luxury convenience! 🗽",
      
      "stores": "Honestly, we can shop anywhere you can think of! Gucci, Prada, those gorgeous Saks displays, Bloomingdale's - you name it. Even if it's that cute little boutique you discovered on Instagram that we've never been to, we'll figure it out. Our shoppers are basically fashion detectives! 🕵️‍♀️✨",
      
      // Fit & Returns (from FAQ)
      "fit": "No problem at all! This is the beauty of TUHME - we return anything you don't want directly to the store. You only pay for what you keep. It's like having a personal fitting room in your own space with zero commitment! 💕",
      
      "what if items don't fit": "No problem at all! This is the beauty of TUHME - we return anything you don't want directly to the store. You only pay for what you keep. It's like having a personal fitting room in your own space with zero commitment! 💕",
      
      // Delivery Details (from FAQ)
      "delivery": "Orders placed before 12 PM are delivered same-day. Orders after 12 PM arrive the next day. It's pretty amazing how fast we can make the magic happen! ⚡",
      
      "how long does delivery take": "Orders placed before 12 PM are delivered same-day. Orders after 12 PM arrive the next day. It's pretty amazing how fast we can make the magic happen! ⚡",
      
      // Payment Methods (from FAQ)
      "payment": "This is my favorite part - you literally only pay for what you fall in love with! No upfront costs, no commitments. When our shopper arrives, they use a secure Square Reader for payments: chip cards, contactless cards, Apple Pay, and Google Pay. Anything that doesn't spark joy? We take it right back to the store. Zero hassle, I promise! 💖",
      
      "payment methods": "We use Square Reader for secure payments: chip cards, contactless cards, Apple Pay, and Google Pay. Super convenient and completely secure! 💳",
      
      // Store Access (from FAQ)
      "any store": "Yes! Any local store in Manhattan or Brooklyn, even if they're not on our partner list. Our shoppers are like fashion ninjas - they can get into anywhere! 🥷✨",
      
      "can i order from any store": "Yes! Any local store in Manhattan or Brooklyn, even if they're not on our partner list. Our shoppers are like fashion ninjas - they can get into anywhere! 🥷✨",
      
      // Delivery Logistics (from delivery FAQ)
      "not home": "No stress! We can coordinate with doormen, schedule for your availability, or offer contactless delivery options. We're super flexible because life happens! 🏠",
      
      "what if im not home": "No stress! We can coordinate with doormen, schedule for your availability, or offer contactless delivery options. We're super flexible because life happens! 🏠",
      
      "wait time": "Standard 15 minutes for your try-on session, extended to 20 minutes for TUHME Now subscribers. It's your time to fall in love with what we brought! ⏰",
      
      "how long do shoppers wait": "Standard 15 minutes for your try-on session, extended to 20 minutes for TUHME Now subscribers. It's your time to fall in love with what we brought! ⏰",
      
      "weather": "We deliver in all weather conditions with appropriate protection for your items. Rain or shine, your fashion comes first! ☔️✨",
      
      "bad weather": "We deliver in all weather conditions with appropriate protection for your items. Rain or shine, your fashion comes first! ☔️✨",
      
      "reschedule": "Yes! Contact us via WhatsApp to reschedule up to 2 hours before your delivery window. We totally get that plans change! 📅",
      
      "can i reschedule delivery": "Yes! Contact us via WhatsApp to reschedule up to 2 hours before your delivery window. We totally get that plans change! 📅",
      
      // Try-On Details
      "try on time": "You get a full 15 minutes of pure fashion fun in your own space - no rushed fitting rooms, no harsh lighting, just you and your mirror! TUHME Now members get even more time (20 minutes) because sometimes you need that extra moment to fall in love, you know? 😍",
      
      // Membership
      "membership": "TUHME Now is like having a fashion fairy godmother! For $49.99/month, you get unlimited shopping trips (seriously!), half-price on everything, priority treatment, extra try-on time, and first access to all our cool new features. It's basically designed for people who understand that great style shouldn't have limits! ✨👑",
      
      "cancel": "No worries! You can cancel your TUHME Now subscription anytime before your next billing date. You can also pause it for up to 3 months if you need a break.",
      
      "express": "Express service is available for fashion emergencies! Rush orders can be delivered in 2-4 hours for an additional fee. Perfect for last-minute events.",
      
      // Contact & WhatsApp
      "whatsapp": "Just text us via WhatsApp! I love how personal it feels - just send me those screenshots of whatever caught your eye, tell me your size, and any little details that matter to you. I'm usually back to you within minutes because honestly, when you find something perfect, you shouldn't have to wait! 📱✨",
      
      "returns": "If you don't love something, just don't pay for it! Our shopper takes it right back to the store. No hassle, no questions asked.",
      
      "safety": "All our personal shoppers are verified professionals. We offer contactless delivery options and secure payment processing. Your safety and privacy are our top priorities."
    },
    
    quickActions: [
      { text: "💡 How it works", key: "how does tuhme work", icon: "💡" },
      { text: "💰 Pricing", key: "pricing", icon: "💰" },
      { text: "🏪 Stores", key: "stores", icon: "🏪" },
      { text: "👑 TUHME Now", key: "membership", icon: "👑" },
      { text: "📱 Start ordering", key: "whatsapp", icon: "📱" }
    ]
  };

  useEffect(() => {
    if (messages.length === 0 && isExpanded) {
      setMessages([{
        type: 'savi',
        text: saviKnowledge.greeting,
        timestamp: new Date()
      }]);
    }
  }, [messages.length, saviKnowledge.greeting, isExpanded]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      case 'generating': return 'Typing...';
      case 'complete': return 'Ready';
      default: return 'Offline';
    }
  };

  const findBestMatch = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Direct keyword matching with enhanced coverage
    for (const [key, response] of Object.entries(saviKnowledge.faq)) {
      if (input.includes(key) || key.split(' ').some(word => input.includes(word))) {
        return response;
      }
    }

    // Enhanced contextual matching for FAQ topics
    if (input.includes('start') || input.includes('order') || input.includes('begin') || input.includes('whatsapp')) {
      return saviKnowledge.faq.whatsapp;
    }
    
    if (input.includes('cost') || input.includes('price') || input.includes('expensive') || input.includes('pay')) {
      return saviKnowledge.faq.pricing;
    }
    
    if (input.includes('where') || input.includes('location') || input.includes('deliver') || input.includes('area')) {
      return saviKnowledge.faq.areas;
    }

    if (input.includes('fit') || input.includes('size') || input.includes("doesn't fit") || input.includes('return')) {
      return saviKnowledge.faq.fit;
    }

    if (input.includes('delivery time') || input.includes('how long') || input.includes('when')) {
      return saviKnowledge.faq.delivery;
    }

    if (input.includes('payment') || input.includes('card') || input.includes('apple pay') || input.includes('google pay')) {
      return saviKnowledge.faq["payment methods"];
    }

    if (input.includes('not home') || input.includes('doorman') || input.includes('miss delivery')) {
      return saviKnowledge.faq["not home"];
    }

    if (input.includes('wait') || input.includes('try on') || input.includes('fitting')) {
      return saviKnowledge.faq["wait time"];
    }

    if (input.includes('weather') || input.includes('rain') || input.includes('snow')) {
      return saviKnowledge.faq.weather;
    }

    if (input.includes('reschedule') || input.includes('change time') || input.includes('cancel delivery')) {
      return saviKnowledge.faq.reschedule;
    }

    if (input.includes('any store') || input.includes('which stores') || input.includes('boutique')) {
      return saviKnowledge.faq["any store"];
    }

    if (input.includes('membership') || input.includes('tuhme now') || input.includes('subscription')) {
      return saviKnowledge.faq.membership;
    }

    if (input.includes('safety') || input.includes('secure') || input.includes('trust')) {
      return saviKnowledge.faq.safety;
    }

    return "You know what? I love chatting about all things TUHME! Whether you're curious about how we make the magic happen, what it costs, which stores we can raid for you, delivery details, fitting questions, or anything else that's on your mind - I'm all ears! What's got you excited about luxury shopping today? 😊✨";
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
    setProactiveNotification(null);
    setUserInteractionCount(prev => prev + 1);
    setLastInteractionTime(Date.now());

    // Simulate thinking time
    setTimeout(() => {
      const response = findBestMatch(currentMessage);
      const saviMessage = {
        type: 'savi',
        text: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, saviMessage]);
      setIsTyping(false);
      setStatus('complete');
      
      // Reset to online after a moment
      setTimeout(() => setStatus('online'), 1500);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickAction = (actionKey) => {
    setStatus('generating');
    setIsTyping(true);
    setShowQuickActions(false);
    setProactiveNotification(null);
    setUserInteractionCount(prev => prev + 1);
    setLastInteractionTime(Date.now());
    
    setTimeout(() => {
      const response = saviKnowledge.faq[actionKey];
      if (response) {
        const saviMessage = {
          type: 'savi',
          text: response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, saviMessage]);
      }
      setIsTyping(false);
      setStatus('complete');
      setTimeout(() => setStatus('online'), 1500);
    }, 800);
  };
  
  const handleProactiveClick = (action) => {
    setIsExpanded(true);
    setProactiveNotification(null);
    setTimeout(() => {
      handleQuickAction(action);
    }, 300);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
    if (e.key === 'Escape') {
      if (onClose) {
        onClose();
      } else {
        setIsExpanded(false);
      }
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setStatus('online');
      setShowQuickActions(true);
      setProactiveNotification(null);
      setUserInteractionCount(prev => prev + 1);
      setLastInteractionTime(Date.now());
    }
  };


  const saviStyles = {
    '--savi-primary': currentPalette.primary,
    '--savi-secondary': currentPalette.secondary,
    '--savi-accent': currentPalette.accent,
    '--savi-bg': `linear-gradient(135deg, ${currentPalette.primary}95 0%, ${currentPalette.secondary}98 100%)`,
    '--savi-border': `1px solid ${currentPalette.accent}30`,
    '--savi-glass': `rgba(255, 255, 255, 0.1)`,
    '--savi-text': '#ffffff',
    '--savi-text-secondary': '#ffffff90'
  };

  return (
    <div className="savi-container" style={saviStyles} data-palette={currentPalette.name.toLowerCase().replace(' ', '-')}>
      {/* Proactive Notification */}
      {proactiveNotification && !isExpanded && (
        <div className="savi-proactive-notification liquid-glass-card accent animated-bounce">
          <div className="notification-content">
            <div className="notification-text">{proactiveNotification.text}</div>
            <div className="notification-actions">
              <button 
                className="notification-btn primary liquid-glass-button"
                onClick={() => handleProactiveClick(proactiveNotification.action)}
              >
                Tell me more
              </button>
              <button 
                className="notification-btn secondary liquid-glass-button"
                onClick={() => setProactiveNotification(null)}
              >
                ×
              </button>
            </div>
          </div>
          <div className="notification-pointer"></div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <div 
        className={`savi-toggle-button liquid-glass-icon accent ${isExpanded ? 'expanded' : ''} ${proactiveNotification ? 'has-notification' : ''}`}
        onClick={toggleExpanded}
      >
        <div className="toggle-avatar">
          <img src={tuhmeLogo} alt="SAVI" />
          <div 
            className={`status-indicator liquid-animate-glow ${proactiveNotification ? 'pulsing' : ''}`}
            style={{ backgroundColor: currentPalette.accent }}
          />
        </div>
        {!isExpanded && (
          <div className="toggle-text" style={{ color: 'var(--primary-bg)' }}>
            <span>SAVI</span>
            <small style={{ color: currentPalette.accent }}>{getStatusText()}</small>
          </div>
        )}
      </div>

      {/* Expanded Chat Interface */}
      {isExpanded && (
        <div 
          className="savi-chat-expanded liquid-glass-modal"
        >
          <div 
            className="savi-header liquid-glass-nav"
          >
            <div className="savi-info">
              <div className="savi-avatar">
                <img src={tuhmeLogo} alt="SAVI" />
                <div 
                  className="status-dot"
                  style={{ backgroundColor: currentPalette.accent }}
                />
              </div>
              <div className="savi-details">
                <h4 style={{ color: 'var(--primary-bg)' }}>SAVI Assistant</h4>
                <span className="savi-status" style={{ color: currentPalette.accent }}>
                  {getStatusText()}
                </span>
              </div>
            </div>
            <div className="header-actions">
              <button 
                className="quick-actions-toggle liquid-glass-button"
                onClick={() => setShowQuickActions(!showQuickActions)}
                title="Quick suggestions"
              >
                💡
              </button>
              <button 
                className="savi-minimize liquid-glass-button"
                onClick={() => setIsExpanded(false)}
                title="Minimize"
              >
                ─
              </button>
              <button 
                className="savi-close liquid-glass-button"
                onClick={onClose || (() => setIsExpanded(false))}
                title="Close (ESC)"
              >
                ×
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
                    <div className="message-time">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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

            {/* Selective Quick Actions */}
            {showQuickActions && (
              <div className="savi-quick-actions liquid-glass-card">
                <div className="quick-actions-header">
                  <span>Quick suggestions</span>
                  <button 
                    className="liquid-glass-button" 
                    onClick={() => setShowQuickActions(false)}
                  >
                    ×
                  </button>
                </div>
                <div className="quick-actions-grid">
                  {saviKnowledge.quickActions.map((action, index) => (
                    <button
                      key={index}
                      className="quick-action-btn liquid-glass-button primary liquid-animate-float"
                      onClick={() => handleQuickAction(action.key)}
                    >
                      <span className="action-icon">{action.icon}</span>
                      <span className="action-text">{action.text.replace(action.icon, '').trim()}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="savi-input liquid-glass-base">
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
                  className="send-button liquid-glass-icon accent"
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
    </div>
  );
};

export default SaviAssistant;