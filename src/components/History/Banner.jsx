// import React from 'react';
import { Typography } from '@mui/material';

const Banner = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '20px',
        width: '100%',
      }}>
      <Typography
        variant='h5'
        fontWeight='bold'
        marginBottom='20px'
        color='#333'>
        Login History
      </Typography>
    </div>
  );
};

export default Banner;
