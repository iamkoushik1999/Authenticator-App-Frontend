import { useEffect, useState } from 'react';
import axios from 'axios';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';

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

        const response = await axios.get(
          'http://localhost:5050/api/v1/history/get',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Add the token in the header
            },
          }
        );

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
      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <CircularProgress />
        <Typography variant='body1' marginTop='10px'>
          Loading Login History...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Alert severity='error'>{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography
        variant='h5'
        fontWeight='bold'
        marginBottom='20px'
        color='#333'>
        Login History
      </Typography>

      <Timeline position='alternate'>
        {history &&
          history.map((item) => (
            <TimelineItem key={item._id}>
              <TimelineSeparator>
                <TimelineDot color='primary' />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant='body1' fontWeight='bold'>
                  Login Mode: {item?.mode}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  Last Login: {new Date(item?.lastLogin).toLocaleString()}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
      </Timeline>
    </Box>
  );
};

export default LoginHistory;
