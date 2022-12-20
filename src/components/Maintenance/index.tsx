import React from 'react';
import { styled } from '@mui/system';
import { MAINTENANCE_BG_COLOR, MAINTENANCE_COLOR } from '@src/constants';

const MaintenanceBox = styled('section')({
  backgroundColor: `${MAINTENANCE_BG_COLOR}`,
  height: 'calc(100vh - 72.5px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
});

const TitleBox = styled('h1')({
  textAlign: 'center',
  fontSize: '67px',
  fontWeight: 300,
  lineHeight: '80px',
  color: `${MAINTENANCE_COLOR}`,

  '@media (min-width: 768px) and (max-width: 991px)': {
    fontSize: 'calc(54px + (67 - 54) * (100vw - 768px) / (1199 - 768))',
    lineHeight: 'calc(68px + (80 - 68) * (100vw - 768px) / (1199 - 768))'
  },

  '@media (max-width: 767px)': {
    fontSize: 'calc(28px + (54 - 28) * (100vw - 375px) / (767 - 375))',
    lineHeight: 'calc(36px + (68 - 36) * (100vw - 375px) / (767 - 375))'
  }
});

const Maintenance = () => {
  return (
    <MaintenanceBox>
      <TitleBox>Sorry, we&apos;re doing <br />developmentally this page.</TitleBox>
    </MaintenanceBox>
  );
};

export default Maintenance;
