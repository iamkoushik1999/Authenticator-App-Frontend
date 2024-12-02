import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
// React Router
import { useNavigate } from 'react-router-dom';
// React Hot Toast
import toast from 'react-hot-toast';
// Sweet Alert
import Swal from 'sweetalert2';
import { ADMIN_SIGNIN_URL } from '../../../api/auth';
// API

const AdminSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Tracks loading state

  const navigate = useNavigate();

  // Toggle visibility of password fields
  const handleTogglePassword = () => setShowPassword(!showPassword);

  // Handle "Admin SignIn" API call
  const handleSignIn = async () => {
    setLoading(true);

    try {
      const response = await fetch(ADMIN_SIGNIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          title: 'Signed In',
          text: data.message,
          icon: 'success',
        });
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        setEmail('');
        setPassword('');
        setShowPassword(false);
        navigate('/dashboard');
      } else {
        toast.error(data.message || 'Failed to sign in.', {
          position: 'top-center',
          duration: 3000,
        });
      }
    } catch (err) {
      console.log('An error occurred while signing in.', err);
      toast.error('An error occurred while signing in.', {
        position: 'top-center',
        duration: 3000,
      });
    } finally {
      setLoading(false);
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
        Admin Sign In
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

      {/* Sign In */}
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
        onClick={handleSignIn}
        disabled={loading}>
        {loading ? (
          <CircularProgress size={24} sx={{ color: '#fff' }} />
        ) : (
          'Sign In'
        )}
      </Button>
    </Box>
  );
};

export default AdminSignIn;
