import { useState, useEffect } from 'react';
import {
  Modal,
  Grid,
  Text,
  Button,
  Stack,
  Group,
  Badge,
  Image,
  Container,
  Box,
  Paper,
  Divider,
  Center,
  useMantineTheme,
  useMantineColorScheme
} from '@mantine/core';
import {
  IconStar,
  IconShieldCheck,
  IconClock,
  IconUsers,
  IconSparkles,
  IconGift,
  IconTrendingUp,
  IconHeart
} from '@tabler/icons-react';

const LabubuExclusiveModal = ({ opened, onClose, onCTAClick }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 47,
    minutes: 23,
    seconds: 45
  });
  
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const currentPalette = theme.other?.currentPalette;

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Labubu-themed colors (pastel aesthetic)
  const labubuColors = {
    primary: '#FFB6C1', // Light pink
    secondary: '#E6E6FA', // Lavender
    accent: '#FFE4B5', // Moccasin
    highlight: '#F0E68C', // Khaki
    success: '#98FB98', // Pale green
    background: 'linear-gradient(135deg, #FFB6C1 0%, #E6E6FA 50%, #FFE4B5 100%)'
  };

  const benefits = [
    {
      icon: IconStar,
      title: "Priority Access",
      description: "First dibs on limited Labubu releases"
    },
    {
      icon: IconShieldCheck,
      title: "Authenticity Guaranteed",
      description: "100% genuine figurines from official retailers"
    },
    {
      icon: IconUsers,
      title: "Personal Shopping",
      description: "Dedicated service for rare collectible finds"
    },
    {
      icon: IconSparkles,
      title: "Exclusive Drops",
      description: "Access to TUHME-only Labubu collections"
    }
  ];

  const socialProof = [
    { number: "10,000+", label: "Collectors" },
    { number: "500+", label: "Rare Finds" },
    { number: "98%", label: "Satisfied" }
  ];

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="xl"
      centered
      padding={0}
      withCloseButton={false}
      radius="xl"
      overlayProps={{
        backgroundOpacity: 0.7,
        blur: 8
      }}
      styles={{
        content: {
          background: labubuColors.background,
          border: `2px solid ${labubuColors.primary}`,
          boxShadow: '0 20px 60px rgba(255, 182, 193, 0.3)'
        }
      }}
    >
      <Container p="xl" size="lg">
        {/* Header Section */}
        <Stack gap="lg">
          {/* Exclusivity Badge */}
          <Center>
            <Badge
              size="lg"
              radius="xl"
              variant="gradient"
              gradient={{ from: labubuColors.primary, to: labubuColors.accent }}
              style={{
                fontSize: '0.9rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                padding: '8px 20px',
                animation: 'pulse 2s infinite'
              }}
            >
              <Group gap="xs">
                <IconGift size={16} />
                First-Time User Exclusive
              </Group>
            </Badge>
          </Center>

          {/* Hero Section */}
          <Stack gap="md" align="center">
            <Text
              size="2rem"
              fw={800}
              ta="center"
              style={{
                background: `linear-gradient(45deg, ${labubuColors.primary}, ${labubuColors.secondary})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                lineHeight: 1.2,
                letterSpacing: '0.02em'
              }}
            >
              Exclusive Labubu Collection Access
            </Text>
            
            <Text
              size="lg"
              c="dimmed"
              ta="center"
              fw={500}
              style={{ maxWidth: '500px' }}
            >
              Join 10,000+ collectors with priority access to the world's most coveted Labubu figurines
            </Text>
          </Stack>

          {/* Labubu Showcase Grid */}
          <Paper
            p="lg"
            radius="xl"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: `1px solid rgba(255, 182, 193, 0.3)`
            }}
          >
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                {/* Mock Labubu Product Showcase */}
                <Stack gap="sm">
                  <Box
                    style={{
                      width: '100%',
                      height: '200px',
                      background: `linear-gradient(135deg, ${labubuColors.secondary}, ${labubuColors.accent})`,
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `2px solid ${labubuColors.primary}`,
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Labubu Silhouette/Placeholder */}
                    <Stack align="center" gap="xs">
                      <IconHeart 
                        size={60} 
                        style={{ 
                          color: labubuColors.primary,
                          filter: 'drop-shadow(0 4px 8px rgba(255, 182, 193, 0.3))'
                        }} 
                      />
                      <Text fw={600} size="sm" c={labubuColors.primary}>
                        Limited Edition Collection
                      </Text>
                    </Stack>
                    
                    {/* Floating Animation Elements */}
                    <Box
                      style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        animation: 'float 3s ease-in-out infinite'
                      }}
                    >
                      <IconSparkles size={20} style={{ color: labubuColors.highlight }} />
                    </Box>
                  </Box>
                  
                  {/* Social Proof Numbers */}
                  <Group justify="space-around" mt="sm">
                    {socialProof.map((stat, index) => (
                      <Stack key={index} gap={0} align="center">
                        <Text
                          size="xl"
                          fw={700}
                          style={{ color: labubuColors.primary }}
                        >
                          {stat.number}
                        </Text>
                        <Text size="xs" c="dimmed" fw={500}>
                          {stat.label}
                        </Text>
                      </Stack>
                    ))}
                  </Group>
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                {/* Benefits List */}
                <Stack gap="md">
                  {benefits.map((benefit, index) => (
                    <Group key={index} gap="md" align="flex-start">
                      <Paper
                        p="xs"
                        radius="lg"
                        style={{
                          background: labubuColors.primary,
                          minWidth: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <benefit.icon size={20} style={{ color: 'white' }} />
                      </Paper>
                      <Stack gap={2} style={{ flex: 1 }}>
                        <Text fw={600} size="sm">
                          {benefit.title}
                        </Text>
                        <Text size="xs" c="dimmed">
                          {benefit.description}
                        </Text>
                      </Stack>
                    </Group>
                  ))}
                </Stack>
              </Grid.Col>
            </Grid>
          </Paper>

          {/* Countdown Timer */}
          <Paper
            p="md"
            radius="xl"
            style={{
              background: `linear-gradient(45deg, ${labubuColors.primary}, ${labubuColors.accent})`,
              border: `1px solid rgba(255, 255, 255, 0.3)`
            }}
          >
            <Stack gap="xs" align="center">
              <Group gap="xs" align="center">
                <IconClock size={16} style={{ color: 'white' }} />
                <Text size="sm" fw={600} c="white">
                  Next Labubu Drop In:
                </Text>
              </Group>
              
              <Group gap="lg" justify="center">
                <Stack gap={0} align="center">
                  <Text size="xl" fw={800} c="white">
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </Text>
                  <Text size="xs" c="white" opacity={0.8}>
                    HOURS
                  </Text>
                </Stack>
                <Text size="xl" fw={800} c="white">:</Text>
                <Stack gap={0} align="center">
                  <Text size="xl" fw={800} c="white">
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </Text>
                  <Text size="xs" c="white" opacity={0.8}>
                    MINS
                  </Text>
                </Stack>
                <Text size="xl" fw={800} c="white">:</Text>
                <Stack gap={0} align="center">
                  <Text size="xl" fw={800} c="white">
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </Text>
                  <Text size="xs" c="white" opacity={0.8}>
                    SECS
                  </Text>
                </Stack>
              </Group>
            </Stack>
          </Paper>

          {/* CTA Section */}
          <Stack gap="md">
            <Button
              size="xl"
              radius="xl"
              fullWidth
              variant="gradient"
              gradient={{ from: labubuColors.primary, to: labubuColors.accent }}
              style={{
                height: '60px',
                fontSize: '1.1rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                boxShadow: '0 8px 25px rgba(255, 182, 193, 0.4)',
                transition: 'all 0.3s ease'
              }}
              leftSection={<IconTrendingUp size={24} />}
              onClick={onCTAClick}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(255, 182, 193, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 182, 193, 0.4)';
              }}
            >
              Get Exclusive Access Now
            </Button>

            <Group justify="space-between" align="center">
              <Text size="xs" c="dimmed">
                Limited time offer • New users only
              </Text>
              <Button
                variant="subtle"
                size="sm"
                onClick={onClose}
                style={{ color: labubuColors.primary }}
              >
                Maybe Later
              </Button>
            </Group>
          </Stack>
        </Stack>
      </Container>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </Modal>
  );
};

export default LabubuExclusiveModal;