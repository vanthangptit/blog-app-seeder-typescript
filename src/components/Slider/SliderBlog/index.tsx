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
    '.slick-list': {
      marginLeft: '-20px'
    },

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
  width: '100%',
  display: 'flex',
  margin: '0 -16px'
});

const CardImage = styled('div')({
  flex: '0 0 40%',
  maxWidth: '40%',
  padding: '0 16px',

  'img': {
    borderRadius: '8px'
  }
});

const CardBody = styled('div')({
  flex: '0 0 60%',
  maxWidth: '60%',
  padding: '0 16px'
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

const CustomTypographyH3 = styled(Typography)({
  fontSize: '44px',
  fontFamily: 'Roboto-Black, sans-serif',
  display: '-webkit-box',
  lineClamp: '2',
  boxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginBottom: '12px',

  '@media (min-width: 768px) and (max-width: 991px)': {
    fontSize: 'calc(22px + (44 - 22) * (100vw - 768px) / (991 - 768))'
  },

  '@media (max-width: 767px)': {
    fontSize: 'calc(18px + (23 - 18) * (100vw - 360px) / (767 - 360))'
  }
});

const CustomTypographyParagraph = styled(Typography)({
  color: '#aaa',
  fontSize: '18px',
  fontFamily: 'Roboto-Bold, sans-serif',
  display: '-webkit-box',
  lineClamp: '2',
  boxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  '@media (min-width: 768px) and (max-width: 991px)': {
    fontSize: 'calc(14px + (18 - 14) * (100vw - 768px) / (991 - 768))'
  },

  '@media (max-width: 767px)': {
    fontSize: '14px'
  }
});

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
                  <img src={slide.image} alt={slide?.image ?? ''}/>
                </CardImage>
                <CardBody>
                  <CreateAt>Created at - <span>{slide?.createdAt}</span></CreateAt>
                  <CardBodyContent>
                    <CustomTypographyH3 variant={'h3'}>{slide?.title}</CustomTypographyH3>
                    <CustomTypographyParagraph variant="body2">{slide?.desc}</CustomTypographyParagraph>
                  </CardBodyContent>
                  <Author>
                    <img src={slide?.author?.imageUrl} alt={slide?.author?.imageUrl ?? ''}/>
                    <AuthorInfo>
                      <h5>{slide?.author?.name}</h5>
                      <p>{slide?.author?.position}</p>
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
