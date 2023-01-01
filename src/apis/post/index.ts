import requester from '../requester';
import {ACCESS_TOKEN, POST} from '@src/constants';
import { IPostParams, IPostParamsGetAll } from '@models/IPosts';
import { setConfig } from '@apis/setConfig';
import {AxiosRequestConfig} from "axios";
import Cookies from 'js-cookie';

const { URL_API } = POST;

const postApi = {
  getAllPostApi: (params: IPostParamsGetAll) => {
    if (params?.type) {
      return requester.get(`${URL_API.GET_ALL_POST}?page=${params.page}&pageSize=${params.pageSize}&type=${params.type}`);
    } else {
      return requester.get(`${URL_API.GET_ALL_POST}?page=${params.page}&pageSize=${params.pageSize}`);
    }
  },
  getPostByShortUrlApi: (params: { shortUrl: string }) => {
    return requester.get(`${URL_API.GET_BY_URL_POST}/${params.shortUrl}`, {}, setConfig({ isAuthorization: true }));
  },
  getPostByCreatorApi: (params: { username: string }) => {
    return requester.get(`${URL_API.GET_BY_CREATOR_POST}/${params.username}`, {}, setConfig({ isAuthorization: true }));
  },
  createPostApi: (params: IPostParams) => {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + Cookies.get(ACCESS_TOKEN),
        'content-type': 'application/json'
      }
    };
    return requester.post(URL_API.CREATE_POST_API, params, config);
  },
  editPostApi: (params: IPostParams) => {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: 'Bearer ' + Cookies.get(ACCESS_TOKEN),
        'content-type': 'application/json'
      }
    };
    return requester.put(URL_API.EDIT_POST_API, params, config);
  },
  deletePostApi: (params: { postId: string }) => {
    return requester.delete(`${URL_API.DELETE_POST}/${params.postId}`, {}, setConfig({ isAuthorization: true }));
  }
};

export default postApi;
