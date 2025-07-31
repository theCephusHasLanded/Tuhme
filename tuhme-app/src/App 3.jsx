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

// Mantine integration styles - loaded last to ensure proper theming
import './styles/mantine-overrides.css';

// Apple-level design fixes - loaded LAST to override all text blur issues
import './styles/apple-design-fixes.css';

// Labubu modal styling
import './styles/labubu-modal.css';

// TikTok-inspired UI system - modern social media aesthetic
import './styles/tiktok-ui-system.css';

import { ThemeProvider } from './contexts/ThemeContext';
import ThemeSystemProvider from './contexts/ThemeSystemContext';
import { ModalProvider } from './contexts/ModalContext';
import { MantineThemeProvider } from './providers/MantineThemeProvider';
import Navigation from './components/Navigation';
import MantineAppShell from './components/MantineAppShell';
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
import LabubuExclusiveModal from './components/LabubuExclusiveModal';
import useFirstTimeUser from './hooks/useFirstTimeUser';
import './utils/labubuTestHelper'; // Load test helper for development

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [currentView, setCurrentView] = useState('main');
  const [showSavi, setShowSavi] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showGetInTouch, setShowGetInTouch] = useState(false);
  const [showFlyerGenerator, setShowFlyerGenerator] = useState(false);
  
  // First-time user detection for Labubu modal
  const { 
    isFirstTime, 
    showLabubuModal, 
    isLoading,
    markLabubuModalShown,
    trackModalInteraction 
  } = useFirstTimeUser();
  
  const [labubuModalOpened, setLabubuModalOpened] = useState(false);

  useEffect(() => {
    colorSchemeManager.init();
    return () => {
      colorSchemeManager.cleanup();
    };
  }, []);

  // Handle Labubu modal display with delay
  useEffect(() => {
    if (!isLoading && showLabubuModal && !labubuModalOpened) {
      const timer = setTimeout(() => {
        setLabubuModalOpened(true);
        trackModalInteraction('modal_displayed', { 
          is_first_time: isFirstTime,
          delay_seconds: 3 
        });
      }, 3000); // 3-second delay as specified

      return () => clearTimeout(timer);
    }
  }, [isLoading, showLabubuModal, labubuModalOpened, isFirstTime, trackModalInteraction]);

  // Handle Labubu modal close
  const handleLabubuModalClose = () => {
    setLabubuModalOpened(false);
    markLabubuModalShown();
    trackModalInteraction('modal_closed', { 
      interaction_type: 'close_button',
      is_first_time: isFirstTime 
    });
  };

  // Handle Labubu CTA click
  const handleLabubuCTAClick = () => {
    trackModalInteraction('cta_clicked', { 
      is_first_time: isFirstTime,
      conversion_action: 'get_exclusive_access'
    });
    
    // Navigate to express order or special Labubu section
    handleNavigate('express-order');
    setLabubuModalOpened(false);
    markLabubuModalShown();
  };

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
    <div className="main-website">
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
    <MantineAppShell
      onNavigate={handleNavigate}
      currentSection={currentSection}
      onOpenSavi={handleOpenSavi}
      onOpenFeedback={handleOpenFeedback}
    >
      <ExpressOrderFlow onBack={() => handleNavigate('home')} />
    </MantineAppShell>
  );

  const renderUserDashboard = () => (
    <MantineAppShell
      onNavigate={handleNavigate}
      currentSection={currentSection}
      onOpenSavi={handleOpenSavi}
      onOpenFeedback={handleOpenFeedback}
    >
      <UserDashboard onBack={() => handleNavigate('home')} />
    </MantineAppShell>
  );

  const renderHiring = () => (
    <MantineAppShell
      onNavigate={handleNavigate}
      currentSection={currentSection}
      onOpenSavi={handleOpenSavi}
      onOpenFeedback={handleOpenFeedback}
    >
      <Matrix3DInterface onBack={() => handleNavigate('home')} />
    </MantineAppShell>
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
          <MantineAppShell
            onNavigate={handleNavigate}
            currentSection={currentSection}
            onOpenSavi={handleOpenSavi}
            onOpenFeedback={handleOpenFeedback}
          >
            {renderMainContent()}
          </MantineAppShell>
        );
    }
  };

  return (
    <MantineThemeProvider>
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

              {/* Labubu Exclusive Modal for first-time users */}
              <LabubuExclusiveModal 
                opened={labubuModalOpened}
                onClose={handleLabubuModalClose}
                onCTAClick={handleLabubuCTAClick}
              />
            </div>
          </ModalProvider>
        </ThemeProvider>
      </ThemeSystemProvider>
    </MantineThemeProvider>
  );
}

export default App;