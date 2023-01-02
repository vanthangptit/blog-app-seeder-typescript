import {
  RootState,
  useAppDispatch,
  useAppSelector
} from '@store/configureStore';

import { IPostParams, IPostParamsGetAll } from '@src/models/IPosts';
import * as registerStore from '@store/post';

export const usePost = () => {
  const dispatch = useAppDispatch();
  const {
    message,
    dataPost,
    dataCreatorPosts,
    dataAllPost,
    errorCode
  } = useAppSelector((state: RootState) => state.post);

  const getAllPostApi = (params: IPostParamsGetAll) => {
    return dispatch(registerStore.getAllPostApi(params));
  };

  const getPostByShortUrlApi = (params:  { shortUrl: string }) => {
    return dispatch(registerStore.getPostByShortUrlApi(params));
  };

  const getPostByCreatorApi = (params: { username: string }) => {
    return dispatch(registerStore.getPostByCreatorApi(params));
  };

  const getPostByTypeApi = (params: IPostParamsGetAll) => {
    return dispatch(registerStore.getPostByTypeApi(params));
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
    dataAllPost,
    dataCreatorPosts,
    errorCode,
    getAllPostApi,
    getPostByCreatorApi,
    getPostByShortUrlApi,
    createPostApi,
    editPostApi,
    deletePostApi,
    getPostByTypeApi
  };
};
