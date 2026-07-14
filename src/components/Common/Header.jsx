// import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const navButtonSx = {
  textTransform: 'none',
  fontWeight: 700,
  fontSize: '15px',
  borderRadius: '8px',
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('accessToken');
  const isAdminArea = location.pathname === '/dashboard';

  // Handle logout action with SweetAlert2
  const handleLogout = () => {
    // Show SweetAlert2 confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out from your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4F46E5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout',
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear tokens from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        // Show success toast
        toast.success('Logged out successfully!', {
          position: 'top-center',
          duration: 3000,
        });

        // Navigate to home page after toast duration
        navigate('/');
      }
    });
  };

  return (
    <AppBar position='static' elevation={0}>
      <Toolbar sx={{ py: 1, flexWrap: 'wrap', gap: 1 }}>
        {/* App Name or Logo */}
        <Box
          onClick={() => navigate('/')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexGrow: 1,
            cursor: 'pointer',
          }}>
          <VerifiedUserRoundedIcon sx={{ fontSize: 28 }} />
          <Typography
            variant='h6'
            sx={{
              fontWeight: 800,
              fontSize: '20px',
              letterSpacing: '0.2px',
            }}>
            Authenticator
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {token ? (
            isAdminArea ? (
              // Only show Logout when on /dashboard
              <Button color='inherit' onClick={handleLogout} sx={navButtonSx}>
                Logout
              </Button>
            ) : (
              // Show Home, History, 2FA and Logout for a logged-in user
              <>
                <Button
                  color='inherit'
                  onClick={() => navigate('/')}
                  sx={navButtonSx}>
                  Home
                </Button>
                <Button
                  color='inherit'
                  onClick={() => navigate('/history')}
                  sx={navButtonSx}>
                  History
                </Button>
                <Button
                  color='inherit'
                  onClick={() => navigate('/authenticate')}
                  sx={navButtonSx}>
                  2FA
                </Button>
                <Button
                  color='inherit'
                  onClick={handleLogout}
                  sx={{
                    ...navButtonSx,
                    ml: 0.5,
                    border: '1px solid rgba(255,255,255,0.5)',
                  }}>
                  Logout
                </Button>
              </>
            )
          ) : (
            // Show Login and Sign Up buttons when user is not logged in
            <>
              <Button
                color='inherit'
                onClick={() => navigate('/login')}
                sx={navButtonSx}>
                Login
              </Button>
              <Button
                variant='contained'
                onClick={() => navigate('/signup')}
                sx={{
                  ...navButtonSx,
                  backgroundImage: 'none',
                  backgroundColor: '#ffffff',
                  color: '#4338CA',
                  '&:hover': { backgroundImage: 'none', backgroundColor: '#EEF0FF' },
                }}>
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
