import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { SITES_URL, MODE_CV } from '@src/constants';
import {
  Button,
  Grid,
  Typography
} from '@mui/material';
import { styled } from '@mui/system';

const NotFoundComponent = styled('div')({
  flex: '1 1 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
});

const TitlePage = styled(Typography)<{ color: string }>(({ color }) => ({
  fontSize: '100px',
  fontWeight: 600,
  fontFamily: 'norwester, sans-serif',
  textAlign: 'center',
  color,

  'p': {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '18px',
    marginBottom: '1.5rem',
    letterSpacing: 'initial'
  }
}));

const CustomButton = styled(Button)({
  color: '#bc2e1d',
  border: '1px solid rgba(255, 255, 255, 0)',
  backgroundColor: '#fff',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#fff',
    border: '1px solid rgba(255, 255, 255, 0)'
  }
});

const NotFound = ({ message, color }: { message: string; color: string }) => {
  return (
    <NotFoundComponent>
      <TitlePage variant={'h1'} color={color}>
        404 <p dangerouslySetInnerHTML={{ __html: message }} />
      </TitlePage>

      <Grid container justifyContent="center" className="bottom-link">
        <Grid item>
          <NavLink to={MODE_CV ? SITES_URL.HOME : SITES_URL.DASHBOARD}>
            <CustomButton variant="contained" size="large">{MODE_CV ? 'Go Home' : 'Go Dashboard'}</CustomButton>
          </NavLink>
        </Grid>
      </Grid>
    </NotFoundComponent>
  );
};

export default NotFound;
