// import React from 'react'

import { Box } from '@mui/material';
import Banner from '../../../components/Admin/Dashboard/Banner';
import UserList from '../../../components/Admin/Dashboard/UserList';

const Dashboard = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '70vh',
        paddingTop: 0,
      }}>
      <Banner />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          padding: '20px',
        }}>
        <UserList />
      </Box>
    </Box>
  );
};

export default Dashboard;
