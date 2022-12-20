import * as React from 'react';
import SignIn from '@components/SignIn';
// import CardPost from '@components/Cards/CardPost';
import SliderBlog from '@components/Slider/SliderBlog';
import HeaderSearch from '@components/Header/search';

import { styled } from '@mui/system';
import { Layout, CustomContainer, CustomRow } from '@components/Common';

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

const SliderPost = styled('div')({
  width: '100%',
  overflow: 'hidden'
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

const dataBlog = [
  {
    image: 'https://cv-front-end.s3.ap-southeast-1.amazonaws.com/images/image-banner.jpeg',
    createdAt: 'July 2, 2022',
    title: 'Title 1',
    desc: 'Desc 2',
    author: {
      imageUrl: 'https://cv-front-end.s3.ap-southeast-1.amazonaws.com/images/vanthang.png',
      name: 'daniel',
      position: 'Author'
    }
  },
  {
    image: 'https://cv-front-end.s3.ap-southeast-1.amazonaws.com/images/image-banner.jpeg',
    createdAt: 'July 2, 2022',
    title: 'Title 1',
    desc: 'Desc 2',
    author: {
      imageUrl: 'https://cv-front-end.s3.ap-southeast-1.amazonaws.com/images/vanthang.png',
      name: 'daniel',
      position: 'Author'
    }
  },
  {
    image: 'https://cv-front-end.s3.ap-southeast-1.amazonaws.com/images/image-banner.jpeg',
    createdAt: 'July 2, 2022',
    title: 'Title 1',
    desc: 'Desc 2',
    author: {
      imageUrl: 'https://cv-front-end.s3.ap-southeast-1.amazonaws.com/images/vanthang.png',
      name: 'daniel',
      position: 'Author'
    }
  },
  {
    image: 'https://cv-front-end.s3.ap-southeast-1.amazonaws.com/images/image-banner.jpeg',
    createdAt: 'July 2, 2022',
    title: 'Title 1',
    desc: 'Desc 2',
    author: {
      imageUrl: 'https://cv-front-end.s3.ap-southeast-1.amazonaws.com/images/vanthang.png',
      name: 'daniel',
      position: 'Author'
    }
  }
];

const Blog = () => {
  const settingSlider = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: false,
    arrows: false,
    draggable: false
  };

  React.useEffect(() => {
    document.title = 'Thang Nguyen | Blog';
  }, []);

  return (
    <Layout sx={{ height: 'calc(100vh - 72.5px)' }}>
      <HeaderSearch />

      <BlogPage>
        <BlogContent>
          <SectionTitle>
            <h3>ALL BLOG</h3>
            <p>Place to keep memories</p>
          </SectionTitle>

          <SliderPost>
            <SliderBlog config={settingSlider} data={dataBlog}/>
          </SliderPost>

          <CustomContainer styles={{ maxWidth: '1100px', padding: '0' }}>
            <CustomRow>
              {dataBlog?.map((item: any, index: number) => (
                <Column key={index}>
                  {/*<CardPost data={item} />*/}
                </Column>
              ))}
            </CustomRow>
          </CustomContainer>
        </BlogContent>
      </BlogPage>

      <SignIn />
    </Layout>
  );
};

export default Blog;
