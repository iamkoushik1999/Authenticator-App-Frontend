import { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
  Paper,
  Avatar,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
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
          backgroundImage: 'linear-gradient(135deg, #1E293B 0%, #4338CA 100%)',
        }}>
        <AdminPanelSettingsRoundedIcon />
      </Avatar>

      <Typography variant='h5' fontWeight={800} marginBottom='6px'>
        Admin Sign In
      </Typography>
      <Typography variant='body2' color='text.secondary' marginBottom='24px'>
        Manage users, verification status, and access.
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

      {/* Sign In */}
      <Button
        variant='contained'
        fullWidth
        size='large'
        sx={{ marginTop: '16px' }}
        onClick={handleSignIn}
        disabled={loading}>
        {loading ? (
          <CircularProgress size={24} sx={{ color: '#fff' }} />
        ) : (
          'Sign In'
        )}
      </Button>
    </Paper>
  );
};

export default AdminSignIn;
