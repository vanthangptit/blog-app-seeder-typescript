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
    dataPostArray,
    errorCode
  } = useAppSelector((state: RootState) => state.post);

  const getAllPostApi = () => {
    return dispatch(registerStore.getAllPostApi());
  };

  const getPostByShortUrlApi = (params:  { shortUrl: string }) => {
    return dispatch(registerStore.getPostByShortUrlApi(params));
  };

  const getPostByCreatorApi = (params: { username: string }) => {
    return dispatch(registerStore.getPostByCreatorApi(params));
  };

  const createPostApi = (params: IPostParams) => {
    return dispatch(registerStore.createPostApi(params));
  };

  const editPostApi = (params: IPostParams) => {
    return dispatch(registerStore.editPostApi(params));
  };

  const deletePostApi = (params: { postId: string }) => {
    return dispatch(registerStore.deletePostApi(params));
  };

  return {
    message,
    dataPost,
    dataPostArray,
    errorCode,
    getAllPostApi,
    getPostByCreatorApi,
    getPostByShortUrlApi,
    createPostApi,
    editPostApi,
    deletePostApi
  };
};
