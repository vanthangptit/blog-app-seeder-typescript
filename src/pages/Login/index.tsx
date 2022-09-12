import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTokenUser } from '@hooks/useTokenUser';
import { useLogin } from '@hooks/useLogin';
import { SITES_URL } from '@src/constants';

import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography
} from '@mui/material';

import { BiLock } from 'react-icons/bi';
import { MessageError } from '@components/MessageError';
import { CustomContainer, Layout } from '@components/Common';

import { ILoginParams } from '@src/models/ILogin';

const Login = () => {
  const navigate = useNavigate();

  // ** Hooks
  const {
    register,
    formState: {
      errors
    },
    handleSubmit
  } = useForm<ILoginParams>();

  const {
    message,
    data,
    successfully,
    errorCode,
    loading,
    loginApi
  } = useLogin();

  const {
    navigateTo,
    setAccessTokenUsernameCookie
  } = useTokenUser();

  const onSubmit: SubmitHandler<ILoginParams> = data => {
    loginApi(data);
  };

  React.useEffect(() => {
    if (data && successfully) {
      setAccessTokenUsernameCookie({
        username: data.accessToken,
        accessToken: data.username
      });
    }
  }, [ data, successfully ]);

  React.useEffect(() => {
    if (navigateTo) {
      navigate(SITES_URL.DASHBOARD);
    }
  }, [ navigateTo ]);

  React.useEffect(() => {
    document.title = 'Thang Nguyen | Login';
  }, []);

  return (
    <Layout
      paddingNav={true}
      scrollBar={true}
      flexMiddle={true}
      styles={{ backgroundColor: '#1e464a' }}
    >
      <CustomContainer
        styles={{
          backgroundColor: '#fff',
          padding: '40px 25px',
          borderRadius: '5px',
          maxWidth: '444px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#bc2e1d' }}>
            <BiLock />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box component="form" noValidate sx={{ mt: 1, width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="account"
              label="Enter your account"
              autoComplete="account"
              autoFocus
              {...register('account', { required: true, minLength: 5, pattern: /^[a-zA-Z]{1,}[a-zA-Z0-9_]{4,}$/ })}
            />
            {errors.account && <MessageError>Account cannot contain special characters and more 5 characters.</MessageError>}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password', { required: true, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, minLength: 8 })}
            />
            {errors.password && <MessageError>Password must contain at least one lower case, upper case letter and number.</MessageError>}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              size="large"
              type="submit"
              fullWidth
              variant="contained"
              {...(loading && !successfully && { disabled: true })}
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: '#bc2e1d',
                '&:hover': {
                  bgcolor: '#bc2e1d'
                }
              }}
            >
              Sign In
            </Button>
            {!data && errorCode && <MessageError sx={{ textAlign: 'center' }}>{message}</MessageError>}
            <Grid container>
              <Grid item xs>
                <NavLink to={'#'}>
                  Forgot password?
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink to={SITES_URL.REGISTER}>
                  {'Don\'t have an account? Sign Up'}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </CustomContainer>
    </Layout>
  );
};

export default Login;
