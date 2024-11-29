import Banner from '../../components/SignUp/Banner';
import SignupForm from '../../components/SignUp/SignupForm';
import { Box } from '@mui/material';

const SignUpPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f4f8', // Softer, neutral background
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
        <SignupForm />
      </Box>
    </Box>
  );
};

export default SignUpPage;
