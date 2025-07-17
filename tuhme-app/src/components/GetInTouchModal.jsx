import { useState } from 'react';
import {
  Modal,
  TextInput,
  Textarea,
  Select,
  Button,
  Group,
  Stack,
  Text,
  Title,
  Tabs,
  Paper,
  ThemeIcon,
  Alert,
  useMantineTheme,
  Anchor
} from '@mantine/core';
import { 
  IconMail, 
  IconCheck, 
  IconPhone, 
  IconMapPin, 
  IconSend,
  IconShoppingBag,
  IconInfoCircle,
  IconQuestionMark
} from '@tabler/icons-react';
import TuhmeIcon from './TuhmeIcon';

const GetInTouchModal = ({ isOpen, onClose }) => {
  const theme = useMantineTheme();
  const currentPalette = theme.other?.currentPalette;
  const [activeTab, setActiveTab] = useState('contact'); // contact, form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate WhatsApp message for contact
    const message = encodeURIComponent(
      `New Contact Form Submission:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
    );
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const isFormValid = () => {
    return formData.name && formData.email && formData.phone && formData.message;
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setActiveTab('contact');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (isSubmitted) {
    return (
      <Modal opened={isOpen} onClose={handleClose} centered size="md">
        <Paper p="xl" style={{ textAlign: 'center' }}>
          <Stack align="center" gap="lg">
            <ThemeIcon size={80} variant="light" color="green">
              <IconCheck size={40} />
            </ThemeIcon>
            <Title order={2}>Thank You!</Title>
            <Text c="dimmed">
              We've received your message and will get back to you within 24 hours.
            </Text>
            <Group>
              <Button variant="outline" onClick={resetForm}>
                Send Another Message
              </Button>
              <Button onClick={handleClose}>
                Close
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Modal>
    );
  }

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      title={
        <Group align="center" gap="sm">
          <ThemeIcon
            size="lg"
            variant="light"
            color={currentPalette?.accent || theme.colors.brand[5]}
          >
            <IconMail size={20} />
          </ThemeIcon>
          <Title order={3} c={currentPalette?.accent || theme.colors.brand[5]}>
            Get In Touch
          </Title>
        </Group>
      }
      size="xl"
      centered
    >
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          Have questions about our service? Want to partner with us? We'd love to hear from you.
        </Text>

        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="contact" leftSection={<IconInfoCircle size={16} />}>
              Contact Info
            </Tabs.Tab>
            <Tabs.Tab value="form" leftSection={<IconSend size={16} />}>
              Send Message
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="contact" pt="md">
            <Stack gap="lg">
              <Paper withBorder p="md">
                <Group>
                  <ThemeIcon size="lg" variant="light" color={currentPalette?.accent || theme.colors.brand[5]}>
                    <IconMail size={20} />
                  </ThemeIcon>
                  <div>
                    <Text fw={600}>Email Support</Text>
                    <Text size="sm" c="dimmed">For orders, partnerships, press inquiries, and all questions</Text>
                    <Anchor href="mailto:support@tuhme.com" c={currentPalette?.accent || theme.colors.brand[5]}>
                      support@tuhme.com
                    </Anchor>
                  </div>
                </Group>
              </Paper>

              <Paper withBorder p="md">
                <Group>
                  <ThemeIcon size="lg" variant="light" color={currentPalette?.accent || theme.colors.brand[5]}>
                    <IconMapPin size={20} />
                  </ThemeIcon>
                  <div>
                    <Text fw={600}>Service Area</Text>
                    <Text size="sm" c="dimmed">Currently serving Manhattan and Brooklyn</Text>
                    <Text size="xs" c="dimmed">Expanding to more NYC areas soon</Text>
                  </div>
                </Group>
              </Paper>

              <Paper withBorder p="md">
                <Text fw={600} mb="sm">Quick Actions</Text>
                <Group>
                  <Button
                    variant="outline"
                    leftSection={<IconShoppingBag size={16} />}
                    onClick={() => {
                      handleClose();
                      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    View Pricing
                  </Button>
                  <Button
                    variant="outline"
                    leftSection={<IconInfoCircle size={16} />}
                    onClick={() => {
                      handleClose();
                      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    How It Works
                  </Button>
                  <Button
                    component="a"
                    href="mailto:support@tuhme.com?subject=Question%20about%20TUHME"
                    leftSection={<IconQuestionMark size={16} />}
                  >
                    Ask a Question
                  </Button>
                </Group>
              </Paper>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="form" pt="md">
            <form onSubmit={handleSubmit}>
              <Stack gap="md">
                <Group grow>
                  <TextInput
                    label="Name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                  <TextInput
                    label="Email"
                    placeholder="your.email@example.com"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </Group>

                <Group grow>
                  <TextInput
                    label="Phone"
                    placeholder="Your phone number"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                  <Select
                    label="Subject"
                    placeholder="Select a topic"
                    value={formData.subject}
                    onChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
                    data={[
                      { value: 'General Question', label: 'General Question' },
                      { value: 'Order Support', label: 'Order Support' },
                      { value: 'Partnership', label: 'Partnership Inquiry' },
                      { value: 'Press', label: 'Press & Media' },
                      { value: 'Careers', label: 'Careers' },
                      { value: 'Feedback', label: 'Feedback' }
                    ]}
                  />
                </Group>

                <Textarea
                  label="Message"
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  minRows={4}
                  required
                />

                <Alert
                  icon={<IconInfoCircle size={16} />}
                  title="Privacy Notice"
                  variant="light"
                  color="gray"
                >
                  <Text size="xs">
                    This form is protected by reCAPTCHA and the Google{' '}
                    <Anchor href="#" size="xs">Privacy Policy</Anchor> and{' '}
                    <Anchor href="#" size="xs">Terms of Service</Anchor> apply.
                  </Text>
                </Alert>

                <Group justify="space-between" mt="lg">
                  <Button variant="subtle" onClick={handleClose} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={!isFormValid()}
                    leftSection={<IconSend size={16} />}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </Group>
              </Stack>
            </form>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Modal>
  );
};

export default GetInTouchModal;