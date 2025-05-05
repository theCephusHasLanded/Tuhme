import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

/**
 * Hero Section Component
 * Full-screen carousel with minimal 3-5 word headlines overlaid on high-contrast photography
 */
const Hero = ({ slides }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Default slides if none provided
  const defaultSlides = [
    {
      id: 1,
      headline: 'Try before you buy',
      subline: 'Designer garments delivered to your door. Keep what you love, return the rest.',
      image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&q=80&w=1800&h=1000',
      cta: {
        text: 'Discover How',
        url: '/how-it-works'
      },
      alignment: 'left'
    },
    {
      id: 2,
      headline: 'Manhattan\'s Finest Delivered',
      subline: 'Curated pieces from exclusive boutiques, brought directly to your home.',
      image: 'https://images.unsplash.com/photo-1604584584795-86a47bcfcbff?auto=format&fit=crop&q=80&w=1800&h=1000',
      cta: {
        text: 'Browse Stores',
        url: '/store-locator'
      },
      alignment: 'center'
    },
    {
      id: 3,
      headline: 'Personal Shopping, Reimagined',
      subline: 'AI-assisted discovery with human expert curation. The best of both worlds.',
      image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&q=80&w=1800&h=1000',
      cta: {
        text: 'Meet Savi',
        url: '#',
        action: 'openSavi'
      },
      alignment: 'right'
    }
  ];
  
  const heroSlides = slides || defaultSlides;
  
  // Advance to next slide
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
      setIsTransitioning(false);
    }, 500);
  }, [heroSlides.length, isTransitioning]);
  
  // Go to previous slide
  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex === 0 ? heroSlides.length - 1 : prevIndex - 1));
      setIsTransitioning(false);
    }, 500);
  }, [heroSlides.length, isTransitioning]);
  
  // Jump to a specific slide
  const goToSlide = (index) => {
    if (isTransitioning || index === activeIndex) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, 500);
  };
  
  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [nextSlide]);
  
  // Handle CTA click
  const handleCtaClick = (e, slide) => {
    if (slide.cta.action === 'openSavi') {
      e.preventDefault();
      // Dispatch an event to open Savi assistant
      const event = new CustomEvent('openSavi');
      window.dispatchEvent(event);
    }
  };
  
  return (
    <section className="hero" aria-label="Featured highlights">
      <div className="hero__carousel">
        {heroSlides.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`hero__slide ${index === activeIndex ? 'hero__slide--active' : ''}`}
            aria-hidden={index !== activeIndex}
          >
            <div className="hero__image-container">
              <img src={slide.image} alt="" className="hero__image" />
            </div>
            <div className="hero__overlay"></div>
            <div className={`hero__content hero__content--${slide.alignment}`}>
              <h1 className="hero__headline">{slide.headline}</h1>
              <p className="hero__subline">{slide.subline}</p>
              <div className="hero__cta">
                <Link 
                  to={slide.cta.url} 
                  className="hero__cta-btn"
                  onClick={(e) => handleCtaClick(e, slide)}
                >
                  {slide.cta.text}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="hero__pagination">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            className={`hero__pagination-dot ${index === activeIndex ? 'hero__pagination-dot--active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === activeIndex}
          ></button>
        ))}
      </div>
      
      <button className="hero__nav hero__nav--prev" onClick={prevSlide} aria-label="Previous slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      <button className="hero__nav hero__nav--next" onClick={nextSlide} aria-label="Next slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </section>
  );
};

export default Hero;