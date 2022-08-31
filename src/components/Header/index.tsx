import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SITES_URL, AWS_S3_URL } from '@src/constants';
import { styled } from '@mui/system';
import {
  List,
  ListItem
} from '@mui/material';

const listMenu = [
  {
    href: SITES_URL.HOME,
    label: 'Home'
  },
  {
    href: SITES_URL.ABOUT,
    label: 'About Me'
  },
  {
    href: SITES_URL.BLOG,
    label: 'Blog'
  },
  {
    href: SITES_URL.CONTACT,
    label: 'Contact'
  }
];

const HeaderComponent = styled('header')<{ showStatements: boolean | undefined}>(({ showStatements }) => ({
  position: 'fixed',
  zIndex: 1200,
  width: '260px',
  height: '100vh',
  backgroundColor: '#232323',
  borderRight: '1px solid #38404a',
  transition: 'all 0.4s',
  transform: `${showStatements ? 'translateX(0)': 'translateX(-100%)'}`,

  'a': {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: '16px'
  },

  '@media (min-width: 1200px)': {
    transform: 'translateX(0)',
    width: '300px',

    '.button-hamburger': {
      display: 'none'
    }
  }
}));

const ButtonHamburger = styled('span')<{ showStatements: boolean | undefined}>(({ showStatements }) => ({
  position: 'absolute',
  top: '25px',
  left: '100%',
  zIndex: 1,
  height: '60px',
  width: '60px',
  color: '#fff',
  backgroundColor: '#232323',
  borderRadius: 0,
  border: '1px solid rgba(129, 171, 170, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',

  'span': {
    display: 'inline-block',
    height: '3px',
    width: '30px',
    transition: 'background 0s',
    background: `${showStatements ? 'transparent': '#fefefe'}`,
    position: 'relative',
    borderRadius: '2px',

    '&::before': {
      content: '""',
      position: 'absolute',
      display: 'inline-block',
      height: '3px',
      width: '30px',
      background: '#fefefe',
      left: 0,
      top: '-10px',
      borderRadius: '2px',
      transition: 'all .25s cubic-bezier(.645,.045,.355,1)',
      transitionTimingFunction: 'cubic-bezier(.645,.045,.355,1)',
      transform: `${showStatements ? 'translateY(10px) translateX(0) rotate(45deg)': 'none'}`
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      display: 'inline-block',
      height: '3px',
      width: '30px',
      background: '#fefefe',
      top: '10px',
      left: 0,
      borderRadius: '2px',
      transition: 'all .25s cubic-bezier(.645,.045,.355,1)',
      transitionTimingFunction: 'cubic-bezier(.645,.045,.355,1)',
      transform: `${showStatements ? 'translateX(0) translateY(-10px) rotate(-45deg)': 'none'}`
    }
  }
}));

const Navbar = styled('nav')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  width: '100%',
  overflowY: 'auto',
  overflowX: 'hidden',

  '&::-webkit-scrollbar': {
    width: '6px'
  },

  '&::-webkit-scrollbar-thumb': {
    background: '#444444',
    borderRadius: '5px'
  },

  '&::-webkit-scrollbar-thumb:hover': {
    background: '#444444'
  }
});

const NavbarInner = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px 0',
  borderBottom: '1px solid #38404a',
  position: 'relative'
});

const NavbarBrand = styled(Link)({
  display: 'flex',
  width: '200px',
  height: '200px',
  border: '7px solid #2e344e',
  borderRadius: '50%',
  overflow: 'hidden'
});

const NavbarLink = styled(NavLink)({
  display: 'inline-block',
  position: 'relative',
  width: '100%',
  textAlign: 'center',
  padding: '10px 20px',

  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 1,
    height: '100%',
    width: '0%',
    backgroundColor: 'rgba(11, 155, 153, 0.2)',
    transition: 'all 0.3s',
    transform: 'translate(-50%, -50%)'
  },

  '&:hover::after': {
    width: '100%'
  },

  '&.is-active': {
    backgroundColor: '#0b9b99'
  }
});

const NavbarCopyright = styled('div')({
  textAlign: 'center',
  color: '#fff',
  padding: '20px',
  borderTop: '1px solid #38404a'
});

const Header = () => {
  const [ showStatements, setShowStatements ] = React.useState<boolean | undefined>(false);
  const onClick = () => setShowStatements(!showStatements);

  return (
    <HeaderComponent showStatements={showStatements}>
      <ButtonHamburger showStatements={showStatements} className={'button-hamburger'} onClick={onClick}>
        <span/>
      </ButtonHamburger>

      <Navbar>
        <NavbarInner>
          <NavbarBrand to={SITES_URL.HOME}>
            <img src={AWS_S3_URL + 'vanthang.png'} alt={''}/>
          </NavbarBrand>
        </NavbarInner>

        <List sx={{ padding: '20px 0' }}>
          {
            listMenu.map((item) => (
              <ListItem key={item.href} sx={{ padding: 0 }}>
                <NavbarLink to={item.href} className={({ isActive }) => isActive ? 'is-active' : ''}>
                  {item.label}
                </NavbarLink>
              </ListItem>
            ))
          }
        </List>

        <NavbarCopyright>© 2022 React Template</NavbarCopyright>
      </Navbar>
    </HeaderComponent>
  );
};

export default Header;
