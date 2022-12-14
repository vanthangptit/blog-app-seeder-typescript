import * as React from 'react';
import { keyframes, styled } from '@mui/system';
import { AiOutlineReload } from 'react-icons/ai';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingIcon = styled('div')`
  padding-bottom: 100px;
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100vh;
  align-items: center;
`;

const StyledLoader = styled(AiOutlineReload)`
  animation: 2s ${rotate} linear infinite;
`;

const LoadingSection = () => {
  return (
    <LoadingIcon>
      <StyledLoader size={'70px'} />
    </LoadingIcon>
  );
};

export default LoadingSection;
