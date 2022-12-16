import * as React from 'react';
import { styled } from '@mui/system';
import { useLocation } from 'react-router-dom';
import { SITES_URL } from '@src/constants';

const FooterElement = styled('footer')({
  position: 'relative',
  zIndex: 1,
  fontSize: '15px',
  fontStyle: 'italic',
  textAlign: 'center',
  padding: '20px 0 30px'
});

const Footer = () => {
  const location = useLocation();

  return (
    <FooterElement
      className={
        location &&
        (
          location.pathname === '/'
          || location.pathname === SITES_URL.ABOUT
          || location.pathname === SITES_URL.LOGIN
          || location.pathname === SITES_URL.REGISTER
          || location.pathname === SITES_URL.CONTACT
        )
          ? 'hidden' : ''}
    >
      2023 Ⓒ nguyenthang - All rights reserved
    </FooterElement>
  );
};

export default Footer;
