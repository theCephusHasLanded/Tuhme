/**
 * Labubu Modal Test Helper
 * Utility functions for testing and debugging the Labubu exclusive modal
 */

export const LabubuTestHelper = {
  /**
   * Reset first-time user status to test modal display
   */
  resetFirstTimeUser: () => {
    try {
      const keysToRemove = [
        'tuhme-first-visit',
        'tuhme-labubu-modal-shown',
        'tuhme-user-sessions',
        'tuhme-last-visit'
      ];
      
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
      });
      
      console.log('✅ First-time user status reset. Refresh page to see Labubu modal.');
      return true;
    } catch (error) {
      console.error('❌ Failed to reset first-time user status:', error);
      return false;
    }
  },

  /**
   * Force show Labubu modal (for testing purposes)
   */
  forceShowModal: () => {
    try {
      // Remove the modal shown flag
      localStorage.removeItem('tuhme-labubu-modal-shown');
      
      // Set up as first-time user
      localStorage.removeItem('tuhme-first-visit');
      
      console.log('✅ Forced modal display. Refresh page to see Labubu modal.');
      return true;
    } catch (error) {
      console.error('❌ Failed to force show modal:', error);
      return false;
    }
  },

  /**
   * Get current user statistics
   */
  getUserStats: () => {
    try {
      const stats = {
        firstVisit: localStorage.getItem('tuhme-first-visit'),
        labubuModalShown: localStorage.getItem('tuhme-labubu-modal-shown'),
        lastVisit: localStorage.getItem('tuhme-last-visit'),
        userSessions: JSON.parse(localStorage.getItem('tuhme-user-sessions') || '[]')
      };
      
      console.log('📊 User Statistics:', {
        ...stats,
        firstVisit: stats.firstVisit ? new Date(parseInt(stats.firstVisit)) : null,
        labubuModalShown: stats.labubuModalShown ? new Date(parseInt(stats.labubuModalShown)) : null,
        lastVisit: stats.lastVisit ? new Date(parseInt(stats.lastVisit)) : null,
        totalSessions: stats.userSessions.length
      });
      
      return stats;
    } catch (error) {
      console.error('❌ Failed to get user stats:', error);
      return null;
    }
  },

  /**
   * Test modal responsiveness across different screen sizes
   */
  testResponsiveness: () => {
    const breakpoints = [
      { name: 'Mobile Small', width: 375, height: 667 },
      { name: 'Mobile Large', width: 414, height: 896 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop Small', width: 1024, height: 768 },
      { name: 'Desktop Large', width: 1440, height: 900 }
    ];

    console.log('🧪 Testing Labubu Modal Responsiveness:');
    
    breakpoints.forEach(({ name, width, height }) => {
      console.log(`📱 ${name}: ${width}x${height}px`);
      
      // You can manually test by resizing browser window to these dimensions
      // Or use browser dev tools device emulation
    });

    console.log('💡 Manual testing steps:');
    console.log('1. Open browser dev tools');
    console.log('2. Enable device emulation');
    console.log('3. Test each breakpoint above');
    console.log('4. Check modal layout, text sizing, and interactions');
  },

  /**
   * Simulate analytics events for testing
   */
  simulateAnalytics: () => {
    const events = [
      { event: 'user_classification', data: { user_type: 'first_time' } },
      { event: 'labubu_modal_shown', data: { interaction_type: 'modal_displayed' } },
      { event: 'labubu_modal_interaction', data: { interaction_type: 'cta_clicked' } },
      { event: 'labubu_modal_interaction', data: { interaction_type: 'modal_closed' } }
    ];

    console.log('📈 Simulating Analytics Events:');
    events.forEach(({ event, data }) => {
      console.log(`🎯 Event: ${event}`, data);
      
      // Simulate gtag call if available
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', event, {
          event_category: 'labubu_test',
          custom_map: data
        });
      }
    });
  },

  /**
   * Check browser compatibility
   */
  checkCompatibility: () => {
    const features = {
      'Local Storage': typeof Storage !== 'undefined',
      'CSS Grid': CSS.supports('display', 'grid'),
      'CSS Flexbox': CSS.supports('display', 'flex'),
      'CSS Backdrop Filter': CSS.supports('backdrop-filter', 'blur(10px)'),
      'CSS Clamp': CSS.supports('font-size', 'clamp(1rem, 2vw, 2rem)'),
      'Intersection Observer': 'IntersectionObserver' in window,
      'Resize Observer': 'ResizeObserver' in window
    };

    console.log('🔍 Browser Compatibility Check:');
    Object.entries(features).forEach(([feature, supported]) => {
      console.log(`${supported ? '✅' : '❌'} ${feature}: ${supported ? 'Supported' : 'Not Supported'}`);
    });

    return features;
  },

  /**
   * Performance monitoring
   */
  monitorPerformance: () => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint');
      
      console.log('⚡ Performance Metrics:');
      console.log(`🕐 DOM Content Loaded: ${navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart}ms`);
      console.log(`🎨 First Paint: ${paint.find(p => p.name === 'first-paint')?.startTime || 'N/A'}ms`);
      console.log(`🖼️ First Contentful Paint: ${paint.find(p => p.name === 'first-contentful-paint')?.startTime || 'N/A'}ms`);
      
      // Monitor largest contentful paint
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log(`🖼️ Largest Contentful Paint: ${lastEntry.startTime}ms`);
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  },

  /**
   * Quick setup for demo purposes
   */
  setupDemo: () => {
    console.log('🚀 Setting up Labubu Modal Demo...');
    
    // Reset user status
    LabubuTestHelper.resetFirstTimeUser();
    
    // Check compatibility
    LabubuTestHelper.checkCompatibility();
    
    console.log('✨ Demo setup complete! Refresh the page to see the Labubu modal.');
    console.log('💡 Use LabubuTestHelper.getUserStats() to check user state');
    console.log('💡 Use LabubuTestHelper.testResponsiveness() for responsive testing');
  }
};

// Make available globally for testing
if (typeof window !== 'undefined') {
  window.LabubuTestHelper = LabubuTestHelper;
  
  // Log available methods
  console.log('🧰 Labubu Test Helper loaded. Available methods:');
  console.log('- LabubuTestHelper.resetFirstTimeUser()');
  console.log('- LabubuTestHelper.forceShowModal()');
  console.log('- LabubuTestHelper.getUserStats()');
  console.log('- LabubuTestHelper.testResponsiveness()');
  console.log('- LabubuTestHelper.checkCompatibility()');
  console.log('- LabubuTestHelper.setupDemo()');
}

export default LabubuTestHelper;