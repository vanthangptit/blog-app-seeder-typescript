import React, { useEffect, useState, useRef } from 'react';
import RichTextEditor from '@components/RichTextEditor';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { styled } from '@mui/system';
import { Box, Button, TextField, TextareaAutosize, InputLabel, MenuItem, FormControl  } from '@mui/material';
import { MessageError } from '@components/MessageError';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IPostParams, IPostForm } from '@models/IPosts';
import { AWS_S3_URL_BLOG, TYPE_BLOG } from '@src/constants';
import { uploadFile, deleteFile } from '@utils/uploadFile';
import { usePost } from '@hooks/usePost';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import LoadingSection from '@components/LoadingSection';
import NotFound from '@components/NotFound';

const Layout = styled('div')<{ isStyle: boolean }>(({ isStyle }) => ({
  padding: '89px 16px 0',

  ...(isStyle && {
    height: 'calc(100vh - 72.5px)',
    minHeight: '500px',
    display: 'flex',
    flexDirection: 'column'
  })
}));

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
  const location: any = useLocation();
  const navigate = useNavigate();
  const { shortUrl } = useParams();
  const shortUrlJson = useRef<any>();

  const [ valueDescription, setValueDescription ] = useState('');
  const [ fileUploaded, setFileUpload ] = useState<ManagedUpload.SendData>();
  const [ fileUploadedArray, setFileUploadArray ] = useState<ManagedUpload.SendData[]>();
  const [ featuredImageChanged, setFeaturedImageChanged ] = useState<boolean>(false);
  const [ srcImage, setSrcImage ] = useState<string>();
  const [ file, setFile ] = useState<any>({
    name: ''
  });
  const [ valuePostType, setPostType ] = useState<string>('');
  const [ postId, setPostId ] = useState<string>();

  const [ errorMessage, setErrorMessage ] = useState<string>();
  const [ errorMessagePostType, setErrorMessagePostType ] = useState<string>();
  const [ errorMessageImageUrl, setErrorMessageImageUrl ] = useState<string>();
  const [ loading, setLoading ] = useState<boolean>(!!shortUrl);
  const [ submitting, setSubmitting ] = useState<boolean>(false);

  const {
    message,
    dataPost,
    errorCode,
    editPostApi,
    getPostByShortUrlApi,
    createPostApi
  } = usePost();

  const {
    register,
    formState: {
      errors
    },
    reset,
    setValue,
    handleSubmit
  } = useForm<IPostForm>();

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

  const onSubmit: SubmitHandler<IPostForm> = async data => {
    setSubmitting(true);
    const callback = (rs?: ManagedUpload.SendData) => {
      if (rs) {
        if (valuePostType && valuePostType.length > 0) {
          setErrorMessage(undefined);
          const newData: IPostParams = { ...data, imageUrl: rs.Location, postType: valuePostType };
          if (valueDescription) {
            newData.description = valueDescription;
          }

          if (shortUrl) {
            newData.postId = postId;
            editPostApi(newData)
              .unwrap()
              .then(({ status, post }) => {
                setSubmitting(false);
                if (status === 200) {
                  navigate(`/blog/${post.shortUrl}`);
                }
              });
          } else {
            createPostApi(newData)
              .unwrap()
              .then(({ status, post }) => {
                setSubmitting(false);
                if (status === 200) {
                  navigate(`/blog/${post.shortUrl}`);
                }
              });
          }
        } else {
          setSubmitting(false);
          setErrorMessagePostType('Post type can not empty.');
        }
      } else {
        if (srcImage) {
          if (valuePostType && valuePostType.length > 0) {
            if (shortUrl) {
              editPostApi({
                ...data,
                imageUrl: srcImage,
                description: valueDescription,
                postType: valuePostType,
                postId
              })
                .unwrap()
                .then(({ status, post }) => {
                  setSubmitting(false);
                  if (status === 200) {
                    navigate(`/blog/${post.shortUrl}`);
                  }
                });
            } else {
              createPostApi({
                ...data,
                imageUrl: srcImage,
                description: valueDescription,
                postType: valuePostType
              })
                .unwrap()
                .then(({ status, post }) => {
                  setSubmitting(false);
                  if (status === 200) {
                    navigate(`/blog/${post.shortUrl}`);
                  }
                });
            }
          } else {
            setErrorMessagePostType('Post type can not empty.');
            setSubmitting(false);
          }
        } else {
          setErrorMessageImageUrl('The imageUrl field is required.');
          setSubmitting(false);
        }
      }
    };

    if (fileUploadedArray) {
      await deleteFile(fileUploadedArray, valueDescription);
    }

    if (featuredImageChanged) {
      await uploadFile({ file, callback, setErrorMessage });
    } else {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ fileUploaded ]);

  useEffect(() => {
    if (shortUrl && shortUrlJson.current !== shortUrl) {
      getPostByShortUrlApi({ shortUrl })
        .unwrap()
        .then(() => {

          setTimeout(() => {
            setLoading(false);
          }, 700);
        });
      shortUrlJson.current = shortUrl;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ shortUrl ]);

  useEffect(() => {
    if (dataPost) {
      setValue('title', dataPost?.title ?? '');
      setValue('excerpt', dataPost?.excerpt ?? '');
      setValue('shortUrl', dataPost?.shortUrl ?? '');
      setPostType(dataPost?.postType ?? '');
      setSrcImage(dataPost?.imageUrl ?? '');
      setValueDescription(dataPost?.description ?? '');
      setPostId(dataPost?._id ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ dataPost ]);

  React.useEffect(() => {
    if (shortUrl && dataPost) {
      document.title = 'Edit Post | ' + dataPost.title;
    } else {
      document.title = 'Create Post';
    }
  }, [ shortUrl, dataPost ]);

  React.useEffect(() => {
    resetState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ location ]);

  return (
    <Layout isStyle={shortUrl ? (!dataPost || loading) : false}>
      {shortUrl && loading ? (
        <LoadingSection />
      ) : shortUrl && !dataPost ? (
        <NotFound
          color={'#212529'}
          message={'I AM SORRY, <br /> BUT THE POST YOU REQUESTED WAS NOT FOUND!'}
        />
      ) : (
        <>
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
                      {...register('title', { required: true, minLength: 5, maxLength: 50 })}
                    />
                    {errors.title && <MessageError style={{ margin: '0' }}>Title required and must between 5 - 255 characters.</MessageError>}
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
                      <GroupField>
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
                heightEditor={'360px'}
                toolbarId={'create-post-desc'}
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
                  {...(submitting && { disabled: true })}
                  sx={{
                    mt: 3,
                    mb: 2,
                    bgcolor: '#bc2e1d',
                    '&:hover': {
                      bgcolor: '#bc2e1d'
                    }
                  }}
                >
                  {shortUrl ? 'SAVE CHANGES' : 'CREATE'}
                </Button>
              </ButtonBox>
              {(errorMessage || errorCode) && <MessageError sx={{ textAlign: 'center' }}>{errorMessage ?? message}</MessageError>}
            </Box>
          </FormContainer>
        </>
      )}
    </Layout>
  );
};

export default CreatePost;
