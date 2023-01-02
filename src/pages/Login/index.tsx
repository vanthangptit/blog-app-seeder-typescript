import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useTokenUser } from '@hooks/useTokenUser';
import { useLogin } from '@hooks/useLogin';
import { useUser } from '@hooks/useRegister';
import { MODE_CV, SITES_URL } from '@src/constants';

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
  const location: any = useLocation();
  const [ navigateTo, setNavigateTo ] = React.useState<string>();

  // ** Hooks
  const {
    register,
    formState: {
      errors
    },
    handleSubmit,
    setValue,
    reset
  } = useForm<ILoginParams>();

  const { message, data, errorCode, loading, loginApi } = useLogin();

  const { user } = useUser();
  const { setTokenCookie } = useTokenUser();

  const onSubmit: SubmitHandler<ILoginParams> = data => {
    loginApi(data)
      .unwrap()
      .then((rs) => {
        if (rs.status === 200) {
          setTokenCookie({
            username: rs.data.username,
            accessToken: rs.data.accessToken
          });
          reset({
            account: '',
            password: ''
          });
          navigate(navigateTo ?? SITES_URL.DASHBOARD);
        }
      });
  };

  React.useEffect(() => {
    if (location?.state?.path) {
      setNavigateTo(location.state.path);
    }
  }, [ location ]);

  React.useEffect(() => {
    if (user) {
      setValue('account', user.username);
    }
  }, [ user, setValue ]);

  React.useEffect(() => {
    document.title = 'Thang Nguyen | Login';
  }, []);

  return (
    <Layout
      paddingNav={MODE_CV && true}
      scrollBar={true}
      flexMiddle={true}
      styles={{ backgroundColor: '#1e464a' }}
      style={
        location && (location.pathname === SITES_URL.LOGIN || location.pathname === SITES_URL.REGISTER)
          ? { paddingTop: '0' }
          : { paddingTop: '89px' }
      }
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
              {...(!user && { autoFocus: true })}
              {...register('account', { required: true })}
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
              {...(user && { autoFocus: true })}
              {...register('password', { required: true })}
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
              {...(loading && { disabled: true })}
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
