import { Button, useMantineTheme } from '@mantine/core';
import { isLightAccent, getIconColor } from '../theme/mantineTheme';

// Primary CTA Button - Always high contrast
export const PrimaryCTAButton = ({ children, onClick, size = 'lg', ...props }) => {
  const theme = useMantineTheme();
  const currentPalette = theme.other?.currentPalette;
  const isLight = isLightAccent(currentPalette?.accent);

  return (
    <Button
      variant="filled"
      size={size}
      radius="md"
      onClick={onClick}
      c={isLight ? '#000000' : '#ffffff'}
      {...props}
    >
      {children}
    </Button>
  );
};

// Secondary CTA Button - Outline style with good contrast
export const SecondaryCTAButton = ({ children, onClick, size = 'lg', ...props }) => {
  const theme = useMantineTheme();
  const currentPalette = theme.other?.currentPalette;

  return (
    <Button
      variant="outline"
      size={size}
      radius="md"
      onClick={onClick}
      c={currentPalette?.accent || theme.colors.brand[5]}
      {...props}
    >
      {children}
    </Button>
  );
};

// Subtle Action Button - For less prominent actions
export const SubtleActionButton = ({ children, onClick, size = 'md', ...props }) => {
  const theme = useMantineTheme();
  const currentPalette = theme.other?.currentPalette;

  return (
    <Button
      variant="subtle"
      size={size}
      radius="md"
      onClick={onClick}
      c={currentPalette?.accent || theme.colors.brand[5]}
      {...props}
    >
      {children}
    </Button>
  );
};

// Express Order Button - Special styling for the main CTA
export const ExpressOrderButton = ({ children, onClick, ...props }) => {
  const theme = useMantineTheme();
  const currentPalette = theme.other?.currentPalette;
  const isLight = isLightAccent(currentPalette?.accent);

  return (
    <Button
      variant="gradient"
      gradient={{ from: currentPalette?.accent || theme.colors.brand[5], to: currentPalette?.secondary || theme.colors.dark[6], deg: 135 }}
      size="xl"
      radius="md"
      onClick={onClick}
      c={isLight ? '#000000' : '#ffffff'}
      fw={700}
      fz="lg"
      {...props}
    >
      {children}
    </Button>
  );
};

// Gray/Neutral Button - For cancel/secondary actions
export const NeutralButton = ({ children, onClick, size = 'md', ...props }) => {
  return (
    <Button
      variant="filled"
      color="gray"
      size={size}
      radius="md"
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

// Navigation Button - For nav items with proper contrast
export const NavigationButton = ({ children, onClick, active = false, size = 'sm', ...props }) => {
  const theme = useMantineTheme();
  const currentPalette = theme.other?.currentPalette;
  const isLight = isLightAccent(currentPalette?.accent);

  return (
    <Button
      variant={active ? 'filled' : 'subtle'}
      size={size}
      radius="md"
      onClick={onClick}
      c={active 
        ? (isLight ? '#000000' : '#ffffff')
        : (currentPalette?.accent || theme.colors.brand[5])}
      fw={active ? 600 : 500}
      {...props}
    >
      {children}
    </Button>
  );
};