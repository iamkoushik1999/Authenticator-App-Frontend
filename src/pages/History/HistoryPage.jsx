// import React from 'react'
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import PageBanner from '../../components/Common/PageBanner';
import LoginHistory from '../../components/History/LoginHistory';

const HistoryPage = () => {
  return (
    <div>
      <PageBanner
        icon={TimelineRoundedIcon}
        title='Your Login History'
        subtitle='Every OTP and 2FA login, in order.'
      />
      <LoginHistory />
    </div>
  );
};

export default HistoryPage;
