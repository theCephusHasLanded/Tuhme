import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState({
    privacy: false,
    terms: false,
    cookies: false,
    aiAgent: false,
    newsletter: false,
    membership: false
  });

  const [cookieConsent, setCookieConsent] = useState(() => {
    return localStorage.getItem('tuhme-cookie-consent') === 'accepted';
  });

  const openModal = (modalType) => {
    setModals(prev => ({ ...prev, [modalType]: true }));
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (modalType) => {
    setModals(prev => ({ ...prev, [modalType]: false }));
    
    // Check if any modals are still open
    const stillOpen = Object.values({ ...modals, [modalType]: false }).some(Boolean);
    if (!stillOpen) {
      document.body.style.overflow = 'unset';
    }
  };

  const closeAllModals = () => {
    setModals({
      privacy: false,
      terms: false,
      cookies: false,
      aiAgent: false,
      newsletter: false,
      membership: false
    });
    document.body.style.overflow = 'unset';
  };

  const acceptCookies = () => {
    setCookieConsent(true);
    localStorage.setItem('tuhme-cookie-consent', 'accepted');
    closeModal('cookies');
  };

  const value = {
    modals,
    openModal,
    closeModal,
    closeAllModals,
    cookieConsent,
    acceptCookies
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;