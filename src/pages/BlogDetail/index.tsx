import * as React from 'react';
import SignIn from '@components/SignIn';
import { NavLink, useParams } from 'react-router-dom';
import { usePost } from '@hooks/usePost';
import LoadingSection from '@components/LoadingSection';
import { styled } from '@mui/system';
import NotFound from '@components/NotFound';
import HeaderSearch from '@components/Header/search';
import { formatDatetime } from '@utils/formatDatetime';

import { AiOutlineRight } from 'react-icons/ai';

const Layout = styled('div')<{ isStyle: boolean }>(({ isStyle }) => ({
  ...(isStyle && {
    height: 'calc(100vh - 72.5px)',
    display: 'flex',
    flexDirection: 'column'
  })
}));

const CreateAt = styled('div')({
  color: '#757575',
  fontSize: '14px',
  textAlign: 'right'
});

const Heading = styled('h1')({
  fontFamily: 'EBGaramond-Regular, sans-serif',
  fontSize: '40px',
  margin: '40px 0 15px',
  textAlign: 'center'
});

const ContentBox = styled('div')({
  maxWidth: '900px',
  margin: '120px auto 80px',
  boxShadow: '0 0 15px rgb(0 0 0 / 12%)',
  padding: '20px'
});

const ContentBoxTop = styled('div')({
  display: 'flex',
  justifyContent: 'space-between'
});

const Breadcrumb = styled('div')({
  display: 'flex',
  alignItems: 'center',

  'a': {
    display: 'inline-block',
    paddingRight: '8px',
    color: '#076db6',
    fontWeight: '400',
    fontSize: '14px',
    fontStyle: 'italic',

    '&:hover': {
      color: '#bc2e1d'
    },

    '&:last-child': {
      textTransform: 'capitalize',
      color: '#757575',
      paddingLeft: '6px'
    }
  },

  'svg': {
    color: '#757575',
    fontWeight: '400'
  },

  'span': {
    display: 'inline-block',
    fontWeight: '400',
    paddingLeft: '6px',
    fontSize: '14px',
    fontStyle: 'italic',
    textTransform: 'capitalize'
  }
});

const BoxImage = styled('div')({
  marginBottom: '20px'
});

const Content = styled('div')({});

const BlogDetail = () => {
  const { shortUrl } = useParams();
  const shortUrlJson = React.useRef<any>();
  const [ loading, setLoading ] = React.useState<boolean>(true);

  const {
    dataPost,
    getPostByShortUrlApi
  } = usePost();

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (dataPost) {
      document.title = 'Blog | ' + dataPost.title;
    }
  }, [ dataPost ]);

  return (
    <Layout isStyle={!dataPost || loading}>
      <HeaderSearch />

      {loading ? (
        <LoadingSection />
      ) : !dataPost ? (
        <NotFound
          color={'#212529'}
          message={'I AM SORRY, <br /> BUT THE POST YOU REQUESTED WAS NOT FOUND!'}
        />
      ) : (
        <ContentBox>
          <ContentBoxTop>
            <Breadcrumb>
              <NavLink to={'/blog'} >Blog</NavLink>
              <AiOutlineRight size={14} />
              <NavLink to={`/blog?type=${dataPost?.postType}`}>{dataPost?.postType}</NavLink>
            </Breadcrumb>
            <CreateAt>
              {dataPost?.createdAt && formatDatetime(dataPost?.createdAt)}
            </CreateAt>
          </ContentBoxTop>

          <Heading>{dataPost?.title}</Heading>
          <BoxImage>
            <img src={dataPost?.imageUrl} alt={dataPost?.imageUrl ?? ''} />
          </BoxImage>
          <Content dangerouslySetInnerHTML={{ __html: dataPost?.description ?? '' }} />
        </ContentBox>
      )}

      <SignIn />
    </Layout>
  );
};

export default BlogDetail;
