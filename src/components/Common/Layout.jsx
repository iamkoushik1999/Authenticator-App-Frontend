import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
      <Header />
      <div
        style={{
          flex: 1, // This will make the content area take up all available space
        }}>
        <Outlet /> {/* This will render the page content */}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
