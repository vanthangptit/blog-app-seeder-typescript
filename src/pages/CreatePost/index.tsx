import React, { useEffect, useState } from 'react';
import RichTextEditor from '@components/RichTextEditor';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { Layout } from '@components/Common';
import SignIn from '@components/SignIn';

import { styled } from '@mui/system';
import { Box, Button, TextField, TextareaAutosize, InputLabel, MenuItem, FormControl  } from '@mui/material';
import { MessageError } from '@components/MessageError';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IPostParams } from '@models/IPosts';
import { AWS_S3_URL_BLOG, TYPE_BLOG } from '@src/constants';
import { uploadFile, deleteFile } from '@utils/uploadFile';
import { usePost } from '@hooks/usePost';
import { useNavigate } from 'react-router-dom';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
  margin: '100px auto'
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
    height: '380px',
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
  fontSize: '14px',

  'p': {
    marginBottom: '0'
  }
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
  const navigate = useNavigate();
  const [ valueDescription, setValueDescription ] = useState('');
  const [ fileUploaded, setFileUpload ] = useState<ManagedUpload.SendData>();
  const [ fileUploadedArray, setFileUploadArray ] = useState<ManagedUpload.SendData[]>();
  const [ featuredImageChanged, setFeaturedImageChanged ] = useState<boolean>(false);
  const [ srcImage, setSrcImage ] = useState<string>();
  const [ file, setFile ] = useState<any>({
    name: ''
  });
  const [ valuePostType, setPostType ] = useState<string>('');
  const [ errorMessage, setErrorMessage ] = useState<string>();
  const [ errorMessagePostType, setErrorMessagePostType ] = useState<string>();
  const [ errorMessageImageUrl, setErrorMessageImageUrl ] = useState<string>();

  const {
    register,
    formState: {
      errors
    },
    reset,
    handleSubmit
  } = useForm<IPostParams>();

  const {
    message,
    // dataPost,
    errorCode,
    loading,
    // editPostApi,
    createPostApi
  } = usePost();

  const resetState = () => {
    setFeaturedImageChanged(false);
    setSrcImage(undefined);
    setFileUpload(undefined);
    setPostType('');
    setValueDescription('');
    reset({
      title: '',
      excerpt: '',
      shortUrl: ''
    });
    setFile({
      name: ''
    });
  };

  const onSubmit: SubmitHandler<IPostParams> = async data => {
    const callback = (rs?: ManagedUpload.SendData) => {
      if (rs) {
        if (valuePostType && valuePostType.length > 0) {
          setErrorMessage(undefined);
          const newData = { ...data, imageUrl: rs.Location, postType: valuePostType };
          if (valueDescription) {
            newData.description = valueDescription;
          }

          createPostApi(newData)
            .unwrap()
            .then(({ status, post }) => {
              if (status === 200) {
                navigate(post.shortUrl);
                resetState();
              }
            });
        } else {
          setErrorMessagePostType('Post type can not empty.');
        }
      } else {
        if (data?.imageUrl) {
          if (valuePostType && valuePostType.length > 0) {
            createPostApi({ ...data, description: valueDescription, postType: valuePostType });
          } else {
            setErrorMessagePostType('Post type can not empty.');
          }
        } else {
          setErrorMessageImageUrl('The imageUrl field is required.');
        }
      }
    };

    if (featuredImageChanged) {
      if (fileUploadedArray) {
        await deleteFile(fileUploadedArray, valueDescription);
      }
      await uploadFile({ file, callback, setErrorMessage });
    } else {
      if (fileUploadedArray) {
        await deleteFile(fileUploadedArray, valueDescription);
      }
      callback(undefined);
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

  const handleChange = (event: SelectChangeEvent) => {
    setPostType(event.target.value as string);
  };

  useEffect(() => {
    if (fileUploaded) {
      if (fileUploadedArray && fileUploadedArray.length > 0) {
        setFileUploadArray([ ...fileUploadedArray, fileUploaded ]);
      } else {
        setFileUploadArray([ fileUploaded ]);
      }
    }
  }, [ fileUploaded ]);

  return (
    <Layout>
      <Heading>Create Post</Heading>
      <SubHeading>What do you want to keep something?</SubHeading>

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
                  {...register('title', { minLength: 5, pattern: /^[a-zA-Z0-9!?&.\-\s]+$/ })}
                />
                {errors.title && <MessageError style={{ margin: '0' }}>Excerpt must between 5 - 255 .</MessageError>}
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
              <RowField>
                <ColumnField>
                  <GroupField>
                    <LabelField>Short Url</LabelField>
                    <TextField
                      fullWidth
                      id="shortUrl"
                      label="Enter a short url.."
                      autoComplete="shortUrl"
                      {...register('shortUrl', { required: true, pattern: /^[a-zA-Z0-9-_\s]*.{5,50}$/ })}
                    />
                    {errors.shortUrl && <MessageError style={{ margin: '0' }}>Invalid short url! It can only contain letters, numbers, hyphens (-), and underscores (_), and between 5-50 characters.</MessageError>}
                  </GroupField>
                </ColumnField>
                <ColumnField>
                  <GroupField sx={{ pb: 0 }}>
                    <LabelField>Post Type</LabelField>
                    <FormControl fullWidth>
                      <InputLabel id="post-type-select-label">Type</InputLabel>
                      <Select
                        labelId="post-type-select-label"
                        id="post-type-select"
                        value={valuePostType}
                        label="Type"
                        onChange={handleChange}
                      >
                        {TYPE_BLOG?.map((item, index) => (
                          <MenuItem value={item.value} key={index}>{item.label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {errorMessagePostType && <MessageError>This is a required field.</MessageError>}
                  </GroupField>
                </ColumnField>
              </RowField>
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
                {errorMessageImageUrl && <MessageError>This is a required field.</MessageError>}
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
            label={'Description'}
            widthEditor={'360px'}
            toolbarId={'create-post'}
            value={valueDescription}
            setValueRichText={setValueDescription}
            setFileUpload={setFileUpload}
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
          {(errorMessage || errorCode) && <MessageError sx={{ textAlign: 'center' }}>{errorMessage ?? message}</MessageError>}
        </Box>
      </FormContainer>
      <SignIn />
    </Layout>
  );
};

export default CreatePost;
