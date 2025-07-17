import { useState } from 'react';
import { 
  Card, 
  Text, 
  Group, 
  Avatar, 
  Button, 
  Stack,
  Badge,
  useMantineColorScheme 
} from '@mantine/core';
import { 
  IconHeart, 
  IconMessageCircle, 
  IconShare,
  IconBookmark,
  IconCheck,
  IconPlus
} from '@tabler/icons-react';

const TikTokContentCard = ({
  title,
  description,
  avatar,
  username = 'TUHME',
  verified = true,
  badge,
  children,
  onLike = () => {},
  onComment = () => {},
  onShare = () => {},
  onSave = () => {},
  onFollow = () => {},
  isFollowing = false,
  likeCount = 0,
  commentCount = 0,
  className = '',
  style = {}
}) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [following, setFollowing] = useState(isFollowing);
  const [likes, setLikes] = useState(likeCount);
  const { colorScheme } = useMantineColorScheme();

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
    onLike(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
    onSave(!saved);
  };

  const handleFollow = () => {
    setFollowing(!following);
    onFollow(!following);
  };

  const formatCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <Card
      className={`tiktok-content-card ${className}`}
      style={{
        background: colorScheme === 'dark' ? '#161823' : '#FFFFFF',
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        border: `1px solid ${colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#F1F1F2'}`,
        transition: 'all 0.2s ease',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        filter: 'none',
        boxShadow: 'none',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Profile Section - TikTok Style */}
      <Group justify="space-between" mb="md">
        <Group gap="md">
          <div style={{ position: 'relative' }}>
            <Avatar
              src={avatar}
              size="md"
              radius="xl"
              style={{
                border: '2px solid #FE2C55',
                filter: 'none'
              }}
            >
              {username.charAt(0).toUpperCase()}
            </Avatar>
            {!following && (
              <div
                style={{
                  position: 'absolute',
                  bottom: -2,
                  right: -2,
                  background: '#FE2C55',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: '2px solid white'
                }}
                onClick={handleFollow}
              >
                <IconPlus size={12} color="white" />
              </div>
            )}
          </div>
          
          <div>
            <Group gap="xs" align="center">
              <Text 
                fw={600} 
                size="sm"
                style={{
                  color: 'inherit',
                  filter: 'none',
                  textShadow: 'none'
                }}
              >
                {username}
              </Text>
              {verified && (
                <IconCheck 
                  size={16} 
                  style={{ color: '#25F4EE' }}
                />
              )}
              {badge && (
                <Badge
                  variant="light"
                  color="red"
                  size="xs"
                  style={{
                    background: 'rgba(254, 44, 85, 0.1)',
                    color: '#FE2C55',
                    border: 'none'
                  }}
                >
                  {badge}
                </Badge>
              )}
            </Group>
            <Text 
              size="xs" 
              c="dimmed"
              style={{
                color: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                filter: 'none',
                textShadow: 'none'
              }}
            >
              Luxury Shopping Service
            </Text>
          </div>
        </Group>

        <Button
          variant={following ? 'light' : 'filled'}
          color={following ? 'gray' : 'red'}
          size="xs"
          radius="xl"
          onClick={handleFollow}
          style={{
            background: following ? 'transparent' : '#FE2C55',
            color: following ? 'inherit' : 'white',
            border: following ? '1px solid' : 'none',
            borderColor: following ? (colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)') : 'transparent',
            backdropFilter: 'none',
            filter: 'none'
          }}
        >
          {following ? 'Following' : 'Follow'}
        </Button>
      </Group>

      {/* Content Section */}
      <Stack gap="md">
        {title && (
          <Text 
            fw={600} 
            size="lg"
            style={{
              color: 'inherit',
              filter: 'none',
              textShadow: 'none',
              lineHeight: 1.4
            }}
          >
            {title}
          </Text>
        )}

        {description && (
          <Text 
            size="sm"
            style={{
              color: 'inherit',
              filter: 'none',
              textShadow: 'none',
              lineHeight: 1.6
            }}
          >
            {description}
          </Text>
        )}

        {children && (
          <div style={{ filter: 'none' }}>
            {children}
          </div>
        )}
      </Stack>

      {/* Engagement Section - TikTok Style */}
      <Group justify="space-between" mt="lg" pt="md" style={{
        borderTop: `1px solid ${colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`
      }}>
        <Group gap="lg">
          <Group gap="xs" style={{ cursor: 'pointer' }} onClick={handleLike}>
            <IconHeart 
              size={20} 
              style={{ 
                color: liked ? '#FE2C55' : 'inherit',
                fill: liked ? '#FE2C55' : 'none',
                transition: 'all 0.2s ease'
              }}
            />
            <Text 
              size="sm" 
              fw={500}
              style={{
                color: 'inherit',
                filter: 'none',
                textShadow: 'none'
              }}
            >
              {formatCount(likes)}
            </Text>
          </Group>

          <Group gap="xs" style={{ cursor: 'pointer' }} onClick={onComment}>
            <IconMessageCircle 
              size={20} 
              style={{ color: 'inherit' }}
            />
            <Text 
              size="sm" 
              fw={500}
              style={{
                color: 'inherit',
                filter: 'none',
                textShadow: 'none'
              }}
            >
              {formatCount(commentCount)}
            </Text>
          </Group>

          <Group gap="xs" style={{ cursor: 'pointer' }} onClick={onShare}>
            <IconShare 
              size={20} 
              style={{ color: 'inherit' }}
            />
            <Text 
              size="sm" 
              fw={500}
              style={{
                color: 'inherit',
                filter: 'none',
                textShadow: 'none'
              }}
            >
              Share
            </Text>
          </Group>
        </Group>

        <Group gap="xs" style={{ cursor: 'pointer' }} onClick={handleSave}>
          <IconBookmark 
            size={20} 
            style={{ 
              color: saved ? '#25F4EE' : 'inherit',
              fill: saved ? '#25F4EE' : 'none',
              transition: 'all 0.2s ease'
            }}
          />
        </Group>
      </Group>

      {/* Custom animations */}
      <style jsx>{`
        .tiktok-content-card:hover .icon-heart {
          animation: tiktok-bounce 0.6s ease-in-out;
        }
        
        @keyframes tiktok-bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0, 0, 0);
          }
          40%, 43% {
            transform: translate3d(0, -4px, 0);
          }
          70% {
            transform: translate3d(0, -2px, 0);
          }
          90% {
            transform: translate3d(0, -1px, 0);
          }
        }
      `}</style>
    </Card>
  );
};

export default TikTokContentCard;