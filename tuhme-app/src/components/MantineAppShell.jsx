import { Box } from '@mantine/core';
import MantineNavigation from './MantineNavigation';

const MantineAppShell = ({ children, onNavigate, currentSection, onOpenSavi, onOpenFeedback }) => {
  return (
    <>
      <MantineNavigation 
        onNavigate={onNavigate}
        currentSection={currentSection}
        onOpenSavi={onOpenSavi}
        onOpenFeedback={onOpenFeedback}
      />
      <Box style={{ paddingTop: '80px' }}>
        {children}
      </Box>
    </>
  );
};

export default MantineAppShell;