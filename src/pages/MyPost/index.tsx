import * as React from 'react';
import SignIn from '@components/SignIn';
import HeaderSearch from '@components/Header/search';
import CardPost from '@components/Cards/CardPost';
import LoadingSection from '@components/LoadingSection';
import { NavLink, useLocation } from 'react-router-dom';
import { usePost } from '@hooks/usePost';
import Cookies from 'js-cookie';

import { USERNAME_COOKIE } from '@src/constants';
import { styled } from '@mui/system';
import { CustomContainer, CustomRow } from '@components/Common';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import ConfirmModal from '@components/Modal/ModalConfirm';
import { IPost } from '@models/IPosts';

const Layout = styled('div')<{ isStyle: boolean }>(({ isStyle }) => ({
  ...(isStyle && {
    height: 'calc(100vh - 72.5px)',
    display: 'flex',
    flexDirection: 'column'
  })
}));

const BlogPage = styled('div')({
  width: '100%',
  maxWidth: '1100px',
  marginLeft: 'auto',
  marginRight: 'auto'
});

const BlogContent = styled('div')({
  width: '100%'
});

const SectionTitle = styled('div')({
  margin: '35px 0',
  textAlign: 'center',

  '& h3': {
    fontSize: '48px',
    fontFamily: 'EBGaramond-Bold, sans-serif'
  },

  '& p': {
    fontSize: '20px',
    fontFamily: 'EBGaramond-Bold',
    fontStyle: 'italic'
  }
});

const Column = styled('div')({
  flex: '0 0 100%',
  maxWidth: '100%',
  padding: '0 15px',
  marginBottom: '30px'
});

const ColumnBox = styled('div')({
  display: 'flex'
});

const ActionButtons = styled('div')({
  flex: '0 0 70px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  border: '1px solid #eee',
  borderLeft: '1px solid transparent'
});

const MyPost = () => {
  const location: any = useLocation();
  const username = Cookies.get(USERNAME_COOKIE);
  const usernameJson = React.useRef<any>();
  const [ loading, setLoading ] = React.useState<boolean>(true);
  const [ isOpen, setOpen ] = React.useState<boolean>(false);
  const [ postSelectedDelete, setPostSelectedDelete ] = React.useState<IPost>();
  const [ deletedSuccessful, setDeletedSuccessful ] =  React.useState<boolean>(false);
  const [ errorMessageGetPost, setErrorMessageGetPost ] =  React.useState<string>();
  const [ errorMessageDelete, setErrorMessageDelete ] =  React.useState<string>();

  const {
    dataPostArray,
    getPostByCreatorApi,
    deletePostApi
  } = usePost();

  const handleOpenConfirmModal = (e: any, data: IPost) => {
    e.preventDefault();

    setOpen(true);
    setPostSelectedDelete(data);
  };

  const handleCloseConfirmModal = () => {
    setOpen(false);
    setTimeout(() => {
      setPostSelectedDelete(undefined);
      setErrorMessageDelete(undefined);
      setDeletedSuccessful(false);
    }, 500);
  };

  const handleClickConfirmButton = () => {
    deletePostApi({ postId: postSelectedDelete?._id ?? '' })
      .unwrap()
      .then(() => {
        setDeletedSuccessful(true);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e);
        setErrorMessageDelete('Did have a error occurred.');
      });
  };

  React.useEffect(() => {
    if (username && usernameJson.current !== username) {
      getPostByCreatorApi({ username })
        .unwrap()
        .then(() => {
          setTimeout(() => {
            setLoading(false);
          }, 700);
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e);
          setLoading(false);
          setErrorMessageGetPost('Did have a error occurred.');
        });
      usernameJson.current = username;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ location, username ]);

  React.useEffect(() => {
    document.title = 'My Blog';
  }, []);

  return (
    <Layout isStyle={loading || !dataPostArray || !dataPostArray.length}>
      <HeaderSearch />

      {loading ? (
        <LoadingSection />
      ) : (
        <BlogPage>
          <BlogContent>
            <SectionTitle>
              <h3>YOUR BLOG</h3>
              <p>Place to keep memories</p>
            </SectionTitle>

            <CustomContainer styles={{ maxWidth: '1100px', padding: '0' }}>
              <CustomRow>
                {dataPostArray && dataPostArray.length > 0 ? dataPostArray.map((item, index) => (
                  <Column key={index}>
                    <ColumnBox>
                      <CardPost data={item} horizontal={true}/>
                      <ActionButtons>
                        <NavLink to={`/edit-post/${item.shortUrl}`} style={{ color: '#009109' }}>
                          <AiOutlineEdit size={20} />
                        </NavLink>
                        <a href="#"
                          style={{ color: '#bc2e1d' }}
                          onClick={(e) => handleOpenConfirmModal(e, item)}
                        >
                          <AiOutlineDelete size={20} />
                        </a>
                      </ActionButtons>
                    </ColumnBox>
                  </Column>
                )) : errorMessageGetPost ? (
                  <Column>
                    <h3>{errorMessageGetPost}</h3>
                  </Column>
                ) : (
                  <Column>
                    <h3>Your has no post.</h3>
                  </Column>
                )}
              </CustomRow>
            </CustomContainer>
          </BlogContent>
        </BlogPage>
      )}

      <SignIn />
      <ConfirmModal
        isOpen={isOpen}
        deletedSuccessful={deletedSuccessful}
        errorMessageDelete={errorMessageDelete}
        handleClickConfirmButton={handleClickConfirmButton}
        handleClose={handleCloseConfirmModal}
      />
    </Layout>
  );
};

export default MyPost;
