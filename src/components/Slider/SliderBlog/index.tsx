import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';

interface IFConfig {
  dots: boolean
  infinite: boolean
  slidesToShow: number
  slidesToScroll: number
  variableWidth: boolean
  arrows: boolean
  className?: string
  speed?: number
  responsive?: any
  initialSlide?: number
  centerPadding?: string
  centerMode?: boolean
  fade?: boolean
  autoplay?: boolean
  autoplaySpeed?: number
}

interface IFProps {
  config: IFConfig
  data: any[]
}

const BoxSlider = styled('div')({
  marginTop: '40px',
  marginBottom: '40px',
  position: 'relative',

  '& .slick-dots': {
    display: 'flex !important',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '12px',

    'li': {
      'button': {
        textIndent: '-99999px',
        width: '12px',
        height: '12px',
        backgroundColor: '#ccc',
        borderRadius: '50%',
        cursor: 'pointer',
        border: 'none',
        outline: 'none'
      },

      '&.slick-active button': {
        backgroundColor: '#ea912d'
      }
    }
  },

  '&.no-button-nav': {
    '.slick-track': {
      display: 'flex',
      justifyContent: 'center'
    },

    '.slick-slide': {
      float: 'none',
      paddingLeft: '0',
      paddingRight: '0'
    }
  },

  '.slick-slide': {
    paddingLeft: '32px',
    paddingRight: 0
  },

  '@media (max-width: 768px)': {
    // '.slick-list': {
    //   marginLeft: '-20px'
    // },

    '.slick-slide': {
      paddingLeft: '20px'
    },

    '.card-image': {
      height: '220px'
    }
  }
});

const CardSlider = styled('div')({});

const Card = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  margin: '0 -16px'
});

const CardImage = styled('div')({
  flex: '0 0 40%',
  maxWidth: '40%',
  padding: '0 16px',

  'img': {
    borderRadius: '8px',
    height: '350px',
    objectFit: 'cover'
  },

  '@media (max-width: 991px)': {
    flex: '0 0 100%',
    maxWidth: '100%'
  }
});

const CardBody = styled('div')({
  flex: '0 0 60%',
  maxWidth: '60%',
  padding: '0 16px',

  '@media (max-width: 991px)': {
    flex: '0 0 100%',
    maxWidth: '100%'
  }
});

const CreateAt = styled('div')({
  fontFamily: 'Roboto-Bold',
  fontSize: '18px',

  '& span': {
    color: '#aaa',
    fontStyle: 'italic',
    fontFamily: 'Roboto-Bold',
    fontSize: '16px'
  }
});

const CardBodyContent = styled('div')({
  margin: '15px 0 20px'
});

const CustomTypographyH3 = styled(Typography)`
  font-size: 44px;
  font-family: Roboto-Black, sans-serif;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 12px;

  @media (min-width: 768px) and (max-width: 991px): {
    font-size: calc(22px + (44 - 22) * (100vw - 768px) / (991 - 768));
  };

  @media (max-width: 767px) {
    font-size: calc(18px + (23 - 18) * (100vw - 360px) / (767 - 360));
  }
`;

const Description = styled('div')`
  font-size: #aaa;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  pre {
    color: #aaa;
    font-size: 18px;
    font-family: Roboto-Bold, sans-serif;

    @media (min-width: 768px) and (max-width: 991px) {
      font-size: calc(14px + (18 - 14) * (100vw - 768px) / (991 - 768));
    }

    @media (max-width: 767px): {
      font-size: 14px;
    }
  }
`;

const Author = styled('div')({
  display: 'flex',
  gap: '12px',

  '& img': {
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    border: '1px solid #777'
  }
});

const AuthorInfo = styled('div')({
  '& h5': {
    fontSize: '15px',
    textTransform: 'capitalize',
    fontFamily: 'Roboto-Black, sans-serif'
  },

  '& p': {
    color: '#aaa',
    fontSize: '15px',
    fontFamily: 'Roboto-Regular, sans-serif',
    margin: '0'
  }
});

const SliderBlog = ({ config, data }: IFProps) => {
  const refSlider = useRef<Slider | null>(null);
  const boxSliderElement = useRef<HTMLDivElement | null>(null);

  const configSlide = {
    ...config
  };

  useEffect(() => {
    if (boxSliderElement.current) {
      const buttonElement = boxSliderElement.current.querySelector('.nav-button-slide');

      if (buttonElement) {
        boxSliderElement.current.classList.remove('no-button-nav');
      } else {
        boxSliderElement.current.classList.add('no-button-nav');
      }
    }
  }, []);

  return data && data.length ? (
    <BoxSlider ref={boxSliderElement}>
      <Slider {...configSlide} ref={refSlider}>
        {data.map((slide, index) => {
          return (
            <CardSlider key={index}>
              <Card>
                <CardImage>
                  <img src={slide.imageUrl} alt={slide.imageUrl}/>
                </CardImage>
                <CardBody>
                  <CreateAt>Created at - <span>{slide.createdAt}</span></CreateAt>
                  <CardBodyContent>
                    <CustomTypographyH3 variant={'h3'}>{slide.title}</CustomTypographyH3>
                    <Description>
                      <pre dangerouslySetInnerHTML={{ __html: slide.excerpt }} />
                    </Description>
                  </CardBodyContent>
                  <Author>
                    <img
                      src={'https://cv-front-end.s3.ap-southeast-1.amazonaws.com/images/vanthang.png'}
                      alt={'https://cv-front-end.s3.ap-southeast-1.amazonaws.com/images/vanthang.png'}
                    />
                    <AuthorInfo>
                      <h5>{slide.author?.lastName + ' ' + slide.author?.firstName}</h5>
                      <p>Author</p>
                    </AuthorInfo>
                  </Author>
                </CardBody>
              </Card>
            </CardSlider>
          );
        })}
      </Slider>
    </BoxSlider>
  ) : (
    <></>
  );
};

export default SliderBlog;
