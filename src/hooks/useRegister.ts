import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore';

import { IUserParams } from '@src/models/IUser';
import * as registerStore from '@store/register';

export const useUser = () => {
  const dispatch = useAppDispatch();
  const {
    message,
    status,
    successfully,
    errorCode,
    loading
  } = useAppSelector((state: RootState) => state.register);

  const addUserApi = (params: IUserParams) => {
    return dispatch(registerStore.addUserApi(params));
  };

  return {
    message,
    status,
    successfully,
    errorCode,
    loading,
    addUserApi
  }
};
