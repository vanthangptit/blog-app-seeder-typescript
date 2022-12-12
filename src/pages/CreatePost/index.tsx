import React, { useState } from 'react';
import RichTextEditor from '@components/RichTextEditor';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { Layout } from '@components/Common';
import SignIn from '@components/SignIn';

import { styled } from '@mui/system';
import { Box, Button, TextField, TextareaAutosize } from '@mui/material';
import { MessageError } from '@components/MessageError';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IPostParams } from '@models/IPosts';
import { AWS_S3_URL_BLOG } from '@src/constants';
import { uploadFile } from '@utils/uploadFile';

const Heading = styled('h1')({
  textAlign: 'center',
  textTransform: 'uppercase',
  fontFamily: 'EBGaramond-Bold, sans-serif',
  margin: '75px auto 3px',
  fontSize: '40px',

  '@media (min-width: 768px) and (max-width: 991px)': {
    fontSize: '32px'
  },

  '@media (max-width: 767px)': {
    fontSize: '28px'
  }
});

const SubHeading = styled('p')({
  textAlign: 'center',
  fontSize: '22px',
  fontStyle: 'italic',

  '@media (min-width: 768px) and (max-width: 991px)': {
    fontSize: '18px'
  },

  '@media (max-width: 767px)': {
    fontSize: '15px'
  }
});

const FormContainer = styled('div')({
  maxWidth: '1100px',
  margin: 'auto'
});

const TextareaAutosizeCustom = styled(TextareaAutosize)({
  width: '100%',
  resize: 'none',
  padding: '16.5px 14px',

  '&::-webkit-scrollbar': {
    width: '6px'
  },

  '&::-webkit-scrollbar-thumb': {
    background: '#555555',
    borderRadius: '5px'
  },

  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555555'
  }
});

const RowField = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  marginLeft: '-16px',
  marginRight: '-16px'
});

const ColumnField = styled('div')({
  paddingLeft: '16px',
  paddingRight: '16px',
  flex: '0 0 50%',
  maxWidth: '50%',

  '@media (max-width: 991px)': {
    flex: '0 0 100%',
    maxWidth: '100%'
  }
});

const GroupField = styled('div')({
  paddingBottom: '32px'
});

const LabelField = styled('div')({
  fontSize: '16px',
  textTransform: 'uppercase',
  fontFamily: 'Roboto-bold, sans-serif',
  marginBottom: '12px'
});

const DivImageContainer = styled('div')({
  marginBottom: '32px'
});

const DivBoxImage = styled('div')({
  overflow: 'hidden',
  borderRadius: '30px',
  border: '1px solid #838383',
  marginBottom: '10px',
  position: 'relative',

  'label': {
    display: 'flex',
    height: '315px',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,

    'img': {
      width: '75px',
      height: '75px',
      cursor: 'pointer',
      position: 'relative',
      zIndex: 2
    }
  }
});

const DivImageNote = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  fontFamily: 'Roboto-light, sans-serif',
  fontStyle: 'italic',
  fontSize: '14px'
});

const PostImage = styled('img')({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  right: 0,
  borderRadius: '10px',
  objectFit: 'cover',
  zIndex: 1
});

const ButtonBox = styled('div')({
  textAlign: 'center',

  'button': {
    maxWidth: '300px'
  }
});

const CreatePost = () => {
  const [ value, setValue ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState<string>();
  const [ fileUploaded, setFileUpload ] = useState<ManagedUpload.SendData[]>();
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ featuredImageChanged, setFeaturedImageChanged ] = useState<boolean>(false);
  const [ srcImage, setSrcImage ] = useState<string>();
  const [ file, setFile ] = useState<any>({
    name: ''
  });

  const {
    register,
    formState: {
      errors
    },
    handleSubmit
  } = useForm<IPostParams>();

  const onSubmit: SubmitHandler<IPostParams> = async data => {
    setLoading(true);

    const callback = (rs?: ManagedUpload.SendData, data?: IPostParams) => {
      if (rs) {
        setErrorMessage(undefined);
        const newData = { ...data, imageUrl: rs.Location };
        // handle call api here
        // eslint-disable-next-line no-console
        console.log('newData: ', newData);
      } else if (data) {
        // handle call api here
        // eslint-disable-next-line no-console
        console.log('data: ', data);
      } else {
        setErrorMessage('Did an error occurred');
      }
    };

    if (featuredImageChanged) {
      await uploadFile({ file, callback, setErrorMessage });
    } else {
      callback(undefined, data);
    }
  };

  const handleChangeFeaturedImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) {
      return;
    }
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      setFile(file);
      setSrcImage(String(reader.result));
      setFeaturedImageChanged(true);
    };
  };

  return (
    <Layout>
      <Heading>Create Post</Heading>
      <SubHeading>What do you want to keep?</SubHeading>

      <FormContainer>
        <Box component="form" noValidate sx={{ mt: 1, width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
          <RowField>
            <ColumnField>
              <GroupField>
                <LabelField>TITLE</LabelField>
                <TextField
                  style={{ margin: '0 0 7px' }}
                  fullWidth
                  id="title"
                  label="Enter a title.."
                  autoComplete="title"
                  autoFocus
                  {...register('title', { minLength: 5, pattern: /^[a-zA-Z!?&.\-\s]+$/ })}
                />
                {errors.title && <MessageError style={{ margin: '0' }}>Excerpt must between 25 - 255.</MessageError>}
              </GroupField>

              <GroupField>
                <LabelField>EXCERPT</LabelField>
                <TextareaAutosizeCustom
                  defaultValue={''}
                  minRows={7}
                  maxRows={11}
                  id="excerpt"
                  placeholder="Enter reduced information about the post..."
                  autoComplete="excerpt"
                  {...register('excerpt', { required: true, minLength: 5, maxLength: 255 })}
                />
                {errors.excerpt && <MessageError style={{ margin: '0' }}>Excerpt required and must between 25 - 255 characters.</MessageError>}
              </GroupField>
            </ColumnField>

            <ColumnField>
              <LabelField>POST IMAGE</LabelField>
              <DivImageContainer>
                <DivBoxImage>
                  <label htmlFor={'imageFile'}>
                    <img src={`${AWS_S3_URL_BLOG}icon-edit.svg`} alt={'Change the post image!'} />
                  </label>
                  <input
                    type={'file'}
                    accept="image/*"
                    id={'imageFile'}
                    hidden={true}
                    {...register('imageUrl', { required: true })}
                    onChange={ async (event: React.ChangeEvent<HTMLInputElement>) => {
                      await handleChangeFeaturedImage(event);
                    }}
                  />
                  {srcImage && (
                    <PostImage src={srcImage} alt={'Post image'} />
                  )}
                </DivBoxImage>
                {errors.imageUrl && <MessageError>This is a required field!</MessageError>}
                <DivImageNote>
                  <p>
                    Formats supported:
                    <br />
                    JPG, PNG
                  </p>
                  <p>
                    Max 5 MB
                  </p>
                </DivImageNote>
              </DivImageContainer>
            </ColumnField>
          </RowField>

          <RichTextEditor
            widthEditor={'360px'}
            toolbarId={'create-post'}
            value={value}
            setValueRichText={setValue}
            setFileUpload={setFileUpload}
            fileUploaded={fileUploaded}
            placeholder={'What are you thinking...'}
          />
          <ButtonBox>
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
              CREATE
            </Button>
          </ButtonBox>
          {errorMessage && <MessageError sx={{ textAlign: 'center' }}>{errorMessage}</MessageError>}
        </Box>
      </FormContainer>
      <SignIn />
    </Layout>
  );
};

export default CreatePost;
