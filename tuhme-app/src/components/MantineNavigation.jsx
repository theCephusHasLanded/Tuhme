import { useState, useEffect } from 'react';
import {
  Group,
  Button,
  Menu,
  ActionIcon,
  Burger,
  useMantineTheme,
  useMantineColorScheme,
  Divider,
  Text,
  Box,
  Image,
  Tooltip,
  Paper,
  Stack,
  Container
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  IconRobot, 
  IconMapPin, 
  IconMenu2, 
  IconStar, 
  IconMessageCircle, 
  IconFileText, 
  IconPlayerPlay,
  IconShoppingBag,
  IconUser,
  IconHome,
  IconInfoCircle
} from '@tabler/icons-react';
import { useModal } from '../contexts/ModalContext';
import NavigationModals from './NavigationModals';
import tuhmeLogo from '../assets/tuhme.png';

const MantineNavigation = ({ onNavigate, currentSection, onOpenSavi, onOpenFeedback }) => {
  const [opened, { toggle }] = useDisclosure();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const { openModal } = useModal();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  // Simplified menu items with icons
  const menuItems = [
    { 
      id: 'express-order', 
      label: 'START EXPRESS ORDER', 
      type: 'navigate', 
      icon: IconPlayerPlay,
      isPrimary: true
    },
    { 
      id: 'stores', 
      label: 'FIND STORES', 
      type: 'navigate', 
      icon: IconMapPin 
    },
    { 
      id: 'dailySalesFlyer', 
      label: 'DAILY SALES FLYER', 
      type: 'modal', 
      icon: IconFileText 
    },
    { 
      id: 'membership', 
      label: 'PREMIUM MEMBERSHIP', 
      type: 'modal', 
      icon: IconStar 
    },
    { 
      id: 'contact', 
      label: 'CONTACT & SUPPORT', 
      type: 'action', 
      icon: IconMessageCircle,
      action: () => onOpenFeedback()
    },
    { 
      id: 'savi', 
      label: 'ASK SAVI AI', 
      type: 'action', 
      icon: IconRobot,
      action: () => onOpenSavi()
    },
    { 
      id: 'home', 
      label: 'HOME', 
      type: 'navigate', 
      icon: IconHome 
    },
    { 
      id: 'how-it-works', 
      label: 'HOW IT WORKS', 
      type: 'navigate', 
      icon: IconInfoCircle 
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = (item) => {
    if (item.type === 'modal') {
      if (item.id === 'dailySalesFlyer') {
        localStorage.removeItem('tuhme-daily-flyer-shown');
        openModal('dailySalesFlyer');
      } else {
        openModal(item.id);
      }
    } else if (item.type === 'action') {
      item.action();
    } else if (item.type === 'navigate') {
      onNavigate(item.id);
    }
    toggle(); // Always close menu after action
  };

  const closeModal = () => setActiveModal(null);

  const currentPalette = theme.other?.currentPalette;
  const toggleColorScheme = theme.other?.toggleColorScheme;
  
  // Fallback color for icons
  const iconColor = currentPalette?.accent || theme.colors?.brand?.[5] || '#ffffff';

  return (
    <>
      {/* Minimalist Liquid Glass Navigation */}
      <Paper
        component="nav"
        h={70}
        data-navigation="true"
        style={{
          background: `linear-gradient(135deg, 
            rgba(${currentPalette?.rgb || '255, 255, 255'}, 0.05) 0%, 
            rgba(${currentPalette?.rgb || '255, 255, 255'}, 0.02) 100%)`,
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: 'none',
          borderBottom: `1px solid rgba(${currentPalette?.rgb || '255, 255, 255'}, 0.08)`,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isScrolled 
            ? `0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)` 
            : '0 2px 8px rgba(0, 0, 0, 0.04)',
          borderRadius: 0,
          '--icon-color': iconColor
        }}
      >
        <Container size="xl" h="100%">
          <Group h="100%" justify="space-between" align="center">
            {/* Minimalist Logo */}
            <Box
              onClick={() => onNavigate('home')}
              style={{ 
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Text
                size="xl"
                fw={700}
                style={{
                  color: iconColor,
                  fontFamily: 'inherit',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  textShadow: `0 0 20px ${iconColor}40, 0 0 40px ${iconColor}20`,
                  filter: 'brightness(1.1)',
                }}
              >
                TUHME
              </Text>
            </Box>

            {/* Hamburger Menu Button */}
            <ActionIcon
              variant="subtle"
              size="lg"
              onClick={toggle}
              style={{
                color: iconColor,
                background: `rgba(${currentPalette?.rgb || '255, 255, 255'}, 0.08)`,
                backdropFilter: 'blur(10px)',
                border: `1px solid rgba(${currentPalette?.rgb || '255, 255, 255'}, 0.12)`,
                borderRadius: '12px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: `0 4px 16px rgba(0, 0, 0, 0.1)`,
                '&:hover': {
                  transform: 'translateY(-2px) scale(1.05)',
                  boxShadow: `0 8px 24px rgba(0, 0, 0, 0.15)`,
                  background: `rgba(${currentPalette?.rgb || '255, 255, 255'}, 0.12)`
                }
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                e.currentTarget.style.boxShadow = `0 8px 24px rgba(0, 0, 0, 0.15)`;
                e.currentTarget.style.background = `rgba(${currentPalette?.rgb || '255, 255, 255'}, 0.12)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `0 4px 16px rgba(0, 0, 0, 0.1)`;
                e.currentTarget.style.background = `rgba(${currentPalette?.rgb || '255, 255, 255'}, 0.08)`;
              }}
            >
              <IconMenu2 
                size={22} 
                stroke={1.5} 
                style={{ 
                  color: iconColor,
                  filter: `drop-shadow(0 0 8px ${iconColor}40)`
                }} 
              />
            </ActionIcon>
          </Group>
        </Container>
      </Paper>

      {/* Liquid Glass Dropdown Menu */}
      {opened && (
        <Paper
          className="dropdown-menu-overlay"
          style={{
            position: 'fixed',
            top: 70,
            left: 0,
            right: 0,
            background: `linear-gradient(135deg, 
              rgba(${currentPalette?.rgb || '0, 0, 0'}, 0.95) 0%, 
              rgba(${currentPalette?.rgb || '0, 0, 0'}, 0.85) 100%)`,
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            border: 'none',
            borderTop: `1px solid rgba(${currentPalette?.rgb || '255, 255, 255'}, 0.08)`,
            zIndex: 999,
            borderRadius: 0,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            minHeight: '100vh',
            animation: 'slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <Container size="xl" py="xl" data-dropdown="true">
            <Stack gap="xs" data-menu-items="true">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant="subtle"
                    size="lg"
                    fullWidth
                    justify="flex-start"
                    data-menu-item="true"
                    leftSection={
                      <IconComponent 
                        size={20} 
                        stroke={1.5} 
                        style={{ 
                          color: item.isPrimary ? iconColor : '#ffffff',
                          filter: item.isPrimary 
                            ? `drop-shadow(0 0 12px ${iconColor}60)` 
                            : 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))'
                        }} 
                      />
                    }
                    onClick={() => handleMenuClick(item)}
                    style={{
                      color: item.isPrimary ? iconColor : '#ffffff',
                      background: item.isPrimary 
                        ? `rgba(${currentPalette?.rgb || '255, 255, 255'}, 0.12)` 
                        : 'rgba(255, 255, 255, 0.05)',
                      border: item.isPrimary 
                        ? `1px solid rgba(${currentPalette?.rgb || '255, 255, 255'}, 0.2)` 
                        : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '16px',
                      padding: '16px 20px',
                      fontFamily: 'inherit',
                      fontWeight: item.isPrimary ? 700 : 500,
                      fontSize: '0.9rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      backdropFilter: 'blur(10px)',
                      textShadow: item.isPrimary 
                        ? `0 0 20px ${iconColor}40` 
                        : '0 0 10px rgba(255, 255, 255, 0.2)',
                      marginBottom: index === 0 ? '20px' : '8px',
                      boxShadow: item.isPrimary 
                        ? `0 4px 20px rgba(${currentPalette?.rgb || '255, 255, 255'}, 0.1)` 
                        : '0 2px 10px rgba(0, 0, 0, 0.1)',
                      '&:hover': {
                        transform: 'translateY(-2px) scale(1.02)',
                        background: item.isPrimary 
                          ? `rgba(${currentPalette?.rgb || '255, 255, 255'}, 0.18)` 
                          : 'rgba(255, 255, 255, 0.08)',
                        boxShadow: item.isPrimary 
                          ? `0 8px 30px rgba(${currentPalette?.rgb || '255, 255, 255'}, 0.2)` 
                          : '0 4px 20px rgba(255, 255, 255, 0.1)'
                      }
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                      e.currentTarget.style.background = item.isPrimary 
                        ? `rgba(${currentPalette?.rgb || '255, 255, 255'}, 0.18)` 
                        : 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.boxShadow = item.isPrimary 
                        ? `0 8px 30px rgba(${currentPalette?.rgb || '255, 255, 255'}, 0.2)` 
                        : '0 4px 20px rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.background = item.isPrimary 
                        ? `rgba(${currentPalette?.rgb || '255, 255, 255'}, 0.12)` 
                        : 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.boxShadow = item.isPrimary 
                        ? `0 4px 20px rgba(${currentPalette?.rgb || '255, 255, 255'}, 0.1)` 
                        : '0 2px 10px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Stack>
          </Container>
        </Paper>
      )}

      <NavigationModals activeModal={activeModal} closeModal={closeModal} />
    </>
  );
};

export default MantineNavigation;