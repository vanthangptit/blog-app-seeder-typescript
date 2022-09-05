import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore';

import { IDataTokenUserParams } from '@models/ICommon';
import * as commonStore from '@store/common';

export const useTokenUser = () => {
  const dispatch = useAppDispatch();
  const {
    accessToken,
    username,
    navigateTo,
    loggedIn
  } = useAppSelector((state: RootState) => state.common);

  const setAccessTokenUsernameCookie = (params: IDataTokenUserParams) => {
    return dispatch(commonStore.setAccessTokenUsernameCookie(params));
  };

  const getAccessTokenUsernameCookie = () => {
    return dispatch(commonStore.getAccessTokenUsernameCookie());
  };

  const removeAccessTokenUsernameCookie = () => {
    return dispatch(commonStore.removeAccessTokenUsernameCookie());
  };

  return {
    accessToken,
    username,
    navigateTo,
    loggedIn,
    setAccessTokenUsernameCookie,
    getAccessTokenUsernameCookie,
    removeAccessTokenUsernameCookie
  };
};
