import * as React from 'react';
import { styled } from '@mui/system';
import { useLocation } from 'react-router-dom';
import { MAINTENANCE_BG_COLOR, MAINTENANCE_COLOR, SITES_URL } from '@src/constants';

const FooterElement = styled('footer')<{ isAtDashBoard: boolean }>(({ isAtDashBoard }) => ({
  position: 'relative',
  zIndex: 1,
  fontSize: '15px',
  fontStyle: 'italic',
  textAlign: 'center',
  padding: '20px 0 30px',

  ...(isAtDashBoard && {
    backgroundColor: `${MAINTENANCE_BG_COLOR}`,
    color: `${MAINTENANCE_COLOR}`
  })
}));

const Footer = () => {
  const location = useLocation();
  const [ hideFooter, setHideFooter ] = React.useState<string>('');
  const [ atDashBoard, setAtDashBoard ] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (location) {
      if (
        location.pathname === '/' ||
        location.pathname === SITES_URL.ABOUT ||
        location.pathname === SITES_URL.LOGIN ||
        location.pathname === SITES_URL.REGISTER  ||
        location.pathname === SITES_URL.CONTACT
      ) {
        setHideFooter('hidden');
      }

      if (location.pathname === SITES_URL.DASHBOARD) {
        setAtDashBoard(true);
      } else {
        setAtDashBoard(false);
      }
    } else {
      setHideFooter('');
    }
  }, [ location ]);

  return (
    <FooterElement className={hideFooter} isAtDashBoard={atDashBoard}>
      2023 Ⓒ nguyenthang - All rights reserved
    </FooterElement>
  );
};

export default Footer;
