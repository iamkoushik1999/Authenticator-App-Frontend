// import React from 'react'

import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import PageBanner from '../../../components/Common/PageBanner';
import UserList from '../../../components/Admin/Dashboard/UserList';

const Dashboard = () => {
  return (
    <div>
      <PageBanner
        icon={AdminPanelSettingsRoundedIcon}
        title='Admin Dashboard'
        subtitle='Manage registered users and their verification status.'
      />
      <UserList />
    </div>
  );
};

export default Dashboard;
