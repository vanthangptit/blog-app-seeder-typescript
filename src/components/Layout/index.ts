import { styled } from '@mui/system';
import { LAYOUT } from '@src/constants';
import { Container } from '@mui/material';

export const Layout = styled('div')<{ backgroundColor?: string | undefined, paddingNav?: boolean | undefined, scrollBar?: boolean | undefined, flexAliginCenter?: boolean | undefined}>`
  ${({ backgroundColor }) => backgroundColor && (`
    background-color: ${backgroundColor};`
  )}

  ${({ flexAliginCenter }) => flexAliginCenter && (`
    display: flex;
    justify-content: center;
    align-items: center;`
  )}

  ${({ scrollBar }) => scrollBar && (`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: $color-grey-555;
      border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: $color-grey-555;
    }`
  )}

  ${({ paddingNav }) => paddingNav && (`
    @media (min-width: 1200px) {
      padding-left: ${LAYOUT.widthNavDesktop}
    }`
  )}
`;

export const CustomContainer = styled(Container)<{ backgroundColor?: string | undefined, divContent?: boolean | undefined}>`
  ${({ backgroundColor }) => backgroundColor && (`
    background-color: ${backgroundColor};`
  )}

  ${({ divContent }) => divContent && (`
    background-color: '#ffff';
    padding-top: 40px;
    padding-bottom: 40px;
    border-radius: 5px;`
  )}
`;
