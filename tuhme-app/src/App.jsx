import { useState, useEffect } from 'react';
import './styles/typography.css';
import './styles/color-scheme.css';
import './styles/color-overrides.css';
import './styles/floating-effects.css';
import './styles/typography-overrides.css';
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
import './styles/global-font-system.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { ModalProvider } from './contexts/ModalContext';
import FloatingControlPanel from './components/FloatingControlPanel';
import Hero from './components/Hero';
import ServiceOverview from './components/ServiceOverview';
import HowItWorks from './components/HowItWorks';
import PricingTiers from './components/PricingTiers';
import DeliveryInfo from './components/DeliveryInfo';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ExpressOrderFlow from './components/ExpressOrderFlow';
import UserDashboard from './components/UserDashboard';
import ModalsSystem from './components/ModalsSystem';
import MembershipModal from './components/MembershipModal';
import CustomerTestimonials from './components/CustomerTestimonials';
import Matrix3DInterface from './components/Matrix3DInterface';
import EnhancedSaviAssistant from './components/EnhancedSaviAssistant';
import FeedbackModal from './components/FeedbackModal';
import ImmersiveStoreDiscovery from './components/ImmersiveStoreDiscovery';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [showExpressFlow, setShowExpressFlow] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);

  const [showFeedback, setShowFeedback] = useState(false);
  const [userPhone, setUserPhone] = useState('');

  useEffect(() => {
    const handleTrackOrder = (event) => {
      setUserPhone(event.detail.phone);
      setShowDashboard(true);
    };

    window.addEventListener('trackOrder', handleTrackOrder);
    return () => window.removeEventListener('trackOrder', handleTrackOrder);
  }, []);

  const handleNavigation = (sectionId) => {
    if (sectionId === 'express-order') {
      setShowExpressFlow(true);
      setShowDashboard(false);
      setShowMatrix(false);
    } else {
      setCurrentSection(sectionId);
      setShowExpressFlow(false);
      setShowDashboard(false);
      setShowMatrix(false);
      
      // Smooth scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const backToWebsite = () => {
    setShowExpressFlow(false);
    setShowDashboard(false);
    setShowMatrix(false);
    setCurrentSection('home');
  };

  const toggleMatrix = () => {
    setShowMatrix(!showMatrix);
  };

  if (showMatrix) {
    return (
      <ThemeProvider>
        <ModalProvider>
          <div className="app">
            <Matrix3DInterface isActive={showMatrix} onClose={() => setShowMatrix(false)} />
            <ModalsSystem />
          </div>
        </ModalProvider>
      </ThemeProvider>
    );
  }

  if (showDashboard) {
    return (
      <ThemeProvider>
        <ModalProvider>
          <div className="app">
            <UserDashboard userPhone={userPhone} onBack={backToWebsite} />
            <ModalsSystem />
          </div>
        </ModalProvider>
      </ThemeProvider>
    );
  }

  if (showExpressFlow) {
    return (
      <ThemeProvider>
        <ModalProvider>
          <div className="app">
            <ExpressOrderFlow 
              onBack={backToWebsite} 
              onNavigate={handleNavigation}
              currentSection={currentSection}
            />
            <ModalsSystem />
          </div>
        </ModalProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <ModalProvider>
        <div className="app">
          <FloatingControlPanel
            onNavigate={handleNavigation} 
            currentSection={currentSection} 
            onMatrixToggle={toggleMatrix}
            onOpenSavi={() => window.dispatchEvent(new CustomEvent('openSavi'))}
            onOpenFeedback={() => setShowFeedback(true)}
          />
          
          <main className="main-website">
            <section id="home">
              <Hero onStartExpressOrder={() => setShowExpressFlow(true)} />
            </section>

            <section id="service-overview">
              <ServiceOverview />
            </section>

            <section id="store-discovery">
              <ImmersiveStoreDiscovery />
            </section>

            <section id="how-it-works">
              <HowItWorks />
            </section>

            <section id="pricing">
              <PricingTiers />
            </section>


            <section id="delivery-info">
              <DeliveryInfo />
            </section>


            <section id="gallery">
              <CustomerTestimonials />
            </section>

            <section id="contact">
              <ContactForm />
            </section>
          </main>

          <Footer />
          <ModalsSystem />
          <MembershipModal />
          {/* Enhanced SAVI Assistant */}
          <EnhancedSaviAssistant />
          
          {/* Feedback Modal */}
          <FeedbackModal 
            isOpen={showFeedback} 
            onClose={() => setShowFeedback(false)} 
          />
        </div>
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App
