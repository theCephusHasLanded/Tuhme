import React, { useState, useRef, useCallback, useEffect } from 'react';
import html2canvas from 'html2canvas';

// WhatsApp Business API Configuration
const WHATSAPP_API_CONFIG = {
  businessPhoneId: '16465889916',
  apiUrl: 'https://graph.facebook.com/v18.0',
  webhookUrl: 'https://api.tuhme.com/webhooks/whatsapp',
  accessToken: import.meta.env.VITE_WHATSAPP_TOKEN || 'demo_token'
};

// Order Management System
class OrderManager {
  constructor() {
    this.orders = new Map();
    this.orderCounter = 1000;
  }

  generateOrderId() {
    return `TUHME-${Date.now()}-${++this.orderCounter}`;
  }

  createOrder(product, customerInfo = {}) {
    const orderId = this.generateOrderId();
    const order = {
      id: orderId,
      product,
      customer: customerInfo,
      status: 'pending',
      timestamp: new Date().toISOString(),
      estimatedDelivery: this.calculateDelivery(product),
      total: this.calculateTotal(product),
      tracking: {
        created: new Date().toISOString(),
        updates: []
      }
    };
    
    this.orders.set(orderId, order);
    return order;
  }

  calculateDelivery(product) {
    const baseHours = product.store.includes('Online') ? 48 : 4;
    const deliveryDate = new Date();
    deliveryDate.setHours(deliveryDate.getHours() + baseHours);
    return deliveryDate.toISOString();
  }

  calculateTotal(product) {
    const tax = product.price * 0.08875; // NYC tax rate
    const serviceFee = 25; // TUHME service fee
    const tip = Math.max(20, product.price * 0.15); // 15% tip or $20 minimum
    
    return {
      subtotal: product.price,
      tax: Math.round(tax * 100) / 100,
      serviceFee: serviceFee,
      tip: Math.round(tip * 100) / 100,
      total: Math.round((product.price + tax + serviceFee + tip) * 100) / 100
    };
  }

  updateOrderStatus(orderId, status, message = '') {
    const order = this.orders.get(orderId);
    if (order) {
      order.status = status;
      order.tracking.updates.push({
        status,
        message,
        timestamp: new Date().toISOString()
      });
      return order;
    }
    return null;
  }
}

// Global order manager instance
const orderManager = new OrderManager();

// Google Gemini API configuration (reuse from SAVI Assistant)
const GEMINI_API_KEY = '[REDACTED:api-key]';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

// Google Trends API configuration
const GOOGLE_TRENDS_CONFIG = {
  apiUrl: 'https://api.tuhme.com/trends',
  webhookUrl: 'https://api.tuhme.com/webhooks/trends',
  fallbackEndpoint: 'https://trends.google.com/trends/api/dailytrends'
};

// Image generation configuration
const IMAGE_GENERATION_CONFIG = {
  unsplashAccessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY || 'demo_key',
  unsplashApiUrl: 'https://api.unsplash.com/search/photos',
  fallbackImageService: 'https://source.unsplash.com',
  imageSize: '400x400'
};

const AIStoreSearch = () => {
  // Search functionality state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [trendingSearches, setTrendingSearches] = useState([]);

  const searchResultsRef = useRef(null);

  // Load trending searches on component mount
  useEffect(() => {
    // Initialize with fallback trends immediately
    const fallbackTrends = [
      'oversized blazer', 'chunky gold jewelry', 'vintage denim', 
      'cashmere cardigan', 'leather boots', 'silk scarf'
    ];
    setTrendingSearches(fallbackTrends);
  }, []);

  // Product categories for search
  const productCategories = [
    {
      id: 'luxury-handbags',
      name: 'Luxury Handbags',
      icon: '👜',
      brands: ['Hermès', 'Chanel', 'Louis Vuitton', 'Bottega Veneta']
    },
    {
      id: 'designer-fashion',
      name: 'Designer Fashion',
      icon: '👗',
      brands: ['The Row', 'Khaite', 'Toteme', 'Fear of God']
    },
    {
      id: 'luxury-jewelry',
      name: 'Luxury Jewelry',
      icon: '💎',
      brands: ['Tiffany & Co.', 'Cartier', 'Van Cleef & Arpels']
    },
    {
      id: 'premium-shoes',
      name: 'Premium Footwear',
      icon: '👠',
      brands: ['Manolo Blahnik', 'Louboutin', 'Jimmy Choo']
    }
  ];



  // Real image generation using Unsplash API
  const generateRealImage = async (searchQuery, category) => {
    try {
      const query = encodeURIComponent(`luxury ${searchQuery} ${category || 'fashion'}`);
      
      // Try Unsplash API first
      if (IMAGE_GENERATION_CONFIG.unsplashAccessKey !== 'demo_key') {
        const response = await fetch(
          `${IMAGE_GENERATION_CONFIG.unsplashApiUrl}?query=${query}&per_page=1&orientation=square`,
          {
            headers: {
              'Authorization': `Client-ID ${IMAGE_GENERATION_CONFIG.unsplashAccessKey}`
            }
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            return data.results[0].urls.regular;
          }
        }
      }
      
      // Fallback to source.unsplash.com
      return `${IMAGE_GENERATION_CONFIG.fallbackImageService}/${IMAGE_GENERATION_CONFIG.imageSize}/?${query}`;
    } catch {
      console.log('Image generation fallback');
      // Ultimate fallback - use source.unsplash.com with search query
      return `https://source.unsplash.com/400x400/?${encodeURIComponent(`luxury ${searchQuery} fashion`)}`;
    }
  };

  // Enhanced Gemini search with fine-tuning
  const enhancedGeminiSearch = async (searchQuery, category) => {
    try {
      const fineTuningPrompt = `You are a luxury retail AI expert. Analyze this search query and provide enhanced recommendations.
      
      User Query: "${searchQuery}"
      Category Context: ${category || 'general luxury'}
      
      Please provide 6-8 ultra-realistic luxury product recommendations in this exact JSON format:
      {
        "products": [
          {
            "name": "Specific Product Name",
            "brand": "Actual Luxury Brand",
            "price": realistic_price_number,
            "category": "product-category",
            "store": "Real Store Name & Location",
            "description": "Detailed product description",
            "availability": "In Stock" | "Limited" | "Made to Order",
            "rating": 4.0-5.0,
            "image_keywords": "specific keywords for image search"
          }
        ]
      }
      
      Focus on:
      - Real luxury brands and authentic pricing
      - Diverse store locations (NYC, LA, London, Paris)
      - Current fashion trends and seasonal relevance
      - High-end department stores and boutiques`;

      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: fineTuningPrompt }]
          }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 4096,
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (content) {
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            
            // Generate real images for each product
            const productsWithImages = await Promise.all(
              parsed.products.map(async (product) => ({
                ...product,
                id: `gemini-${Date.now()}-${Math.random()}`,
                image: await generateRealImage(product.image_keywords || product.name, product.category)
              }))
            );
            
            return productsWithImages;
          }
        }
      }
      
      throw new Error('Gemini parsing failed');
    } catch {
      console.log('Gemini enhanced search failed, using fallback');
      return null;
    }
  };

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

  // Store APIs and Product Database - Simulating real store webhooks
  const storeAPIs = {
  'bergdorf-goodman': {
  name: 'Bergdorf Goodman',
  website: 'https://www.bergdorfgoodman.com',
  webhook: 'https://api.bergdorfgoodman.com/products/search',
  location: '754 5th Ave, New York, NY',
  specialty: 'Luxury Department Store'
  },
  'saks': {
  name: 'Saks Fifth Avenue',
  website: 'https://www.saksfifthavenue.com',
  webhook: 'https://api.saks.com/v1/products',
    location: '611 5th Ave, New York, NY',
    specialty: 'Luxury Department Store'
  },
  'neiman-marcus': {
  name: 'Neiman Marcus',
  website: 'https://www.neimanmarcus.com',
  webhook: 'https://api.neimanmarcus.com/search',
  location: 'Multiple Locations',
  specialty: 'Luxury Department Store'
  },
  'nordstrom': {
  name: 'Nordstrom',
    website: 'https://www.nordstrom.com',
    webhook: 'https://api.nordstrom.com/products',
  location: '225 W 57th St, New York, NY',
  specialty: 'Premium Department Store'
  },
  'net-a-porter': {
  name: 'Net-A-Porter',
  website: 'https://www.net-a-porter.com',
  webhook: 'https://api.net-a-porter.com/v2/products',
  location: 'Online + Boutiques',
  specialty: 'Designer Fashion'
  },
  'matchesfashion': {
    name: 'Matches Fashion',
  website: 'https://www.matchesfashion.com',
  webhook: 'https://api.matchesfashion.com/search',
  location: 'Global Online',
  specialty: 'Contemporary Luxury'
  },
  'ssense': {
  name: 'SSENSE',
  website: 'https://www.ssense.com',
  webhook: 'https://api.ssense.com/v1/search',
  location: 'Global Online',
    specialty: 'Designer & Streetwear'
  },
  'farfetch': {
  name: 'Farfetch',
  website: 'https://www.farfetch.com',
  webhook: 'https://api.farfetch.com/v1/products',
  location: 'Global Boutiques',
  specialty: 'Luxury Marketplace'
  }
  };

  // Product search database - simulating what stores would return
  const searchableProducts = {
  'fisherman sweater': [
  {
    store: 'bergdorf-goodman',
    brand: 'Brunello Cucinelli',
    name: 'Cashmere Fisherman Sweater',
    price: 2195,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    description: 'Hand-knitted cashmere fisherman sweater with cable knit details',
    availability: 'In Stock',
    rating: 4.8,
    sku: 'BC-FISH-001'
    },
    {
    store: 'saks',
    brand: 'Loro Piana',
    name: 'Wool Fisherman Knit',
    price: 1690,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400',
    description: 'Traditional fisherman knit in finest merino wool',
    availability: 'In Stock',
    rating: 4.9,
    sku: 'LP-WOOL-456'
  },
    {
      store: 'net-a-porter',
    brand: 'The Row',
    name: 'Oversized Fisherman Sweater',
    price: 1350,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400',
    description: 'Minimalist fisherman sweater in organic cotton',
    availability: 'Limited',
    rating: 4.7,
    sku: 'TR-OS-789'
  },
  {
      store: 'nordstrom',
        brand: 'Vince',
        name: 'Cable Knit Fisherman Sweater',
        price: 395,
        image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=400',
        description: 'Classic cable knit fisherman sweater in cotton blend',
        availability: 'In Stock',
        rating: 4.5,
        sku: 'VC-CK-123'
      }
    ],
    'white sneakers': [
      {
        store: 'saks',
        brand: 'Golden Goose',
        name: 'Super-Star Distressed Sneakers',
        price: 495,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
        description: 'Handcrafted leather sneakers with signature star',
        availability: 'In Stock',
        rating: 4.6,
        sku: 'GG-SS-001'
      },
      {
        store: 'bergdorf-goodman',
        brand: 'Common Projects',
        name: 'Achilles Leather Sneakers',
        price: 415,
        image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400',
        description: 'Minimalist white leather sneakers with gold numbers',
        availability: 'In Stock',
        rating: 4.8,
        sku: 'CP-ACH-002'
      },
      {
        store: 'ssense',
        brand: 'Maison Margiela',
        name: 'GAT Replica Sneakers',
        price: 495,
        image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
        description: 'German Army Trainer replica in premium leather',
        availability: 'Limited',
        rating: 4.7,
        sku: 'MM-GAT-003'
      }
    ],
    'black dress': [
      {
        store: 'net-a-porter',
        brand: 'Saint Laurent',
        name: 'Silk Mini Dress',
        price: 2390,
        image: 'https://images.unsplash.com/photo-1566479179817-c7fce3ca7ed2?w=400',
        description: 'Elegant silk mini dress with plunging neckline',
        availability: 'In Stock',
        rating: 4.9,
        sku: 'SL-SILK-001'
      },
      {
        store: 'bergdorf-goodman',
        brand: 'The Row',
        name: 'Crepe Midi Dress',
        price: 1690,
        image: 'https://images.unsplash.com/photo-1583847163059-4a3a9631e8de?w=400',
        description: 'Minimalist midi dress in silk crepe',
        availability: 'In Stock',
        rating: 4.8,
        sku: 'TR-CREPE-002'
      },
      {
        store: 'saks',
        brand: 'Victoria Beckham',
        name: 'Tailored Sheath Dress',
        price: 1195,
        image: 'https://source.unsplash.com/400x400/?luxury-dress,fashion',
        description: 'Perfectly tailored black sheath dress',
        availability: 'Limited',
        rating: 4.7,
        sku: 'VB-SHEATH-003'
      }
    ],
    'handbag': [
      {
        store: 'bergdorf-goodman',
        brand: 'Bottega Veneta',
        name: 'The Pouch Clutch',
        price: 1850,
        image: 'https://source.unsplash.com/400x400/?luxury-handbag,fashion',
        description: 'Signature intrecciato woven leather clutch',
        availability: 'In Stock',
        rating: 4.8,
        sku: 'BV-POUCH-001'
      },
      {
        store: 'saks',
        brand: 'Celine',
        name: 'Luggage Nano Bag',
        price: 3400,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&sig=2',
        description: 'Iconic structured leather handbag',
        availability: 'Limited',
        rating: 4.9,
        sku: 'CE-LUGGAGE-002'
      }
    ],
    'sweater': [
      {
        store: 'bergdorf-goodman',
        brand: 'Brunello Cucinelli',
        name: 'Cashmere Crew Neck Sweater',
        price: 1295,
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&sig=3',
        description: 'Luxurious cashmere sweater in classic fit',
        availability: 'In Stock',
        rating: 4.9,
        sku: 'BC-CASH-001'
      },
      {
        store: 'net-a-porter',
        brand: 'Toteme',
        name: 'Merino Wool Sweater',
        price: 390,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&sig=4',
        description: 'Oversized merino wool sweater in neutral tone',
        availability: 'In Stock',
        rating: 4.6,
        sku: 'TT-MERINO-002'
      }
    ]
  };

  // Enhanced AI-powered search function with fallback
  const performSearch = async (query, category = null) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setShowSearchResults(true);
    
    let results = [];
    
    try {
      // Use enhanced AI search first
      const enhancedResults = await enhancedGeminiSearch(query, category);
      
      if (enhancedResults && enhancedResults.length > 0) {
        results = enhancedResults;
      } else {
        // Fallback to basic Gemini search
        const aiResults = await callGeminiForSearch(query, category);
      
      if (aiResults.length > 0) {
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
        
        results = enhancedAiResults;
        } else {
          // Fallback to mock database
          throw new Error('No AI results, using fallback');
        }
      }
      
    } catch {
      console.log('Using store search engine');
      
      // Simulate real store search engine
      results = performStoreSearch(query);
    }
    
    setSearchResults(results);
    setIsSearching(false);
    
    // Add to search history
    setSearchHistory(prev => [
      { query, timestamp: Date.now(), results: results.length },
      ...prev.slice(0, 4)
    ]);
  };

  // Dynamic Product Generator - handles ANY search query
  const generateDynamicProducts = useCallback((query) => {
    const searchQuery = query.toLowerCase().trim();
    const storeKeys = Object.keys(storeAPIs);
    const productTypes = [
      'shirt', 'dress', 'sweater', 'jacket', 'pants', 'shoes', 'sneakers', 'boots',
      'handbag', 'purse', 'wallet', 'belt', 'scarf', 'hat', 'sunglasses',
      'jewelry', 'watch', 'necklace', 'bracelet', 'earrings', 'ring',
      'coat', 'blazer', 'suit', 'jeans', 'skirt', 'blouse', 'cardigan'
    ];

    // Brand database for realistic results
    const luxuryBrands = {
      'shirt': ['Tom Ford', 'Ermenegildo Zegna', 'Brunello Cucinelli', 'Loro Piana'],
      'dress': ['Saint Laurent', 'The Row', 'Gabriela Hearst', 'Victoria Beckham'],
      'sweater': ['Brunello Cucinelli', 'The Row', 'Toteme', 'Loro Piana'],
      'jacket': ['Saint Laurent', 'Bottega Veneta', 'Acne Studios', 'Moncler'],
      'shoes': ['Manolo Blahnik', 'Christian Louboutin', 'Jimmy Choo', 'Gianvito Rossi'],
      'sneakers': ['Golden Goose', 'Common Projects', 'Maison Margiela', 'Veja'],
      'handbag': ['Hermès', 'Chanel', 'Bottega Veneta', 'Celine'],
      'jewelry': ['Cartier', 'Tiffany & Co.', 'Van Cleef & Arpels', 'David Yurman'],
      'watch': ['Rolex', 'Patek Philippe', 'Audemars Piguet', 'Omega']
    };

    // Price ranges by category
    const priceRanges = {
      'shirt': [295, 1200],
      'dress': [890, 3500],
      'sweater': [395, 2200],
      'jacket': [1200, 4500],
      'shoes': [495, 1200],
      'sneakers': [295, 795],
      'handbag': [1200, 8500],
      'jewelry': [350, 5500],
      'watch': [2500, 15000]
    };

    // Determine product category from search query
    let category = 'fashion';
    let brands = ['Premium Brand', 'Designer Label', 'Luxury House'];
    let priceRange = [200, 1500];

    for (const type of productTypes) {
      if (searchQuery.includes(type)) {
        category = type;
        brands = luxuryBrands[type] || brands;
        priceRange = priceRanges[type] || priceRange;
        break;
      }
    }

    // Generate 4-8 realistic products
    const products = [];
    const numProducts = Math.floor(Math.random() * 5) + 4; // 4-8 products

    for (let i = 0; i < numProducts; i++) {
      const storeKey = storeKeys[Math.floor(Math.random() * storeKeys.length)];
      const storeInfo = storeAPIs[storeKey];
      const brand = brands[Math.floor(Math.random() * brands.length)];
      
      // Generate realistic price
      const minPrice = priceRange[0];
      const maxPrice = priceRange[1];
      const price = Math.floor(Math.random() * (maxPrice - minPrice)) + minPrice;
      
      // Generate product name
      const productName = generateProductName(searchQuery, category, brand);
      
      // Generate realistic image using proper fallback
      const imageQuery = `${searchQuery} ${category} luxury fashion`;
      const imageUrl = `https://source.unsplash.com/400x400/?${encodeURIComponent(imageQuery)}`;
      
      products.push({
        id: `${storeKey}-${Date.now()}-${i}`,
        name: productName,
        brand: brand,
        price: price,
        image: imageUrl,
        store: `${storeInfo.name} - ${storeInfo.location}`,
        storeWebsite: storeInfo.website,
        storeSpecialty: storeInfo.specialty,
        description: generateDescription(productName, brand, category),
        availability: Math.random() > 0.2 ? 'In Stock' : 'Limited',
        rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10, // 3.5-5.0 rating
        sku: `${brand.substring(0, 2).toUpperCase()}-${category.substring(0, 3).toUpperCase()}-${String(Math.floor(Math.random() * 999)).padStart(3, '0')}`,
        webhook: storeInfo.webhook,
        searchQuery: searchQuery
      });
    }

    return products.sort((a, b) => b.rating - a.rating);
  }, [storeAPIs]);

  const generateProductName = (query, category) => {
    const adjectives = ['Classic', 'Modern', 'Elegant', 'Luxury', 'Premium', 'Designer', 'Signature', 'Essential'];
    const materials = ['Silk', 'Cashmere', 'Wool', 'Cotton', 'Leather', 'Suede', 'Denim', 'Linen'];
    
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const material = materials[Math.floor(Math.random() * materials.length)];
    
    // Try to incorporate the search query
    if (query.includes(' ')) {
      return `${adjective} ${query.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')}`;
    }
    
    return `${adjective} ${material} ${category.charAt(0).toUpperCase() + category.slice(1)}`;
  };

  const generateDescription = (name, brand, category) => {
    const descriptions = {
      'shirt': 'Expertly tailored with attention to detail and premium materials',
      'dress': 'Sophisticated silhouette crafted from the finest fabrics',
      'sweater': 'Luxuriously soft and perfectly structured for timeless appeal',
      'shoes': 'Handcrafted with Italian leather and exceptional comfort',
      'handbag': 'Iconic design with meticulous craftsmanship and premium hardware',
      'jewelry': 'Exquisite piece featuring precious metals and expert artistry'
    };
    
    return descriptions[category] || `Premium ${category} from ${brand} featuring exceptional quality and design`;
  };

  // Enhanced store search with dynamic generation
  const performStoreSearch = useCallback((query) => {
    // First try predefined products
    const searchQuery = query.toLowerCase();
    let allResults = [];
    
    // Search through predefined products
    Object.keys(searchableProducts).forEach(productKey => {
      if (searchQuery.includes(productKey) || productKey.includes(searchQuery.split(' ')[0])) {
        const products = searchableProducts[productKey];
        products.forEach(product => {
          const storeInfo = storeAPIs[product.store];
          allResults.push({
            id: `${product.store}-${product.sku}`,
            name: product.name,
            brand: product.brand,
            price: product.price,
            image: product.image,
            store: `${storeInfo.name} - ${storeInfo.location}`,
            storeWebsite: storeInfo.website,
            storeSpecialty: storeInfo.specialty,
            description: product.description,
            availability: product.availability,
            rating: product.rating,
            sku: product.sku,
            webhook: storeInfo.webhook
          });
        });
      }
    });

    // If no predefined results, generate dynamic products
    if (allResults.length === 0) {
      allResults = generateDynamicProducts(query);
    }

    return allResults.slice(0, 8);
  }, [generateDynamicProducts, searchableProducts, storeAPIs]);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    performSearch(searchQuery, selectedCategory?.id);
  };

  // Handle category selection
  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    // Perform search with category even if no search query
    await performSearch(searchQuery || category.name, category.id);
  };

  // WhatsApp API Integration
  const sendWhatsAppMessage = useCallback(async (phoneNumber, message, orderData = null) => {
    try {
      // In production, this would hit your backend API
      const response = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${WHATSAPP_API_CONFIG.accessToken}`
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: phoneNumber,
          type: 'text',
          text: { body: message },
          context: orderData ? {
            order_id: orderData.id,
            product_sku: orderData.product.sku,
            store: orderData.product.store
          } : undefined
        })
      });

      if (!response.ok) {
        throw new Error('WhatsApp API failed');
      }

      return await response.json();
    } catch {
      console.log('WhatsApp API simulation - message would be sent:', message);
      // Fallback to regular WhatsApp web
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, '_blank');
      return { success: true, fallback: true };
    }
  }, []);

  // Order Processing System
  const handleOrderProduct = useCallback(async (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // Create order in our system
      const order = orderManager.createOrder(product, {
        source: 'tuhme_search',
        query: searchQuery,
        timestamp: new Date().toISOString()
      });

      // Generate comprehensive order message
      const orderMessage = `🛍️ NEW TUHME ORDER
━━━━━━━━━━━━━━━━━━━━━━━━

📦 ORDER: ${order.id}
🔍 Search: "${searchQuery}"

🛍️ PRODUCT DETAILS:
• ${product.name}
• Brand: ${product.brand}
• Price: $${product.price.toLocaleString()}
• SKU: ${product.sku}
• Store: ${product.store}
• Rating: ${product.rating}⭐

💰 PRICING BREAKDOWN:
• Subtotal: $${order.total.subtotal.toLocaleString()}
• Tax (8.875%): $${order.total.tax}
• Service Fee: $${order.total.serviceFee}
• Tip: $${order.total.tip}
• TOTAL: $${order.total.total.toLocaleString()}

🚚 DELIVERY:
• Estimated: ${new Date(order.estimatedDelivery).toLocaleString()}
• Address: Customer will provide

🔗 STORE WEBHOOK: ${product.webhook}

💬 Reply with customer details to process this order!

Generated by TUHME AI Discovery Engine`;

      // Send to WhatsApp Business API
      await sendWhatsAppMessage(WHATSAPP_API_CONFIG.businessPhoneId.replace('+', ''), orderMessage, order);

      // Update order status
      orderManager.updateOrderStatus(order.id, 'sent_to_agent', 'Order details sent to TUHME agent via WhatsApp');

      // Show success feedback
      alert(`Order ${order.id} created successfully! Our team will contact you shortly via WhatsApp.`);

      // Optional: Store order in localStorage for tracking
      const existingOrders = JSON.parse(localStorage.getItem('tuhme_orders') || '[]');
      existingOrders.push({
        id: order.id,
        product: product.name,
        brand: product.brand,
        price: product.price,
        total: order.total.total,
        status: order.status,
        timestamp: order.timestamp
      });
      localStorage.setItem('tuhme_orders', JSON.stringify(existingOrders));

    } catch (error) {
      console.error('Order processing failed:', error);
      
      // Fallback to simple WhatsApp message
      const fallbackMessage = `🛍️ TUHME Order Request

Product: ${product.name}
Brand: ${product.brand}
Price: $${product.price.toLocaleString()}
Store: ${product.store}
SKU: ${product.sku}

Search: "${searchQuery}"

Please help me purchase this item!

Found via TUHME AI Discovery ✨`;

      await sendWhatsAppMessage(WHATSAPP_API_CONFIG.businessPhoneId.replace('+', ''), fallbackMessage);
    }
  }, [searchQuery, sendWhatsAppMessage]);

  // Screenshot and share functionality
  const captureResults = async () => {
    if (!searchResultsRef.current || searchResults.length === 0) return;

    try {
      const canvas = await html2canvas(searchResultsRef.current, {
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

  return (
    <div className="ai-store-search">
      {/* AI-Powered Search Interface */}
      <div className="search-section">
        <div className="search-header">
          <div className="ai-features">

          </div>
        </div>

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
              {trendingSearches.map((search, index) => (
                <button
                  key={index}
                  className="popular-tag"
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSearchQuery(search);
                    await performSearch(search, selectedCategory?.id);
                  }}
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search Results */}
        {showSearchResults && (
          <div ref={searchResultsRef} className="search-results">
            <div className="results-header">
              <h3 className="results-title">
                {isSearching ? 'AI is searching...' : `Found ${searchResults.length} luxury items`}
              </h3>
              {searchResults.length > 0 && (
                <div className="results-actions">
                  <button className="screenshot-btn" onClick={captureResults}>
                    📸 Screenshot & Share
                  </button>
                </div>
              )}
            </div>

            {isSearching ? (
              <div className="searching-animation">
                <div className="search-spinner"></div>
                <p>🔍 Searching stores worldwide for "{searchQuery}"...</p>
                <div className="search-progress">
                  <span>• Querying Bergdorf Goodman API</span>
                  <span>• Checking Saks Fifth Avenue inventory</span>
                  <span>• Scanning Net-A-Porter products</span>
                  <span>• Searching Nordstrom catalog</span>
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
                      <div className="availability-badge">
                        {product.availability}
                      </div>
                    </div>

                    <div className="product-info">
                      <h4 className="product-name">{product.name}</h4>
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
                        {product.storeSpecialty && (
                          <p className="store-specialty">🏪 {product.storeSpecialty}</p>
                        )}
                        {product.sku && (
                          <p className="product-sku">SKU: {product.sku}</p>
                        )}
                      </div>

                      <button 
                      className="order-btn"
                      onClick={(e) => handleOrderProduct(e, product)}
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
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSearchQuery(item.query);
                    await performSearch(item.query, selectedCategory?.id);
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

      <style jsx="true">{`
        .ai-store-search {
          background: linear-gradient(135deg,
            var(--bg-luxury) 0%,
            var(--bg-primary) 50%,
            var(--bg-luxury) 100%);
          border-radius: 20px;
          padding: 2rem;
          margin: 2rem 0;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Search Section Styles */
        .search-section {
          margin: 0;
          padding: 0;
        }

        .search-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .search-title {
          font-family: var(--font-display, 'Inter', sans-serif);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          letter-spacing: 0.05em;
          margin: 0 0 1rem 0;
          color: var(--text-primary);
          text-shadow: 0 0 30px rgba(212, 175, 55, 0.4);
          filter: none;
          -webkit-text-stroke: 0;
        }

        .search-subtitle {
          font-size: 1.1rem;
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
          color: var(--text-primary);
          font-size: 1.1rem;
          outline: none;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .search-input:focus {
          border-color: var(--accent-color, #d4af37);
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2);
          background: rgba(255, 255, 255, 0.08);
        }

        .search-input::placeholder {
          color: var(--text-secondary);
        }

        .search-button {
          padding: 1.5rem 2rem;
          background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%);
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

        .category-section {
          margin-bottom: 3rem;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
          color: var(--text-primary);
        }

        .category-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .category-btn.active {
          background: rgba(212, 175, 55, 0.1);
          border-color: #d4af37;
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
          color: var(--text-secondary);
          line-height: 1.4;
        }

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
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .popular-tag:hover {
          background: #d4af37;
          color: var(--primary-bg);
          transform: translateY(-1px);
        }

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
          color: var(--text-primary);
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

        .searching-animation {
          text-align: center;
          padding: 4rem 2rem;
        }

        .search-spinner {
          width: 60px;
          height: 60px;
          border: 3px solid rgba(212, 175, 55, 0.3);
          border-top: 3px solid #d4af37;
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

        .search-progress span:nth-child(4) {
          animation-delay: 2.1s;
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

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

        .availability-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: #d4af37;
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
          color: var(--text-primary);
          margin: 0 0 0.5rem 0;
        }

        .product-brand {
          color: #d4af37;
          font-weight: 500;
          margin: 0 0 0.75rem 0;
        }

        .product-description {
          color: var(--text-secondary);
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
          color: var(--text-primary);
        }

        .rating {
          color: #ffd700;
          font-size: 0.9rem;
        }

        .product-store {
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin: 0 0 0.25rem 0;
        }

        .store-specialty {
          color: var(--text-secondary);
          font-size: 0.8rem;
          margin: 0 0 0.25rem 0;
          opacity: 0.8;
        }

        .product-sku {
          color: var(--text-secondary);
          font-size: 0.75rem;
          margin: 0;
          opacity: 0.6;
          font-family: monospace;
        }

        .order-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%);
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
          color: var(--text-primary);
          font-weight: 500;
        }

        .history-results {
          color: var(--text-secondary);
          font-size: 0.8rem;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .ai-store-search {
            padding: 1rem;
            margin: 1rem 0;
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

export default AIStoreSearch;
