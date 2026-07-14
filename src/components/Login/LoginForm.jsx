import { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Link,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
  Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// React Router
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// React Hot Toast
import toast from 'react-hot-toast';
// Sweet Alert
import Swal from 'sweetalert2';
// API
import {
  SEND_LOGIN_OTP_URL,
  VERIFY_CODE_URL,
  VERIFY_OTP_URL,
} from '../../api/auth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false); // Tracks if OTP was sent
  const [loginMethod, setLoginMethod] = useState('otp'); // Default login method
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle "Verify Code" API call
  const handleLoginWithCode = async () => {
    setLoading(true);

    try {
      const response = await fetch(VERIFY_CODE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          title: '2FA Verified',
          text: data.message,
          icon: 'success',
        });
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        navigate('/history');
      } else {
        toast.error(data.message || 'Failed to verify 2FA.', {
          position: 'top-center',
          duration: 3000,
        });
      }
    } catch (err) {
      console.log('An error occurred while verifying 2FA.', err);
      toast.error('An error occurred while verifying 2FA.', {
        position: 'top-center',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle "Send OTP" API call
  const handleLoginSendOtp = async () => {
    setLoading(true);

    try {
      const response = await fetch(SEND_LOGIN_OTP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setOtpSent(true); // OTP was sent successfully
        Swal.fire({
          title: 'OTP Generated',
          text: data.message,
          icon: 'success',
        });
      } else {
        toast.error(data.message || 'Failed to send OTP.', {
          position: 'top-center',
          duration: 3000,
        });
      }
    } catch (err) {
      console.log('An error occurred while sending the OTP.', err);
      toast.error('An error occurred while sending the OTP.', {
        position: 'top-center',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle "Verify OTP" API call
  const handleVerifyOtp = async () => {
    setLoading(true);

    try {
      const response = await fetch(VERIFY_OTP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message, {
          position: 'top-center',
          duration: 3000,
        });
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        setEmail('');
        setOtp('');
        setOtpSent('');
        navigate('/history');
      } else {
        toast.error(data.message || 'Failed to verify OTP.', {
          position: 'top-center',
          duration: 3000,
        });
      }
    } catch (err) {
      console.log('An error occurred while verifying the OTP.', err);
      toast.error('An error occurred while verifying the OTP.', {
        position: 'top-center',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    if (loginMethod === 'otp') {
      handleVerifyOtp();
    } else {
      handleLoginWithCode();
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: '420px',
        maxWidth: '100%',
        padding: '36px',
        textAlign: 'center',
      }}>
      <Avatar
        sx={{
          mx: 'auto',
          mb: 2,
          width: 56,
          height: 56,
          backgroundImage: 'linear-gradient(135deg, #4F46E5 0%, #6D28D9 100%)',
        }}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography variant='h5' fontWeight={800} marginBottom='6px'>
        Welcome back
      </Typography>
      <Typography variant='body2' color='text.secondary' marginBottom='24px'>
        Log in with a one-time passcode or your authenticator app.
      </Typography>

      {/* Login Method Switch */}
      <ToggleButtonGroup
        value={loginMethod}
        exclusive
        onChange={(e, value) => value && setLoginMethod(value)}
        fullWidth
        sx={{
          marginBottom: '20px',
          '& .MuiToggleButton-root': {
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: '10px !important',
            py: 1,
          },
        }}>
        <ToggleButton value='otp'>Login with OTP</ToggleButton>
        <ToggleButton value='2fa'>Login with 2FA</ToggleButton>
      </ToggleButtonGroup>

      {/* Email Field */}
      <TextField
        label='Email'
        variant='outlined'
        fullWidth
        margin='normal'
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Conditional Fields Based on Login Method */}
      {loginMethod === 'otp' && (
        <>
          {/* Conditional OTP Input */}
          {otpSent && (
            <TextField
              label='Enter OTP'
              variant='outlined'
              fullWidth
              margin='normal'
              type='text'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          )}

          {/* Send OTP / Verify OTP Button */}
          <Button
            variant='contained'
            fullWidth
            size='large'
            sx={{ marginTop: '16px' }}
            onClick={otpSent ? handleVerifyOtp : handleLoginSendOtp}
            disabled={loading}>
            {loading ? (
              <CircularProgress size={24} sx={{ color: '#fff' }} />
            ) : otpSent ? (
              'Login'
            ) : (
              'Send OTP'
            )}
          </Button>
        </>
      )}

      {loginMethod === '2fa' && (
        <>
          <TextField
            label='6-digit Code'
            variant='outlined'
            fullWidth
            margin='normal'
            type='text'
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          {/* Login Button */}
          <Button
            variant='contained'
            fullWidth
            size='large'
            sx={{ marginTop: '16px' }}
            onClick={handleLogin}
            disabled={loading}>
            {loading ? (
              <CircularProgress size={24} sx={{ color: '#fff' }} />
            ) : (
              'Login'
            )}
          </Button>
        </>
      )}

      {/* Signup Link */}
      <Typography variant='body2' color='text.secondary' marginTop='24px'>
        Don&apos;t have an account?{' '}
        <Link
          component={RouterLink}
          to='/signup'
          sx={{
            color: 'primary.main',
            fontWeight: 700,
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
              cursor: 'pointer',
            },
          }}>
          Sign up
        </Link>
      </Typography>
    </Paper>
  );
};

export default LoginForm;
