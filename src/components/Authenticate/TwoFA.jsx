import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  CircularProgress,
} from '@mui/material';
// Sweet Alert
import Swal from 'sweetalert2';
// React Hot Toast
import toast from 'react-hot-toast';
// API
import {
  CODE_GENERATE_URL,
  CODE_VERIFY_URL,
  PROFILE_URL,
} from '../../api/auth';

const TwoFA = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true); // To show loader initially
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    // Check the 2FA verification status
    const checkVerificationStatus = async () => {
      try {
        const response = await fetch(PROFILE_URL, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (data && data.data) {
          setIsVerified(data.data.isVerified);
        } else {
          toast.error('Failed to fetch verification status.');
        }
      } catch (error) {
        console.error('Error fetching verification status:', error);
        toast.error('An error occurred while fetching verification status.');
      } finally {
        setLoading(false);
      }
    };

    checkVerificationStatus();
  }, []);

  // Generate QR Code
  const handleGenerateQRCode = async () => {
    try {
      const response = await fetch(CODE_GENERATE_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setQrCodeDataUrl(data.qrCodeDataUrl);
        setIsModalOpen(true);
      } else {
        toast.error('Failed to generate QR code.');
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast.error('An error occurred while generating the QR code.');
    }
  };

  // Verify Code
  const handleVerifyCode = async () => {
    try {
      const response = await fetch(CODE_VERIFY_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: verificationCode }),
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          title: 'Success!',
          text: data.message,
          icon: 'success',
        });
        setIsVerified(true);
        setIsModalOpen(false);
      } else {
        toast.error(data.message || 'Failed to verify 2FA.');
      }
    } catch (error) {
      console.error('Error verifying 2FA:', error);
      toast.error('An error occurred during verification.');
    }
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

  return (
    <Box
      sx={{
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        width: '400px',
        margin: 'auto',
        marginTop: '100px',
      }}>
      {isVerified ? (
        <Typography variant='h5' color='success.main'>
          You are 2FA verified!
        </Typography>
      ) : (
        <>
          <Typography variant='h5' color='error.main' marginBottom='20px'>
            You are not 2FA verified
          </Typography>
          <Button
            variant='contained'
            color='primary'
            onClick={handleGenerateQRCode}>
            Verify Yourself
          </Button>
        </>
      )}

      {/* Modal for QR Code and 2FA Verification */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            textAlign: 'center',
          }}>
          <Typography
            id='modal-title'
            variant='h6'
            component='h2'
            marginBottom='10px'>
            Scan the QR Code
          </Typography>
          <img
            src={qrCodeDataUrl}
            alt='QR Code'
            style={{ width: '90%', marginBottom: '5px' }}
          />
          <TextField
            label='Enter 2FA Code'
            variant='outlined'
            fullWidth
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            margin='normal'
          />
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={handleVerifyCode}>
            Verify 2FA
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default TwoFA;
