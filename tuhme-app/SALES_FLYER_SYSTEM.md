# TUHME Sales Flyer Generator System

## Overview

A luxury sales monitoring and flyer generation system for TUHME Personal Shopping Service that actively monitors store sales and generates Claude AI prompts for creating daily sale flyers.

## Features

### 🛍️ **Active Sales Monitoring**
- Real-time monitoring of 53+ partner stores across Manhattan & Brooklyn
- Automatic sales data refresh every 6 hours
- Mock sales data generation for demo (easily replaceable with real APIs)
- Sales categorization by urgency, discount percentage, and store type

### 🎨 **Luxury Flyer Generator**
- Premium modal interface matching TUHME's black/white/gold aesthetic
- Multiple prompt types: Detailed, Quick, Instagram Stories, WhatsApp, Email, Social Media
- Store selection with visual indicators for active sales
- Copy-to-clipboard functionality with success feedback
- Direct "Open Claude AI" integration

### 🤖 **Claude AI Prompt Generation**
- Detailed prompts with complete brand guidelines
- Sales-specific data integration
- Multiple format options (Instagram, WhatsApp, Email, etc.)
- Luxury positioning and premium messaging
- Mobile-optimized specifications

### 📊 **Daily Automation**
- Automatic daily flyer generation at 8 AM
- Sales statistics dashboard
- Urgent sales detection (ending within 24 hours)
- Featured sales highlighting

## Component Architecture

### Core Services

#### `SalesMonitoringService`
```javascript
// Location: src/services/salesMonitoringService.js
// Responsibilities:
- Fetch sales data from store APIs
- Generate mock sales data for demo
- Monitor sales changes and urgency
- Provide statistics and analytics
- Auto-refresh functionality
- Daily flyer generation triggers
```

#### `FlyerPromptGenerator`
```javascript
// Location: src/utils/flyerPromptGenerator.js
// Responsibilities:
- Generate detailed Claude AI prompts
- Include TUHME brand guidelines
- Format sales data for flyers
- Support multiple output formats
- Seasonal campaign generation
```

### UI Components

#### `FlyerGeneratorModal`
```javascript
// Location: src/components/FlyerGeneratorModal.jsx
// Features:
- Luxury modal interface
- Store selection grid with sales indicators
- Prompt type selection
- Generated prompt display
- Copy/Claude integration
- Mobile responsive design
```

#### `FlyerGeneratorModal.css`
```css
/* Location: src/components/FlyerGeneratorModal.css */
/* Features: */
- Black/white/gold luxury aesthetic
- Smooth animations and transitions
- Hover effects and selected states
- Mobile-responsive layouts
- Premium button styling
```

### Integration Points

#### Modal Context Integration
```javascript
// Added to: src/contexts/ModalContext.jsx
flyerGenerator: false // Modal state management
```

#### Navigation Integration
```javascript
// Added to: src/components/Navigation.jsx
// Lightning bolt icon button in nav bar
// Triggers flyer generator modal
```

#### Store Service Enhancement
```javascript
// Enhanced: src/services/storeService.js
// Added sales monitoring endpoints
// Store data for flyer generation
```

## Usage Instructions

### 1. **Access the Generator**
- Click the lightning bolt icon (⚡) in the navigation bar
- Modal opens with current sales data loaded

### 2. **Select Stores**
- Choose from 53+ partner stores
- Visual indicators show which stores have active sales
- Filter by category or "On Sale" status
- Select individual stores or use "Select All"

### 3. **Choose Prompt Type**
- **Detailed**: Complete flyer with brand guidelines and sales data
- **Quick**: Concise flyer focusing on key elements
- **Instagram**: Multi-slide Instagram story series
- **WhatsApp**: Square format optimized for WhatsApp sharing
- **Email**: Professional email newsletter template
- **Social Media**: Multi-platform social content
- **Seasonal**: Season-specific styling campaigns

### 4. **Generate & Use**
- Click "Generate Prompt" to create Claude AI prompt
- Copy prompt to clipboard
- Click "Open Claude AI" to use immediately
- Paste prompt in Claude for flyer generation

## Sales Data Structure

### Store Sales Object
```javascript
{
  storeId: 'nordstrom-nyc',
  storeName: 'Nordstrom',
  saleType: 'Flash Sale',
  discount: '40-50%',
  category: 'Fashion',
  title: 'Nordstrom Flash Sale - Up to 70% Off',
  description: 'Shop the latest trends at unbeatable prices...',
  startDate: '2025-01-10',
  endDate: '2025-01-15',
  isActive: true,
  urgency: 'high', // 'high', 'medium', 'low'
  featured: true,
  tags: ['trending', 'limited-time', 'exclusive']
}
```

### Daily Flyer Data
```javascript
{
  date: '1/10/2025',
  activeSales: [...], // All active sales
  urgentSales: [...], // Sales ending within 24 hours
  featuredSales: [...], // Highlighted deals
  stats: {
    totalStores: 53,
    storesWithSales: 35,
    salesPercentage: 66,
    avgDiscount: 42,
    urgentSales: 8,
    featuredSales: 12
  },
  topDeals: [...], // Top 6 deals for flyer
  categories: ['Fashion', 'Beauty', 'Sportswear'],
  totalSavings: 1250
}
```

## Prompt Examples

### Detailed Prompt Output
```
Create a luxury sales flyer for TUHME Personal Shopping Service featuring active sales from: Nordstrom, Zara, Nike

BRAND IDENTITY:
- Company: TUHME - Premium Personal Shopping & Concierge Service
- Colors: Black (#000000), White (#FFFFFF), Gold accents (#FFD700)
- Style: Luxury minimalist, high-end concierge aesthetic
- Typography: Clean sans-serif with elegant hierarchy
- Positioning: Premium shopping service for busy professionals

CURRENT SALES DATA:
- Nordstrom: Flash Sale - 40-50% off Fashion
  "Nordstrom Flash Sale - Up to 70% Off"
  Urgency: high | Ends: 1/15/2025

DESIGN REQUIREMENTS:
- Layout: Clean, spacious grid with subtle shadows
- Header: "TUHME DAILY SALES DIGEST" with today's date
- Sections: Featured Deals, Store Highlights, How It Works
- Mobile-optimized for Instagram Stories and WhatsApp sharing
- Dimensions: 1080x1920px (9:16 ratio) for social media

[... detailed specifications continue ...]
```

### Quick Prompt Output
```
Create a luxury sales flyer for TUHME Personal Shopping Service.

Stores: Nordstrom, Zara, Nike
Style: Luxury minimalist, black/white/gold colors
Service: Premium personal shopping with same-day delivery
CTA: WhatsApp (646) 588-9916
Format: Instagram Story (1080x1920px)

Focus on "Send Screenshots → We Deliver" concept. Professional, high-end aesthetic.
```

## Configuration & Customization

### Environment Variables
```bash
# Optional API keys for real sales data
VITE_RAPIDAPI_KEY=your_rapid_api_key
VITE_SCRAPER_KEY=your_scraper_key

# WhatsApp Business Phone
VITE_WHATSAPP_BUSINESS_PHONE=+16465889916
```

### Sales Monitoring Settings
```javascript
// In salesMonitoringService.js
updateInterval: 6 * 60 * 60 * 1000, // 6 hours
dailyFlyerTime: '08:00', // 8 AM daily generation
```

### Brand Customization
```javascript
// In flyerPromptGenerator.js
brandGuidelines: {
  colors: {
    primary: '#000000',
    secondary: '#FFFFFF',
    accent: '#FFD700'
  },
  positioning: 'premium personal shopping concierge'
}
```

## Integration with Real APIs

### Replace Mock Data
To connect with real store APIs, update these methods in `salesMonitoringService.js`:

```javascript
async fetchStoreSales(storeId) {
  // Replace mock generation with real API calls
  const endpoint = this.getSaleEndpoints()[storeId];
  const response = await fetch(endpoint.url, {
    headers: endpoint.headers
  });
  return await response.json();
}
```

### Add New Store APIs
```javascript
getSaleEndpoints() {
  return {
    'store-id': {
      url: 'https://store-api.com/sales',
      headers: { 'Authorization': 'Bearer TOKEN' }
    }
  };
}
```

## Benefits for TUHME

### 1. **Marketing Automation**
- Daily sales flyers generated automatically
- Consistent luxury branding across all materials
- Social media ready content

### 2. **Sales Intelligence**
- Real-time awareness of partner store sales
- Opportunity identification for featured promotions
- Data-driven marketing decisions

### 3. **Customer Engagement**
- Fresh daily content for social media
- WhatsApp-optimized flyers for easy sharing
- Professional flyers that match luxury positioning

### 4. **Operational Efficiency**
- Automated sales monitoring across 53+ stores
- One-click flyer generation for marketing team
- Integration with existing TUHME brand system

## Future Enhancements

### Phase 2 Features
- [ ] Email campaign integration
- [ ] Social media auto-posting
- [ ] Customer segmentation for targeted flyers
- [ ] A/B testing for flyer performance
- [ ] Analytics dashboard for flyer engagement

### API Integrations
- [ ] Shopify Partner API for real-time inventory
- [ ] Instagram Business API for direct posting
- [ ] Mailchimp API for email campaigns
- [ ] WhatsApp Business API for automated messaging

## Technical Requirements

### Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

### Browser Support
- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+

### Performance
- Modal loads in <500ms
- Sales data refresh in <2s
- Responsive on mobile devices
- Optimized for touch interfaces

---

**Created for TUHME Personal Shopping Service**  
*Luxury sales monitoring and flyer generation system*  
*Built with React and premium aesthetic design*