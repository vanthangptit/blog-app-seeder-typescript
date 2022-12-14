import * as React from 'react';
import { styled } from '@mui/system';

const FooterElement = styled('footer')({
  position: 'relative',
  zIndex: 1,
  fontSize: '15px',
  fontStyle: 'italic',
  textAlign: 'center',
  padding: '20px 0 30px'
});

const Footer = () => {
  return (
    <FooterElement>
      2023 Ⓒ nguyenthang - All rights reserved
    </FooterElement>
  );
};

export default Footer;
