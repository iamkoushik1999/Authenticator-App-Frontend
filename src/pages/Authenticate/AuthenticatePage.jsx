// import React from 'react'

import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded';
import PageBanner from '../../components/Common/PageBanner';
import TwoFA from '../../components/Authenticate/TwoFA';

const AuthenticatePage = () => {
  return (
    <div>
      <PageBanner
        icon={QrCode2RoundedIcon}
        title='Authenticate Yourself'
        subtitle='Link an authenticator app for faster, passwordless-friendly logins.'
      />
      <TwoFA />
    </div>
  );
};

export default AuthenticatePage;
