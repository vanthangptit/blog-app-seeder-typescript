import * as React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useSearch } from '@hooks/useSearch';
import { useNavigate } from 'react-router-dom';
import { useOnClickOutside } from '@hooks/useOnClickOutside';

import { styled } from '@mui/system';
import  { AiOutlineSearch } from 'react-icons/ai';

const Header = styled('header')({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 9999,
  padding: '37px 20px 15px',
  borderBottom: '3px solid #eee',
  width: '100%',
  background: '#fff'
});

const FormSearchContain = styled('div')({
  width: '100%',
  maxWidth: '1100px',
  marginLeft: 'auto',
  marginRight: 'auto'
});

const FormSearch = styled('form')<{ isFocus?: boolean }>(({ isFocus }) => ({
  display: 'inline-block',
  position: 'relative',

  '& input': {
    padding: '6px 20px 6px 35px',
    borderRadius: '20px',
    width: `${isFocus ? '400px' : '250px'}`,
    transition: 'width 0.2s'
  },

  '& > span': {
    color: '#aaa',
    position: 'absolute',
    height: '100%',
    width: '20px',
    top: '0',
    left: '9px',
    lineHeight: '42px'
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

const IconSearch = styled('span')({});

const HeaderSearch = () => {
  const navigate = useNavigate();
  const [ searchTextIn, setSearchText ] = React.useState<string>('');
  const [ isFocus, setFocus ] = React.useState<boolean>(false);
  const [ isOpen, setOpen ] = React.useState<boolean>(false);
  const suggestionDropdownNode = React.useRef<HTMLFormElement | null>(null);

  const {
    data,
    searchPostApi
  } = useSearch();

  const handleCallApi = useDebouncedCallback((keyWord: string) => {
    searchPostApi({ keyWord });
  }, 500);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpen(true);
    setSearchText(String(e.target.value));
    handleCallApi(String(e.target.value));
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleOnBlur = () => {
    setFocus(false);
  };

  const handleToggleDropdown = () => {
    setOpen(!isOpen);
  };

  useOnClickOutside(suggestionDropdownNode, isOpen ? handleToggleDropdown : undefined);

  return (
    <Header>
      <FormSearchContain>
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

          {isOpen && (
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
      </FormSearchContain>
    </Header>
  );
};

export default HeaderSearch;
