// Store service functionality removed - sales monitoring simplified

class SalesMonitoringService {
  constructor() {
    this.salesData = new Map();
    this.lastUpdate = null;
    this.updateInterval = 6 * 60 * 60 * 1000; // 6 hours
    this.apiKeys = {
      rapid: 'demo_key',
      scraper: 'demo_key'
    };
  }

  // Store-specific sale monitoring endpoints
  getSaleEndpoints() {
    return {
      nordstrom: {
        url: 'https://nordstrom-api.rapidapi.com/sales',
        headers: { 'X-RapidAPI-Key': this.apiKeys.rapid }
      },
      zara: {
        url: 'https://zara-api.rapidapi.com/promotions',
        headers: { 'X-RapidAPI-Key': this.apiKeys.rapid }
      },
      nike: {
        url: 'https://nike-api.rapidapi.com/clearance',
        headers: { 'X-RapidAPI-Key': this.apiKeys.rapid }
      },
      sephora: {
        url: 'https://sephora-api.rapidapi.com/sales',
        headers: { 'X-RapidAPI-Key': this.apiKeys.rapid }
      },
      // Add more store endpoints as needed
    };
  }

  // Mock sales data for demo (replace with real API calls)
  async fetchStoreSales(storeId) {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock sales data based on store
      const mockSales = this.generateMockSales(storeId);
      this.salesData.set(storeId, mockSales);
      
      return mockSales;
    } catch (error) {
      console.error(`Error fetching sales for ${storeId}:`, error);
      return null;
    }
  }

  generateMockSales(storeId) {
    const saleTypes = [
      'Flash Sale', 'End of Season', 'Black Friday', 'Holiday Special',
      'Clearance', 'New Arrivals', 'Member Exclusive', 'Limited Time'
    ];
    
    const discountRanges = [
      '20-30%', '30-40%', '40-50%', '50-60%', '60-70%', 'Up to 80%'
    ];

    const categories = [
      'Clothing', 'Shoes', 'Accessories', 'Beauty', 'Home', 'Electronics'
    ];

    const isOnSale = Math.random() > 0.3; // 70% chance of having a sale

    if (!isOnSale) return null;

    return {
      storeId,
      storeName: storeService.getStoreById(storeId)?.name || storeId,
      saleType: saleTypes[Math.floor(Math.random() * saleTypes.length)],
      discount: discountRanges[Math.floor(Math.random() * discountRanges.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      title: this.generateSaleTitle(storeId),
      description: this.generateSaleDescription(),
      startDate: new Date(),
      endDate: new Date(Date.now() + (Math.random() * 7 + 1) * 24 * 60 * 60 * 1000),
      isActive: true,
      urgency: Math.random() > 0.5 ? 'high' : 'medium',
      featured: Math.random() > 0.7,
      tags: this.generateSaleTags()
    };
  }

  generateSaleTitle(storeId) {
    const store = storeService.getStoreById(storeId);
    const titles = [
      `${store?.name} Flash Sale - Up to 70% Off`,
      `Exclusive ${store?.name} End of Season Clearance`,
      `${store?.name} Holiday Special - Limited Time`,
      `${store?.name} New Arrivals + Extra 40% Off`,
      `${store?.name} Member Exclusive Sale`,
      `${store?.name} Weekend Blowout - Don't Miss Out`
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  generateSaleDescription() {
    const descriptions = [
      'Shop the latest trends at unbeatable prices. Limited time offer!',
      'Exclusive deals on premium brands. While supplies last.',
      'End of season clearance - up to 80% off select items.',
      'New arrivals with instant savings. Free shipping on orders over $50.',
      'Member exclusive access to private sale. Join now for instant savings.',
      'Weekend flash sale - 48 hours only. Don\'t miss these deals!'
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  }

  generateSaleTags() {
    const allTags = [
      'trending', 'limited-time', 'exclusive', 'clearance', 'new-arrivals',
      'member-only', 'flash-sale', 'weekend-special', 'holiday', 'seasonal'
    ];
    const numTags = Math.floor(Math.random() * 4) + 1;
    return allTags.sort(() => 0.5 - Math.random()).slice(0, numTags);
  }

  // Fetch sales for all stores
  async fetchAllStoreSales() {
    const stores = storeService.getAllStores();
    const salePromises = stores.map(store => this.fetchStoreSales(store.id));
    
    try {
      const results = await Promise.all(salePromises);
      const activeSales = results.filter(sale => sale !== null);
      
      this.lastUpdate = new Date();
      
      console.log(`Sales monitoring update: ${activeSales.length} active sales found`);
      return activeSales;
    } catch (error) {
      console.error('Error fetching all store sales:', error);
      return [];
    }
  }

  // Get current active sales
  getActiveSales() {
    const activeSales = [];
    for (const [storeId, saleData] of this.salesData) {
      if (saleData && saleData.isActive && new Date() < new Date(saleData.endDate)) {
        activeSales.push(saleData);
      }
    }
    return activeSales.sort((a, b) => {
      // Sort by urgency, then by discount percentage
      if (a.urgency === 'high' && b.urgency !== 'high') return -1;
      if (b.urgency === 'high' && a.urgency !== 'high') return 1;
      return b.discount.localeCompare(a.discount);
    });
  }

  // Get sales by category
  getSalesByCategory(category) {
    return this.getActiveSales().filter(sale => 
      sale.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Get featured sales
  getFeaturedSales() {
    return this.getActiveSales().filter(sale => sale.featured);
  }

  // Get urgent sales (ending soon)
  getUrgentSales() {
    const now = new Date();
    const urgentThreshold = 24 * 60 * 60 * 1000; // 24 hours
    
    return this.getActiveSales().filter(sale => {
      const timeLeft = new Date(sale.endDate) - now;
      return timeLeft <= urgentThreshold;
    });
  }

  // Check if update is needed
  needsUpdate() {
    if (!this.lastUpdate) return true;
    return Date.now() - this.lastUpdate.getTime() > this.updateInterval;
  }

  // Auto-refresh sales data
  async autoRefresh() {
    if (this.needsUpdate()) {
      console.log('Auto-refreshing sales data...');
      await this.fetchAllStoreSales();
    }
  }

  // Get sales statistics
  getSalesStats() {
    const activeSales = this.getActiveSales();
    const totalStores = storeService.getAllStores().length;
    const storesWithSales = activeSales.length;
    const avgDiscount = this.calculateAverageDiscount(activeSales);
    const categories = [...new Set(activeSales.map(sale => sale.category))];
    
    return {
      totalStores,
      storesWithSales,
      salesPercentage: Math.round((storesWithSales / totalStores) * 100),
      avgDiscount,
      categories: categories.length,
      urgentSales: this.getUrgentSales().length,
      featuredSales: this.getFeaturedSales().length,
      lastUpdate: this.lastUpdate
    };
  }

  calculateAverageDiscount(sales) {
    if (sales.length === 0) return 0;
    
    const discountValues = sales.map(sale => {
      const match = sale.discount.match(/(\d+)/);
      return match ? parseInt(match[1]) : 0;
    });
    
    return Math.round(discountValues.reduce((sum, val) => sum + val, 0) / discountValues.length);
  }

  // Generate daily flyer data
  generateDailyFlyerData() {
    const activeSales = this.getActiveSales();
    const urgentSales = this.getUrgentSales();
    const featuredSales = this.getFeaturedSales();
    const stats = this.getSalesStats();
    
    return {
      date: new Date().toLocaleDateString(),
      activeSales,
      urgentSales,
      featuredSales,
      stats,
      topDeals: activeSales.slice(0, 6), // Top 6 deals for flyer
      categories: [...new Set(activeSales.map(sale => sale.category))],
      totalSavings: this.calculateTotalSavings(activeSales)
    };
  }

  calculateTotalSavings(sales) {
    // Mock calculation - in real app, would calculate based on actual price data
    return sales.reduce((total, sale) => {
      const discountNum = parseInt(sale.discount.match(/(\d+)/)?.[1] || 0);
      return total + (discountNum * 10); // Mock savings calculation
    }, 0);
  }

  // Start monitoring service
  startMonitoring() {
    if (typeof window === 'undefined') {
      console.log('Sales monitoring service disabled in server environment');
      return;
    }
    
    console.log('Starting sales monitoring service...');
    
    // Initial fetch
    this.fetchAllStoreSales();
    
    // Set up periodic refresh
    this.monitoringInterval = setInterval(() => {
      this.autoRefresh();
    }, this.updateInterval);
    
    // Set up daily flyer generation
    this.setupDailyFlyerGeneration();
  }

  // Setup daily flyer generation
  setupDailyFlyerGeneration() {
    if (typeof window === 'undefined') return;
    
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(8, 0, 0, 0); // 8 AM daily
    
    const timeUntilTomorrow = tomorrow - now;
    
    setTimeout(() => {
      this.generateDailyFlyer();
      
      // Then every 24 hours
      this.dailyInterval = setInterval(() => {
        this.generateDailyFlyer();
      }, 24 * 60 * 60 * 1000);
    }, timeUntilTomorrow);
  }

  // Generate daily flyer
  async generateDailyFlyer() {
    if (typeof window === 'undefined') return null;
    
    console.log('Generating daily sales flyer...');
    
    const flyerData = this.generateDailyFlyerData();
    
    // Trigger flyer generation event
    const event = new CustomEvent('dailyFlyerGenerated', {
      detail: flyerData
    });
    window.dispatchEvent(event);
    
    return flyerData;
  }

  // Stop monitoring service
  stopMonitoring() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    
    if (this.dailyInterval) {
      clearInterval(this.dailyInterval);
      this.dailyInterval = null;
    }
    
    console.log('Sales monitoring service stopped');
  }

  // Manual trigger for flyer generation
  async triggerFlyerGeneration() {
    await this.fetchAllStoreSales();
    return this.generateDailyFlyer();
  }
}

// Create singleton instance lazily
let instance = null;

export default {
  getInstance() {
    if (!instance) {
      instance = new SalesMonitoringService();
    }
    return instance;
  },
  
  // Proxy common methods for convenience
  async fetchAllStoreSales() {
    return this.getInstance().fetchAllStoreSales();
  },
  
  getActiveSales() {
    return this.getInstance().getActiveSales();
  },
  
  generateDailyFlyerData() {
    return this.getInstance().generateDailyFlyerData();
  },
  
  getSalesStats() {
    return this.getInstance().getSalesStats();
  },
  
  async triggerFlyerGeneration() {
    return this.getInstance().triggerFlyerGeneration();
  },
  
  startMonitoring() {
    return this.getInstance().startMonitoring();
  },
  
  stopMonitoring() {
    return this.getInstance().stopMonitoring();
  }
};