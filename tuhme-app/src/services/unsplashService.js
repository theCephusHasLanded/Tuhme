// Using fetch API instead of axios to avoid dependency issues
// import axios from 'axios';

class UnsplashService {
  constructor() {
    this.baseURL = 'https://api.unsplash.com';
    this.accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
    this.defaultPerPage = 20;
    this.maxCacheAge = 3600000; // 1 hour in milliseconds
    
    // Initialize cache
    this.cache = new Map();
    
    // Fashion-related search terms
    this.fashionKeywords = [
      'luxury fashion',
      'designer clothing',
      'high-end retail',
      'fashion boutique',
      'designer accessories',
      'luxury handbags',
      'designer shoes',
      'fashion model',
      'runway fashion',
      'couture',
      'fashion week',
      'luxury store',
      'fashion photography',
      'elegant style',
      'premium fashion'
    ];

    // Configure default headers for fetch API
    this.defaultHeaders = {
      'Authorization': `Client-ID ${this.accessKey}`,
      'Accept-Version': 'v1',
      'Content-Type': 'application/json'
    };
  }

  // Fetch API helper method
  async makeRequest(endpoint, params = {}) {
    const url = new URL(`${this.baseURL}${endpoint}`);
    
    // Add query parameters
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key]);
      }
    });

    console.log(`Unsplash API request: GET ${url.toString()}`);

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.defaultHeaders
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Unsplash API error:', errorData);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error.message);
      throw error;
    }
  }

  // Cache management
  getCacheKey(endpoint, params) {
    return `${endpoint}_${JSON.stringify(params)}`;
  }

  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  getCache(key) {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    const isExpired = Date.now() - cached.timestamp > this.maxCacheAge;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  clearCache() {
    this.cache.clear();
    console.log('Unsplash cache cleared');
  }

  // Core API methods
  async searchPhotos(query, options = {}) {
    try {
      const params = {
        query,
        per_page: options.perPage || this.defaultPerPage,
        page: options.page || 1,
        orientation: options.orientation || 'portrait',
        content_filter: 'high',
        order_by: 'relevant',
        ...options
      };

      const cacheKey = this.getCacheKey('search', params);
      const cached = this.getCache(cacheKey);
      if (cached) {
        console.log('Returning cached search results for:', query);
        return cached;
      }

      const data = await this.makeRequest('/search/photos', params);
      const processedData = this.processSearchResults(data);
      
      this.setCache(cacheKey, processedData);
      console.log(`Found ${processedData.results.length} photos for query: "${query}"`);
      
      return processedData;
    } catch (error) {
      console.error('Error searching photos:', error);
      throw new Error(`Failed to search photos: ${error.message}`);
    }
  }

  async getFashionPhotos(options = {}) {
    try {
      const randomKeyword = this.fashionKeywords[
        Math.floor(Math.random() * this.fashionKeywords.length)
      ];
      
      return await this.searchPhotos(randomKeyword, {
        per_page: options.perPage || 12,
        orientation: 'portrait',
        ...options
      });
    } catch (error) {
      console.error('Error getting fashion photos:', error);
      throw error;
    }
  }

  async getCuratedFashionCollection() {
    try {
      const collections = await Promise.all([
        this.searchPhotos('luxury fashion', { per_page: 6, orientation: 'portrait' }),
        this.searchPhotos('designer clothing', { per_page: 6, orientation: 'portrait' }),
        this.searchPhotos('fashion boutique', { per_page: 6, orientation: 'portrait' }),
        this.searchPhotos('designer accessories', { per_page: 6, orientation: 'portrait' })
      ]);

      const allPhotos = collections.flatMap(collection => collection.results);
      
      // Shuffle and deduplicate
      const uniquePhotos = this.deduplicatePhotos(allPhotos);
      const shuffledPhotos = this.shuffleArray(uniquePhotos);

      return {
        results: shuffledPhotos.slice(0, 20),
        total: shuffledPhotos.length,
        total_pages: Math.ceil(shuffledPhotos.length / 20)
      };
    } catch (error) {
      console.error('Error getting curated fashion collection:', error);
      throw error;
    }
  }

  async getPhotoById(photoId) {
    try {
      const cacheKey = this.getCacheKey('photo', { id: photoId });
      const cached = this.getCache(cacheKey);
      if (cached) {
        return cached;
      }

      const data = await this.makeRequest(`/photos/${photoId}`);
      const photo = this.processPhoto(data);
      
      this.setCache(cacheKey, photo);
      return photo;
    } catch (error) {
      console.error('Error getting photo by ID:', error);
      throw new Error(`Failed to get photo: ${error.message}`);
    }
  }

  async downloadPhoto(photoId) {
    try {
      // Trigger download tracking (required by Unsplash API)
      await this.makeRequest(`/photos/${photoId}/download`);
      console.log('Photo download tracked:', photoId);
    } catch (error) {
      console.error('Error tracking photo download:', error);
      // Don't throw error as this is just for tracking
    }
  }

  // Photo processing and optimization
  processSearchResults(data) {
    return {
      ...data,
      results: data.results.map(photo => this.processPhoto(photo))
    };
  }

  processPhoto(photo) {
    return {
      id: photo.id,
      created_at: photo.created_at,
      updated_at: photo.updated_at,
      width: photo.width,
      height: photo.height,
      color: photo.color,
      blur_hash: photo.blur_hash,
      description: photo.description,
      alt_description: photo.alt_description,
      urls: {
        raw: photo.urls.raw,
        full: photo.urls.full,
        regular: photo.urls.regular,
        small: photo.urls.small,
        thumb: photo.urls.thumb,
        small_s3: photo.urls.small_s3
      },
      links: photo.links,
      user: {
        id: photo.user.id,
        username: photo.user.username,
        name: photo.user.name,
        profile_image: photo.user.profile_image,
        links: photo.user.links
      },
      likes: photo.likes,
      downloads: photo.downloads,
      // Generate optimized URLs for different screen sizes
      optimized: this.generateOptimizedUrls(photo)
    };
  }

  generateOptimizedUrls(photo) {
    const baseUrl = photo.urls.raw;
    
    return {
      thumbnail: `${baseUrl}&w=300&h=400&fit=crop&crop=faces`,
      small: `${baseUrl}&w=400&h=600&fit=crop&crop=faces`,
      medium: `${baseUrl}&w=600&h=800&fit=crop&crop=faces`,
      large: `${baseUrl}&w=800&h=1200&fit=crop&crop=faces`,
      hero: `${baseUrl}&w=1200&h=800&fit=crop&crop=faces`,
      // Mobile optimized
      mobile_thumb: `${baseUrl}&w=200&h=300&fit=crop&crop=faces&dpr=2`,
      mobile_small: `${baseUrl}&w=300&h=450&fit=crop&crop=faces&dpr=2`,
      // Retina optimized
      retina_thumb: `${baseUrl}&w=600&h=800&fit=crop&crop=faces&dpr=2`,
      retina_small: `${baseUrl}&w=800&h=1200&fit=crop&crop=faces&dpr=2`
    };
  }

  // Utility methods
  deduplicatePhotos(photos) {
    const seen = new Set();
    return photos.filter(photo => {
      if (seen.has(photo.id)) {
        return false;
      }
      seen.add(photo.id);
      return true;
    });
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Generate srcSet for responsive images
  generateSrcSet(photo) {
    const optimized = photo.optimized;
    return [
      `${optimized.small} 400w`,
      `${optimized.medium} 600w`,
      `${optimized.large} 800w`,
      `${optimized.retina_small} 1200w`,
      `${optimized.retina_thumb} 1600w`
    ].join(', ');
  }

  // Generate sizes attribute for responsive images
  generateSizes(breakpoints = {}) {
    const defaultBreakpoints = {
      mobile: '(max-width: 768px) 100vw',
      tablet: '(max-width: 1024px) 50vw',
      desktop: '33vw'
    };
    
    const sizes = { ...defaultBreakpoints, ...breakpoints };
    return Object.values(sizes).join(', ');
  }

  // Create responsive image component props
  createResponsiveImageProps(photo, options = {}) {
    return {
      src: options.defaultSize ? photo.optimized[options.defaultSize] : photo.urls.regular,
      srcSet: this.generateSrcSet(photo),
      sizes: this.generateSizes(options.breakpoints),
      alt: photo.alt_description || photo.description || 'Fashion photography',
      loading: options.loading || 'lazy',
      blurDataURL: this.generateBlurDataURL(photo),
      width: photo.width,
      height: photo.height,
      style: {
        backgroundColor: photo.color,
        aspectRatio: `${photo.width} / ${photo.height}`
      }
    };
  }

  generateBlurDataURL(photo) {
    if (photo.blur_hash) {
      // You would need a blur-hash library to decode this
      // For now, return a solid color placeholder
      return `data:image/svg+xml;base64,${btoa(
        `<svg width="${photo.width}" height="${photo.height}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="${photo.color}"/>
        </svg>`
      )}`;
    }
    return null;
  }

  // Fashion-specific collections
  async getHeroBannerPhotos() {
    try {
      return await this.searchPhotos('luxury fashion model', {
        per_page: 5,
        orientation: 'landscape'
      });
    } catch (error) {
      console.error('Error getting hero banner photos:', error);
      throw error;
    }
  }

  async getProductCategoryPhotos(category) {
    const categoryKeywords = {
      'dresses': 'designer dresses fashion',
      'accessories': 'luxury accessories fashion',
      'shoes': 'designer shoes fashion',
      'bags': 'luxury handbags fashion',
      'jewelry': 'luxury jewelry fashion',
      'suits': 'designer suits fashion',
      'casual': 'casual luxury fashion',
      'evening': 'evening wear fashion'
    };

    const keyword = categoryKeywords[category] || 'luxury fashion';
    
    try {
      return await this.searchPhotos(keyword, {
        per_page: 8,
        orientation: 'portrait'
      });
    } catch (error) {
      console.error(`Error getting ${category} photos:`, error);
      throw error;
    }
  }

  async getStoreAmbientPhotos() {
    try {
      return await this.searchPhotos('luxury retail store interior', {
        per_page: 10,
        orientation: 'landscape'
      });
    } catch (error) {
      console.error('Error getting store ambient photos:', error);
      throw error;
    }
  }

  // Rate limiting and error handling
  async rateLimitedRequest(requestFn, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
      try {
        return await requestFn();
      } catch (error) {
        if (error.response?.status === 429 && i < retries - 1) {
          console.log(`Rate limited, retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2; // Exponential backoff
          continue;
        }
        throw error;
      }
    }
  }

  // Health check
  async testConnection() {
    try {
      const data = await this.makeRequest('/photos/random', { count: 1 });
      console.log('Unsplash connection successful');
      return { connected: true, photo: Array.isArray(data) ? data[0] : data };
    } catch (error) {
      console.error('Unsplash connection failed:', error);
      return { connected: false, error: error.message };
    }
  }

  // Analytics and tracking
  trackPhotoView(photoId) {
    try {
      // Track photo view for analytics
      console.log('Photo viewed:', photoId);
      
      // You can implement analytics tracking here
      // Example: Google Analytics, custom analytics service, etc.
    } catch (error) {
      console.error('Error tracking photo view:', error);
    }
  }

  trackPhotoInteraction(photoId, interaction) {
    try {
      console.log(`Photo ${interaction}:`, photoId);
      
      // Track photo interactions (click, like, share, etc.)
      // Implementation depends on your analytics setup
    } catch (error) {
      console.error('Error tracking photo interaction:', error);
    }
  }
}

// Export singleton instance
export default new UnsplashService();