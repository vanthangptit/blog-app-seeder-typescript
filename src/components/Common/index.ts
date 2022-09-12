import { styled } from '@mui/system';
import { LAYOUT } from '@src/constants';

export const Layout = styled('div')<{ styles?: any, paddingNav?: boolean, scrollBar?: boolean, flexMiddle?: boolean }>(({ styles, paddingNav, scrollBar, flexMiddle }) => ({
  ...(styles && { ...styles }),

  ...(paddingNav && {
    paddingLeft: '16px',

    '@media (min-width: 1200px)': {
      paddingLeft: LAYOUT.widthNavDesktop + 16 + 'px'
    }
  }),

  ...(scrollBar && {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'scroll',
    paddingRight: '16px',

    '&::-webkit-scrollbar': {
      width: '6px'
    },

    '&::-webkit-scrollbar-thumb': {
      background: '#555555',
      borderRadius: '5px'
    },

    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555555'
    }
  }),

  ...(flexMiddle && {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  })
}));

export const CustomContainer = styled('div')<{ styles?: any, flexMiddle?: boolean }>(({ styles, flexMiddle }) => ({
  width: '100%',
  marginRight: 'auto',
  marginLeft: 'auto',

  ...(!styles?.padding && {
    paddingRight: '15px',
    paddingLeft: '15px'
  }),

  ...(styles && { ...styles }),

  ...(flexMiddle && {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }),

  ...(!styles?.maxWidth && {
    '@media (min-width: 992px)': {
      maxWidth: '960px'
    }
  })
}));

export const CustomRow = styled('div')<{ styles?: any }>(({ styles }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  marginRight: '-15px',
  marginLeft: '-15px',

  ...(styles && { ...styles })
}));
