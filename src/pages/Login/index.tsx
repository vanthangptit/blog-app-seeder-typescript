import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SITES_URL } from '@src/constants';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Container,
  Box,
  Typography
} from '@mui/material';
import { styled } from '@mui/system';
import { BiLock } from 'react-icons/bi';
import { MessageError } from '@components/MessageError';
// import { Layout, CustomContainer } from '@components/Layout';

interface IFormInput {
  username: string;
  password: string;
}
const LoginBox = styled(Box)({
  backgroundColor: '#1e464a'
});

const Login = () => {
  const {
    register,
    formState: {
      errors
    },
    handleSubmit
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = data => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <LoginBox className="login padd-navbar scroll-bar flex-aligin-center">
      <Container component="div" maxWidth="xs" className="div-content">
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
              id="username"
              label="Enter your username"
              autoComplete="username"
              autoFocus
              {...register('username', { required: true, minLength: 5, pattern: /^[a-zA-Z]{1,}[a-zA-Z0-9_]{4,}$/ })}
            />
            <MessageError>{ errors.username && 'Username cannot contain special characters and more 5 characters' }</MessageError>
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
            <MessageError>{errors.password && 'Password must contain at least one lower case, upper case letter and number.'}</MessageError>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#bc2e1d' }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href={SITES_URL.REGISTER} variant="body2">
                  {'Don\'t have an account? Sign Up'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </LoginBox>
  );
};

export default Login;
