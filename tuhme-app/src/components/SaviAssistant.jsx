import React, { useState, useEffect, useRef } from 'react';
import TuhmeIcon from './TuhmeIcon';
import tuhmeLogo from '../assets/tuhme.png';

const SaviAssistant = ({ onClose, isOpen = true }) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 320, y: window.innerHeight - 500 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const messagesEndRef = useRef(null);
  const assistantRef = useRef(null);

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
      { text: "How does TUHME work?", key: "how does tuhme work" },
      { text: "What are your prices?", key: "pricing" },
      { text: "Which stores do you cover?", key: "stores" },
      { text: "Tell me about TUHME Now", key: "membership" },
      { text: "How do I start ordering?", key: "whatsapp" }
    ]
  };

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        type: 'savi',
        text: saviKnowledge.greeting,
        timestamp: new Date()
      }]);
    }
  }, [messages.length, saviKnowledge.greeting]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleResize = () => {
      const maxX = window.innerWidth - 320;
      const maxY = window.innerHeight - 500;
      setPosition(prev => ({
        x: Math.min(prev.x, maxX),
        y: Math.min(prev.y, maxY)
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMouseDown = (e) => {
    if (e.target.closest('.savi-header')) {
      setIsDragging(true);
      const rect = assistantRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newX = Math.max(0, Math.min(window.innerWidth - 320, e.clientX - dragOffset.x));
        const newY = Math.max(0, Math.min(window.innerHeight - 500, e.clientY - dragOffset.y));
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

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
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickAction = (actionKey) => {
    const response = saviKnowledge.faq[actionKey];
    if (response) {
      const saviMessage = {
        type: 'savi',
        text: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, saviMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Assistant Chat Window */}
      {isVisible && (
        <>
          {/* Backdrop */}
          <div 
            className="savi-backdrop"
            onClick={handleClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              zIndex: 10000
            }}
          />
          
          <div 
            ref={assistantRef}
            className="savi-assistant"
            style={{
              position: 'fixed',
              left: `${position.x}px`,
              top: `${position.y}px`,
              zIndex: 10001
            }}
            onMouseDown={handleMouseDown}
          >
          <div className="savi-header">
            <div className="savi-info">
              <div className="savi-avatar-small">
                <img src={tuhmeLogo} alt="SAVI" />
              </div>
              <div className="savi-details">
                <h4>SAVI Assistant</h4>
                <span className="savi-status">Online • Ready to help</span>
              </div>
            </div>
            <button 
              className="savi-close"
              onClick={handleClose}
            >
              ×
            </button>
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

            {/* Quick Actions */}
            <div className="savi-quick-actions">
              {saviKnowledge.quickActions.map((action, index) => (
                <button
                  key={index}
                  className="quick-action-btn"
                  onClick={() => handleQuickAction(action.key)}
                >
                  {action.text}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="savi-input">
              <div className="input-container">
                <textarea
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask SAVI anything about TUHME..."
                  rows="1"
                />
                <button 
                  className="send-button"
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim()}
                >
                  <TuhmeIcon type="delivery" size={16} />
                </button>
              </div>
            </div>
          </div>
          </div>
        </>
      )}
    </>
  );
};

export default SaviAssistant;