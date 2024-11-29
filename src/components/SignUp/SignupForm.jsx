import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  IconButton,
  InputAdornment,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false); // Tracks if OTP was sent
  const [loading, setLoading] = useState(false); // Tracks loading state
  const [error, setError] = useState(null); // Tracks error messages
  const [successMessage, setSuccessMessage] = useState(''); // Tracks success messages
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state

  const navigate = useNavigate();

  // Toggle visibility of password fields
  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Handle "Send OTP" API call
  const handleSendOtp = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'http://localhost:5050/api/v1/auth/send-otp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, confirmPassword }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setOtpSent(true); // OTP was sent successfully
        setSuccessMessage(data.message);
        setOpenSnackbar(true); // Open Snackbar for success message
      } else {
        setError(data.message || 'Failed to send OTP.');
      }
    } catch (err) {
      setError('An error occurred while sending the OTP.', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle "Verify OTP" (Placeholder function for now)
  // Handle "Verify OTP" API call
  const handleVerifyOtp = async () => {
    setLoading(true); // Show loader
    setError(null); // Reset error

    try {
      const response = await fetch(
        'http://localhost:5050/api/v1/auth/verify-otp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            otp,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(data.message);
        setOpenSnackbar(true); // Show success notification
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setShowPassword(false);
        setShowConfirmPassword(false);
        setOtp('');
        setOtpSent('');
        navigate('/');
      } else {
        setError(data.message || 'Failed to verify OTP.');
      }
    } catch (err) {
      setError('An error occurred while verifying the OTP.', err);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
        Sign Up
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
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        }}
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
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
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
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
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
        onClick={otpSent ? handleVerifyOtp : handleSendOtp}
        disabled={loading}>
        {loading ? (
          <CircularProgress size={24} sx={{ color: '#fff' }} />
        ) : otpSent ? (
          'Verify OTP'
        ) : (
          'Send OTP'
        )}
      </Button>

      {/* Error Message */}
      {error && (
        <Typography color='error' marginTop='10px'>
          {error}
        </Typography>
      )}

      {/* Snackbar for Success Messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert
          onClose={handleCloseSnackbar}
          severity='success'
          sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Login Link */}
      <Typography variant='body2' color='textSecondary' marginTop='20px'>
        Already have an account?{' '}
        <Link
          href='/login'
          sx={{
            color: '#556cd6',
            fontWeight: 'bold',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}>
          Login
        </Link>
      </Typography>
    </Box>
  );
};

export default SignupForm;
