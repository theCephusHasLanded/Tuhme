import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  IconButton, 
  Avatar,
  CircularProgress,
  Chip,
  Divider,
  Badge
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Send as SendIcon, 
  Close as CloseIcon,
  ShoppingBag as ShoppingBagIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Refresh as RefreshIcon,
  ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';

// Styled components
const ChatContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  maxHeight: window.innerHeight,
  overflow: 'hidden',
  borderRadius: 0,
  [theme.breakpoints.up('sm')]: {
    borderRadius: theme.shape.borderRadius,
    maxWidth: 400,
    maxHeight: 600,
    margin: '40px auto',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
  }
}));

const MessageList = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  padding: theme.spacing(2),
  backgroundColor: '#f5f5f5'
}));

const MessageBubble = styled(Box)(({ theme, sender }) => ({
  padding: theme.spacing(1.5),
  borderRadius: sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
  backgroundColor: sender === 'user' ? theme.palette.primary.main : '#fff',
  color: sender === 'user' ? '#fff' : 'inherit',
  maxWidth: '80%',
  wordBreak: 'break-word',
  marginBottom: theme.spacing(1),
  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
  alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
  position: 'relative'
}));

const ShopChatbot = () => {
  // Get query parameters
  const query = typeof window !== 'undefined' 
    ? new URLSearchParams(window.location.search) 
    : new URLSearchParams();
  const shopName = query.get('shop') || 'Manhattan Shopping';
  const category = query.get('category') || 'Retail';

  // State
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: `Welcome to TUHME Shopping Assistant! I'm Savi, your personal shopping helper for ${shopName}. How can I help you today?`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCartDetails, setShowCartDetails] = useState(false);
  const [storeCartItems, setStoreCartItems] = useState([]);
  const messagesEndRef = useRef(null);
  
  // Listen for cart updates from parent window
  useEffect(() => {
    const handleCartUpdate = (event) => {
      if (event.data && event.data.type === 'cartUpdate') {
        setStoreCartItems(event.data.items || []);
      }
    };
    
    window.addEventListener('message', handleCartUpdate);
    
    // Request cart data from parent when initialized
    if (window.opener) {
      window.opener.postMessage({ type: 'requestCart', store: shopName }, '*');
    }
    
    return () => {
      window.removeEventListener('message', handleCartUpdate);
    };
  }, [shopName]);
  
  // Sample product data for this shop
  const shopProducts = [
    { id: 'p1', name: 'Classic White Shirt', price: 85, category: 'Clothing' },
    { id: 'p2', name: 'Slim Fit Jeans', price: 120, category: 'Clothing' },
    { id: 'p3', name: 'Leather Belt', price: 65, category: 'Accessories' },
    { id: 'p4', name: 'Canvas Sneakers', price: 95, category: 'Footwear' },
    { id: 'p5', name: 'Cotton Sweater', price: 110, category: 'Clothing' }
  ];
  
  // Quick replies
  const quickReplies = [
    { text: 'Find a complete outfit', action: 'completeOutfit' },
    { text: 'Curate my look', action: 'curateLook' },
    { text: 'Show available items', action: 'showItems' },
    { text: 'How does delivery work?', action: 'deliveryInfo' },
    { text: 'Pricing information', action: 'pricingInfo' }
  ];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async (providedText) => {
    const messageText = providedText || input;
    
    if (!messageText.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };
    
    const userInput = messageText;
    setMessages(prev => [...prev, userMessage]);
    if (!providedText) setInput(''); // Only clear the input if it wasn't provided externally
    setLoading(true);
    
    try {
      // Get response from Perplexity API
      const botResponse = await generateBotResponse(userInput);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: botResponse.message,
        sender: 'bot',
        timestamp: new Date(),
        products: botResponse.products,
        isCuration: botResponse.isCuration,
        isOutfitFinder: botResponse.isOutfitFinder,
        isOutfitComplete: botResponse.isOutfitComplete,
        stage: botResponse.stage,
        occasion: botResponse.occasion,
        style: botResponse.style,
        aesthetic: botResponse.aesthetic,
        sizing: botResponse.sizing,
        colors: botResponse.colors,
        preferences: botResponse.preferences
      }]);
    } catch (error) {
      console.error('Failed to get bot response:', error);
      // Add error message
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: "I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle quick reply clicks
  const handleQuickReply = async (action) => {
    let replyText = '';
    
    switch (action) {
      case 'completeOutfit':
        replyText = 'Help me find a complete outfit';
        break;
      case 'curateLook':
        replyText = 'Help me curate my look';
        break;
      case 'showItems':
        replyText = 'Show me available items';
        break;
      case 'deliveryInfo':
        replyText = 'How does delivery work?';
        break;
      case 'pricingInfo':
        replyText = 'Tell me about pricing';
        break;
      default:
        return;
    }
    
    // Add user message
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: replyText,
      sender: 'user',
      timestamp: new Date()
    }]);
    
    setLoading(true);
    
    try {
      // Get response from API or use predefined responses for common queries
      let botResponse;
      
      // Handle specific quick replies locally to save API calls
      if (action === 'showItems') {
        botResponse = {
          message: `Here are some items available from ${shopName} that I think you might like:`,
          products: shopProducts
        };
      } else if (action === 'deliveryInfo') {
        botResponse = {
          message: "Our personal shopper will hand-deliver items to your door at your preferred time. They'll wait outside for 15 minutes while you try everything on. Keep what you love, and return the rest to the shopper!",
          products: null
        };
      } else if (action === 'pricingInfo') {
        botResponse = {
          message: "Our pricing is simple: 3-5 items at $9.99 per item, 5-10 items at $7.99 per item, or 10-15 items at just $5.99 per item. You only pay for what you keep!",
          products: null
        };
      } else {
        // For other queries, use the API
        botResponse = await generateBotResponse(replyText);
      }
      
      // Add bot response
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: botResponse.message,
        sender: 'bot',
        timestamp: new Date(),
        products: botResponse.products
      }]);
    } catch (error) {
      console.error('Failed to get bot response:', error);
      
      // Add error message
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: "I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };
  
  // Add item to cart
  const handleAddToCart = (product) => {
    // Update local cart
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    
    // Send item to parent window for synchronized cart
    if (window.opener) {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        store: shopName,
        category: product.category
      };
      
      window.opener.postMessage({
        type: 'addToCart',
        item: cartItem,
        store: shopName
      }, '*');
    }
    
    // Send confirmation message
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: `I've added ${product.name} to your cart. Would you like to add anything else?`,
      sender: 'bot',
      timestamp: new Date()
    }]);
  };
  
  // Complete order
  const handleCompleteOrder = () => {
    if (cart.length === 0) {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: "Your cart is empty. Let me know what items you'd like to try!",
        sender: 'bot',
        timestamp: new Date()
      }]);
      return;
    }
    
    setLoading(true);
    
    // Simulate order processing
    setTimeout(() => {
      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      const fee = itemCount <= 5 ? 9.99 : itemCount <= 10 ? 7.99 : 5.99;
      const totalWithFee = total + (fee * itemCount);
      
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: `Perfect! I've confirmed your order for ${itemCount} items. A shopper will contact you shortly to arrange delivery. Your product total is $${total.toFixed(2)}, with a service fee of $${(fee * itemCount).toFixed(2)}. Total: $${totalWithFee.toFixed(2)}. Thank you for shopping with TUHME!`,
        sender: 'bot',
        timestamp: new Date(),
        isConfirmation: true
      }]);
      
      // Clear cart after order is placed
      setCart([]);
      setLoading(false);
    }, 1500);
  };
  
  // Generate bot response using Perplexity API
  const generateBotResponse = async (userInput) => {
    const input = userInput.toLowerCase();
    
    // Handle complete outfit request
    if (input.includes('complete outfit') || input.includes('find a complete outfit')) {
      return {
        message: "I'd be happy to help you find a complete outfit from top NYC stores! First, what's the occasion? (e.g., work, date night, casual weekend, formal event)",
        isOutfitFinder: true,
        stage: 'outfit-occasion',
        products: null
      };
    }
    
    // Handle outfit finder follow-up
    if (messages.length > 0 && messages[messages.length-1].isOutfitFinder) {
      const lastMessage = messages[messages.length-1];
      
      if (lastMessage.stage === 'outfit-occasion') {
        return {
          message: `Great! A ${input} outfit sounds perfect. What's your ideal aesthetic or vibe? (e.g., minimalist, bohemian, preppy, edgy, classic)`,
          isOutfitFinder: true,
          stage: 'outfit-aesthetic',
          occasion: input,
          products: null
        };
      }
      
      if (lastMessage.stage === 'outfit-aesthetic') {
        return {
          message: `I love ${input} style! Now, could you share your sizing information? This helps me find the perfect fit.`,
          isOutfitFinder: true,
          stage: 'outfit-sizing',
          occasion: lastMessage.occasion,
          aesthetic: input,
          products: null
        };
      }
      
      if (lastMessage.stage === 'outfit-sizing') {
        return {
          message: `Thanks for sharing your sizing details. Any specific colors or patterns you prefer or want to avoid?`,
          isOutfitFinder: true,
          stage: 'outfit-colors',
          occasion: lastMessage.occasion,
          aesthetic: lastMessage.aesthetic,
          sizing: input,
          products: null
        };
      }
      
      if (lastMessage.stage === 'outfit-colors') {
        return {
          message: `Almost there! Do you have a budget range for this outfit? (e.g., under $200, $200-500, $500+)`,
          isOutfitFinder: true,
          stage: 'outfit-budget',
          occasion: lastMessage.occasion,
          aesthetic: lastMessage.aesthetic,
          sizing: lastMessage.sizing,
          colors: input,
          products: null
        };
      }
      
      if (lastMessage.stage === 'outfit-budget') {
        // Sample NYC stores to mention
        const nycStores = ['Saks Fifth Avenue', 'Bloomingdale\'s', 'Nordstrom', 'Bergdorf Goodman', 'Barneys New York'];
        const randomStores = nycStores.sort(() => 0.5 - Math.random()).slice(0, 3);
        
        // Create a complete outfit with multiple items
        const topItem = {
          id: 'top1',
          name: `${lastMessage.aesthetic} ${lastMessage.colors.includes('bright') ? 'Bright' : 'Classic'} Top`,
          price: Math.floor(Math.random() * 100) + 50,
          category: 'Clothing',
          store: randomStores[0],
          description: `Perfect ${lastMessage.aesthetic} style top for ${lastMessage.occasion} occasions`,
          image: 'https://via.placeholder.com/150'
        };
        
        const bottomItem = {
          id: 'bottom1',
          name: `${lastMessage.aesthetic} ${lastMessage.colors.includes('dark') ? 'Dark' : 'Neutral'} Bottom`,
          price: Math.floor(Math.random() * 120) + 80,
          category: 'Clothing',
          store: randomStores[1],
          description: `Stylish bottom piece that complements your ${lastMessage.aesthetic} aesthetic`,
          image: 'https://via.placeholder.com/150'
        };
        
        const accessoryItem = {
          id: 'acc1',
          name: `${lastMessage.aesthetic} Statement Accessory`,
          price: Math.floor(Math.random() * 60) + 40,
          category: 'Accessories',
          store: randomStores[2],
          description: `The perfect finishing touch for your ${lastMessage.occasion} outfit`,
          image: 'https://via.placeholder.com/150'
        };
        
        const outfitItems = [topItem, bottomItem, accessoryItem];
        
        return {
          message: `Based on your preferences (${lastMessage.occasion}, ${lastMessage.aesthetic} aesthetic, ${lastMessage.colors} colors, and ${input} budget), I've curated this complete outfit from top NYC stores like ${randomStores.join(', ')}. These pieces work beautifully together and match your style profile:`,
          products: outfitItems,
          isOutfitComplete: true,
          preferences: {
            occasion: lastMessage.occasion,
            aesthetic: lastMessage.aesthetic,
            sizing: lastMessage.sizing,
            colors: lastMessage.colors,
            budget: input
          }
        };
      }
    }
    
    // Handle look curation request
    if (input.includes('curate') || input.includes('my look') || input.includes('help me')) {
      return {
        message: "I'd love to help curate your look! To get started, could you tell me a bit about the occasion you're shopping for? (e.g., work event, casual outing, special occasion)",
        isCuration: true,
        stage: 'occasion',
        products: null
      };
    }
    
    // Handle curation follow-up
    if (messages.length > 0 && messages[messages.length-1].isCuration) {
      const lastMessage = messages[messages.length-1];
      
      if (lastMessage.stage === 'occasion') {
        return {
          message: `Great! So you're looking for something for ${input}. What's your preferred style? (e.g., classic, modern, minimalist, bold)`,
          isCuration: true,
          stage: 'style',
          occasion: input,
          products: null
        };
      }
      
      if (lastMessage.stage === 'style') {
        return {
          message: `I love ${input} style! Do you have any color preferences or colors you'd like to avoid?`,
          isCuration: true,
          stage: 'color',
          style: input,
          occasion: lastMessage.occasion,
          products: null
        };
      }
      
      if (lastMessage.stage === 'color') {
        // Filter products based on collected preferences
        let filteredProducts = [...shopProducts];
        
        // In a real app, you would apply actual filters based on style/color/occasion
        // For now, just return a subset to simulate filtering
        if (filteredProducts.length > 3) {
          filteredProducts = filteredProducts.slice(0, 3);
        }
        
        return {
          message: `Based on your preferences (${lastMessage.occasion}, ${lastMessage.style} style, and color preferences of ${input}), here are some items I think would work beautifully for you:`,
          products: filteredProducts,
          preferences: {
            occasion: lastMessage.occasion,
            style: lastMessage.style,
            color: input
          }
        };
      }
    }
    
    // Check for product display requests first (handled locally)
    if (input.includes('show') && (input.includes('item') || input.includes('product'))) {
      return {
        message: `Here are some items available from ${shopName} that I think you might like:`,
        products: shopProducts
      };
    }
    
    // Check for category-specific requests (handled locally)
    if (input.includes('clothing') || input.includes('clothes') || input.includes('shirt') || input.includes('jeans')) {
      const clothingItems = shopProducts.filter(p => p.category === 'Clothing');
      return {
        message: `Here are the clothing items available from ${shopName}:`,
        products: clothingItems
      };
    }
    
    if (input.includes('accessories') || input.includes('belt') || input.includes('watch')) {
      const accessories = shopProducts.filter(p => p.category === 'Accessories');
      return {
        message: `Here are the accessories available from ${shopName}:`,
        products: accessories
      };
    }
    
    if (input.includes('shoes') || input.includes('sneakers') || input.includes('footwear')) {
      const footwear = shopProducts.filter(p => p.category === 'Footwear');
      return {
        message: `Here are the footwear options available from ${shopName}:`,
        products: footwear
      };
    }
    
    try {
      // For other queries, use Perplexity API
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_PERPLEXITY_API_KEY || 'pplx-placeholder-key'}`
        },
        body: JSON.stringify({
          model: 'sonar-small-chat',  // Using the smaller, free model
          messages: [
            {
              role: 'system',
              content: `You are TUMI, a friendly shopping assistant for the TUHME shopping service. 
              You help customers shop at ${shopName}, a ${category} store. 
              TUHME is a service where shoppers deliver items to customers' homes to try on.
              The customer keeps what they like and returns the rest.
              TUHME has three pricing tiers: 3-5 items at $9.99 per item, 5-10 items at $7.99 per item, or 10-15 items at $5.99 per item.
              A personal shopper will deliver items to the customer's door and wait outside for 15 minutes while they try them on.
              Keep your responses concise, friendly, and helpful. Don't make up information about products that weren't mentioned.`
            },
            {
              role: 'user',
              content: userInput
            }
          ],
          max_tokens: 150
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      const aiMessage = result.choices[0].message.content;
      
      return {
        message: aiMessage,
        products: null
      };
      
    } catch (error) {
      console.error('Error calling Perplexity API:', error);
      
      // Fallback to local responses if API fails
      if (input.includes('how') && (input.includes('work') || input.includes('process'))) {
        return {
          message: "TUHME makes shopping simple! Browse items, select what you'd like to try, and our personal shopper will deliver them to your door. Try them on, and only pay for what you keep!",
          products: null
        };
      }
      
      return {
        message: "I can help you find items to try on from our store selection. Would you like to see specific categories like clothing, accessories, or footwear?",
        products: null
      };
    }
  };

  // Format timestamp
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <ChatContainer>
      {/* Header */}
      <Box sx={{ 
        p: 2, 
        bgcolor: '#000000', 
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: 'primary.dark', mr: 1.5 }}>
            <ShoppingBagIcon />
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              Savi Shopping Assistant
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9, display: 'flex', alignItems: 'center' }}>
              <LocationIcon fontSize="inherit" sx={{ mr: 0.5 }} />
              {shopName} • {category}
            </Typography>
          </Box>
        </Box>
        <Box>
          <IconButton 
            size="small" 
            sx={{ color: 'white', mr: 1 }}
            onClick={() => setShowCartDetails(!showCartDetails)}
          >
            <Badge badgeContent={cart.length + storeCartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton 
            size="small" 
            sx={{ color: 'white' }}
            onClick={() => window.close()}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      
      {/* External Store Cart Details */}
      {showCartDetails && (
        <Box sx={{ 
          p: 2, 
          bgcolor: '#f8f8f8', 
          borderBottom: '1px solid #e0e0e0',
          maxHeight: '200px',
          overflowY: 'auto'
        }}>
          <Typography variant="subtitle2" gutterBottom>
            Your Shopping Cart ({cart.length + storeCartItems.length} items)
          </Typography>
          
          {storeCartItems.length > 0 && (
            <>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                Items from store website:
              </Typography>
              {storeCartItems.map((item, index) => (
                <Box 
                  key={`store-${index}`}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1,
                    mb: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    border: '1px solid #e0e0e0'
                  }}
                >
                  <Box>
                    <Typography variant="body2">{item.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Quantity: {item.quantity}
                    </Typography>
                  </Box>
                  <Typography variant="body2" fontWeight={600}>
                    ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                  </Typography>
                </Box>
              ))}
              <Divider sx={{ my: 1.5 }} />
            </>
          )}
          
          {cart.length > 0 && (
            <>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                Items added through Savi:
              </Typography>
              {cart.map((item) => (
                <Box 
                  key={item.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1,
                    mb: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    border: '1px solid #e0e0e0'
                  }}
                >
                  <Box>
                    <Typography variant="body2">{item.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Quantity: {item.quantity}
                    </Typography>
                  </Box>
                  <Typography variant="body2" fontWeight={600}>
                    ${item.price}
                  </Typography>
                </Box>
              ))}
            </>
          )}
          
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2">Total:</Typography>
            <Typography variant="subtitle2" fontWeight={600}>
              ${[...cart, ...storeCartItems].reduce((sum, item) => {
                let price = 0;
                if (typeof item.price === 'number') {
                  price = item.price;
                } else if (typeof item.price === 'string') {
                  price = parseFloat(item.price.replace(/[$,]/g, '')) || 0;
                }
                return sum + (price * item.quantity);
              }, 0).toFixed(2)}
            </Typography>
          </Box>
        </Box>
      )}
      
      {/* Messages */}
      <MessageList>
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
              mb: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 0.5 }}>
              {message.sender === 'bot' && (
                <Avatar 
                  sx={{ 
                    width: 28, 
                    height: 28, 
                    bgcolor: 'primary.dark',
                    mr: 1
                  }}
                >
                  S
                </Avatar>
              )}
              
              <MessageBubble sender={message.sender}>
                <Typography variant="body2">{message.text}</Typography>
                
                {/* Outfit finder quick response buttons */}
                {message.isOutfitFinder && message.stage === 'outfit-occasion' && (
                  <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {['Work meeting', 'Date night', 'Casual weekend', 'Formal event', 'Job interview'].map((option) => (
                      <Chip
                        key={option}
                        label={option}
                        onClick={() => handleSendMessage(option)}
                        clickable
                        size="small"
                        sx={{ borderRadius: '16px' }}
                      />
                    ))}
                  </Box>
                )}
                
                {message.isOutfitFinder && message.stage === 'outfit-aesthetic' && (
                  <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {['Minimalist', 'Bohemian', 'Preppy', 'Edgy', 'Classic', 'Street style'].map((option) => (
                      <Chip
                        key={option}
                        label={option}
                        onClick={() => handleSendMessage(option)}
                        clickable
                        size="small"
                        sx={{ borderRadius: '16px' }}
                      />
                    ))}
                  </Box>
                )}
                
                {message.isOutfitFinder && message.stage === 'outfit-sizing' && (
                  <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {['XS / 0-2', 'S / 4-6', 'M / 8-10', 'L / 12-14', 'XL / 16-18'].map((option) => (
                      <Chip
                        key={option}
                        label={option}
                        onClick={() => handleSendMessage(option)}
                        clickable
                        size="small"
                        sx={{ borderRadius: '16px' }}
                      />
                    ))}
                  </Box>
                )}
                
                {message.isOutfitFinder && message.stage === 'outfit-colors' && (
                  <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {['Neutrals only', 'Bold & bright', 'Earth tones', 'Black & white', 'Pastels', 'Jewel tones'].map((option) => (
                      <Chip
                        key={option}
                        label={option}
                        onClick={() => handleSendMessage(option)}
                        clickable
                        size="small"
                        sx={{ borderRadius: '16px' }}
                      />
                    ))}
                  </Box>
                )}
                
                {message.isOutfitFinder && message.stage === 'outfit-budget' && (
                  <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {['Under $200', '$200-500', '$500-1000', '$1000+', 'No budget limit'].map((option) => (
                      <Chip
                        key={option}
                        label={option}
                        onClick={() => handleSendMessage(option)}
                        clickable
                        size="small"
                        sx={{ borderRadius: '16px' }}
                      />
                    ))}
                  </Box>
                )}

                {/* Curation quick response buttons */}
                {message.isCuration && message.stage === 'occasion' && (
                  <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {['Work event', 'Casual outing', 'Date night', 'Special occasion'].map((option) => (
                      <Chip
                        key={option}
                        label={option}
                        onClick={() => handleSendMessage(option)}
                        clickable
                        size="small"
                        sx={{ borderRadius: '16px' }}
                      />
                    ))}
                  </Box>
                )}
                
                {message.isCuration && message.stage === 'style' && (
                  <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {['Classic', 'Modern', 'Minimalist', 'Bold', 'Vintage'].map((option) => (
                      <Chip
                        key={option}
                        label={option}
                        onClick={() => handleSendMessage(option)}
                        clickable
                        size="small"
                        sx={{ borderRadius: '16px' }}
                      />
                    ))}
                  </Box>
                )}
                
                {message.isCuration && message.stage === 'color' && (
                  <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {['Black & White', 'Earth tones', 'Pastels', 'Bold colors', 'Navy & Neutrals'].map((option) => (
                      <Chip
                        key={option}
                        label={option}
                        onClick={() => handleSendMessage(option)}
                        clickable
                        size="small"
                        sx={{ borderRadius: '16px' }}
                      />
                    ))}
                  </Box>
                )}
                
                {/* Product list if available */}
                {message.products && (
                  <Box sx={{ mt: 2 }}>
                    {message.isOutfitComplete && (
                      <Typography variant="subtitle2" sx={{ mb: 2, fontStyle: 'italic' }}>
                        Complete outfit suggestion from top NYC stores:
                      </Typography>
                    )}
                    
                    {message.products.map((product) => (
                      <Paper 
                        key={product.id}
                        elevation={0}
                        sx={{ 
                          p: 1.5, 
                          mb: 1.5, 
                          border: '1px solid #e0e0e0',
                          borderRadius: message.isOutfitComplete ? 2 : 1,
                          bgcolor: '#fafafa',
                          boxShadow: message.isOutfitComplete ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="subtitle2" fontWeight="bold">{product.name}</Typography>
                          <Typography variant="subtitle2" fontWeight={600}>${product.price}</Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            {product.category}
                          </Typography>
                          {product.store && (
                            <Typography variant="caption" color="text.secondary">
                              <b>From:</b> {product.store}
                            </Typography>
                          )}
                        </Box>
                        
                        {product.description && (
                          <Typography variant="body2" sx={{ mb: 1.5, fontSize: '0.85rem' }}>
                            {product.description}
                          </Typography>
                        )}
                        
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button 
                            size="small" 
                            variant="contained" 
                            sx={{ flexGrow: 1 }}
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to Try-On List
                          </Button>
                          
                          {message.isOutfitComplete && (
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => {
                                // Generate similar items event would go here
                                handleSendMessage(`Show me alternatives to ${product.name}`);
                              }}
                            >
                              See Similar
                            </Button>
                          )}
                        </Box>
                      </Paper>
                    ))}
                    
                    {message.isOutfitComplete && (
                      <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{ mt: 1.5, mb: 1, borderRadius: 2 }}
                        onClick={() => {
                          // Add all outfit items to cart
                          message.products.forEach(product => handleAddToCart(product));
                        }}
                      >
                        Add Entire Outfit to Try-On List
                      </Button>
                    )}
                  </Box>
                )}
                
                {/* Order confirmation extras */}
                {message.isConfirmation && (
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <Chip 
                      icon={<TimeIcon fontSize="small" />} 
                      label="Delivery tracking available" 
                      size="small"
                      sx={{ mr: 1 }}
                    />
                  </Box>
                )}
              </MessageBubble>
              
              {message.sender === 'user' && (
                <Avatar 
                  sx={{ 
                    width: 28, 
                    height: 28, 
                    bgcolor: 'grey.400',
                    ml: 1
                  }}
                >
                  U
                </Avatar>
              )}
            </Box>
            
            <Typography 
              variant="caption" 
              color="text.secondary" 
              sx={{ 
                px: 1,
                alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              {formatTime(message.timestamp)}
            </Typography>
          </Box>
        ))}
        
        {/* Loading indicator */}
        {loading && (
          <Box sx={{ display: 'flex', my: 2 }}>
            <Avatar 
              sx={{ 
                width: 28, 
                height: 28, 
                bgcolor: 'primary.dark',
                mr: 1
              }}
            >
              S
            </Avatar>
            <Box sx={{ display: 'flex', alignItems: 'center', p: 1.5, bgcolor: '#fff', borderRadius: 2 }}>
              <CircularProgress size={20} thickness={5} />
              <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                Savi is typing...
              </Typography>
            </Box>
          </Box>
        )}
        
        {/* Autoscroll anchor */}
        <div ref={messagesEndRef} />
      </MessageList>
      
      {/* Quick replies */}
      {!loading && messages[messages.length - 1]?.sender === 'bot' && !messages[messages.length - 1]?.isConfirmation && (
        <Box sx={{ p: 1.5, backgroundColor: '#f0f0f0', display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {quickReplies.map((reply) => (
            <Chip
              key={reply.action}
              label={reply.text}
              onClick={() => handleQuickReply(reply.action)}
              clickable
              sx={{ 
                borderRadius: '16px',
                '&:hover': { backgroundColor: '#e0e0e0' } 
              }}
            />
          ))}
          
          {cart.length > 0 && (
            <Chip
              label={`Complete Order (${cart.length})`}
              onClick={handleCompleteOrder}
              sx={{ 
                borderRadius: '16px',
                ml: 'auto',
                bgcolor: '#000000',
                color: 'white',
                '&:hover': { bgcolor: '#333333' }
              }}
              clickable
            />
          )}
        </Box>
      )}
      
      {/* Cart summary */}
      {cart.length > 0 && (
        <Box sx={{ px: 2, pt: 1, pb: 1, bgcolor: '#f9f9f9', borderTop: '1px solid #e0e0e0' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle2">
              Your Try-On List ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
            </Typography>
            
            <Typography variant="subtitle2" fontWeight={600}>
              ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
            </Typography>
          </Box>
        </Box>
      )}
      
      {/* Input area */}
      <Box sx={{ p: 2, bgcolor: 'background.paper', borderTop: '1px solid #e0e0e0' }}>
        <Box 
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <TextField
            fullWidth
            placeholder="Type a message..."
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            sx={{ mr: 1 }}
          />
          <IconButton 
            sx={{ color: '#000000' }} 
            disabled={!input.trim() || loading}
            type="submit"
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </ChatContainer>
  );
};

export default ShopChatbot;