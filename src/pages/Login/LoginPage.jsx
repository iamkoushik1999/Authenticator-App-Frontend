import LoginForm from '../../components/Login/LoginForm.jsx';
import { Box } from '@mui/material';

const SignUpPage = () => {
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
        <LoginForm />
      </Box>
    </Box>
  );
};

export default SignUpPage;
