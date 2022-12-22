import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore';

import { ISearchPostParams } from '@models/ISearch';
import * as registerStore from '@store/search';

export const useSearch = () => {
  const dispatch = useAppDispatch();
  const {
    message,
    data,
    errorCode
  } = useAppSelector((state: RootState) => state.search);

  const searchPostApi = (params: ISearchPostParams) => {
    return dispatch(registerStore.searchPostApi(params));
  };

  return {
    message,
    data,
    errorCode,
    searchPostApi
  };
};
