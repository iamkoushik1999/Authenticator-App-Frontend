import { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Link,
  IconButton,
  InputAdornment,
  CircularProgress,
  Paper,
  Avatar,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
// React Router
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// React Hot Toast
import toast from 'react-hot-toast';
// Sweet Alert
import Swal from 'sweetalert2';
// API
import { SEND_SIGNUP_OTP_URL, VERIFY_OTP_URL } from '../../api/auth';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false); // Tracks if OTP was sent
  const [loading, setLoading] = useState(false); // Tracks loading state

  const navigate = useNavigate();

  // Toggle visibility of password fields
  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Handle "Send OTP" API call
  const handleSignupSendOtp = async () => {
    setLoading(true);

    try {
      const response = await fetch(SEND_SIGNUP_OTP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, confirmPassword }),
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
    setLoading(true); // Show loader

    try {
      const response = await fetch(VERIFY_OTP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
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
        setPassword('');
        setConfirmPassword('');
        setShowPassword(false);
        setShowConfirmPassword(false);
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
      setLoading(false); // Hide loader
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
        <PersonAddAltRoundedIcon />
      </Avatar>

      <Typography variant='h5' fontWeight={800} marginBottom='6px'>
        Create your account
      </Typography>
      <Typography variant='body2' color='text.secondary' marginBottom='24px'>
        We&apos;ll send you a one-time code to verify your email.
      </Typography>

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

      {/* Password Field */}
      <TextField
        label='Password'
        variant='outlined'
        fullWidth
        margin='normal'
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={handleTogglePassword} edge='end'>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Confirm Password Field */}
      <TextField
        label='Confirm Password'
        variant='outlined'
        fullWidth
        margin='normal'
        type={showConfirmPassword ? 'text' : 'password'}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={handleToggleConfirmPassword} edge='end'>
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

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
        onClick={otpSent ? handleVerifyOtp : handleSignupSendOtp}
        disabled={loading}>
        {loading ? (
          <CircularProgress size={24} sx={{ color: '#fff' }} />
        ) : otpSent ? (
          'Verify OTP'
        ) : (
          'Send OTP'
        )}
      </Button>

      {/* Login Link */}
      <Typography variant='body2' color='text.secondary' marginTop='24px'>
        Already have an account?{' '}
        <Link
          component={RouterLink}
          to='/login'
          sx={{
            color: 'primary.main',
            fontWeight: 700,
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
              cursor: 'pointer',
            },
          }}>
          Login
        </Link>
      </Typography>
    </Paper>
  );
};

export default SignupForm;
