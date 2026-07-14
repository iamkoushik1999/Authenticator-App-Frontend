import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  CircularProgress,
  Paper,
  Avatar,
  Container,
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import GppMaybeRoundedIcon from '@mui/icons-material/GppMaybeRounded';
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded';
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
          minHeight: '40vh',
        }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth='sm' sx={{ py: 5 }}>
      <Paper
        elevation={2}
        sx={{
          textAlign: 'center',
          padding: '36px',
        }}>
        <Avatar
          sx={{
            mx: 'auto',
            mb: 2,
            width: 56,
            height: 56,
            backgroundColor: isVerified ? 'secondary.main' : 'warning.main',
          }}>
          {isVerified ? <CheckCircleRoundedIcon /> : <GppMaybeRoundedIcon />}
        </Avatar>

        {isVerified ? (
          <>
            <Typography variant='h5' fontWeight={800} color='secondary.dark'>
              You&apos;re 2FA verified
            </Typography>
            <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
              Future logins can use the 6-digit code from your authenticator
              app.
            </Typography>
          </>
        ) : (
          <>
            <Typography variant='h5' fontWeight={800}>
              Not 2FA verified yet
            </Typography>
            <Typography variant='body2' color='text.secondary' sx={{ mt: 1, mb: 3 }}>
              Link Google Authenticator, Authy, Microsoft Authenticator or
              2FAS by scanning a QR code.
            </Typography>
            <Button
              variant='contained'
              size='large'
              startIcon={<QrCode2RoundedIcon />}
              onClick={handleGenerateQRCode}>
              Generate QR Code
            </Button>
          </>
        )}

        {/* Modal for QR Code and 2FA Verification */}
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          aria-labelledby='modal-title'
          aria-describedby='modal-description'>
          <Paper
            elevation={6}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 380,
              maxWidth: '90vw',
              p: 4,
              textAlign: 'center',
            }}>
            <Typography id='modal-title' variant='h6' fontWeight={800} marginBottom='6px'>
              Scan the QR Code
            </Typography>
            <Typography variant='body2' color='text.secondary' marginBottom='16px'>
              Open your authenticator app and scan this code to link your
              account.
            </Typography>
            <Box
              component='img'
              src={qrCodeDataUrl}
              alt='QR Code'
              sx={{
                width: '80%',
                mb: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                p: 1,
              }}
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
              fullWidth
              size='large'
              sx={{ mt: 1 }}
              onClick={handleVerifyCode}>
              Verify 2FA
            </Button>
          </Paper>
        </Modal>
      </Paper>
    </Container>
  );
};

export default TwoFA;
