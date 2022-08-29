import * as React from 'react';

const NotFound = () => {
  React.useEffect(() => {
    document.title = 'Thang Nguyen | Not Found';
  }, []);

  return (
    <div className="not-found">
      <h1>404 <p>I AM SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND!</p></h1>

      {/*<Grid container justifyContent="center" className="bottom-link">*/}
      {/*  <Grid item>*/}
      {/*    <Link to="/">*/}
      {/*      <Controls.ButtonForm*/}
      {/*        text="Go Home"*/}
      {/*        type="button"*/}
      {/*        classes={{*/}
      {/*          root: classes.buttonActive,*/}
      {/*          label: classes.label,*/}
      {/*        }}*/}
      {/*      />*/}
      {/*    </Link>*/}
      {/*    <Link to={CONSTANTS.SITES_URL.CONTACT}>*/}
      {/*      <Controls.ButtonForm*/}
      {/*        variant={'outlined'}*/}
      {/*        text={'Contact Me'}*/}
      {/*        type={'button'}*/}
      {/*        classes={{*/}
      {/*          root: classes.root,*/}
      {/*          label: classes.label,*/}
      {/*        }}*/}
      {/*      />*/}
      {/*    </Link>*/}
      {/*  </Grid>*/}
      {/*</Grid>*/}
    </div>
  );
};

export default NotFound;
