import * as React from 'react';
import SignIn from '@components/SignIn';
import Maintenance from '@components/Maintenance';

const Dashboard = () => {
  return (
    <div>
      <Maintenance />

      <SignIn />
    </div>
  );
};

export default Dashboard;
