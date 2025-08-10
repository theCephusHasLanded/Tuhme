// Global Color Scheme Manager
// Synchronizes color schemes across the entire app to match Hero component

class ColorSchemeManager {
  constructor() {
    this.currentHour = new Date().getHours();
    this.updateInterval = null;
    this.handlePaletteChange = null;
    this.luxuryPalettes = [
      { primary: '#0a0a0a', secondary: '#1a1a1a', accent: '#ffffff', name: 'midnight-mono', rgb: '255, 255, 255' },
      { primary: '#1a0f1a', secondary: '#2a1a2a', accent: '#e6c2a6', name: 'champagne-dusk', rgb: '230, 194, 166' },
      { primary: '#0f1419', secondary: '#1a2129', accent: '#8b9dc3', name: 'sapphire-night', rgb: '139, 157, 195' },
      { primary: '#191414', secondary: '#2a2125', accent: '#dda15e', name: 'cognac-dream', rgb: '221, 161, 94' },
      { primary: '#0d1421', secondary: '#1a2332', accent: '#a8dadc', name: 'tiffany-dawn', rgb: '168, 218, 220' },
      { primary: '#1a1a0f', secondary: '#2a2a1a', accent: '#f1faee', name: 'pearl-morning', rgb: '241, 250, 238' },
      { primary: '#1a0f14', secondary: '#2a1a25', accent: '#ffb3ba', name: 'rose-aurora', rgb: '255, 179, 186' },
      { primary: '#0f1a14', secondary: '#1a2a25', accent: '#c7f9cc', name: 'emerald-mist', rgb: '199, 249, 204' },
      { primary: '#14141a', secondary: '#25252a', accent: '#bde0ff', name: 'crystal-blue', rgb: '189, 224, 255' },
      { primary: '#1a140f', secondary: '#2a251a', accent: '#ffd23f', name: 'saffron-luxury', rgb: '255, 210, 63' },
      { primary: '#141a1a', secondary: '#252a2a', accent: '#a663cc', name: 'amethyst-elite', rgb: '166, 99, 204' },
      { primary: '#1a1914', secondary: '#2a2925', accent: '#ffffff', name: 'mono-prestige', rgb: '255, 255, 255' },
      { primary: '#0f141a', secondary: '#1a252a', accent: '#4ecdc4', name: 'turquoise-calm', rgb: '78, 205, 196' },
      { primary: '#1a0f0f', secondary: '#2a1a1a', accent: '#e6c2a6', name: 'coral-sunset', rgb: '230, 194, 166' },
      { primary: '#14141a', secondary: '#25252a', accent: '#f8f32b', name: 'citrine-bright', rgb: '248, 243, 43' },
      { primary: '#1a1a14', secondary: '#2a2a25', accent: '#95e1d3', name: 'mint-elegance', rgb: '149, 225, 211' },
      { primary: '#191014', secondary: '#2a1a25', accent: '#f38ba8', name: 'peony-blush', rgb: '243, 139, 168' },
      { primary: '#141a19', secondary: '#252a29', accent: '#74c0fc', name: 'azure-luxury', rgb: '116, 192, 252' },
      { primary: '#1a1414', secondary: '#2a2525', accent: '#ffd43b', name: 'topaz-glow', rgb: '255, 212, 59' },
      { primary: '#0f1a1a', secondary: '#1a2a2a', accent: '#b197fc', name: 'lavender-dusk', rgb: '177, 151, 252' },
      { primary: '#1a190f', secondary: '#2a291a', accent: '#69db7c', name: 'jade-prosperity', rgb: '105, 219, 124' },
      { primary: '#1a0f19', secondary: '#2a1a29', accent: '#f1faee', name: 'blush-elegance', rgb: '241, 250, 238' },
      { primary: '#0f1a0f', secondary: '#1a2a1a', accent: '#82c91e', name: 'peridot-fresh', rgb: '130, 201, 30' },
      { primary: '#1a1a1a', secondary: '#2a2a2a', accent: '#ffffff', name: 'classic-mono', rgb: '255, 255, 255' }
    ];
    
    this.currentPalette = this.luxuryPalettes[this.currentHour % this.luxuryPalettes.length];
    this.subscribers = [];
    
    this.init();
  }

  init() {
    // Update immediately
    this.updateGlobalScheme();
    
    // Set up hourly updates
    this.setupPeriodicUpdates();
    
    // Listen for manual updates
    this.setupEventListeners();
  }

  setupPeriodicUpdates() {
    // Check every minute for hour changes
    this.updateInterval = setInterval(() => {
      const newHour = new Date().getHours();
      if (newHour !== this.currentHour) {
        this.currentHour = newHour;
        this.currentPalette = this.luxuryPalettes[this.currentHour % this.luxuryPalettes.length];
        this.updateGlobalScheme();
        this.notifySubscribers();
      }
    }, 60000);
  }

  setupEventListeners() {
    // Listen for custom palette change events
    this.handlePaletteChange = (event) => {
      if (event.detail && event.detail.palette) {
        this.currentPalette = event.detail.palette;
        this.updateGlobalScheme();
        this.notifySubscribers();
      }
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('paletteChange', this.handlePaletteChange);
    }
  }

  updateGlobalScheme() {
    const root = document.documentElement;
    const body = document.body;
    
    // Update CSS custom properties
    root.style.setProperty('--global-primary', this.currentPalette.primary);
    root.style.setProperty('--global-secondary', this.currentPalette.secondary);
    root.style.setProperty('--global-accent', this.currentPalette.accent);
    root.style.setProperty('--global-accent-rgb', this.currentPalette.rgb);
    
    // Update liquid glass system variables
    root.style.setProperty('--liquid-accent-color', this.currentPalette.accent);
    root.style.setProperty('--liquid-accent-rgb', this.currentPalette.rgb);
    root.style.setProperty('--liquid-primary-bg', this.currentPalette.primary);
    root.style.setProperty('--liquid-secondary-bg', this.currentPalette.secondary);
    
    // Update data attribute for CSS targeting
    body.setAttribute('data-global-palette', this.currentPalette.name);
    
    // Update background
    body.style.background = `linear-gradient(135deg, ${this.currentPalette.primary} 0%, ${this.currentPalette.secondary} 100%)`;
    
    console.log(`Color scheme updated to: ${this.currentPalette.name}`);
  }

  getCurrentPalette() {
    return this.currentPalette;
  }

  setPalette(paletteNameOrIndex) {
    let newPalette;
    
    if (typeof paletteNameOrIndex === 'string') {
      newPalette = this.luxuryPalettes.find(p => p.name === paletteNameOrIndex);
    } else if (typeof paletteNameOrIndex === 'number') {
      newPalette = this.luxuryPalettes[paletteNameOrIndex % this.luxuryPalettes.length];
    }
    
    if (newPalette) {
      this.currentPalette = newPalette;
      this.updateGlobalScheme();
      this.notifySubscribers();
    }
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notifySubscribers() {
    this.subscribers.forEach(callback => {
      try {
        callback(this.currentPalette);
      } catch (error) {
        console.error('Error in color scheme subscriber:', error);
      }
    });
  }

  // Utility methods for components
  getAccentColor() {
    return this.currentPalette.accent;
  }

  getAccentRGB() {
    return this.currentPalette.rgb;
  }

  getPrimaryColor() {
    return this.currentPalette.primary;
  }

  getSecondaryColor() {
    return this.currentPalette.secondary;
  }

  getPaletteName() {
    return this.currentPalette.name;
  }

  // Method to sync with external palette changes (like from Hero component)
  syncWithHero(heroPalette) {
    if (heroPalette && heroPalette.accent !== this.currentPalette.accent) {
      // Find matching palette or use the provided one
      const matchingPalette = this.luxuryPalettes.find(p => p.accent === heroPalette.accent);
      if (matchingPalette) {
        this.currentPalette = matchingPalette;
      } else {
        // Create temporary palette from hero data
        this.currentPalette = {
          ...heroPalette,
          name: heroPalette.name?.toLowerCase().replace(' ', '-') || 'custom'
        };
      }
      this.updateGlobalScheme();
      this.notifySubscribers();
    }
  }

  // Cleanup method for component unmounting
  cleanup() {
    // Clear any intervals
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    
    // Clear subscribers
    this.subscribers = [];
    
    // Remove event listeners
    if (typeof window !== 'undefined') {
      window.removeEventListener('paletteChange', this.handlePaletteChange);
    }
    
    console.log('ColorSchemeManager cleaned up');
  }
}

// Create global instance
const colorSchemeManager = new ColorSchemeManager();

// Export for use in components
export default colorSchemeManager;

// Also make it available globally for debugging
if (typeof window !== 'undefined') {
  window.colorSchemeManager = colorSchemeManager;
}