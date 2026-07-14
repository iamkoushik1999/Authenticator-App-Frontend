import SignupForm from '../../components/SignUp/SignupForm';
import { Box } from '@mui/material';

const SignUpPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 140px)',
        padding: '40px 20px',
        backgroundImage:
          'radial-gradient(circle at 15% 15%, rgba(79,70,229,0.08), transparent 40%), radial-gradient(circle at 85% 85%, rgba(20,184,166,0.10), transparent 40%)',
      }}>
      <SignupForm />
    </Box>
  );
};

export default SignUpPage;
