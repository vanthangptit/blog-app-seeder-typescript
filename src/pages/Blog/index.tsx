import * as React from 'react';
import SignIn from '@components/SignIn';
import CardPost from '@components/Cards/CardPost';
import SliderBlog from '@components/Slider/SliderBlog';
import { usePost } from '@hooks/usePost';
import { useLocation } from 'react-router-dom';
import RangePagination from '@components/Pagination';
import LoadingSection from '@components/LoadingSection';

import { styled } from '@mui/system';
import { CustomContainer, CustomRow } from '@components/Common';
import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT, TYPE_BLOG } from '@src/constants';

const Layout = styled('div')<{ isStyle: boolean }>(({ isStyle }) => ({
  padding: '89px 16px 0',

  ...(isStyle && {
    height: 'calc(100vh - 72.5px)',
    minHeight: '500px',
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
  width: '100%',
  marginBottom: '40px'
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

const SliderPost = styled('div')({
  width: '100%',
  overflow: 'hidden',

  '@media (max-width: 991px)': {
    marginBottom: '40px'
  }
});

const Column = styled('div')({
  flex: `0 0 ${4/12 * 100}%`,
  maxWidth: `${4/12 * 100}%`,
  padding: '0 15px',
  marginBottom: '30px',

  '@media (min-width: 768px) and (max-width: 991px)': {
    flex: `0 0 ${6/12 * 100}%`,
    maxWidth: `${6/12 * 100}%`
  },

  '@media (max-width: 767px)': {
    flex: '0 0 100%',
    maxWidth: '100%'
  }
});

const PaginationBox = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px 0'
});

const Blog = () => {
  const location: any = useLocation();
  const settingSlider = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: false,
    arrows: false,
    draggable: false
  };
  const [ loading, setLoading ] = React.useState<boolean>(false);
  const refCustomContainer = React.useRef<any>(null);

  const types = () => {
    return TYPE_BLOG.map((item) => item.value);
  };

  const typeCallback = React.useCallback(() => types().toString(), []);

  const {
    dataAllPost,
    getAllPostApi
  } = usePost();

  const onPageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    getAllPostApi({ page: page - 1, pageSize: PAGE_SIZE_DEFAULT, type: typeCallback() })
      .unwrap()
      .then((res) => {
        if (res.status === 200) {
          refCustomContainer?.current.scrollIntoView();
        }
      });
  };

  React.useEffect(() => {
    setLoading(true);
    getAllPostApi({
      page: PAGE_DEFAULT,
      pageSize: PAGE_SIZE_DEFAULT,
      type: typeCallback()
    })
      .unwrap()
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ location ]);

  React.useEffect(() => {
    document.title = 'Thang Nguyen | Featured';
  }, []);

  return (
    <Layout isStyle={!dataAllPost || loading}>
      {loading ? (
        <LoadingSection />
      ) : (
        <BlogPage>
          <BlogContent>
            <SectionTitle>
              <h3>ALL Post</h3>
              <p>Place to keep memories</p>
            </SectionTitle>

            {dataAllPost && dataAllPost.postLatestOfType && dataAllPost.items.length > 0 && dataAllPost?.postLatestOfType.length > 0 ? (
              <>
                <SliderPost>
                  <SliderBlog config={settingSlider} data={dataAllPost.postLatestOfType}/>
                </SliderPost>

                <CustomContainer styles={{ maxWidth: '1100px', padding: '0' }} ref={refCustomContainer}>
                  <CustomRow>
                    {dataAllPost && dataAllPost.items?.map((item, index) => (
                      <Column key={index}>
                        <CardPost data={item} horizontal={false} redirectBlogDetail={true}/>
                      </Column>
                    ))}
                  </CustomRow>
                  {dataAllPost && dataAllPost.items.length > 0 && dataAllPost.pageCount > 1 && (
                    <PaginationBox>
                      <RangePagination
                        defaultPage={1}
                        count={dataAllPost.pageCount}
                        page={dataAllPost.page + 1}
                        onPageChange={onPageChange}
                      />
                    </PaginationBox>
                  )}
                </CustomContainer>
              </>
            ) : (
              <>
                <h3>Has no post.</h3>
              </>
            )}
          </BlogContent>
        </BlogPage>
      )}

      <SignIn />
    </Layout>
  );
};

export default Blog;
