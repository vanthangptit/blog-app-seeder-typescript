import * as React from 'react';
import { styled } from '@mui/system';
import  { AiOutlineSearch } from 'react-icons/ai';

const Header = styled('div')({
  position: 'relative',
  zIndex: 1,
  padding: '37px 20px 15px',
  borderBottom: '3px solid #eee'
});

const FormSearchContain = styled('div')({
  width: '100%',
  maxWidth: '1100px',
  marginLeft: 'auto',
  marginRight: 'auto'
});

const FormSearch = styled('form')({
  display: 'inline-block',
  position: 'relative',

  '& input': {
    padding: '6px 20px 6px 35px',
    borderRadius: '20px'
  },

  '& span': {
    color: '#aaa',
    position: 'absolute',
    height: '100%',
    width: '20px',
    top: '0',
    left: '9px',
    lineHeight: '42px'
  }
});

const IconSearch = styled('span')({});

const HeaderSearch = () => {
  return (
    <Header>
      <FormSearchContain>
        <FormSearch>
          <input id="input-search" placeholder="Search posts..." />
          <IconSearch>
            <AiOutlineSearch fontSize='large'/>
          </IconSearch>
        </FormSearch>
      </FormSearchContain>
    </Header>
  );
};

export default HeaderSearch;
