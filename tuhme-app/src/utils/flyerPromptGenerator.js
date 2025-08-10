import salesMonitoringService from '../services/salesMonitoringService';

class FlyerPromptGenerator {
  constructor() {
    this.brandGuidelines = {
      colors: {
        primary: '#000000',
        secondary: '#FFFFFF', 
        accent: '#FFD700',
        background: '#FAFAFA'
      },
      fonts: {
        primary: 'Inter, system-ui, -apple-system, sans-serif',
        secondary: 'Playfair Display, Georgia, serif'
      },
      style: 'luxury minimalist',
      positioning: 'premium personal shopping concierge'
    };
  }

  generateDetailedPrompt(selectedStores, flyerData) {
    const storeNames = selectedStores.map(store => store.name).join(', ');
    const activeSales = flyerData.activeSales.filter(sale => 
      selectedStores.some(store => store.id === sale.storeId)
    );

    return `Create a luxury sales flyer for TUHME Personal Shopping Service featuring active sales from: ${storeNames}

BRAND IDENTITY:
- Company: TUHME - Premium Personal Shopping & Concierge Service
- Colors: Black (#000000), White (#FFFFFF), Gold accents (#FFD700)
- Style: Luxury minimalist, high-end concierge aesthetic
- Typography: Clean sans-serif with elegant hierarchy
- Positioning: Premium shopping service for busy professionals

CURRENT SALES DATA:
${this.formatSalesData(activeSales)}

DESIGN REQUIREMENTS:
- Layout: Clean, spacious grid with subtle shadows
- Header: "TUHME DAILY SALES DIGEST" with today's date
- Sections: Featured Deals, Store Highlights, How It Works
- Mobile-optimized for Instagram Stories and WhatsApp sharing
- Dimensions: 1080x1920px (9:16 ratio) for social media
- Include subtle luxury textures or gradients

CONTENT STRUCTURE:
1. HEADER SECTION:
   - TUHME logo placeholder
   - "Daily Sales Digest - [TODAY'S DATE]"
   - Subtitle: "Curated deals from Manhattan & Brooklyn's finest stores"

2. FEATURED DEALS (Top 3-4):
   - Store logo/name
   - Sale highlight (discount percentage)
   - Category (Fashion, Beauty, etc.)
   - "Send Screenshot → We Deliver" call-to-action

3. SERVICE HIGHLIGHTS:
   - "Screenshot items you want"
   - "We shop & deliver same day"
   - "Try at home, pay for keeps"
   - "Professional styling service"

4. CALL TO ACTION:
   - "Start Shopping via WhatsApp"
   - Phone number: (646) 588-9916
   - "Or visit us at tuhme.com"

5. FOOTER:
   - "Premium Personal Shopping • Same Day Delivery"
   - "Manhattan & Brooklyn • Luxury Concierge Service"

TONE & MESSAGING:
- Sophisticated and professional
- Emphasize convenience and luxury
- Focus on time-saving benefits
- Highlight personal service aspect
- Use action-oriented language

VISUAL ELEMENTS:
- Elegant typography hierarchy
- Subtle gold accents for emphasis
- Clean store logo integration
- Professional photography style
- Minimal icons and graphics
- Plenty of white space

UNIQUE SELLING POINTS TO HIGHLIGHT:
- Personal shopping concierge service
- Same-day delivery in NYC
- Try-before-you-buy model
- Professional styling expertise
- Exclusive access to premium stores
- WhatsApp convenience

Please create a flyer that feels like a premium service announcement, not a typical retail advertisement. The design should convey luxury, convenience, and personalized service.`;
  }

  generateQuickPrompt(selectedStores) {
    const storeNames = selectedStores.map(store => store.name).join(', ');
    
    return `Create a luxury sales flyer for TUHME Personal Shopping Service.

Stores: ${storeNames}
Style: Luxury minimalist, black/white/gold colors
Service: Premium personal shopping with same-day delivery
CTA: WhatsApp (646) 588-9916
Format: Instagram Story (1080x1920px)

Focus on "Send Screenshots → We Deliver" concept. Professional, high-end aesthetic.`;
  }

  generateInstagramPrompt(selectedStores, flyerData) {
    const topDeals = flyerData.topDeals.slice(0, 3);
    const storeNames = selectedStores.map(store => store.name).join(', ');

    return `Create an Instagram Story series (3 slides) for TUHME Personal Shopping Service:

SLIDE 1 - HEADER:
- "TUHME DAILY SALES" title
- "${flyerData.stats.storesWithSales} stores with active sales"
- "Curated by your personal shopping concierge"
- Black/white/gold luxury aesthetic

SLIDE 2 - FEATURED DEALS:
${this.formatTopDeals(topDeals)}
- "Screenshot → Send → We Deliver"
- Clean, minimalist layout

SLIDE 3 - CALL TO ACTION:
- "Start Shopping Now"
- WhatsApp: (646) 588-9916
- "Same Day Delivery • Manhattan & Brooklyn"
- TUHME branding

Style: Luxury minimalist, professional concierge service
Dimensions: 1080x1920px each
Colors: Black (#000000), White (#FFFFFF), Gold (#FFD700)`;
  }

  generateWhatsAppPrompt(selectedStores, flyerData) {
    const urgentSales = flyerData.urgentSales.slice(0, 3);
    
    return `Create a WhatsApp-optimized sales flyer for TUHME Personal Shopping:

FORMAT: Square (1080x1080px) for easy WhatsApp sharing
STORES: ${selectedStores.map(s => s.name).join(', ')}

URGENT DEALS (Ending Soon):
${this.formatUrgentDeals(urgentSales)}

HEADER: "TUHME FLASH SALES ALERT"
SUBHEADER: "Limited Time - Order by Screenshot"

PROCESS:
1. Screenshot items you want
2. Send to (646) 588-9916
3. We shop & deliver today
4. Try at home, pay for keeps

STYLE: Clean, urgent but luxurious
COLORS: Black, white, gold accents
EMPHASIS: Speed and convenience

Include "Forward this to friends" encouragement.`;
  }

  formatSalesData(sales) {
    return sales.map(sale => `
- ${sale.storeName}: ${sale.saleType} - ${sale.discount} off ${sale.category}
  "${sale.title}"
  Urgency: ${sale.urgency} | Ends: ${new Date(sale.endDate).toLocaleDateString()}
    `).join('\n');
  }

  formatTopDeals(deals) {
    return deals.map(deal => `
- ${deal.storeName}: ${deal.discount} off ${deal.category}
  ${deal.title}
    `).join('\n');
  }

  formatUrgentDeals(deals) {
    return deals.map(deal => `
- ${deal.storeName}: ${deal.discount} off - ENDS TODAY
  ${deal.title}
    `).join('\n');
  }

  // Generate email marketing prompt
  generateEmailPrompt(selectedStores, flyerData) {
    return `Create an email newsletter template for TUHME Personal Shopping Service:

SUBJECT: "Today's Curated Sales from ${flyerData.stats.storesWithSales} Premium Stores"

EMAIL CONTENT:
- Professional HTML email template
- Luxury branding (black/white/gold)
- Featured sales from: ${selectedStores.map(s => s.name).join(', ')}
- Personal shopping service highlights
- Mobile-responsive design
- Clear WhatsApp CTA buttons

SECTIONS:
1. Personal greeting
2. Today's featured deals
3. How TUHME works
4. Customer testimonials
5. Contact information

TONE: Professional, personal, luxury concierge service`;
  }

  // Generate social media post prompt
  generateSocialPostPrompt(selectedStores, flyerData) {
    return `Create social media posts for TUHME Personal Shopping Service:

PLATFORM VARIANTS:
- Instagram Post (1080x1080px)
- Instagram Story (1080x1920px)
- Facebook Post (1200x630px)
- LinkedIn Post (professional tone)

CONTENT FOCUS:
- ${flyerData.stats.storesWithSales} stores with active sales
- Personal shopping convenience
- Same-day delivery service
- Professional styling expertise

STORES: ${selectedStores.map(s => s.name).join(', ')}

CAPTIONS:
- Instagram: Trendy, lifestyle-focused
- Facebook: Community-oriented
- LinkedIn: Professional, time-saving benefits

STYLE: Luxury minimalist, consistent branding
HASHTAGS: #PersonalShopping #NYC #LuxuryLifestyle #TimeIsMoney`;
  }

  // Generate seasonal campaign prompt
  generateSeasonalPrompt(selectedStores, flyerData, season = 'current') {
    const seasonalThemes = {
      spring: 'Fresh starts, new wardrobe',
      summer: 'Vacation ready, effortless style',
      fall: 'Back to business, layered looks',
      winter: 'Holiday parties, cozy luxury'
    };

    return `Create a seasonal sales campaign for TUHME Personal Shopping Service:

SEASON: ${season}
THEME: ${seasonalThemes[season] || 'Seasonal style refresh'}
STORES: ${selectedStores.map(s => s.name).join(', ')}

CAMPAIGN ELEMENTS:
- Seasonal color palette integration
- Weather-appropriate styling tips
- Seasonal shopping priorities
- Holiday/event-focused messaging

DELIVERABLES:
- Main flyer (1080x1920px)
- Social media carousel (5 slides)
- Email header graphic
- WhatsApp broadcast image

MESSAGING:
- Seasonal style needs
- Personal shopping convenience
- Time-saving benefits
- Professional styling advice

STYLE: Luxury minimalist with seasonal touches
COLORS: Black/white/gold with seasonal accents`;
  }

  // Get prompt type options
  getPromptTypes() {
    return [
      { id: 'detailed', name: 'Detailed Sales Flyer', description: 'Complete flyer with all sales data and brand guidelines' },
      { id: 'quick', name: 'Quick Flyer', description: 'Concise flyer focusing on key elements' },
      { id: 'instagram', name: 'Instagram Stories', description: 'Multi-slide Instagram story series' },
      { id: 'whatsapp', name: 'WhatsApp Flyer', description: 'Square format optimized for WhatsApp sharing' },
      { id: 'email', name: 'Email Newsletter', description: 'Professional email template with sales highlights' },
      { id: 'social', name: 'Social Media Posts', description: 'Multi-platform social media content' },
      { id: 'seasonal', name: 'Seasonal Campaign', description: 'Season-specific styling campaign' }
    ];
  }

  // Generate prompt based on type
  generatePrompt(type, selectedStores, flyerData, options = {}) {
    const flyerDataWithDefaults = flyerData || salesMonitoringService.generateDailyFlyerData();
    
    switch (type) {
      case 'detailed':
        return this.generateDetailedPrompt(selectedStores, flyerDataWithDefaults);
      case 'quick':
        return this.generateQuickPrompt(selectedStores);
      case 'instagram':
        return this.generateInstagramPrompt(selectedStores, flyerDataWithDefaults);
      case 'whatsapp':
        return this.generateWhatsAppPrompt(selectedStores, flyerDataWithDefaults);
      case 'email':
        return this.generateEmailPrompt(selectedStores, flyerDataWithDefaults);
      case 'social':
        return this.generateSocialPostPrompt(selectedStores, flyerDataWithDefaults);
      case 'seasonal':
        return this.generateSeasonalPrompt(selectedStores, flyerDataWithDefaults, options.season);
      default:
        return this.generateDetailedPrompt(selectedStores, flyerDataWithDefaults);
    }
  }
}

export default new FlyerPromptGenerator();