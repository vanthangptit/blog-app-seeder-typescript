import requester from '../requester';
import { POST } from '@src/constants';
import { AxiosRequestConfig } from 'axios';
import { IPostParams } from '@models/IPosts';
import { getToken } from '@apis/getToken';

const { URL_API } = POST;

const config:AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
};

const postApi = {
  createPostApi: (params: IPostParams) => requester.post(URL_API.CREATE_POST_API, params, config),
  editPostApi: (params: IPostParams) => requester.put(URL_API.EDIT_POST_API, params, config)
};

export default postApi;
