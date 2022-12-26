import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTokenUser } from '@hooks/useTokenUser';
import { useOnClickOutside } from '@hooks/useOnClickOutside';
import { SITES_URL } from '@src/constants';
import { styled } from '@mui/system';
import {
  List,
  ListItem
} from '@mui/material';

import { BsFillPersonFill, BsCaretDownFill } from 'react-icons/bs';
import { FiLogIn } from 'react-icons/fi';

const UserContainer = styled('div')({
  position: 'fixed',
  top: '35px',
  right: '35px',
  zIndex: 99999,
  display: 'flex',
  gap: '20px',
  alignItems: 'center'
});

const UserBox = styled('div')({
  position: 'relative',
  marginLeft: '10px',

  '& > a': {
    outline: 'none',
    border: 'none',
    color: '#333333',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '3px 7px',
    background: 'rgba(232, 237, 244, 0.6)',
    borderRadius: '6px',

    'span': {
      display: 'inline-block',
      marginLeft: '10px',
      marginRight: '3px',
      fontSize: '16px',
      fontWeight: 400
    }
  }
});

const ListBox = styled(List)({
  position: 'absolute',
  top: 'calc(100% + 15px)',
  right: 0,
  zIndex: 1,
  backgroundColor: '#fff',
  boxShadow: '0 0 12px 0 rgba(0, 0,  0, 0.3)',
  padding: '10px 0',
  borderRadius: '3px',
  width: '100%',
  minWidth: '150px',
  maxHeight: '280px',
  overflowX: 'hidden',
  overflowY: 'auto',

  '&:before': {
    width: '12px',
    height: '12px',
    border: 'solid #e5e5e5',
    borderWidth: '0 1px 1px 0',
    content: '""',
    position: 'absolute',
    top: '-6px',
    right: '23px',
    background: '#fff',
    transform: 'rotate(225deg)'
  },

  '&::-webkit-scrollbar': {
    width: '6px'
  },

  '&::-webkit-scrollbar-thumb': {
    background: '#999999',
    borderRadius: '5px'
  },

  '&::-webkit-scrollbar-thumb:hover': {
    background: '#9999999'
  }
});

const ListItemBox = styled(ListItem)({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 20px',
  whiteSpace: 'nowrap',

  'span': {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '5px',
    paddingBottom: '2px',
    margin: 0
  },

  'a': {
    display: 'flex',
    color: '#333333',
    whiteSpace: 'nowrap',

    '&:hover': {
      color: '#0b9b99'
    }
  },

  '&.border-bottom': {
    borderBottom: '1px solid #f1f1f1',
    marginBottom: '10px'
  }
});

const FeaturedLink = styled(Link)({
  color: '#333333',
  whiteSpace: 'nowrap',

  '&:hover': {
    color: '#0b9b99'
  }
});

const UseName = styled('span')({
  maxWidth: '150px',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  height: '24px',
  whiteSpace: 'nowrap'
});

const SignIn = () => {
  const location = useLocation();
  const {
    accessToken,
    username,
    getTokenCookie,
    removeTokenCookie
  } = useTokenUser();
  const [ isOpen, setOpen ] = React.useState<boolean | null>(null);
  const userBoxNode = React.useRef<HTMLDivElement | null>(null);

  const handleShowAccountInfo = (e?: any) => {
    if (e) {
      e.preventDefault();
    }

    setOpen(!isOpen);
  };

  const handleClick = (e: any) => {
    e.preventDefault();

    removeTokenCookie();
  };

  useOnClickOutside(userBoxNode, isOpen ? handleShowAccountInfo : undefined);

  React.useEffect(() => {
    getTokenCookie();
  }, [ location, username, accessToken, getTokenCookie ]);

  return (
    <UserContainer>
      <FeaturedLink type='button' to={SITES_URL.BLOG}>Featured</FeaturedLink>
      <FeaturedLink type='button' to={'#'} onClick={(e) => e.preventDefault()}>FAQ</FeaturedLink>
      <FeaturedLink type='button' to={SITES_URL.CONTACT}>Contact</FeaturedLink>

      {accessToken && username ? (
        <UserBox ref={userBoxNode}>
          <Link type='button' to={'#'} onClick={(e) => handleShowAccountInfo(e)}>
            <BsFillPersonFill fontSize='large' />
            <UseName>{username}</UseName>
            <BsCaretDownFill />
          </Link>

          {isOpen && (
            <ListBox>
              <ListItemBox button={false}>
                <Link to={SITES_URL.My_BLOG}>Your Blog</Link>
              </ListItemBox>
              <ListItemBox button={false} className="border-bottom">
                <Link to={SITES_URL.CREATE_POST}>Create Blog</Link>
              </ListItemBox>
              <ListItemBox button={false}>
                <Link to={SITES_URL.DASHBOARD}>Dashboard</Link>
              </ListItemBox>
              <ListItemBox button={false} className="border-bottom">
                <Link to={SITES_URL.ACCOUNT}>My account</Link>
              </ListItemBox>
              <ListItemBox button={false}>
                <Link to={'#'} onClick={(e) => handleClick(e)}>
                  Sign out <span><FiLogIn fontSize='large'/></span>
                </Link>
              </ListItemBox>
            </ListBox>
          )}
        </UserBox>
      ) : (
        <UserBox>
          <Link to={SITES_URL.LOGIN}>
            <BsFillPersonFill fontSize='large' />
            <span>Sign in</span>
          </Link>
        </UserBox>
      )}
    </UserContainer>
  );
};

export default SignIn;
