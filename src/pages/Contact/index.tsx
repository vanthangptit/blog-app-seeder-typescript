import * as React from 'react';
import { NavLink } from 'react-router-dom';
import SignIn from '@components/SignIn';
import { MessageError } from '@components/MessageError';
import {
  Avatar,
  Button,
  TextField,
  TextareaAutosize,
  Container,
  Box,
  Typography
} from '@mui/material';
import { BiLock } from 'react-icons/bi';
import { styled } from '@mui/system';
import { SITES_URL } from '@src/constants';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useContact } from '@hooks/useContact';
import { IGuestContactParams } from '@models/IContact';

const ContactBox = styled(Box)({
  backgroundColor: '#1e464a'
});

const TextareaAutosizeCustom = styled(TextareaAutosize)({
  padding: '16.5px 14px',
  width: '100%',
  fontSize: 'inherit',
  border: 'solid 1px #c1c1c1',
  borderRadius: '4px',
  outline: 'none',

  ':focus-visible': {
    border: 'solid 2px #1976d2'
  },

  '::placeholder': {
    color: 'rgba(0, 0, 0, 0.6)'
  }
});

const MessageSuccess = styled(Box)({
  textAlign: 'center',

  'h3': {
    marginBottom: '10px',
    fontSize: '33px',

    '@media (min-width: 768px) and (max-width: 991px)': {
      fontSize: 'calc(26px + (33 - 26) * (100vw - 768px) / (991 - 768))'
    },

    '@media (max-width: 767px)': {
      fontSize: 'calc(22px + (26 - 22) * (100vw - 360px) / (767 - 360))'
    }
  },

  'p': {
    '@media (min-width: 768px)': {
      fontSize: '16px'
    }
  }
});

const CustomButtonLink = styled(Button)({
  color: '#fff',
  border: '1px solid rgba(255, 255, 255, 0)',
  backgroundColor: '#bc2e1d',
  marginTop: '20px',

  '&:hover': {
    backgroundColor: '#bc2e1d',
    border: '1px solid rgba(255, 255, 255, 0)'
  }
});

const Contact = () => {
  // ** Hooks
  const {
    register,
    formState: {
      errors
    },
    handleSubmit
  } = useForm<IGuestContactParams>();

  const {
    message,
    successfully,
    errorCode,
    loading,
    guestContactApi
  } = useContact();

  const onSubmit: SubmitHandler<IGuestContactParams> = data => {
    guestContactApi(data);
  };

  React.useEffect(() => {
    document.title = 'Thang Nguyen | Contact me';
  }, []);

  return (
    <ContactBox className="padd-navbar scroll-bar flex-aligin-center">
      {!successfully &&
        <Container component="div" maxWidth="sm" className="div-content">
          <Avatar sx={{ m: 1, bgcolor: '#bc2e1d' }}>
            <BiLock />
          </Avatar>
          <Typography component="h1" variant="h5">
            Contact Me
          </Typography>

          <Box component="form" noValidate sx={{ mt: 1, width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="normal"
              fullWidth
              id="fullName"
              label="Enter your full name"
              autoComplete="fullName"
              autoFocus
              {...register('fullName', { minLength: 5, pattern: /^[a-zA-Z!?&.\-\s]+$/ })}
            />
            {errors.fullName && <MessageError>Fullname cannot contain special characters and more 5 characters.</MessageError>}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              id="email"
              autoComplete="Email"
              sx={{ marginBottom: '24px' }}
              {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
            />
            {errors.email && <MessageError>PLease enter email valid.</MessageError>}
            <TextareaAutosizeCustom
              aria-label="minimum height"
              required
              id="message"
              placeholder={'Enter Message *'}
              style={{ height: '188px' }}
              {...register('message', { required: true })}
            />
            {errors.message && <MessageError>Please fill out this field.</MessageError>}

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
              SEND
            </Button>
            {errorCode && <MessageError sx={{ textAlign: 'center' }}>{message}</MessageError>}
          </Box>
        </Container>
      }

      {successfully &&
        <Container component="div" maxWidth="sm" className="div-content">
          <MessageSuccess>
            <h3>Thank you!</h3>
            <Typography variant="body2">Thanks for contacting me with your messages and questions.<br/> I&apos;m going to respond to you very soon!</Typography>
            <Typography sx={{ textAlign: 'center' }}>
              <NavLink to={SITES_URL.HOME}>
                <CustomButtonLink variant="contained" size={'large'}>Go Home</CustomButtonLink>
              </NavLink>
            </Typography>
          </MessageSuccess>
        </Container>
      }

      <SignIn />
    </ContactBox>
  );
};

export default Contact;
