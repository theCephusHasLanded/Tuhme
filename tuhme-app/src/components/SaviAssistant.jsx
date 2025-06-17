import React, { useState, useEffect, useRef } from 'react';
import tuhmeLogo from '../assets/tuhme.png';
import '../styles/savi-optimized.css';

const SaviAssistant = ({ isOpen = false }) => {
  const [isExpanded, setIsExpanded] = useState(isOpen);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [status, setStatus] = useState('online'); // online, generating, complete
  const [showQuickActions, setShowQuickActions] = useState(false);
  const messagesEndRef = useRef(null);

  const saviKnowledge = {
    greeting: "Hey there! 👋 I'm SAVI, your personal shopping companion at TUHME. Think of me as your fashion-savvy friend who's here to make luxury shopping effortless for you. What can I help you discover today?",
    
    faq: {
      "how does tuhme work": "Oh, it's actually super simple! Here's the magic: You see something gorgeous online? Just screenshot it and send it to us on WhatsApp. We'll go grab it from the store and bring it right to your door. You get 15 minutes to try everything on in your own space, then only pay for what you absolutely love. It's like having a personal shopper who brings the entire store to you! ✨",
      
      "pricing": "So here's the deal - we keep it transparent and fair! For occasional shopping, it's $9.99 per item for 3-5 pieces, or if you're a bit more adventurous, $7.99 per item for 5-10 pieces. But honestly? Most of our fashion lovers go for TUHME Now at $49.99/month - you get 50% off everything plus unlimited shopping. It pays for itself after just one good haul! 💎",
      
      "areas": "Right now we're bringing the magic to Manhattan and Brooklyn! If you place your order before noon, we can actually get everything to you the same day (pretty amazing, right?). After 12 PM, we'll have it to you by the next day. We're working on expanding to more neighborhoods because honestly, everyone deserves this level of luxury convenience! 🗽",
      
      "stores": "Honestly, we can shop anywhere you can think of! Gucci, Prada, those gorgeous Saks displays, Bloomingdale's - you name it. Even if it's that cute little boutique you discovered on Instagram that we've never been to, we'll figure it out. Our shoppers are basically fashion detectives! 🕵️‍♀️✨",
      
      "payment": "This is my favorite part - you literally only pay for what you fall in love with! No upfront costs, no commitments. When our shopper arrives, they have a contactless card reader, super secure and easy. Anything that doesn't spark joy? We take it right back to the store. Zero hassle, I promise! 💖",
      
      "try on time": "You get a full 15 minutes of pure fashion fun in your own space - no rushed fitting rooms, no harsh lighting, just you and your mirror! TUHME Now members get even more time (20 minutes) because sometimes you need that extra moment to fall in love, you know? 😍",
      
      "membership": "TUHME Now is like having a fashion fairy godmother! For $49.99/month, you get unlimited shopping trips (seriously!), half-price on everything, priority treatment, extra try-on time, and first access to all our cool new features. It's basically designed for people who understand that great style shouldn't have limits! ✨👑",
      
      "cancel": "No worries! You can cancel your TUHME Now subscription anytime before your next billing date. You can also pause it for up to 3 months if you need a break.",
      
      "express": "Express service is available for fashion emergencies! Rush orders can be delivered in 2-4 hours for an additional fee. Perfect for last-minute events.",
      
      "whatsapp": "Just text us at +1 (646) 588-9916! I love how personal it feels - just send me those screenshots of whatever caught your eye, tell me your size, and any little details that matter to you. I'm usually back to you within minutes because honestly, when you find something perfect, you shouldn't have to wait! 📱✨",
      
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
    
    // Direct keyword matching
    for (const [key, response] of Object.entries(saviKnowledge.faq)) {
      if (input.includes(key) || key.split(' ').some(word => input.includes(word))) {
        return response;
      }
    }

    // Contextual matching
    if (input.includes('start') || input.includes('order') || input.includes('begin')) {
      return saviKnowledge.faq.whatsapp;
    }
    
    if (input.includes('cost') || input.includes('price') || input.includes('expensive')) {
      return saviKnowledge.faq.pricing;
    }
    
    if (input.includes('where') || input.includes('location') || input.includes('deliver')) {
      return saviKnowledge.faq.areas;
    }

    return "You know what? I love chatting about all things TUHME! Whether you're curious about how we make the magic happen, what it costs, which stores we can raid for you, or anything else that's on your mind - I'm all ears! What's got you excited about luxury shopping today? 😊✨";
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


  return (
    <div className="savi-container">
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
              <div className="savi-quick-actions">
                <div className="quick-actions-header">
                  <span>Quick suggestions</span>
                  <button onClick={() => setShowQuickActions(false)}>×</button>
                </div>
                <div className="quick-actions-grid">
                  {saviKnowledge.quickActions.map((action, index) => (
                    <button
                      key={index}
                      className="quick-action-btn"
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
    </div>
  );
};

export default SaviAssistant;