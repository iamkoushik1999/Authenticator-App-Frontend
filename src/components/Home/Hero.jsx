import { Box, Container, Typography, Button, Stack, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded';

const otpDigits = ['4', '8', '2', '0', '', ''];

const DeviceMock = () => (
  <Paper
    elevation={0}
    sx={{
      border: '1px solid',
      borderColor: 'divider',
      boxShadow: '0 24px 48px -16px rgba(30, 34, 51, 0.18)',
      overflow: 'hidden',
      maxWidth: 380,
      mx: { xs: 'auto', md: 0 },
    }}>
    {/* window chrome */}
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.75,
        px: 2,
        py: 1.25,
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: '#FAFAFC',
      }}>
      {['#F87171', '#FBBF24', '#34D399'].map((c) => (
        <Box key={c} sx={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: c }} />
      ))}
      <Typography
        variant='caption'
        sx={{ ml: 1.5, color: 'text.secondary', fontFamily: 'monospace' }}>
        localhost/authenticate
      </Typography>
    </Box>

    <Box sx={{ p: 3 }}>
      <Typography variant='subtitle2' sx={{ fontWeight: 800, mb: 0.5 }}>
        Enter your 2FA code
      </Typography>
      <Typography variant='caption' color='text.secondary'>
        From Google Authenticator, Authy, or 2FAS
      </Typography>

      <Stack direction='row' spacing={1} sx={{ my: 2.5 }}>
        {otpDigits.map((digit, i) => (
          <Box
            key={i}
            sx={{
              width: 40,
              height: 48,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.1rem',
              border: '1.5px solid',
              borderColor: i === 4 ? 'primary.main' : 'divider',
              boxShadow: i === 4 ? '0 0 0 3px rgba(79,70,229,0.15)' : 'none',
              color: 'text.primary',
            }}>
            {digit}
          </Box>
        ))}
      </Stack>

      <Box
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          pt: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}>
        <Stack direction='row' alignItems='center' spacing={1}>
          <CheckCircleRoundedIcon sx={{ fontSize: 16, color: 'secondary.main' }} />
          <Typography variant='caption' color='text.secondary'>
            2FA Login &mdash; just now
          </Typography>
        </Stack>
        <Stack direction='row' alignItems='center' spacing={1}>
          <PasswordRoundedIcon sx={{ fontSize: 16, color: 'primary.main' }} />
          <Typography variant='caption' color='text.secondary'>
            OTP Login &mdash; 2 minutes ago
          </Typography>
        </Stack>
      </Box>
    </Box>
  </Paper>
);

const Hero = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');

  return (
    <Box sx={{ backgroundColor: '#FBFAFF', pt: { xs: 7, md: 10 }, pb: { xs: 8, md: 11 } }}>
      <Container maxWidth='lg'>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 6, md: 8 }}
          alignItems='center'>
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant='overline'
              sx={{ color: 'secondary.dark', fontWeight: 800, letterSpacing: 1.5 }}>
              MERN Stack &middot; Demo Project
            </Typography>

            <Typography
              variant='h2'
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '2.9rem' },
                lineHeight: 1.15,
                mt: 1,
                mb: 2,
              }}>
              OTP signup and 2FA login, built end to end
            </Typography>

            <Typography
              variant='body1'
              color='text.secondary'
              sx={{ fontSize: '1.05rem', maxWidth: 480, mx: { xs: 'auto', md: 0 }, mb: 4 }}>
              Create an account, verify a one-time code, then link an
              authenticator app for 2FA. Every screen here is wired to a real
              Express API and MongoDB &mdash; nothing is a static mockup.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              justifyContent={{ xs: 'center', md: 'flex-start' }}>
              {token ? (
                <>
                  <Button
                    size='large'
                    variant='contained'
                    endIcon={<ArrowForwardRoundedIcon />}
                    onClick={() => navigate('/history')}
                    sx={{ px: 3.5 }}>
                    View My Login History
                  </Button>
                  <Button size='large' variant='text' onClick={() => navigate('/authenticate')}>
                    Set Up 2FA
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size='large'
                    variant='contained'
                    endIcon={<ArrowForwardRoundedIcon />}
                    onClick={() => navigate('/signup')}
                    sx={{ px: 3.5 }}>
                    Try the Signup Flow
                  </Button>
                  <Button size='large' variant='text' onClick={() => navigate('/login')}>
                    Login
                  </Button>
                </>
              )}
            </Stack>

            <Stack
              direction='row'
              spacing={0.75}
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              alignItems='center'
              sx={{ mt: 3.5, color: 'text.secondary' }}>
              <GitHubIcon fontSize='small' />
              <Typography variant='body2'>
                Open source &mdash; read the code as you click through it.
              </Typography>
            </Stack>
          </Box>

          <Box sx={{ flex: 1, width: '100%' }}>
            <DeviceMock />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Hero;
