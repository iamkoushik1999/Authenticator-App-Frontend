import { Box, Container, Typography, Paper, Stack } from '@mui/material';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded';
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import LockPersonRoundedIcon from '@mui/icons-material/LockPersonRounded';

const features = [
  {
    icon: MarkEmailReadRoundedIcon,
    title: 'Signup with OTP Verification',
    description:
      'New users register with an email and password, then confirm ownership of their inbox by entering a one-time passcode before the account is activated.',
  },
  {
    icon: PasswordRoundedIcon,
    title: 'Passwordless OTP Login',
    description:
      'First-time and password-free logins are handled by emailing a fresh OTP that the user enters to prove it is really them.',
  },
  {
    icon: QrCode2RoundedIcon,
    title: 'Authenticator App 2FA',
    description:
      'Users can link Google Authenticator, Authy, Microsoft Authenticator or 2FAS by scanning a QR code, then log in with rotating TOTP codes.',
  },
  {
    icon: TimelineRoundedIcon,
    title: 'Login Activity Timeline',
    description:
      'Every successful login is recorded with its method and timestamp, and displayed back to the user as a visual timeline.',
  },
  {
    icon: AdminPanelSettingsRoundedIcon,
    title: 'Admin Dashboard',
    description:
      'A separate admin login can view every registered user and toggle their OTP / 2FA verification status, or remove accounts entirely.',
  },
  {
    icon: LockPersonRoundedIcon,
    title: 'JWT-Secured Sessions',
    description:
      'Access is protected end-to-end with signed JSON Web Tokens, role-based route guards, and hashed passwords via bcrypt.',
  },
];

const Features = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth='lg'>
        <Stack spacing={1.5} sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant='overline'
            sx={{ color: 'secondary.dark', fontWeight: 800, letterSpacing: 1.5 }}>
            What this demo covers
          </Typography>
          <Typography variant='h3' sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
            Every major auth pattern, in one place
          </Typography>
          <Typography variant='body1' color='text.secondary' sx={{ maxWidth: 620, mx: 'auto' }}>
            Each card below maps to a working flow you can click through right
            now &mdash; there&apos;s nothing mocked or hidden behind a slideshow.
          </Typography>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}>
          {features.map(({ icon: Icon, title, description }) => (
            <Paper
              key={title}
              elevation={0}
              sx={{
                p: 3.5,
                border: '1px solid',
                borderColor: 'divider',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 28px rgba(79, 70, 229, 0.14)',
                },
              }}>
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  backgroundImage:
                    'linear-gradient(135deg, #EEF0FF 0%, #E5D9FF 100%)',
                }}>
                <Icon sx={{ color: '#4F46E5', fontSize: 28 }} />
              </Box>
              <Typography variant='h6' sx={{ mb: 1 }}>
                {title}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {description}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Features;
