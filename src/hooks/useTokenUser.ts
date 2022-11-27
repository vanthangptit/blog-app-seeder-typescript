import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore';

import { IDataTokenUserParams } from '@models/ICommon';
import * as commonStore from '@store/common';

export const useTokenUser = () => {
  const dispatch = useAppDispatch();
  const { accessToken, username } = useAppSelector((state: RootState) => state.common);

  const setTokenCookie = (params: IDataTokenUserParams) => {
    return dispatch(commonStore.setToken(params));
  };

  const getTokenCookie = () => {
    return dispatch(commonStore.getToken());
  };

  const removeTokenCookie = () => {
    return dispatch(commonStore.removeToken());
  };

  return {
    accessToken,
    username,
    setTokenCookie,
    getTokenCookie,
    removeTokenCookie
  };
};
