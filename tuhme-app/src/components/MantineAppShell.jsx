import MantineNavigation from './MantineNavigation';

const MantineAppShell = ({ children, onNavigate, currentSection, onOpenSavi, onOpenFeedback }) => {
  return (
    <div className="mobile-viewport">
      <MantineNavigation 
        onNavigate={onNavigate}
        currentSection={currentSection}
        onOpenSavi={onOpenSavi}
        onOpenFeedback={onOpenFeedback}
      />
      <main className="tiktok-content-area tiktok-scrollable">
        {children}
      </main>
    </div>
  );
};

export default MantineAppShell;