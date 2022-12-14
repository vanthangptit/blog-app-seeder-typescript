import * as React from 'react';
import NotFound from '@components/NotFound';

import { styled } from '@mui/system';
import SignIn from '@components/SignIn';

const NotFoundBox = styled('div')({
  // backgroundColor: '#a71c1c'
  height: 'calc(100vh - 72.5px)',
  display: 'flex',
  flexDirection: 'column'
});

const NotFoundPage = () => {
  React.useEffect(() => {
    document.title = 'Thang Nguyen | Not Found';
  }, []);

  return (
    <NotFoundBox>
      <NotFound
        color={'#000'}
        message={'I AM SORRY,<br /> BUT THE PAGE YOU REQUESTED WAS NOT FOUND!'}
      />

      <SignIn />
    </NotFoundBox>
  );
};

export default NotFoundPage;
