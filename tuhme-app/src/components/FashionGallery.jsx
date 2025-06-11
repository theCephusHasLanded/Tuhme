import { useState, useEffect, useCallback, useRef } from 'react';
import unsplashService from '../services/unsplashService.js';

const FashionGallery = ({ category = 'fashion', maxPhotos = 20 }) => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [viewMode, setViewMode] = useState('masonry'); // 'masonry', 'grid', 'carousel'
  const [error, setError] = useState(null);
  const galleryRef = useRef(null);
  const observerRef = useRef(null);

  const loadPhotos = useCallback(async (page = 1, reset = false) => {
    try {
      setIsLoading(true);
      setError(null);

      let photoData;
      if (category === 'curated') {
        photoData = await unsplashService.getCuratedFashionCollection();
      } else if (category === 'hero') {
        photoData = await unsplashService.getHeroBannerPhotos();
      } else {
        photoData = await unsplashService.getFashionPhotos({
          page,
          perPage: 12
        });
      }

      if (reset) {
        setPhotos(photoData.results);
      } else {
        setPhotos(prev => [...prev, ...photoData.results]);
      }

      setHasMore(photoData.results.length > 0 && page < photoData.total_pages);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error loading photos:', error);
      setError('Failed to load photos. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  useEffect(() => {
    loadPhotos(1, true);
  }, [loadPhotos]);

  // Infinite scroll implementation
  const lastPhotoElementRef = useCallback(node => {
    if (isLoading) return;
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadPhotos(currentPage + 1, false);
      }
    });
    
    if (node) observerRef.current.observe(node);
  }, [isLoading, hasMore, currentPage, loadPhotos]);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
    unsplashService.trackPhotoView(photo.id);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'unset';
  };

  const handleDownload = async (photo) => {
    try {
      await unsplashService.downloadPhoto(photo.id);
      unsplashService.trackPhotoInteraction(photo.id, 'download');
      
      // Create download link
      const link = document.createElement('a');
      link.href = photo.urls.full;
      link.download = `tuhme-fashion-${photo.id}.jpg`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading photo:', error);
    }
  };

  const renderMasonryGrid = () => (
    <div className="masonry-grid">
      {photos.map((photo, index) => {
        const isLastPhoto = index === photos.length - 1;
        const imageProps = unsplashService.createResponsiveImageProps(photo, {
          defaultSize: 'medium',
          loading: index < 6 ? 'eager' : 'lazy'
        });

        return (
          <div
            key={photo.id}
            ref={isLastPhoto ? lastPhotoElementRef : null}
            className="masonry-item"
            onClick={() => handlePhotoClick(photo)}
          >
            <div className="photo-container">
              <img
                {...imageProps}
                className="gallery-image"
                onLoad={() => unsplashService.trackPhotoView(photo.id)}
              />
              <div className="photo-overlay">
                <div className="photo-info">
                  <p className="photo-description">
                    {photo.description || photo.alt_description || 'Fashion inspiration'}
                  </p>
                  <div className="photo-meta">
                    <span className="photo-likes">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 14s6-5 6-9a4 4 0 0 0-8 0 4 4 0 0 0-8 0c0 4 6 9 6 9z" fill="currentColor"/>
                      </svg>
                      {photo.likes}
                    </span>
                    <span className="photo-downloads">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1v10M4 7l4 4 4-4M2 14h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      {photo.downloads || 0}
                    </span>
                  </div>
                </div>
                <div className="photo-actions">
                  <button 
                    className="action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(photo);
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1v10M4 7l4 4 4-4M2 14h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <button 
                    className="action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(photo.user.links.html, '_blank');
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M5.5 9.5L8 7l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderRegularGrid = () => (
    <div className="regular-grid">
      {photos.map((photo, index) => {
        const isLastPhoto = index === photos.length - 1;
        const imageProps = unsplashService.createResponsiveImageProps(photo, {
          defaultSize: 'small',
          loading: index < 8 ? 'eager' : 'lazy'
        });

        return (
          <div
            key={photo.id}
            ref={isLastPhoto ? lastPhotoElementRef : null}
            className="grid-item"
            onClick={() => handlePhotoClick(photo)}
          >
            <div className="photo-container">
              <img
                {...imageProps}
                className="gallery-image"
              />
              <div className="photo-overlay">
                <div className="photo-info">
                  <p className="photo-description">
                    {photo.description || photo.alt_description}
                  </p>
                  <div className="photographer">
                    by {photo.user.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderCarousel = () => (
    <div className="carousel-container">
      <div className="carousel-track">
        {photos.map((photo, index) => {
          const imageProps = unsplashService.createResponsiveImageProps(photo, {
            defaultSize: 'large',
            loading: 'lazy'
          });

          return (
            <div
              key={photo.id}
              className="carousel-item"
              onClick={() => handlePhotoClick(photo)}
            >
              <img
                {...imageProps}
                className="carousel-image"
              />
              <div className="carousel-info">
                <h4>{photo.description || 'Fashion Inspiration'}</h4>
                <p>by {photo.user.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="gallery-error">
        <div className="error-content">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2"/>
            <path d="M22 22l20 20M42 22l-20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <h3>Unable to load gallery</h3>
          <p>{error}</p>
          <button 
            className="retry-btn"
            onClick={() => loadPhotos(1, true)}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="fashion-gallery">
      <div className="gallery-header">
        <div className="header-content">
          <h2>Fashion Inspiration</h2>
          <p>Curated high-fashion photography to inspire your next shopping adventure</p>
        </div>
        
        <div className="gallery-controls">
          <div className="view-mode-selector">
            <button 
              className={`view-btn ${viewMode === 'masonry' ? 'active' : ''}`}
              onClick={() => setViewMode('masonry')}
              title="Masonry Grid"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="2" width="6" height="8" fill="currentColor"/>
                <rect x="12" y="2" width="6" height="5" fill="currentColor"/>
                <rect x="2" y="12" width="6" height="6" fill="currentColor"/>
                <rect x="12" y="9" width="6" height="9" fill="currentColor"/>
              </svg>
            </button>
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Regular Grid"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="2" width="6" height="6" fill="currentColor"/>
                <rect x="12" y="2" width="6" height="6" fill="currentColor"/>
                <rect x="2" y="12" width="6" height="6" fill="currentColor"/>
                <rect x="12" y="12" width="6" height="6" fill="currentColor"/>
              </svg>
            </button>
            <button 
              className={`view-btn ${viewMode === 'carousel' ? 'active' : ''}`}
              onClick={() => setViewMode('carousel')}
              title="Carousel"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="1" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="6" cy="10" r="1" fill="currentColor"/>
                <circle cx="10" cy="10" r="1" fill="currentColor"/>
                <circle cx="14" cy="10" r="1" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="gallery-content" ref={galleryRef}>
        {viewMode === 'masonry' && renderMasonryGrid()}
        {viewMode === 'grid' && renderRegularGrid()}
        {viewMode === 'carousel' && renderCarousel()}

        {isLoading && (
          <div className="gallery-loading">
            <div className="loading-grid">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="loading-skeleton photo-skeleton"></div>
              ))}
            </div>
          </div>
        )}

        {!hasMore && photos.length > 0 && (
          <div className="gallery-end">
            <p>You've reached the end of our curated collection</p>
            <button 
              className="refresh-btn"
              onClick={() => loadPhotos(1, true)}
            >
              Load New Photos
            </button>
          </div>
        )}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="photo-modal" onClick={closeModal}>
          <div className="modal-backdrop" />
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="modal-image-container">
              <img
                src={selectedPhoto.urls.regular}
                alt={selectedPhoto.alt_description || 'Fashion photography'}
                className="modal-image"
              />
            </div>

            <div className="modal-info">
              <div className="photo-details">
                <h3>{selectedPhoto.description || 'Fashion Inspiration'}</h3>
                {selectedPhoto.alt_description && (
                  <p className="photo-alt">{selectedPhoto.alt_description}</p>
                )}
                
                <div className="photographer-info">
                  <img 
                    src={selectedPhoto.user.profile_image.medium}
                    alt={selectedPhoto.user.name}
                    className="photographer-avatar"
                  />
                  <div>
                    <p className="photographer-name">Photo by {selectedPhoto.user.name}</p>
                    <a 
                      href={selectedPhoto.user.links.html}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="photographer-link"
                    >
                      View Profile on Unsplash
                    </a>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  className="modal-action-btn primary"
                  onClick={() => handleDownload(selectedPhoto)}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 1v14M4 11l6 6 6-6M2 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Download
                </button>
                
                <button 
                  className="modal-action-btn secondary"
                  onClick={() => window.open(selectedPhoto.links.html, '_blank')}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M1 10h18M10 1s4 4 4 9-4 9-4 9M10 1s-4 4-4 9 4 9 4 9" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  View on Unsplash
                </button>

                <button 
                  className="modal-action-btn secondary"
                  onClick={() => {
                    const whatsappMessage = encodeURIComponent(
                      `I love this fashion inspiration! Can you help me find similar items? ${selectedPhoto.links.html}`
                    );
                    const whatsappLink = `https://wa.me/16465889916?text=${whatsappMessage}`;
                    window.open(whatsappLink, '_blank');
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 1C5 1 1 5 1 10c0 1.5 0.5 3 1.5 4L1 19l5-1.5C7 18.5 8.5 19 10 19c5 0 9-4 9-9s-4-9-9-9z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M7 9c0-1 1-2 2-2h2c1 0 2 1 2 2v2c0 1-1 2-2 2H9c-1 0-2-1-2-2V9z" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  Shop Similar
                </button>
              </div>

              <div className="photo-metadata">
                <div className="metadata-item">
                  <span className="metadata-label">Likes</span>
                  <span className="metadata-value">{selectedPhoto.likes}</span>
                </div>
                <div className="metadata-item">
                  <span className="metadata-label">Downloads</span>
                  <span className="metadata-value">{selectedPhoto.downloads || 0}</span>
                </div>
                <div className="metadata-item">
                  <span className="metadata-label">Dimensions</span>
                  <span className="metadata-value">{selectedPhoto.width} × {selectedPhoto.height}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FashionGallery;