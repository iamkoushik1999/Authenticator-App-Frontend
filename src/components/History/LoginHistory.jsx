import { useEffect, useState } from 'react';
import axios from 'axios';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import {
  Box,
  Container,
  CircularProgress,
  Typography,
  Alert,
  Paper,
  Chip,
} from '@mui/material';
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded';
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded';
import HistoryToggleOffRoundedIcon from '@mui/icons-material/HistoryToggleOffRounded';
// API
import { GET_HISTORY_URL } from '../../api/auth';

const LoginHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Replace 'your-token-here' with the actual token you get after login or authentication
        const accessToken = localStorage.getItem('accessToken'); // You can store the token in localStorage/sessionStorage or context
        if (!accessToken) {
          setError('No token found. Please log in again.');
          setLoading(false);
          return;
        }

        const response = await axios.get(GET_HISTORY_URL, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Add the token in the header
          },
        });

        if (response.data) {
          setHistory(response.data.data); // Assuming `data.data` contains the array of login history
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('An error occurred while fetching login history.', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
        <CircularProgress />
        <Typography variant='body1' color='text.secondary' marginTop='10px'>
          Loading login history...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth='sm' sx={{ mt: 4 }}>
        <Alert severity='error'>{error}</Alert>
      </Container>
    );
  }

  if (!history || history.length === 0) {
    return (
      <Container maxWidth='sm' sx={{ mt: 6, textAlign: 'center' }}>
        <HistoryToggleOffRoundedIcon
          sx={{ fontSize: 56, color: 'text.secondary', mb: 1 }}
        />
        <Typography variant='h6'>No logins recorded yet</Typography>
        <Typography variant='body2' color='text.secondary'>
          Your login timeline will appear here after your next sign-in.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth='sm' sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: { xs: 1, sm: 2 } }}>
        <Timeline
          sx={{
            '& .MuiTimelineOppositeContent-root': {
              flex: 0.35,
            },
          }}>
          {history.map((item, index) => (
            <TimelineItem key={item._id}>
              <TimelineOppositeContent color='text.secondary' variant='body2'>
                {new Date(item?.lastLogin).toLocaleDateString()}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  color={item?.mode === '2FA' ? 'secondary' : 'primary'}
                  sx={{ display: 'flex', p: 1 }}>
                  {item?.mode === '2FA' ? (
                    <QrCode2RoundedIcon fontSize='small' />
                  ) : (
                    <PasswordRoundedIcon fontSize='small' />
                  )}
                </TimelineDot>
                {index < history.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent sx={{ py: '18px' }}>
                <Chip
                  size='small'
                  label={item?.mode === '2FA' ? '2FA Login' : 'OTP Login'}
                  color={item?.mode === '2FA' ? 'secondary' : 'primary'}
                  sx={{ mb: 0.5 }}
                />
                <Typography variant='body2' color='text.secondary'>
                  {new Date(item?.lastLogin).toLocaleTimeString()}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Paper>
    </Container>
  );
};

export default LoginHistory;
