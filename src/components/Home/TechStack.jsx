import PropTypes from 'prop-types';
import { Box, Container, Typography, Chip, Stack } from '@mui/material';

const frontend = [
  'React 18',
  'Vite',
  'Material UI',
  'React Router',
  'Axios',
];

const backend = [
  'Node.js',
  'Express',
  'MongoDB',
  'Mongoose',
  'JSON Web Tokens',
  'bcrypt',
  'Speakeasy (TOTP)',
  'QRCode',
];

const StackRow = ({ label, items }) => (
  <Stack spacing={1.5}>
    <Typography
      variant='subtitle2'
      color='text.secondary'
      sx={{ fontWeight: 800, letterSpacing: 0.5 }}>
      {label}
    </Typography>
    <Stack direction='row' flexWrap='wrap' useFlexGap spacing={1}>
      {items.map((item) => (
        <Chip
          key={item}
          label={item}
          sx={{
            backgroundColor: '#EEF0FF',
            color: '#4338CA',
            fontWeight: 700,
          }}
        />
      ))}
    </Stack>
  </Stack>
);

StackRow.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const TechStack = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 10 }, backgroundColor: '#FBFAFF' }}>
      <Container maxWidth='md'>
        <Stack spacing={1.5} sx={{ textAlign: 'center', mb: 5 }}>
          <Typography
            variant='overline'
            sx={{ color: 'secondary.dark', fontWeight: 800, letterSpacing: 1.5 }}>
            Under the hood
          </Typography>
          <Typography variant='h3' sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
            Built with a familiar MERN stack
          </Typography>
          <Typography variant='body1' color='text.secondary' sx={{ maxWidth: 620, mx: 'auto' }}>
            No smoke and mirrors &mdash; a standard, readable stack chosen to
            keep the authentication logic front and center.
          </Typography>
        </Stack>

        <Stack spacing={3.5}>
          <StackRow label='Frontend' items={frontend} />
          <StackRow label='Backend' items={backend} />
        </Stack>
      </Container>
    </Box>
  );
};

export default TechStack;
