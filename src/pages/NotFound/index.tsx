import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { SITES_URL } from '@src/constants';
import {
  Button,
  Grid,
  Typography
} from '@mui/material';
import { styled } from '@mui/system';
import { Layout } from '@src/components/Common';

const TitlePage = styled(Typography)({
  fontSize: '100px',
  fontWeight: 600,
  fontFamily: 'norwester, sans-serif',
  textAlign: 'center',

  'p': {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '18px',
    marginBottom: '1.5rem',
    letterSpacing: 'initial'
  }
});

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

const NotFound = () => {
  React.useEffect(() => {
    document.title = 'Thang Nguyen | Not Found';
  }, []);

  return (
    <Layout
      paddingNav={true}
      scrollBar={true}
      flexMiddle={true}
      styles={{
        backgroundColor: '#a71c1c',
        paddingTop: '75px',
        paddingBottom: '150px',
        height: '100vh',
        width: '100%',
        color: '#fff',
        flexDirection: 'column'
      }}
    >
      <TitlePage variant={'h1'}>
        404 <p>I AM SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND!</p>
      </TitlePage>

      <Grid container justifyContent="center" className="bottom-link">
        <Grid item>
          <NavLink to={SITES_URL.HOME}>
            <CustomButton variant="contained" size="large">Go Home</CustomButton>
          </NavLink>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default NotFound;
