import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useUser } from '@hooks/useRegister';
import { MessageError } from '@components/MessageError';
import { SITES_URL } from '@src/constants';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { BiLock } from 'react-icons/bi';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/system';

import { IUserParams } from '@src/models/IUser';

const SignUpBox = styled(Box)({
  backgroundColor: '#1e464a'
});

const Register = () => {
  const navigate = useNavigate();

  // ** Hooks
  const {
    register,
    formState: {
      errors
    },
    handleSubmit
  } = useForm<IUserParams>();

  const {
    message,
    successfully,
    errorCode,
    loading,
    addUserApi
  } = useUser();

  const onSubmit: SubmitHandler<IUserParams> = data => {
    addUserApi(data);
  };

  React.useEffect(() => {
    if (successfully) {
      navigate(SITES_URL.LOGIN);
    }
  }, [ successfully ]);

  React.useEffect(() => {
    document.title = 'Thang Nguyen | Sign up';
  }, []);

  return (
    <SignUpBox className="padd-navbar scroll-bar flex-aligin-center">
      <Container component="div" maxWidth="sm" className="div-content">
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#bc2e1d' }}>
            <BiLock />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  {...register('firstName', { required: true, minLength: 3, pattern: /^[a-zA-Z!?&.\-\s]+$/ })}
                />
                {errors.firstName && <MessageError sx={{ mt: 1 }}>Please enter only letter characters.</MessageError>}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  autoComplete="family-name"
                  {...register('lastName', { required: true, minLength: 3, pattern: /^[a-zA-Z!?&.\-\s]+$/ })}
                />
                {errors.lastName && <MessageError sx={{ mt: 1 }}>Please enter only letter characters.</MessageError>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoComplete="Username"
                  {...register('username', { required: true, minLength: 5, pattern: /^[a-zA-Z]{1,}[a-zA-Z0-9_]{4,}$/ })}
                />
                {errors.username && <MessageError sx={{ mt: 1 }}>Username cannot contain special characters and more 5 characters.</MessageError>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                />
                {errors.email && <MessageError sx={{ mt: 1 }}>PLease enter email valid.</MessageError>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register('password', { required: true, minLength: 8, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/ })}
                />
                {errors.email && <MessageError sx={{ mt: 1 }}>Password must contain at least one lower case, upper case letter and number.</MessageError>}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: '#bc2e1d',
                '&:hover': {
                  bgcolor: '#bc2e1d'
                }
              }}
              size="large"
              {...(loading && !successfully && { disabled: true })}
            >
              Sign Up
            </Button>
            {errorCode && <MessageError sx={{ textAlign: 'center' }}>{message}</MessageError>}
            <Grid container justifyContent="center">
              <Grid item>
                <NavLink to={SITES_URL.LOGIN}>
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </SignUpBox>
  );
};

export default Register;
