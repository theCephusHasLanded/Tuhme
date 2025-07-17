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
  Alert,
  Paper,
  ThemeIcon,
  useMantineTheme
} from '@mantine/core';
import { IconMail, IconCheck, IconAlertCircle } from '@tabler/icons-react';
import TuhmeIcon from './TuhmeIcon';

const FeedbackModal = ({ isOpen, onClose }) => {
  const theme = useMantineTheme();
  const currentPalette = theme.other?.currentPalette;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(`TUHME Feedback: ${formData.subject}`);
      const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Feedback Type: ${formData.type}

Message:
${formData.message}

---
Sent from TUHME Feedback Form
      `);
      
      const mailtoLink = `mailto:support@tuhme.com?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;
      
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setFormData({ name: '', email: '', subject: '', message: '', type: 'general' });
        setSubmitStatus(null);
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
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
            Send Feedback
          </Title>
        </Group>
      }
      size="lg"
      centered
    >
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          We'd love to hear from you! Your feedback helps us improve.
        </Text>

        {submitStatus === 'success' ? (
          <Paper p="xl" withBorder style={{ textAlign: 'center' }}>
            <Stack align="center" gap="md">
              <ThemeIcon size={60} variant="light" color="green">
                <IconCheck size={30} />
              </ThemeIcon>
              <Title order={4}>Thank you!</Title>
              <Text size="sm" c="dimmed">
                Your feedback has been prepared for sending. Please send the email that opened in your email client.
              </Text>
              <Button variant="subtle" onClick={onClose}>
                Close
              </Button>
            </Stack>
          </Paper>
        ) : (
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <Group grow>
                <TextInput
                  label="Name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <TextInput
                  label="Email"
                  placeholder="your.email@example.com"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </Group>

              <Select
                label="Feedback Type"
                placeholder="Select feedback type"
                value={formData.type}
                onChange={(value) => setFormData({ ...formData, type: value })}
                data={[
                  { value: 'general', label: 'General Feedback' },
                  { value: 'bug', label: 'Bug Report' },
                  { value: 'feature', label: 'Feature Request' },
                  { value: 'complaint', label: 'Complaint' },
                  { value: 'compliment', label: 'Compliment' },
                  { value: 'partnership', label: 'Partnership Inquiry' }
                ]}
              />

              <TextInput
                label="Subject"
                placeholder="Brief summary of your feedback"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />

              <Textarea
                label="Message"
                placeholder="Please share your detailed feedback here..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                minRows={4}
                required
              />

              <Alert
                icon={<IconMail size={16} />}
                title="Direct Contact"
                variant="light"
                color={currentPalette?.accent || theme.colors.brand[5]}
              >
                <Text size="sm">
                  You can also reach us directly at:{' '}
                  <Text
                    component="a"
                    href="mailto:support@tuhme.com"
                    c={currentPalette?.accent || theme.colors.brand[5]}
                    td="underline"
                  >
                    support@tuhme.com
                  </Text>
                </Text>
              </Alert>

              <Group justify="space-between" mt="md">
                <Button
                  variant="subtle"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={!formData.name || !formData.email || !formData.message}
                  leftSection={<IconMail size={16} />}
                >
                  {isSubmitting ? 'Preparing...' : 'Send Feedback'}
                </Button>
              </Group>
            </Stack>
          </form>
        )}
      </Stack>
    </Modal>
  );
};

export default FeedbackModal;