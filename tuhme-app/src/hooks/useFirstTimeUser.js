import { useState, useEffect } from 'react';

/**
 * Custom hook to detect first-time users and manage Labubu modal visibility
 * Uses localStorage to track user visits and modal display state
 */
const useFirstTimeUser = () => {
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [showLabubuModal, setShowLabubuModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Storage keys
  const STORAGE_KEYS = {
    FIRST_VISIT: 'tuhme-first-visit',
    LABUBU_MODAL_SHOWN: 'tuhme-labubu-modal-shown',
    USER_SESSIONS: 'tuhme-user-sessions',
    LAST_VISIT: 'tuhme-last-visit'
  };

  useEffect(() => {
    const checkFirstTimeUser = () => {
      try {
        // Get stored data
        const hasVisited = localStorage.getItem(STORAGE_KEYS.FIRST_VISIT);
        const labubuModalShown = localStorage.getItem(STORAGE_KEYS.LABUBU_MODAL_SHOWN);
        const userSessions = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_SESSIONS) || '[]');
        const lastVisit = localStorage.getItem(STORAGE_KEYS.LAST_VISIT);
        
        const now = new Date().getTime();
        const currentSession = {
          timestamp: now,
          userAgent: navigator.userAgent,
          referrer: document.referrer || 'direct'
        };

        // Determine if this is a first-time user
        const isFirstTimeUser = !hasVisited;
        
        // Check if enough time has passed since last visit (24 hours)
        const timeSinceLastVisit = lastVisit ? now - parseInt(lastVisit) : Infinity;
        const isReturningAfterDelay = timeSinceLastVisit > 24 * 60 * 60 * 1000; // 24 hours
        
        // Determine if we should show the Labubu modal
        const shouldShowModal = (
          isFirstTimeUser || // First time user
          (isReturningAfterDelay && !labubuModalShown) || // Returning user who hasn't seen modal
          (userSessions.length < 3 && !labubuModalShown) // User with less than 3 sessions
        );

        // Update storage
        if (isFirstTimeUser) {
          localStorage.setItem(STORAGE_KEYS.FIRST_VISIT, now.toString());
        }
        
        localStorage.setItem(STORAGE_KEYS.LAST_VISIT, now.toString());
        
        // Update sessions (keep last 10 sessions)
        const updatedSessions = [...userSessions, currentSession].slice(-10);
        localStorage.setItem(STORAGE_KEYS.USER_SESSIONS, JSON.stringify(updatedSessions));

        // Set states
        setIsFirstTime(isFirstTimeUser);
        setShowLabubuModal(shouldShowModal);
        setIsLoading(false);

        // Analytics tracking
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'user_classification', {
            event_category: 'user_behavior',
            event_label: isFirstTimeUser ? 'first_time' : 'returning',
            custom_map: {
              user_type: isFirstTimeUser ? 'first_time' : 'returning',
              session_count: updatedSessions.length,
              should_show_labubu_modal: shouldShowModal
            }
          });
        }

      } catch (error) {
        console.error('Error checking first-time user status:', error);
        // Fallback: assume first-time user if there's an error
        setIsFirstTime(true);
        setShowLabubuModal(true);
        setIsLoading(false);
      }
    };

    // Delay the check slightly to ensure proper initialization
    const timer = setTimeout(checkFirstTimeUser, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Function to mark Labubu modal as shown
  const markLabubuModalShown = () => {
    try {
      localStorage.setItem(STORAGE_KEYS.LABUBU_MODAL_SHOWN, new Date().getTime().toString());
      setShowLabubuModal(false);
      
      // Analytics tracking
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'labubu_modal_shown', {
          event_category: 'engagement',
          event_label: 'modal_displayed'
        });
      }
    } catch (error) {
      console.error('Error marking Labubu modal as shown:', error);
    }
  };

  // Function to track modal interaction
  const trackModalInteraction = (action, details = {}) => {
    try {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'labubu_modal_interaction', {
          event_category: 'engagement',
          event_label: action,
          custom_map: {
            interaction_type: action,
            ...details
          }
        });
      }
    } catch (error) {
      console.error('Error tracking modal interaction:', error);
    }
  };

  // Function to reset first-time user status (for testing)
  const resetFirstTimeStatus = () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      setIsFirstTime(true);
      setShowLabubuModal(true);
    } catch (error) {
      console.error('Error resetting first-time status:', error);
    }
  };

  // Function to get user statistics
  const getUserStats = () => {
    try {
      const userSessions = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_SESSIONS) || '[]');
      const firstVisit = localStorage.getItem(STORAGE_KEYS.FIRST_VISIT);
      const lastVisit = localStorage.getItem(STORAGE_KEYS.LAST_VISIT);
      const labubuModalShown = localStorage.getItem(STORAGE_KEYS.LABUBU_MODAL_SHOWN);

      return {
        totalSessions: userSessions.length,
        firstVisit: firstVisit ? new Date(parseInt(firstVisit)) : null,
        lastVisit: lastVisit ? new Date(parseInt(lastVisit)) : null,
        labubuModalShown: labubuModalShown ? new Date(parseInt(labubuModalShown)) : null,
        sessions: userSessions
      };
    } catch (error) {
      console.error('Error getting user stats:', error);
      return null;
    }
  };

  return {
    isFirstTime,
    showLabubuModal,
    isLoading,
    markLabubuModalShown,
    trackModalInteraction,
    resetFirstTimeStatus,
    getUserStats
  };
};

export default useFirstTimeUser;