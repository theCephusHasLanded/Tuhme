import { useMantineTheme } from '@mantine/core';
import { isLightAccent } from '../theme/mantineTheme';

export const useLuxuryPalette = () => {
  const theme = useMantineTheme();
  const currentPalette = theme.other?.currentPalette;
  
  return {
    palette: currentPalette,
    accent: currentPalette?.accent || theme.colors.brand[5],
    primary: currentPalette?.primary || theme.colors.dark[8],
    secondary: currentPalette?.secondary || theme.colors.dark[7],
    rgb: currentPalette?.rgb || '255, 255, 255',
    name: currentPalette?.name || 'default',
    isLight: isLightAccent(currentPalette?.accent),
    textColor: isLightAccent(currentPalette?.accent) ? '#000000' : '#ffffff',
    // Utility functions
    withOpacity: (opacity) => `rgba(${currentPalette?.rgb || '255, 255, 255'}, ${opacity})`,
    contrastText: (bgColor) => {
      // Simple contrast checker - you could enhance this
      const isLightBg = isLightAccent(bgColor);
      return isLightBg ? '#000000' : '#ffffff';
    }
  };
};