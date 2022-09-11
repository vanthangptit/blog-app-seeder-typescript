import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore';

import { IGuestContactParams } from '@src/models/IContact';
import * as registerStore from '@store/contact';

export const useContact = () => {
  const dispatch = useAppDispatch();
  const {
    message,
    status,
    successfully,
    errorCode,
    loading
  } = useAppSelector((state: RootState) => state.guestContact);

  const guestContactApi = (params: IGuestContactParams) => {
    return dispatch(registerStore.guestContactApi(params));
  };

  return {
    message,
    status,
    successfully,
    errorCode,
    loading,
    guestContactApi
  };
};
