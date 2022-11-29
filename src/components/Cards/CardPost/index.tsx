import React from 'react';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';

const Card = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s',
  cursor: 'pointer',
  border: '1px solid #eee',

  '&:hover': {
    boxShadow: '0px 12px 12px rgb(0 0 0 / 20%)',

    '.card-image': {
      transform: 'scale(1.2)'
    }
  }
});

const CardImage = styled('div')({
  display: 'flex',
  overflow: 'hidden',

  'img': {
    transition: 'all 0.3s'
  }
});

const CardBody = styled('div')({
  padding: '20px'
});

const CreateAt = styled('div')({
  fontFamily: 'Roboto-Bold',
  fontSize: '15px',
  marginTop: '7px',

  '& span': {
    color: '#aaa',
    fontStyle: 'italic',
    fontFamily: 'Roboto-Bold',
    fontSize: '14px'
  }
});

const CardBodyContent = styled('div')({
  margin: '10px 0 15px'
});

const CustomTypographyH3 = styled(Typography)({
  fontSize: '23px',
  fontFamily: 'Roboto-Bold, sans-serif',
  display: '-webkit-box',
  '-webkit-line-clamp': '2',
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginBottom: '12px',

  '@media (max-width: 767px)': {
    fontSize: 'calc(18px + (23 - 18) * (100vw - 360px) / (767 - 360))'
  }
});

const CustomTypographyParagraph = styled(Typography)({
  color: '#aaa',
  fontSize: '15px',
  display: '-webkit-box',
  '-webkit-line-clamp': '2',
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

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

const CardPost = ({ data }: any) => {
  return (
    <Card>
      <CardImage>
        <img src={data.image} alt={data?.image ?? ''} className="card-image"/>
      </CardImage>
      <CardBody>
        <CreateAt>Created at - <span>{data.createdAt}</span></CreateAt>
        <CardBodyContent>
          <CustomTypographyH3 variant={'h3'}>{data.title}</CustomTypographyH3>
          <CustomTypographyParagraph variant="body2">{data.desc}</CustomTypographyParagraph>
        </CardBodyContent>
        <Author>
          <img src={data?.author?.imageUrl} alt={data?.author?.imageUrl ?? ''}/>
          <AuthorInfo>
            <h5>{data?.author?.name}</h5>
            <p>{data?.author?.position}</p>
          </AuthorInfo>
        </Author>
      </CardBody>
    </Card>
  );
};

export default CardPost;
