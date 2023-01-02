import * as React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useSearch } from '@hooks/useSearch';
import { Link, useNavigate } from 'react-router-dom';
import { useOnClickOutside } from '@hooks/useOnClickOutside';

import { styled } from '@mui/system';
import  { AiOutlineSearch } from 'react-icons/ai';
import { SITES_URL } from '@src/constants';

const Header = styled('header')({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 9999,
  padding: '35px 255px 15px 20px',
  borderBottom: '3px solid #eee',
  width: '100%',
  background: '#fff'
});

const FormSearchContain = styled('div')<{ isOpen: boolean }>(({ isOpen }) => ({
  display: 'flex',
  gap: '20px',
  transition: 'all .25s',

  '@media (max-width: 991px)': {
    position: 'absolute',
    top: 'calc(100% + 3px)',
    alignItems: 'flex-start',
    background: '#fff',
    padding: '15px',
    borderRadius: '3px',
    flexDirection: 'column',
    boxShadow: '0 8px 12px 0 rgba(0, 0,  0, 0.3)',
    opacity: `${isOpen ? '1' : '0'}`,
    visibility: `${isOpen ? 'visible' : 'hidden'}`
  }
}));

const FormSearch = styled('form')<{ isFocus?: boolean }>(({ isFocus }) => ({
  display: 'flex',
  flex: '1 1 auto',
  height: '40px',
  position: 'relative',

  '& input': {
    padding: '6.5px 20px 6px 35px',
    borderRadius: '20px',
    width: `${isFocus ? '400px' : '250px'}`,
    transition: 'width 0.2s',

    '@media (max-width: 575px)': {
      width: `${isFocus ? '305px' : '250px'}`
    }
  }
}));

const SuggestionDropdown = styled('ul')({
  position: 'absolute',
  top: 'calc(100% + 5px)',
  left: 0,
  minWidth: '100%',
  listStyle: 'auto',
  listStylePosition: 'inside',
  padding: '25px 20px',
  boxShadow: '0 0 12px 0 rgba(0, 0, 0, 0.2)',
  backgroundColor: '#fff',
  borderRadius: '3px',

  'li': {
    cursor: 'pointer',
    whiteSpace: 'nowrap',

    'span': {}
  }
});

const Navbar = styled('nav')({
  display: 'flex',
  alignItems: 'center',
  paddingRight: '20px',
  gap: '15px',

  '@media (max-width: 991px)': {
    alignItems: 'flex-start',
    flexDirection: 'column'
  }
});

const FeaturedLink = styled(Link)({
  color: '#333333',
  whiteSpace: 'nowrap',

  '&:hover': {
    color: '#0b9b99'
  }
});

const IconSearch = styled('span')({
  color: '#aaa',
  position: 'absolute',
  height: '100%',
  width: '20px',
  top: '2px',
  left: '9px',
  lineHeight: '42px'
});

const ButtonHamburger = styled('span')<{ showStatements: boolean | undefined}>(({ showStatements }) => ({
  height: '36px',
  width: '40px',
  color: '#232323',
  borderRadius: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',

  'span': {
    display: 'inline-block',
    height: '3px',
    width: '30px',
    transition: 'background 0s',
    background: `${showStatements ? 'rgba(255, 255, 255, 0)': '#232323'}`,
    position: 'relative',
    borderRadius: '2px',

    '&::before': {
      content: '""',
      position: 'absolute',
      display: 'inline-block',
      height: '3px',
      width: '30px',
      background: '#232323',
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
      background: '#232323',
      top: '10px',
      left: 0,
      borderRadius: '2px',
      transition: 'all .25s cubic-bezier(.645,.045,.355,1)',
      transitionTimingFunction: 'cubic-bezier(.645,.045,.355,1)',
      transform: `${showStatements ? 'translateX(0) translateY(-10px) rotate(-45deg)': 'none'}`
    }
  },

  '@media (min-width: 992px)': {
    display: 'none'
  }
}));

const HeaderSearch = () => {
  const navigate = useNavigate();
  const [ searchTextIn, setSearchText ] = React.useState<string>('');
  const [ isFocus, setFocus ] = React.useState<boolean>(false);
  const [ isOpenDropdown, setOpenDropdown ] = React.useState<boolean>(false);
  const [ isOpenMenuSearch, setOpenMenuSearch ] = React.useState<boolean>(false);
  const suggestionDropdownNode = React.useRef<HTMLFormElement | null>(null);
  const navBarSearchNode = React.useRef<HTMLDivElement | null>(null);

  const {
    data,
    searchPostApi
  } = useSearch();

  const handleCallApi = useDebouncedCallback((keyWord: string) => {
    searchPostApi({ keyWord });
  }, 500);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpenDropdown(true);
    setSearchText(String(e.target.value));
    handleCallApi(String(e.target.value));
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleOnBlur = () => {
    setFocus(false);
  };

  const handleToggleDropdown = () => setOpenDropdown(!isOpenDropdown);
  const handleShowMenu = () => setOpenMenuSearch(!isOpenMenuSearch);

  useOnClickOutside(suggestionDropdownNode, isOpenDropdown ? handleToggleDropdown : undefined);
  useOnClickOutside(suggestionDropdownNode, isOpenMenuSearch ? handleShowMenu : undefined);

  return (
    <Header
      className={location && (location.pathname === SITES_URL.LOGIN || location.pathname === SITES_URL.REGISTER) ? 'hidden' : ''}
    >
      <div ref={navBarSearchNode}>
        <ButtonHamburger showStatements={isOpenMenuSearch} className={'button-hamburger'} onClick={handleShowMenu}>
          <span/>
        </ButtonHamburger>
        <FormSearchContain isOpen={isOpenMenuSearch}>
          <FormSearch isFocus={isFocus} ref={suggestionDropdownNode}>
            <input
              type={'search'}
              id="input-search"
              placeholder="Search posts..."
              value={searchTextIn}
              onChange={(e) => {
                handleChangeSearch(e);
              }}
              onFocus={handleFocus}
              onBlur={handleOnBlur}
            />
            <IconSearch>
              <AiOutlineSearch fontSize='large'/>
            </IconSearch>

            {isOpenDropdown && (
              <SuggestionDropdown>
                {data && data?.items.length > 0 ? data.items?.map((item, index) => {
                  return (
                    <li key={index} onClick={() => {
                      navigate(`/blog/${item.shortUrl}`);
                      handleToggleDropdown();
                    }}>
                      <span>{item?.title + ' '} ({item?.author.lastName})</span>
                    </li>
                  );
                }) : (
                  <div>No found item</div>
                )}
              </SuggestionDropdown>
            )}
          </FormSearch>
          <Navbar>
            <FeaturedLink type='button' to={SITES_URL.BLOG}>Featured</FeaturedLink>
            <FeaturedLink type='button' to={'#'} onClick={(e) => e.preventDefault()}>FAQ</FeaturedLink>
            <FeaturedLink type='button' to={SITES_URL.CONTACT}>Contact</FeaturedLink>
          </Navbar>
        </FormSearchContain>
      </div>
    </Header>
  );
};

export default HeaderSearch;
