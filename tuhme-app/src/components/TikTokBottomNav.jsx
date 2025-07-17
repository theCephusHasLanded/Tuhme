import { useState } from 'react';
import { 
  IconHome, 
  IconSearch, 
  IconPlus, 
  IconMessage, 
  IconUser,
  IconShoppingBag,
  IconHeart,
  IconCompass
} from '@tabler/icons-react';
import { Group, Text, ActionIcon, useMantineColorScheme } from '@mantine/core';

const TikTokBottomNav = ({ 
  activeTab = 'home',
  onNavigate = () => {},
  onOpenExpressOrder = () => {},
  onOpenProfile = () => {},
  onOpenMessages = () => {},
  onOpenDiscover = () => {}
}) => {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const { colorScheme } = useMantineColorScheme();

  const handleTabChange = (tabId, action) => {
    setCurrentTab(tabId);
    if (action) {
      action();
    } else {
      onNavigate(tabId);
    }
  };

  const navItems = [
    {
      id: 'home',
      icon: IconHome,
      label: 'Home',
      action: () => onNavigate('home')
    },
    {
      id: 'discover',
      icon: IconCompass,
      label: 'Discover',
      action: onOpenDiscover
    },
    {
      id: 'express-order',
      icon: IconPlus,
      label: 'Order',
      action: onOpenExpressOrder,
      isSpecial: true
    },
    {
      id: 'inbox',
      icon: IconMessage,
      label: 'Inbox',
      action: onOpenMessages
    },
    {
      id: 'profile',
      icon: IconUser,
      label: 'Profile',
      action: onOpenProfile
    }
  ];

  return (
    <div 
      className="tiktok-bottom-nav"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '70px',
        background: colorScheme === 'dark' ? '#161823' : '#FFFFFF',
        borderTop: `1px solid ${colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#F1F1F2'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 1000,
        padding: '0 1rem',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        filter: 'none',
        boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)'
      }}
    >
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = currentTab === item.id;
        const isSpecial = item.isSpecial;
        
        return (
          <div
            key={item.id}
            className="tiktok-nav-item"
            onClick={() => handleTabChange(item.id, item.action)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.5rem',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              minWidth: '44px',
              minHeight: '44px',
              textDecoration: 'none',
              color: isActive ? '#FE2C55' : 'inherit',
              background: isSpecial ? '#FE2C55' : 'transparent'
            }}
            onMouseEnter={(e) => {
              if (!isSpecial) {
                e.currentTarget.style.background = colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
              }
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              if (!isSpecial) {
                e.currentTarget.style.background = 'transparent';
              }
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <ActionIcon
              variant="transparent"
              size="lg"
              style={{
                color: isSpecial ? 'white' : (isActive ? '#FE2C55' : 'inherit'),
                background: 'transparent',
                border: 'none',
                filter: 'none'
              }}
            >
              <IconComponent 
                size={isSpecial ? 28 : 24} 
                stroke={isActive ? 2 : 1.5}
                style={{ 
                  color: 'inherit',
                  filter: 'none'
                }}
              />
            </ActionIcon>
            
            <Text 
              size="xs" 
              fw={isActive ? 600 : 500}
              style={{
                color: 'inherit',
                fontSize: '0.75rem',
                lineHeight: 1,
                textAlign: 'center',
                filter: 'none',
                textShadow: 'none'
              }}
            >
              {item.label}
            </Text>
          </div>
        );
      })}

      {/* Custom styles */}
      <style jsx>{`
        .tiktok-nav-item.special {
          background: linear-gradient(45deg, #FE2C55, #FF6B8A);
          border-radius: 12px;
          padding: 0.75rem;
        }
        
        .tiktok-nav-item.special:hover {
          background: linear-gradient(45deg, #e01e46, #e55a7a) !important;
        }
        
        @media (max-width: 480px) {
          .tiktok-bottom-nav {
            height: 65px;
            padding: 0 0.5rem;
          }
          
          .tiktok-nav-item {
            padding: 0.375rem;
            min-width: 40px;
            min-height: 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default TikTokBottomNav;