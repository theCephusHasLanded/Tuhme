import { useState, useEffect, useCallback } from 'react';
import UnsplashService from '../services/unsplashService';

const useHourlyImage = (options = {}) => {
  const [currentImage, setCurrentImage] = useState(null);
  const [imageQueue, setImageQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const {
    category = 'luxury fashion',
    cacheSize = 24, // Cache 24 images (one per hour for a day)
    fallbackImage = null,
    onImageChange = null,
    preloadNext = true
  } = options;

  // Generate time-based seed for consistent hourly rotation
  const getCurrentHourSeed = useCallback(() => {
    const now = new Date();
    const hoursSinceEpoch = Math.floor(now.getTime() / (1000 * 60 * 60));
    return hoursSinceEpoch;
  }, []);

  // Get deterministic image index based on current hour
  const getHourlyImageIndex = useCallback((queueLength) => {
    if (queueLength === 0) return 0;
    const hourSeed = getCurrentHourSeed();
    return hourSeed % queueLength;
  }, [getCurrentHourSeed]);

  // Fetch luxury fashion images from Unsplash
  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if Unsplash API key is available
      if (!import.meta.env.VITE_UNSPLASH_ACCESS_KEY || import.meta.env.VITE_UNSPLASH_ACCESS_KEY === 'your_unsplash_access_key_here') {
        console.warn('Unsplash API key not configured, using fallback images');
        
        // Use curated fallback images for demonstration
        const fallbackImages = [
          {
            id: 'fallback-1',
            urls: {
              regular: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800',
            },
            optimized: {
              hero: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800'
            },
            alt_description: 'Luxury fashion model'
          },
          {
            id: 'fallback-2',
            urls: {
              regular: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800',
            },
            optimized: {
              hero: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800'
            },
            alt_description: 'High-end fashion photography'
          },
          {
            id: 'fallback-3',
            urls: {
              regular: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800',
            },
            optimized: {
              hero: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800'
            },
            alt_description: 'Luxury retail store'
          }
        ];

        setImageQueue(fallbackImages);
        const initialIndex = getHourlyImageIndex(fallbackImages.length);
        setCurrentImage(fallbackImages[initialIndex]);
        setLastUpdated(new Date());

        if (onImageChange) {
          onImageChange(fallbackImages[initialIndex]);
        }

        console.log('Using fallback luxury fashion images');
        return;
      }

      // Use different search terms for variety
      const searchTerms = [
        'luxury fashion model',
        'high-end fashion photography',
        'designer clothing portrait',
        'fashion boutique elegant',
        'luxury accessories lifestyle',
        'designer fashion editorial',
        'high fashion photography',
        'luxury retail fashion'
      ];

      const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
      
      const response = await UnsplashService.searchPhotos(randomTerm, {
        per_page: cacheSize,
        orientation: 'landscape', // Better for hero backgrounds
        content_filter: 'high',
        order_by: 'relevant'
      });

      if (response.results && response.results.length > 0) {
        setImageQueue(response.results);
        
        // Set initial image based on current hour
        const initialIndex = getHourlyImageIndex(response.results.length);
        const initialImage = response.results[initialIndex];
        setCurrentImage(initialImage);
        setLastUpdated(new Date());

        // Preload next image if enabled
        if (preloadNext && response.results.length > 1) {
          const nextIndex = (initialIndex + 1) % response.results.length;
          const nextImage = response.results[nextIndex];
          preloadImage(nextImage.optimized?.hero || nextImage.urls.regular);
        }

        // Trigger callback if provided
        if (onImageChange) {
          onImageChange(initialImage);
        }

        console.log(`Loaded ${response.results.length} hourly hero images from Unsplash`);
      } else {
        throw new Error('No images found from Unsplash API');
      }
    } catch (err) {
      console.error('Failed to fetch hourly images:', err);
      setError(err.message);
      
      // Use fallback image if provided
      if (fallbackImage) {
        setCurrentImage({ urls: { regular: fallbackImage } });
      } else {
        // Use default fallback
        const defaultFallback = {
          id: 'default-fallback',
          urls: {
            regular: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800'
          },
          optimized: {
            hero: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800'
          },
          alt_description: 'Luxury fashion'
        };
        setCurrentImage(defaultFallback);
      }
    } finally {
      setLoading(false);
    }
  }, [category, cacheSize, fallbackImage, getHourlyImageIndex, onImageChange, preloadNext]);

  // Preload image for better performance
  const preloadImage = useCallback((src) => {
    if (typeof window !== 'undefined') {
      const img = new Image();
      img.src = src;
    }
  }, []);

  // Update image based on current hour
  const updateImageForCurrentHour = useCallback(() => {
    if (imageQueue.length === 0) return;

    const currentIndex = getHourlyImageIndex(imageQueue.length);
    const newImage = imageQueue[currentIndex];
    
    if (!currentImage || currentImage.id !== newImage.id) {
      setCurrentImage(newImage);
      setLastUpdated(new Date());

      // Preload next hour's image
      if (preloadNext) {
        const nextIndex = (currentIndex + 1) % imageQueue.length;
        const nextImage = imageQueue[nextIndex];
        preloadImage(nextImage.optimized?.hero || nextImage.urls.regular);
      }

      // Trigger callback
      if (onImageChange) {
        onImageChange(newImage);
      }

      console.log(`Updated hero image for hour ${getCurrentHourSeed()}`);
    }
  }, [imageQueue, currentImage, getHourlyImageIndex, getCurrentHourSeed, preloadNext, onImageChange]);

  // Check if we need to refresh the image queue (daily refresh)
  const shouldRefreshQueue = useCallback(() => {
    if (!lastUpdated) return true;
    
    const now = new Date();
    const hoursSinceUpdate = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);
    
    // Refresh queue every 24 hours
    return hoursSinceUpdate >= 24;
  }, [lastUpdated]);

  // Manual refresh function
  const refreshImages = useCallback(async () => {
    console.log('Manually refreshing hero images...');
    await fetchImages();
  }, [fetchImages]);

  // Force next image (for testing or manual control)
  const nextImage = useCallback(() => {
    if (imageQueue.length === 0) return;
    
    const currentIndex = imageQueue.findIndex(img => img.id === currentImage?.id);
    const nextIndex = (currentIndex + 1) % imageQueue.length;
    const newImage = imageQueue[nextIndex];
    
    setCurrentImage(newImage);
    setLastUpdated(new Date());
    
    if (onImageChange) {
      onImageChange(newImage);
    }
  }, [imageQueue, currentImage, onImageChange]);

  // Get image URL with optimization
  const getOptimizedImageUrl = useCallback((size = 'hero') => {
    if (!currentImage) return null;
    
    if (currentImage.optimized && currentImage.optimized[size]) {
      return currentImage.optimized[size];
    }
    
    // Fallback to standard URLs
    return currentImage.urls.regular;
  }, [currentImage]);

  // Initial load
  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Set up hourly check interval
  useEffect(() => {
    const checkInterval = setInterval(() => {
      if (shouldRefreshQueue()) {
        console.log('Refreshing image queue after 24 hours...');
        fetchImages();
      } else {
        updateImageForCurrentHour();
      }
    }, 60000); // Check every minute

    return () => clearInterval(checkInterval);
  }, [shouldRefreshQueue, fetchImages, updateImageForCurrentHour]);

  // Check on window focus (in case tab was inactive)
  useEffect(() => {
    const handleFocus = () => {
      if (shouldRefreshQueue()) {
        fetchImages();
      } else {
        updateImageForCurrentHour();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [shouldRefreshQueue, fetchImages, updateImageForCurrentHour]);

  return {
    currentImage,
    loading,
    error,
    lastUpdated,
    queueSize: imageQueue.length,
    refreshImages,
    nextImage,
    getOptimizedImageUrl,
    // Utility functions
    getCurrentHour: getCurrentHourSeed,
    // Debug info
    imageQueue: import.meta.env.DEV ? imageQueue : undefined
  };
};

export default useHourlyImage;