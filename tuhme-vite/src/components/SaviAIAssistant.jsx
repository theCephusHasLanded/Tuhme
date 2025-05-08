import React, { useState, useEffect, useRef } from 'react';
import '../SaviAIAssistant.css';

const SaviAIAssistant = ({ onClose, storeName = "TUHME Store" }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `👋 Hi! I'm Savi, your personal shopping assistant. How can I help with your garment try-on experience today?`,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef(null);
  const [tryOnList, setTryOnList] = useState([]);

  // Sample garment data
  const garments = [
    { id: 'g1', name: 'Black Slim-Fit Jeans', price: 89.99, category: 'Pants', sizes: ['XS', 'S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=400' },
    { id: 'g2', name: 'White Button-Up Shirt', price: 59.99, category: 'Tops', sizes: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=400' },
    { id: 'g3', name: 'Navy Blazer', price: 129.99, category: 'Jackets', sizes: ['S', 'M', 'L'], image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=400' },
    { id: 'g4', name: 'Floral Summer Dress', price: 79.99, category: 'Dresses', sizes: ['XS', 'S', 'M', 'L'], image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=400' },
    { id: 'g5', name: 'Leather Belt', price: 39.99, category: 'Accessories', sizes: ['One Size'], image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=400' }
  ];

  // Suggested prompts for the user
  const suggestedPrompts = [
    { id: 'p1', text: "What's trending right now?" },
    { id: 'p2', text: "Help me find a complete outfit" },
    { id: 'p3', text: "How does the try-on process work?" },
    { id: 'p4', text: "What sizes should I try?" }
  ];

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Simulate AI response
  const getAIResponse = async (userMessage) => {
    setIsTyping(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const lowerCase = userMessage.toLowerCase();
    let response = {
      text: "I'm not sure how to help with that. Would you like to see some of our latest collection?",
      garments: null
    };

    // Handle different types of queries
    if (lowerCase.includes('trending') || lowerCase.includes('popular') || lowerCase.includes('latest')) {
      response = {
        text: "Here are some trending items that just arrived in our store! Would you like to see any specific category?",
        garments: garments.slice(0, 3)
      };
    } else if (lowerCase.includes('outfit') || lowerCase.includes('look') || lowerCase.includes('style')) {
      response = {
        text: "I'd recommend this complete look for a modern professional style. Would you like to add these to your try-on list?",
        garments: [garments[1], garments[2], garments[0]]
      };
    } else if (lowerCase.includes('try') && lowerCase.includes('process') || lowerCase.includes('work')) {
      response = {
        text: "Our try-on process is simple! Select the garments you want to try, schedule a delivery time, and our courier will bring them to your home. You have 15 minutes to try everything on, and you only pay for what you keep!",
        garments: null
      };
    } else if (lowerCase.includes('size') || lowerCase.includes('fit')) {
      response = {
        text: "Based on your previous orders, I'd recommend trying size M for tops and size 32 for pants. For best results, you might want to try multiple sizes of the same item to ensure the perfect fit.",
        garments: null
      };
    } else if (lowerCase.includes('dress') || lowerCase.includes('dresses')) {
      response = {
        text: "Here are some of our most popular dresses. The floral one has been very popular this season!",
        garments: [garments[3]]
      };
    } else if (lowerCase.includes('accessory') || lowerCase.includes('accessories') || lowerCase.includes('belt')) {
      response = {
        text: "Here are some accessories that would complement your previous selections:",
        garments: [garments[4]]
      };
    } else if (lowerCase.includes('hello') || lowerCase.includes('hi') || lowerCase.includes('hey')) {
      response = {
        text: "Hello! I'm Savi, your personal shopping assistant. How can I help you today? Are you looking for anything specific or would you like some recommendations?",
        garments: null
      };
    } else if (lowerCase.includes('recommendation') || lowerCase.includes('recommend') || lowerCase.includes('suggest')) {
      response = {
        text: "Based on your browsing history, I think you might like these items:",
        garments: garments.slice(1, 4)
      };
    }
    
    setIsTyping(false);
    return response;
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Get AI response
    const response = await getAIResponse(input);
    
    // Add AI message
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: response.text,
      sender: 'ai',
      timestamp: new Date(),
      garments: response.garments
    }]);
  };

  // Handle clicking a suggested prompt
  const handleSuggestedPrompt = async (prompt) => {
    const userMessage = {
      id: messages.length + 1,
      text: prompt,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Get AI response
    const response = await getAIResponse(prompt);
    
    // Add AI message
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: response.text,
      sender: 'ai',
      timestamp: new Date(),
      garments: response.garments
    }]);
  };

  // Add garment to try-on list
  const addToTryOnList = (garment) => {
    setTryOnList(prev => {
      // Check if already in list
      if (prev.find(item => item.id === garment.id)) {
        return prev;
      }
      return [...prev, { ...garment, size: garment.sizes[1] || garment.sizes[0] }];
    });

    // Add confirmation message
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: `I've added ${garment.name} to your try-on list. Would you like anything else?`,
      sender: 'ai',
      timestamp: new Date()
    }]);
  };

  // Format timestamp
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`savi-container ${isExpanded ? 'expanded' : ''}`}>
      {/* Collapsed state - button only */}
      {!isExpanded && (
        <button className="savi-toggle-button" onClick={() => setIsExpanded(true)}>
          <div className="savi-avatar">S</div>
          <span>Chat with Savi</span>
        </button>
      )}

      {/* Expanded state - full chat interface */}
      {isExpanded && (
        <>
          <div className="savi-header">
            <div className="savi-header-left">
              <div className="savi-avatar">S</div>
              <div className="savi-title">
                <h3>Savi</h3>
                <p>Fashion AI Assistant</p>
              </div>
            </div>
            <div className="savi-controls">
              <button className="savi-minimize" onClick={() => setIsExpanded(false)}>—</button>
              <button className="savi-close" onClick={onClose}>×</button>
            </div>
          </div>

          <div className="savi-messages">
            {messages.map(message => (
              <div key={message.id} className={`savi-message ${message.sender}`}>
                <div className="savi-message-content">
                  <p>{message.text}</p>
                  
                  {/* Render garment cards if any */}
                  {message.garments && (
                    <div className="savi-garments">
                      {message.garments.map(garment => (
                        <div key={garment.id} className="savi-garment-card">
                          <img src={garment.image} alt={garment.name} />
                          <div className="savi-garment-info">
                            <h4>{garment.name}</h4>
                            <p className="savi-garment-price">${garment.price}</p>
                            <div className="savi-garment-sizes">
                              {garment.sizes.map(size => (
                                <span key={size} className="savi-size-chip">{size}</span>
                              ))}
                            </div>
                            <button 
                              className="savi-add-button"
                              onClick={() => addToTryOnList(garment)}
                            >
                              Add to Try-On
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <span className="savi-timestamp">{formatTime(message.timestamp)}</span>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="savi-message ai">
                <div className="savi-typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested prompts */}
          {messages.length < 3 && (
            <div className="savi-suggested-prompts">
              <p>Try asking:</p>
              <div className="savi-prompt-buttons">
                {suggestedPrompts.map(prompt => (
                  <button 
                    key={prompt.id} 
                    onClick={() => handleSuggestedPrompt(prompt.text)}
                  >
                    {prompt.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Try-on list summary */}
          {tryOnList.length > 0 && (
            <div className="savi-try-on-summary">
              <h4>Your Try-On List ({tryOnList.length})</h4>
              <button className="savi-checkout-button">Schedule Try-On</button>
            </div>
          )}

          {/* Input area */}
          <div className="savi-input-area">
            <input
              type="text"
              placeholder="Ask Savi anything about fashion..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isTyping}
            />
            <button 
              className="savi-send-button"
              onClick={handleSendMessage}
              disabled={!input.trim() || isTyping}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SaviAIAssistant;