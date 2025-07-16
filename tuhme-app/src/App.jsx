import { useState, useEffect } from 'react';
import colorSchemeManager from './utils/colorSchemeManager';
import './styles/theme-system.css';
import './styles/theme-overrides.css';
import './styles/typography.css';
import './styles/color-scheme.css';
import './styles/color-overrides.css';
import './styles/floating-effects.css';
import './App.css';
import './luxury-components.css';
import './enhanced-upload.css';
import './styles/navigation-modals.css';
import './styles/call-to-action-widget.css';
import './styles/benefits-widget.css';
import './styles/content-widgets.css';
import './styles/get-in-touch-modal.css';
import './styles/mobile-responsive.css';
import './styles/enhanced-contrast.css';
import './styles/enhanced-typography.css';
import './styles/enhanced-accessibility.css';
import './styles/luxury-hero.css';
import './styles/compact-footer.css';
import './styles/liquid-glass-system.css';
import './styles/liquid-glass-integration.css';
import './styles/global-color-scheme.css';
import './styles/how-it-works-enhanced.css';
import './styles/illusive-color-override.css';
import './styles/interactive-info.css';
import './styles/elegant-navigation.css';
import './styles/hero-matched-modals.css';
import './styles/luxury-fixes.css';

// Critical production fixes for button contrast
import './styles/critical-fixes.css';

import { ThemeProvider } from './contexts/ThemeContext';
import ThemeSystemProvider from './contexts/ThemeSystemContext';
import { ModalProvider } from './contexts/ModalContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ServiceOverview from './components/ServiceOverview';
import HowItWorks from './components/HowItWorks';
import PricingWidget from './components/PricingWidget';
import ProcessWidget from './components/ProcessWidget';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ExpressOrderFlow from './components/ExpressOrderFlow';
import UserDashboard from './components/UserDashboard';
import ModalsSystem from './components/ModalsSystem';
import MembershipModal from './components/MembershipModal';
import CustomerTestimonials from './components/CustomerTestimonials';
import Matrix3DInterface from './components/Matrix3DInterface';
import SaviAssistant from './components/SaviAssistant';
import FloatingSaviBot from './components/FloatingSaviBot';
import BenefitsWidget from './components/BenefitsWidget';
import CallToActionWidget from './components/CallToActionWidget';
import FAQWidget from './components/FAQWidget';
import FeedbackModal from './components/FeedbackModal';
import InteractiveInfoSection from './components/InteractiveInfoSection';
import DailySalesFlyerManager from './components/DailySalesFlyerManager';
import EnhancedStoreFinder from './components/EnhancedStoreFinder';
import ThemeToggle from './components/ThemeToggle';
import GetInTouchModal from './components/GetInTouchModal';
import FlyerGeneratorModal from './components/FlyerGeneratorModal';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [currentView, setCurrentView] = useState('main');
  const [showSavi, setShowSavi] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showGetInTouch, setShowGetInTouch] = useState(false);
  const [showFlyerGenerator, setShowFlyerGenerator] = useState(false);

  useEffect(() => {
    colorSchemeManager.init();
    return () => {
      colorSchemeManager.cleanup();
    };
  }, []);

  const handleNavigate = (section) => {
    setCurrentSection(section);
    
    if (section === 'express-order') {
      setCurrentView('express-order');
    } else if (section === 'user-dashboard') {
      setCurrentView('user-dashboard');
    } else if (section === 'hiring') {
      setCurrentView('hiring');
    } else {
      setCurrentView('main');
      
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  const handleOpenSavi = () => setShowSavi(true);
  const handleCloseSavi = () => setShowSavi(false);
  const handleOpenFeedback = () => setShowFeedback(true);
  const handleCloseFeedback = () => setShowFeedback(false);

  const renderMainContent = () => (
    <div className="main-website" style={{ paddingTop: '80px' }}>
      <Hero id="home" />
      <ServiceOverview id="service-overview" />
      <HowItWorks id="how-it-works" />
      <PricingWidget id="pricing" />
      <ProcessWidget id="process" />
      <BenefitsWidget id="benefits" />
      <CustomerTestimonials id="testimonials" />
      <CallToActionWidget id="cta" />
      <InteractiveInfoSection id="info" />
      <EnhancedStoreFinder id="stores" />
      <FAQWidget id="faq" />
      <ContactForm id="contact" />
      <Footer />
    </div>
  );

  const renderExpressOrder = () => (
    <div className="express-order-container">
      <Navigation 
        onNavigate={handleNavigate}
        currentSection={currentSection}
        onOpenSavi={handleOpenSavi}
        onOpenFeedback={handleOpenFeedback}
      />
      <ExpressOrderFlow onBack={() => handleNavigate('home')} />
    </div>
  );

  const renderUserDashboard = () => (
    <div className="user-dashboard-container">
      <Navigation 
        onNavigate={handleNavigate}
        currentSection={currentSection}
        onOpenSavi={handleOpenSavi}
        onOpenFeedback={handleOpenFeedback}
      />
      <UserDashboard onBack={() => handleNavigate('home')} />
    </div>
  );

  const renderHiring = () => (
    <div className="hiring-container">
      <Navigation 
        onNavigate={handleNavigate}
        currentSection={currentSection}
        onOpenSavi={handleOpenSavi}
        onOpenFeedback={handleOpenFeedback}
      />
      <Matrix3DInterface onBack={() => handleNavigate('home')} />
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'express-order':
        return renderExpressOrder();
      case 'user-dashboard':
        return renderUserDashboard();
      case 'hiring':
        return renderHiring();
      default:
        return (
          <>
            <Navigation 
              onNavigate={handleNavigate}
              currentSection={currentSection}
              onOpenSavi={handleOpenSavi}
              onOpenFeedback={handleOpenFeedback}
            />
            {renderMainContent()}
          </>
        );
    }
  };

  return (
    <ThemeSystemProvider>
      <ThemeProvider>
        <ModalProvider>
          <div className="App">
            {renderCurrentView()}

            <ModalsSystem />
            <MembershipModal />
            
            {showSavi && (
              <SaviAssistant 
                isOpen={showSavi}
                onClose={handleCloseSavi}
              />
            )}
            
            <FloatingSaviBot onClick={handleOpenSavi} />
            
            {showFeedback && (
              <FeedbackModal 
                isOpen={showFeedback}
                onClose={handleCloseFeedback}
              />
            )}

            {showGetInTouch && (
              <GetInTouchModal 
                isOpen={showGetInTouch}
                onClose={() => setShowGetInTouch(false)}
              />
            )}

            {showFlyerGenerator && (
              <FlyerGeneratorModal 
                isOpen={showFlyerGenerator}
                onClose={() => setShowFlyerGenerator(false)}
              />
            )}
            
            <DailySalesFlyerManager />
          </div>
        </ModalProvider>
      </ThemeProvider>
    </ThemeSystemProvider>
  );
}

export default App;