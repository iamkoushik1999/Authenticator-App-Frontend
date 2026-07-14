// import React from 'react';
import { Box } from '@mui/material';
import AdminSignIn from '../../../components/Admin/SignIn/AdminSignIn';

const AdminAuth = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 140px)',
        padding: '40px 20px',
        backgroundImage:
          'radial-gradient(circle at 15% 15%, rgba(30,41,59,0.08), transparent 40%), radial-gradient(circle at 85% 85%, rgba(67,56,202,0.10), transparent 40%)',
      }}>
      <AdminSignIn />
    </Box>
  );
};

export default AdminAuth;
