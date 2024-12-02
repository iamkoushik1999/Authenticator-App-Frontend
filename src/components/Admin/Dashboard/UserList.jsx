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
  Typography,
  Chip,
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
          height: '100vh',
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
          height: '100vh',
        }}>
        <Typography variant='h6' color='error'>
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ marginTop: 4, maxWidth: '90%', margin: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#1976d2' }}>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
              Email
            </TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
              Role
            </TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
              OTP Status
            </TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
              2FA Status
            </TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
              Account Created At
            </TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.email}</TableCell>
              <TableCell style={{ textTransform: 'capitalize' }}>
              <Chip color="primary" label={user.role} />
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
                  onClick={() => handleDeleteUser(user._id)}>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
