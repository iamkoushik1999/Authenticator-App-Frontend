import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  Button,
  CircularProgress,
  Box,
  Container,
  Typography,
  Chip,
  Avatar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// Sweet Alert
import Swal from 'sweetalert2';
// React Hot Toast
import toast from 'react-hot-toast';
// API
import {
  GET_USERS_URL,
  UPDATE_STATUS_URL,
  DELETE_USER_URL,
} from '../../../api/auth';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          setError('No token found. Please log in again.');
          setLoading(false);
          return;
        }

        const response = await axios.get(GET_USERS_URL, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data) {
          setUsers(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('An error occurred while fetching users.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleStatusToggle = (userId, field, currentValue) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to ${currentValue ? 'disable' : 'enable'} ${
        field == 'isVerified' ? '2FA Status' : 'OTP Status'
      }.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, confirm!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const body = {
            userId,
            [field]: !currentValue,
          };

          const accessToken = localStorage.getItem('accessToken');
          await axios.put(UPDATE_STATUS_URL, body, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === userId ? { ...user, [field]: !currentValue } : user
            )
          );

          toast.success(
            `${
              field == 'isVerified' ? '2FA Status' : 'OTP Status'
            } updated successfully!`
          );
        } catch (error) {
          console.error(
            `Error updating ${
              field == 'isVerified' ? '2FA Status' : 'OTP Status'
            }:`,
            error
          );
          toast.error(
            `Failed to update ${
              field == 'isVerified' ? '2FA Status' : 'OTP Status'
            }.`
          );
        }
      }
    });
  };

  const handleDeleteUser = async (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const accessToken = localStorage.getItem('accessToken');
          await axios.delete(DELETE_USER_URL, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            data: { userId },
          });

          setUsers((prevUsers) =>
            prevUsers.filter((user) => user._id !== userId)
          );
          toast.success('User deleted successfully!');
        } catch (error) {
          console.error('Error deleting user:', error);
          toast.error('Failed to delete user.');
        }
      }
    });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '40vh',
        }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '40vh',
        }}>
        <Typography variant='h6' color='error'>
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#EEF0FF' }}>
              <TableCell sx={{ fontWeight: 800, color: '#3730A3' }}>
                User
              </TableCell>
              <TableCell sx={{ fontWeight: 800, color: '#3730A3' }}>
                Role
              </TableCell>
              <TableCell sx={{ fontWeight: 800, color: '#3730A3' }}>
                OTP Status
              </TableCell>
              <TableCell sx={{ fontWeight: 800, color: '#3730A3' }}>
                2FA Status
              </TableCell>
              <TableCell sx={{ fontWeight: 800, color: '#3730A3' }}>
                Account Created At
              </TableCell>
              <TableCell sx={{ fontWeight: 800, color: '#3730A3' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: 'center', py: 5 }}>
                  <Typography color='text.secondary'>
                    No users have signed up yet.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {users.map((user) => (
              <TableRow key={user._id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        fontSize: 14,
                        backgroundImage:
                          'linear-gradient(135deg, #4F46E5 0%, #6D28D9 100%)',
                      }}>
                      {user.email?.[0]?.toUpperCase()}
                    </Avatar>
                    {user.email}
                  </Box>
                </TableCell>
                <TableCell style={{ textTransform: 'capitalize' }}>
                  <Chip color='primary' label={user.role} size='small' />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={user.otpVerified}
                    onChange={() =>
                      handleStatusToggle(
                        user._id,
                        'otpVerified',
                        user.otpVerified
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={user.isVerified}
                    onChange={() =>
                      handleStatusToggle(user._id, 'isVerified', user.isVerified)
                    }
                  />
                </TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    color='error'
                    size='small'
                    onClick={() => handleDeleteUser(user._id)}>
                    <DeleteIcon fontSize='small' />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserList;
