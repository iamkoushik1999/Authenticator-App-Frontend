// import React from 'react';
import { Box } from '@mui/material';
import AdminSignIn from '../../../components/Admin/SignIn/AdminSignIn';

const AdminAuth = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '70vh',
        paddingTop: 0,
      }}>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          padding: '20px',
        }}>
        <AdminSignIn />
      </Box>
    </Box>
  );
};

export default AdminAuth;
