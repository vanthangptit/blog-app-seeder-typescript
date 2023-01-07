import React from 'react';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import { IPost } from '@models/IPosts';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Card = styled('div')<{ horizontal: boolean }>(({ horizontal }) => ({
  width: '100%',
  display: 'flex',
  flex: '1 1 auto',
  transition: 'all 0.3s',
  cursor: 'pointer',
  border: '1px solid #eee',

  ...(horizontal && {
    width: '100%'
  }),

  ...(!horizontal && {
    flexDirection: 'column',

    '&:hover': {
      boxShadow: '0px 12px 12px rgb(0 0 0 / 20%)'
    }
  })
}));

const CardImage = styled('div')<{ horizontal: boolean }>(({ horizontal }) => ({
  display: 'flex',
  flex: '0 0 280px',
  height: '290px',
  overflow: 'hidden',

  'img': {
    transition: 'all 0.3s',
    objectFit: 'cover',
    width: '100%'
  },

  ...(horizontal && {
    'img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })
}));

const CardBody = styled('div')<{ horizontal: boolean }>(({ horizontal }) => ({
  padding: '20px',

  ...(horizontal && {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto'
  })
}));

const CreateAt = styled('div')({
  fontFamily: 'Roboto-Bold',
  fontSize: '15px',
  marginBottom: '10px',

  '& span': {
    color: '#aaa',
    fontStyle: 'italic',
    fontFamily: 'Roboto-Bold',
    fontSize: '14px'
  }
});

const CardBodyContent = styled('div')<{ horizontal: boolean }>(({ horizontal }) => ({
  marginBottom: '15px',

  ...(horizontal && {
    flex: '1 1 auto'
  })
}));

const CustomTypographyH3 = styled(Typography)`
  font-size: 23px;
  font-family: Roboto-Bold, sans-serif;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 12px;

  @media (max-width: 767px) {
    font-size: calc(18px + (23 - 18) * (100vw - 360px) / (767 - 360));
  }
`;

const CustomTypographyParagraph = styled('div')`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #aaa;
  font-size: 15px;
  font-family: Roboto-Regular, sans-serif;

  @media (max-width: 767px) {
    fontSize: 14px;
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

const CardPost = ({ data, horizontal, redirectBlogDetail }: { data: IPost, horizontal: boolean, redirectBlogDetail?: boolean }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (redirectBlogDetail) {
      navigate(`/blog/${data.shortUrl}`);
    }
  };

  return (
    <Card horizontal={horizontal} onClick={handleOnClick}>
      {data?.imageUrl && (
        <CardImage horizontal={horizontal}>
          <img src={data.imageUrl} alt={data.imageUrl ?? ''} className="card-image"/>
        </CardImage>
      )}
      <CardBody horizontal={horizontal}>
        <CardBodyContent horizontal={horizontal}>
          <CreateAt>Created at - <span>{moment(data.createdAt).format('ll')}</span></CreateAt>
          <CustomTypographyH3 variant={'h3'}>{data.title}</CustomTypographyH3>
          <CustomTypographyParagraph dangerouslySetInnerHTML={{ __html: data.excerpt }} />
        </CardBodyContent>
        <Author>
          <img
            src={'https://blog-app-seeder.s3.ap-southeast-1.amazonaws.com/images/avatar.svg'}
            alt={''}
          />
          <AuthorInfo>
            <h5>{data.author?.lastName + ' ' + data.author?.firstName}</h5>
            <p>Author</p>
          </AuthorInfo>
        </Author>
      </CardBody>
    </Card>
  );
};

export default CardPost;
