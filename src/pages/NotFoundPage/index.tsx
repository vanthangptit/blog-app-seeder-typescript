import * as React from 'react';
import NotFound from '@components/NotFound';

const NotFoundPage = () => {
  React.useEffect(() => {
    document.title = 'Thang Nguyen | Not Found';
  }, []);

  return (
    <NotFound
      color={'#fff'}
      bgColor={'#a71c1c'}
      message={'I AM SORRY,<br /> BUT THE PAGE YOU REQUESTED WAS NOT FOUND!'}
    />
  );
};

export default NotFoundPage;
