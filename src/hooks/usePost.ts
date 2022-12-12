import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore';

import { IPostParams } from '@src/models/IPosts';
import * as registerStore from '@store/post';

export const usePost = () => {
  const dispatch = useAppDispatch();
  const {
    message,
    dataPost,
    errorCode,
    loading
  } = useAppSelector((state: RootState) => state.post);

  const createPostApi = (params: IPostParams) => {
    return dispatch(registerStore.createPostApi(params));
  };

  const editPostApi = (params: IPostParams) => {
    return dispatch(registerStore.editPostApi(params));
  };

  return {
    message,
    dataPost,
    errorCode,
    loading,
    createPostApi,
    editPostApi
  };
};
