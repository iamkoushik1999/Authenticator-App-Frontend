// import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');

  // Handle logout action with SweetAlert2
  const handleLogout = () => {
    // Show SweetAlert2 confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out from your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
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

        // Navigate to login page after toast duration
        navigate('/login');
      }
    });
  };

  return (
    <AppBar
      position='static'
      sx={{
        backgroundColor: '#1976d2',
      }}>
      <Toolbar>
        {/* App Name or Logo */}
        <Typography
          variant='h6'
          onClick={() => navigate('/')}
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            fontSize: '20px',
            cursor: 'pointer',
          }}>
          Authentication App
        </Typography>

        {/* Show Logout button only if token exists */}
        {token ? (
          <>
            <Button
              color='inherit'
              onClick={() => navigate('/authenticate')}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '16px',
              }}>
              2FA
            </Button>
            <Button
              color='inherit'
              onClick={handleLogout}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '16px',
              }}>
              Logout
            </Button>
          </>
        ) : (
          // Show Login and Sign Up buttons when user is not logged in
          <>
            <Button
              color='inherit'
              onClick={() => navigate('/login')}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '16px',
              }}>
              Login
            </Button>
            <Button
              color='inherit'
              onClick={() => navigate('/signup')}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '16px',
              }}>
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
