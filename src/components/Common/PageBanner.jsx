import PropTypes from 'prop-types';
import { Box, Container, Typography, Avatar } from '@mui/material';

const PageBanner = ({ icon: Icon, title, subtitle }) => {
  return (
    <Box
      sx={{
        backgroundImage: 'linear-gradient(90deg, #4338CA 0%, #6D28D9 100%)',
        color: '#fff',
        py: { xs: 5, md: 6 },
        textAlign: 'center',
      }}>
      <Container maxWidth='sm'>
        {Icon && (
          <Avatar
            sx={{
              mx: 'auto',
              mb: 2,
              width: 56,
              height: 56,
              backgroundColor: 'rgba(255,255,255,0.15)',
            }}>
            <Icon />
          </Avatar>
        )}
        <Typography variant='h4' fontWeight={800} sx={{ fontSize: { xs: '1.6rem', md: '2rem' } }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant='body1' sx={{ opacity: 0.9, mt: 1 }}>
            {subtitle}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

PageBanner.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default PageBanner;
