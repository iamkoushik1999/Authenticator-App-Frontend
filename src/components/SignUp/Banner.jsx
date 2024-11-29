import { Box, Typography } from '@mui/material';

const Banner = () => {
  return (
    <Box
      sx={{
        width: '100%',
        padding: '20px',
        backgroundColor: '#556cd6', // Soft, modern blue
        color: '#ffffff',
        textAlign: 'center',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
      }}>
      <Typography variant='h4' fontWeight='bold'>
        Welcome to Sign Up
      </Typography>
      <Typography variant='subtitle1'>
        Create your account to explore modern features
      </Typography>
    </Box>
  );
};

export default Banner;
