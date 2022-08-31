import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SITES_URL } from '@src/constants';
import { getAccessTokenCookie, getUsernameCookie } from '@utils/RGSCookies';
import { styled } from '@mui/system';
import {
  List,
  ListItem
} from '@mui/material';

// ** Icons
import { BsFillPersonFill, BsCaretDownFill } from 'react-icons/bs';
import { FiLogIn } from 'react-icons/fi';

const SignIn = () => {
  const location = useLocation();

  // ** States
  const [ isOpen, setOpen ] = React.useState<boolean | null>(null);
  const [ username, setSetUsername ] = React.useState<string | undefined>(undefined);
  const [ loggedIn, setLoggedIn ] = React.useState<boolean | null>(null);

  const handleShowAccountInfo = (e: any) => {
    e.preventDefault();

    setOpen(!isOpen);
  };

  const handleClick = (e: any) => {
    e.preventDefault();

    if (loggedIn) {
      setLoggedIn(false);
    }
  };

  React.useEffect(() => {
    if (getUsernameCookie() && getAccessTokenCookie()) {
      setSetUsername(getUsernameCookie());
      setLoggedIn(true);
    }
  }, [ location ]);

  // ** Styled
  const UserBox = styled('div')({
    position: 'fixed',
    top: '35px',
    right: '35px',
    zIndex: 3,

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
    display: 'none',
    position: 'absolute',
    top: 'calc(100% + 15px)',
    right: 0,
    zIndex: 1,
    backgroundColor: '#fff',
    boxShadow: '0 0 12px 0 rgba(0, 0,  0, 0.3)',
    padding: '10px 0',
    borderRadius: '3px',

    '&.is-open': {
      display: 'block'
    },

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

  return loggedIn ? (
    <UserBox>
      <Link type='button' to={'#'} onClick={(e) => handleShowAccountInfo(e)}>
        <BsFillPersonFill fontSize='large' />
        <span>{username}</span>
        <BsCaretDownFill />
      </Link>

      <ListBox className={isOpen ? 'is-open' : ''}>
        <ListItemBox>
          <BsFillPersonFill fontSize='large' />
          <span>{username}</span>
        </ListItemBox>
        <ListItemBox>
          <Link to={SITES_URL.DASHBOARD}>Dashboard</Link>
        </ListItemBox>
        <ListItemBox>
          <Link to={SITES_URL.ACCOUNT}>My account</Link>
        </ListItemBox>
        <ListItemBox>
          <Link to={'#'} onClick={(e) => handleClick(e)}>
            Sign out <span><FiLogIn fontSize='large'/></span>
          </Link>
        </ListItemBox>
      </ListBox>
    </UserBox>
  ) : (
    <UserBox>
      <Link to={SITES_URL.LOGIN}>
        <BsFillPersonFill fontSize='large' />
        <span>Sign in</span>
      </Link>
    </UserBox>
  );
};

export default SignIn;
