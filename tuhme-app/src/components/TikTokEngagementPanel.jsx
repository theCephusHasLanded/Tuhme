import { useState } from 'react';
import { 
  IconHeart, 
  IconMessageCircle, 
  IconShare, 
  IconBookmark,
  IconUser,
  IconShoppingBag,
  IconStar
} from '@tabler/icons-react';
import { ActionIcon, Text, Stack, Group } from '@mantine/core';

const TikTokEngagementPanel = ({ 
  onLike = () => {}, 
  onComment = () => {}, 
  onShare = () => {}, 
  onSave = () => {},
  onStartShopping = () => {},
  likeCount = 0,
  commentCount = 0,
  shareCount = 0,
  isLiked = false,
  isSaved = false 
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [saved, setSaved] = useState(isSaved);
  const [likes, setLikes] = useState(likeCount);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
    onLike(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
    onSave(!saved);
  };

  const formatCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const engagementButtons = [
    {
      icon: IconHeart,
      count: likes,
      action: handleLike,
      className: liked ? 'tiktok-action-button liked' : 'tiktok-action-button',
      color: liked ? 'var(--like-color)' : 'currentColor',
      label: 'Like'
    },
    {
      icon: IconMessageCircle,
      count: commentCount,
      action: onComment,
      className: 'tiktok-action-button',
      color: 'currentColor',
      label: 'Comment'
    },
    {
      icon: IconBookmark,
      count: 0,
      action: handleSave,
      className: saved ? 'tiktok-action-button saved' : 'tiktok-action-button',
      color: saved ? 'var(--bookmark-color)' : 'currentColor',
      label: 'Save'
    },
    {
      icon: IconShare,
      count: shareCount,
      action: onShare,
      className: 'tiktok-action-button',
      color: 'currentColor',
      label: 'Share'
    },
    {
      icon: IconShoppingBag,
      count: 0,
      action: onStartShopping,
      className: 'tiktok-action-button tiktok-shopping-button',
      color: 'var(--tiktok-red)',
      label: 'Shop'
    }
  ];

  return (
    <div className="tiktok-engagement-panel">
      <Stack gap="md" align="center">
        {engagementButtons.map((button, index) => {
          const IconComponent = button.icon;
          return (
            <div key={index} className="tiktok-engagement-item">
              <ActionIcon
                className={button.className}
                onClick={button.action}
                size="xl"
                variant="filled"
                style={{
                  background: button.className.includes('liked') ? 'var(--like-color)' : 
                             button.className.includes('saved') ? 'var(--bookmark-color)' : 
                             button.className.includes('shopping') ? 'var(--tiktok-red)' :
                             'rgba(255, 255, 255, 0.9)',
                  color: button.className.includes('liked') || 
                         button.className.includes('saved') || 
                         button.className.includes('shopping') ? 'white' : 'var(--tiktok-black)',
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  border: 'none',
                  backdropFilter: 'none',
                  WebkitBackdropFilter: 'none',
                  filter: 'none',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                }}
              >
                <IconComponent 
                  size={20} 
                  stroke={1.5}
                  style={{ 
                    color: 'inherit',
                    filter: 'none'
                  }}
                />
              </ActionIcon>
              
              {button.count > 0 && (
                <Text 
                  size="xs" 
                  fw={600} 
                  ta="center"
                  style={{
                    color: 'white',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                    fontSize: '0.75rem',
                    lineHeight: 1.2,
                    marginTop: '0.25rem',
                    filter: 'none'
                  }}
                >
                  {formatCount(button.count)}
                </Text>
              )}
            </div>
          );
        })}
      </Stack>

      {/* Custom styles for shopping button animation */}
      <style jsx>{`
        .tiktok-shopping-button {
          animation: tiktok-pulse 2s ease-in-out infinite;
        }
        
        .tiktok-shopping-button:hover {
          animation: none;
        }
        
        @keyframes tiktok-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        .tiktok-engagement-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }
        
        @media (max-width: 768px) {
          .tiktok-engagement-panel {
            right: 1rem;
            bottom: 120px;
            gap: 1rem;
          }
          
          .tiktok-action-button {
            width: 44px !important;
            height: 44px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TikTokEngagementPanel;