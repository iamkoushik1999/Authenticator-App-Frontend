import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
// React Router
import { useNavigate } from 'react-router-dom';
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
        navigate('/');
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
        navigate('/');
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
    <Box
      sx={{
        width: '400px',
        padding: '30px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}>
      <Typography
        variant='h5'
        fontWeight='bold'
        marginBottom='20px'
        color='#333'>
        Login
      </Typography>

      {/* Radio Group for Login Method */}
      <RadioGroup
        value={loginMethod}
        onChange={(e) => setLoginMethod(e.target.value)}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: '20px',
        }}>
        <FormControlLabel
          value='otp'
          control={<Radio />}
          label='Login with OTP'
        />
        <FormControlLabel
          value='2fa'
          control={<Radio />}
          label='Login with 2FA'
        />
      </RadioGroup>

      {/* Email Field */}
      <TextField
        label='Email'
        variant='outlined'
        fullWidth
        margin='normal'
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        }}
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
            />
          )}

          {/* Send OTP / Verify OTP Button */}
          <Button
            variant='contained'
            fullWidth
            sx={{
              marginTop: '20px',
              padding: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: '8px',
              backgroundColor: '#556cd6',
              color: '#ffffff',
              transition: 'all 0.3s',
              '&:hover': {
                backgroundColor: '#4054b2',
              },
            }}
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
            label='Code'
            variant='outlined'
            fullWidth
            margin='normal'
            type='text'
            value={code}
            onChange={(e) => setCode(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
          />

          {/* Login Button */}
          <Button
            variant='contained'
            fullWidth
            sx={{
              marginTop: '20px',
              padding: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: '8px',
              backgroundColor: '#556cd6',
              color: '#ffffff',
              transition: 'all 0.3s',
              '&:hover': {
                backgroundColor: '#4054b2',
              },
            }}
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
      <Typography variant='body2' color='textSecondary' marginTop='20px'>
        Don&apos;t have an account?{' '}
        <Link
          href='/signup'
          sx={{
            color: '#556cd6',
            fontWeight: 'bold',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}>
          Click Here
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;
