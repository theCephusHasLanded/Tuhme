import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Navigation Component
 * Hidden top-bar that elegantly slides down on scroll-up or icon tap
 */
const Navigation = ({ cartItemsCount = 0, onCartOpen, onSaviOpen }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [categoryItems] = useState([
    { id: 'clothing', name: 'Clothing', href: '/category/clothing' },
    { id: 'accessories', name: 'Accessories', href: '/category/accessories' },
    { id: 'shoes', name: 'Shoes', href: '/category/shoes' },
    { id: 'bags', name: 'Bags', href: '/category/bags' },
    { id: 'jewelry', name: 'Jewelry', href: '/category/jewelry' },
    { id: 'new-arrivals', name: 'New Arrivals', href: '/new-arrivals' },
    { id: 'trending', name: 'Trending', href: '/trending' },
    { id: 'sale', name: 'Sale', href: '/sale' },
  ]);
  
  const location = useLocation();
  const navRef = useRef(null);
  
  // Handle scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Show navigation when scrolling up or at the top
      if (scrollTop < lastScrollTop || scrollTop <= 0) {
        setIsVisible(true);
      } else {
        // Hide only when scrolling down, not at the top of the page
        if (scrollTop > 100) {
          setIsVisible(false);
        }
      }
      
      // Close mobile menu when scrolling
      if (isMobileMenuOpen && Math.abs(scrollTop - lastScrollTop) > 30) {
        setIsMobileMenuOpen(false);
      }
      
      setLastScrollTop(scrollTop);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop, isMobileMenuOpen]);
  
  // Show navigation on initial load after a brief delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Handle category navigation
  const handleCategoryClick = (e, id) => {
    // Handle category click logic here
    console.log(`Category clicked: ${id}`);
  };
  
  // Check if a link is active
  const isActiveLink = (path) => {
    return location.pathname === path;
  };
  
  // Get active category
  const getActiveCategory = () => {
    const currentPath = location.pathname;
    
    if (currentPath.includes('/category/')) {
      const categoryId = currentPath.split('/category/')[1];
      return categoryId;
    }
    
    return null;
  };
  
  return (
    <>
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-to-content focus-visible">
        Skip to content
      </a>
      
      {/* Main navigation */}
      <nav 
        ref={navRef}
        className={`navigation ${isVisible ? 'navigation--visible' : ''}`}
        aria-label="Main navigation"
      >
        <div className="navigation__container">
          <Link to="/" className="navigation__logo">
            <img src="/tuhme-logo.png" alt="TUHME" />
          </Link>
          
          <ul className="navigation__menu">
            <li className="navigation__menu-item">
              <Link 
                to="/" 
                className={`navigation__menu-link ${isActiveLink('/') ? 'navigation__menu-link--active' : ''}`}
              >
                HOME
              </Link>
            </li>
            <li className="navigation__menu-item">
              <Link 
                to="/how-it-works" 
                className={`navigation__menu-link ${isActiveLink('/how-it-works') ? 'navigation__menu-link--active' : ''}`}
              >
                HOW IT WORKS
              </Link>
            </li>
            <li className="navigation__menu-item">
              <Link 
                to="/store-locator" 
                className={`navigation__menu-link ${isActiveLink('/store-locator') ? 'navigation__menu-link--active' : ''}`}
              >
                STORES
              </Link>
            </li>
            <li className="navigation__menu-item">
              <Link 
                to="/membership" 
                className={`navigation__menu-link ${isActiveLink('/membership') ? 'navigation__menu-link--active' : ''}`}
              >
                MEMBERSHIP
              </Link>
            </li>
            <li className="navigation__menu-item">
              <Link 
                to="/my-account" 
                className={`navigation__menu-link ${isActiveLink('/my-account') ? 'navigation__menu-link--active' : ''}`}
              >
                ACCOUNT
              </Link>
            </li>
          </ul>
          
          <div className="navigation__actions">
            <button 
              className="navigation__action-btn"
              onClick={onSaviOpen}
              aria-label="Open Savi Assistant"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.5 8.25L12 15.75L4.5 8.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button 
              className="navigation__action-btn"
              onClick={onCartOpen}
              aria-label={`Open cart with ${cartItemsCount} items`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              
              {cartItemsCount > 0 && (
                <span className="navigation__action-count">{cartItemsCount}</span>
              )}
            </button>
            
            <button 
              className={`navigation__mobile-toggle ${isMobileMenuOpen ? 'navigation__mobile-toggle--active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile navigation overlay */}
      <div className={`navigation__mobile ${isMobileMenuOpen ? 'navigation__mobile--active' : ''}`}>
        <ul className="navigation__mobile-menu">
          <li className="navigation__mobile-menu-item">
            <Link 
              to="/" 
              className={`navigation__mobile-menu-link ${isActiveLink('/') ? 'navigation__mobile-menu-link--active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li className="navigation__mobile-menu-item">
            <Link 
              to="/how-it-works" 
              className={`navigation__mobile-menu-link ${isActiveLink('/how-it-works') ? 'navigation__mobile-menu-link--active' : ''}`}
            >
              How It Works
            </Link>
          </li>
          <li className="navigation__mobile-menu-item">
            <Link 
              to="/store-locator" 
              className={`navigation__mobile-menu-link ${isActiveLink('/store-locator') ? 'navigation__mobile-menu-link--active' : ''}`}
            >
              Store Locator
            </Link>
          </li>
          <li className="navigation__mobile-menu-item">
            <Link 
              to="/membership" 
              className={`navigation__mobile-menu-link ${isActiveLink('/membership') ? 'navigation__mobile-menu-link--active' : ''}`}
            >
              Membership
            </Link>
          </li>
          <li className="navigation__mobile-menu-item">
            <Link 
              to="/my-account" 
              className={`navigation__mobile-menu-link ${isActiveLink('/my-account') ? 'navigation__mobile-menu-link--active' : ''}`}
            >
              My Account
            </Link>
          </li>
        </ul>
      </div>
      
      {/* Category navigation */}
      <nav className="category-nav" aria-label="Category navigation">
        <div className="category-nav__container">
          <ul className="category-nav__list">
            {categoryItems.map((category) => (
              <li key={category.id} className="category-nav__item">
                <Link
                  to={category.href}
                  className={`category-nav__link ${getActiveCategory() === category.id ? 'category-nav__link--active' : ''}`}
                  onClick={(e) => handleCategoryClick(e, category.id)}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      
      {/* Membership navigation panel */}
      <nav className="membership-nav" aria-label="Membership navigation">
        <ul>
          <li className="membership-nav__item">
            <Link to="/membership" className="membership-nav__link">
              <span className="membership-nav__icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              Settings
            </Link>
          </li>
          <li className="membership-nav__item">
            <Link to="/favorites" className="membership-nav__link">
              <span className="membership-nav__icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6054C22.3095 9.93793 22.4518 9.22252 22.4518 8.5C22.4518 7.77748 22.3095 7.06206 22.0329 6.39464C21.7563 5.72723 21.351 5.12085 20.84 4.61V4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              Favorites
            </Link>
          </li>
          <li className="membership-nav__item">
            <Link to="/try-on-history" className="membership-nav__link">
              <span className="membership-nav__icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.05 11C3.27151 8.68261 4.40446 6.5407 6.19881 5.05235C7.99315 3.56399 10.3217 2.84187 12.6515 3.03694C14.9813 3.232 17.1496 4.33345 18.7133 6.10746C20.2771 7.88147 21.1047 10.198 21.0265 12.5439C20.9483 14.8898 19.97 17.1423 18.2843 18.8094C16.5987 20.4764 14.3355 21.4227 11.9902 21.4938C9.645 21.5648 7.3269 20.7549 5.54763 19.2207C3.76837 17.6864 2.66717 15.5366 2.63 13.19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 7V11H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              History
            </Link>
          </li>
          <li className="membership-nav__item">
            <Link to="/upgrade" className="membership-nav__link">
              <span className="membership-nav__icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8L21 12L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              Upgrade
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;