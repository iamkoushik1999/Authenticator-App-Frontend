// import React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        backgroundColor: '#1976d2',
        color: '#fff',
        padding: '20px 10px',
        textAlign: 'center',
      }}>
      {/* Copyright Information */}
      <Typography
        variant='body2'
        sx={{ fontSize: '14px', marginBottom: '10px' }}>
        &copy; {new Date().getFullYear()} Authentication App. All rights
        reserved.
      </Typography>

      {/* Navigation Links */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          marginBottom: '10px',
        }}>
        <Link
          href='/'
          underline='hover'
          sx={{ color: '#fff', fontSize: '14px' }}>
          About Us
        </Link>
        <Link
          href='/'
          underline='hover'
          sx={{ color: '#fff', fontSize: '14px' }}>
          Contact
        </Link>
        <Link
          href='/'
          underline='hover'
          sx={{ color: '#fff', fontSize: '14px' }}>
          Privacy Policy
        </Link>
        <Link
          href='/'
          underline='hover'
          sx={{ color: '#fff', fontSize: '14px' }}>
          Terms of Service
        </Link>
      </Box>

      {/* Social Media Icons */}
      <Box>
        <IconButton
          aria-label='Twilio Authy Authenticator'
          href='https://play.google.com/store/apps/details?id=com.authy.authy&hl=en_IN'
          target='_blank'
          sx={{ color: '#fff' }}>
          <img
            src='https://static-00.iconduck.com/assets.00/authy-icon-2048x2048-32v2x8k3.png'
            alt='Twilio Authy Authenticator'
            style={{ width: '30px', height: '30px' }} // Adjusted size
          />
        </IconButton>
        <IconButton
          aria-label='Google Authenticator'
          href='https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_IN'
          target='_blank'
          sx={{ color: '#fff' }}>
          <img
            src='https://play-lh.googleusercontent.com/NntMALIH4odanPPYSqUOXsX8zy_giiK2olJiqkcxwFIOOspVrhMi9Miv6LYdRnKIg-3R=w240-h480-rw'
            alt='Google Authenticator'
            style={{ width: '30px', height: '30px' }} // Adjusted size
          />
        </IconButton>
        <IconButton
          aria-label='Microsoft Authenticator'
          href='https://play.google.com/store/apps/details?id=com.azure.authenticator&hl=en_IN'
          target='_blank'
          sx={{ color: '#fff' }}>
          <img
            src='https://play-lh.googleusercontent.com/_1CV99jklLbXuun-6E7eCPR-sKKeZc602rhw_QHZz-qm7xrPdgWsJVc7NtFkkliI8No=w240-h480-rw'
            alt='Microsoft Authenticator'
            style={{ width: '30px', height: '30px' }} // Adjusted size
          />
        </IconButton>
        <IconButton
          aria-label='2FA Authenticator (2FAS)'
          href='https://apps.apple.com/us/app/2fa-authenticator-2fas/id1217793794'
          target='_blank'
          sx={{ color: '#fff' }}>
          <img
            src='https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/24/0c/34/240c34fe-27d7-3062-c256-69750b42f093/AppIcon-0-0-1x_U007epad-0-1-0-85-220.png/350x350.png?'
            alt='2FA Authenticator (2FAS)'
            style={{ width: '30px', height: '30px' }} // Adjusted size
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
