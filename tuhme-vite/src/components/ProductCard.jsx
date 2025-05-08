import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Product Card Component
 * Asymmetrical cards with 4:5 aspect ratio imagery floating above invisible boundaries
 */
const ProductCard = ({ 
  product, 
  onAddToCart, 
  onAddToFavorites, 
  isScreenshot = false,
  featured = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Format price with proper commas and decimals
  const formatPrice = (price) => {
    if (!price) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };
  
  // Determine the product status badge
  const getStatusBadge = () => {
    if (!product.status) return null;
    
    switch (product.status) {
      case 'sale':
        return <span className="product-card__status product-card__status--sale">Sale</span>;
      case 'new':
        return <span className="product-card__status product-card__status--new">New</span>;
      case 'limited':
        return <span className="product-card__status product-card__status--limited">Limited</span>;
      case 'premium':
        return <span className="product-card__status product-card__status--premium">Premium</span>;
      default:
        return null;
    }
  };
  
  // Handle adding to cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };
  
  // Handle adding to favorites
  const handleAddToFavorites = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToFavorites) {
      onAddToFavorites(product);
    }
  };
  
  return (
    <Link 
      to={`/product/${product.id}`} 
      className={`product-card ${isScreenshot ? 'product-card--screenshot' : ''} ${featured ? 'product-card--featured' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`${product.brand} ${product.name}, ${formatPrice(product.price)}`}
    >
      <div className="product-card__image-container">
        {getStatusBadge()}
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-card__image"
          loading="lazy"
        />
      </div>
      
      <div className="product-card__details">
        <div className="product-card__brand">{product.brand}</div>
        <div className="product-card__name">{product.name}</div>
        <div className="product-card__price">
          {product.originalPrice && product.originalPrice > product.price ? (
            <>
              <span className="product-card__price--original">{formatPrice(product.originalPrice)}</span>
              <span className="product-card__price--sale">{formatPrice(product.price)}</span>
            </>
          ) : (
            <span>{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
      
      <div className="product-card__actions">
        <button 
          className="product-card__action-btn" 
          onClick={handleAddToCart}
          aria-label={`Add ${product.name} to cart`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <button 
          className="product-card__action-btn" 
          onClick={handleAddToFavorites}
          aria-label={`Add ${product.name} to favorites`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6054C22.3095 9.93793 22.4518 9.22252 22.4518 8.5C22.4518 7.77748 22.3095 7.06206 22.0329 6.39464C21.7563 5.72723 21.351 5.12085 20.84 4.61V4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </Link>
  );
};

// Product Grid Component
export const ProductGrid = ({ products, onAddToCart, onAddToFavorites, featuredIndex }) => {
  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onAddToFavorites={onAddToFavorites}
          featured={index === featuredIndex}
        />
      ))}
    </div>
  );
};

export default ProductCard;