import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore';

import { ILoginParams } from '@src/models/ILogin';
import * as registerStore from '@store/login';

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const {
    message,
    data,
    errorCode,
    loading
  } = useAppSelector((state: RootState) => state.login);

  const loginApi = (params: ILoginParams) => {
    return dispatch(registerStore.loginApi(params));
  };

  return {
    message,
    data,
    errorCode,
    loading,
    loginApi
  };
};
