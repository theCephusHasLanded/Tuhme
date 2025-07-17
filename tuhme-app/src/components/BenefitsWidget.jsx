import TuhmeIcon from './TuhmeIcon';
import { Grid, Container, Card, Group, Text, Box } from '@mantine/core';

const BenefitsWidget = ({ 
  variant = "default", // default, compact, inline
  showBackground = true 
}) => {
  const benefits = [
    {
      id: 'fast',
      title: 'Fast Turnaround',
      description: 'Same-day delivery for orders placed before 12 PM',
      icon: 'time'
    },
    {
      id: 'perfect-fit',
      title: 'Perfect Fit',
      description: 'Try before you buy in your own comfortable space',
      icon: 'professional'
    },
    {
      id: 'no-risk',
      title: 'No Risk',
      description: 'Pay only for items you decide to keep',
      icon: 'secure'
    }
  ];

  return (
    <Box className={`benefits-widget ${variant} ${showBackground ? 'with-background' : ''}`}>
      <Container size="lg" className="benefits-container">
        <Grid justify="center" align="stretch" gutter={{ base: 'md', sm: 'lg', md: 'xl' }}>
          {benefits.map((benefit) => (
            <Grid.Col
              key={benefit.id}
              span={{ base: 12, sm: 6, md: 4 }}
              className="benefit-card-col"
            >
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder={false}
                className="benefit-card"
                style={{
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <Group align="flex-start" gap="md">
                  <Box className="benefit-icon" style={{ flexShrink: 0 }}>
                    <TuhmeIcon type={benefit.icon} size={24} />
                  </Box>
                  <Box className="benefit-content" style={{ flex: 1 }}>
                    <Text 
                      fw={600} 
                      size="lg" 
                      mb="xs" 
                      className="benefit-title"
                      style={{ color: 'inherit' }}
                    >
                      {benefit.title}
                    </Text>
                    <Text 
                      size="sm" 
                      c="dimmed" 
                      className="benefit-description"
                      style={{ lineHeight: 1.5 }}
                    >
                      {benefit.description}
                    </Text>
                  </Box>
                </Group>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        {showBackground && (
          <Box className="benefits-background-effect" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: -1 }}>
            <div className="gradient-mesh mesh-1"></div>
            <div className="gradient-mesh mesh-2"></div>
            <div className="gradient-mesh mesh-3"></div>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default BenefitsWidget;