import { Box, Container, Typography, Stack } from '@mui/material';

const steps = [
  {
    title: 'Create an account',
    description:
      'Enter an email and password. The API creates the user record and generates a one-time passcode.',
  },
  {
    title: 'Verify the OTP',
    description:
      'Enter the code shown on screen to confirm the signup and activate the account — no real email is sent in this demo.',
  },
  {
    title: 'Log in with OTP',
    description:
      'For your first few logins, request a fresh OTP and enter it to sign in and receive your access & refresh tokens.',
  },
  {
    title: 'Connect an authenticator app',
    description:
      'Scan the generated QR code with Google Authenticator, Authy, Microsoft Authenticator or 2FAS to enroll in TOTP-based 2FA.',
  },
  {
    title: 'Log in with a 2FA code',
    description:
      'From then on, log in instantly with the 6-digit rotating code from your authenticator app instead of waiting on an OTP.',
  },
  {
    title: 'Review your login timeline',
    description:
      'Every successful login — OTP or 2FA — is logged and shown back to you as a timeline of when and how you signed in.',
  },
];

const HowItWorks = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth='md'>
        <Stack spacing={1.5} sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant='overline'
            sx={{ color: 'secondary.dark', fontWeight: 800, letterSpacing: 1.5 }}>
            The full journey
          </Typography>
          <Typography variant='h3' sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
            How it works, step by step
          </Typography>
        </Stack>

        <Stack spacing={0}>
          {steps.map((step, index) => (
            <Stack key={step.title} direction='row' spacing={2.5}>
              <Stack alignItems='center' sx={{ width: 44 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    color: '#fff',
                    flexShrink: 0,
                    backgroundImage:
                      'linear-gradient(135deg, #4F46E5 0%, #6D28D9 100%)',
                  }}>
                  {index + 1}
                </Box>
                {index < steps.length - 1 && (
                  <Box
                    sx={{
                      width: '2px',
                      flex: 1,
                      minHeight: 28,
                      backgroundColor: 'divider',
                      my: 0.5,
                    }}
                  />
                )}
              </Stack>
              <Box sx={{ pb: index < steps.length - 1 ? 3.5 : 0 }}>
                <Typography variant='h6' sx={{ mb: 0.5 }}>
                  {step.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {step.description}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default HowItWorks;
