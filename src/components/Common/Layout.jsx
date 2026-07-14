import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}>
      <Header />
      <Box component='main' sx={{ flex: 1 }}>
        <Outlet /> {/* This will render the page content */}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
