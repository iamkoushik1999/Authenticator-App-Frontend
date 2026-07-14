// import React from 'react';
import { Box, Typography, Link, Stack } from '@mui/material';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        backgroundImage: 'linear-gradient(90deg, #4338CA 0%, #6D28D9 100%)',
        color: '#fff',
        padding: '32px 20px 24px',
        textAlign: 'center',
      }}>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='center'
        spacing={1}
        sx={{ mb: 1 }}>
        <VerifiedUserRoundedIcon sx={{ fontSize: 22 }} />
        <Typography variant='subtitle1' fontWeight={800}>
          Authenticator App
        </Typography>
      </Stack>

      <Typography
        variant='body2'
        sx={{ fontSize: '13px', opacity: 0.85, marginBottom: '16px' }}>
        A demo project showcasing OTP &amp; TOTP 2FA authentication flows.
        Built for learning &mdash; not for production use.
      </Typography>

      {/* Navigation Links */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '18px',
          marginBottom: '16px',
        }}>
        <Link
          href='/'
          underline='hover'
          sx={{ color: '#fff', fontSize: '14px' }}>
          About
        </Link>
        <Link
          href='/signup'
          underline='hover'
          sx={{ color: '#fff', fontSize: '14px' }}>
          Sign Up
        </Link>
        <Link
          href='/login'
          underline='hover'
          sx={{ color: '#fff', fontSize: '14px' }}>
          Login
        </Link>
        <Link
          href='/admin/login'
          underline='hover'
          sx={{ color: '#fff', fontSize: '14px' }}>
          Admin
        </Link>
      </Box>

      <Typography variant='caption' sx={{ display: 'block', opacity: 0.75 }}>
        &copy; {new Date().getFullYear()} Authenticator App. All rights
        reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
