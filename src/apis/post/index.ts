import requester from '../requester';
import { POST } from '@src/constants';
import { AxiosRequestConfig } from 'axios';
import { IPostParams, IPostParamsGetAll } from '@models/IPosts';
import { getToken } from '@apis/getToken';

const { URL_API } = POST;

const config:AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
};

const postApi = {
  getAllPostApi: (params: IPostParamsGetAll) => requester.get(`${URL_API.GET_ALL_POST}?page=${params.page}&pageSize=${params.pageSize}`),
  getPostByShortUrlApi: (params: { shortUrl: string }) => requester.get(`${URL_API.GET_BY_URL_POST}/${params.shortUrl}`, {}, config),
  getPostByCreatorApi: (params: { username: string }) => requester.get(`${URL_API.GET_BY_CREATOR_POST}/${params.username}`, {}, config),
  createPostApi: (params: IPostParams) => requester.post(URL_API.CREATE_POST_API, params, config),
  editPostApi: (params: IPostParams) => requester.put(URL_API.EDIT_POST_API, params, config),
  deletePostApi: (params: { postId: string }) => requester.delete(`${URL_API.DELETE_POST}/${params.postId}`, {}, config)
};

export default postApi;
