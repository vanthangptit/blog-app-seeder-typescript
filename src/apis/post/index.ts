import requester from '../requester';
import { POST } from '@src/constants';
import { IPostParams, IPostParamsGetAll } from '@models/IPosts';
import { setConfig } from '@apis/setConfig';

const { URL_API } = POST;

const config = {
  isAuthorization: true
};

const postApi = {
  getAllPostApi: (params: IPostParamsGetAll) => {
    if (params?.type) {
      return requester.get(`${URL_API.GET_ALL_POST}?page=${params.page}&pageSize=${params.pageSize}&type=${params.type}`);
    } else {
      return requester.get(`${URL_API.GET_ALL_POST}?page=${params.page}&pageSize=${params.pageSize}`);
    }
  },
  getPostByShortUrlApi: (params: { shortUrl: string }) => {
    return requester.get(`${URL_API.GET_BY_URL_POST}/${params.shortUrl}`, {}, setConfig(config));
  },
  getPostByCreatorApi: (params: { username: string }) => {
    return requester.get(`${URL_API.GET_BY_CREATOR_POST}/${params.username}`, {}, setConfig(config));
  },
  createPostApi: (params: IPostParams) => {
    return requester.post(URL_API.CREATE_POST_API, params, setConfig(config));
  },
  editPostApi: (params: IPostParams) => requester.put(URL_API.EDIT_POST_API, params, setConfig(config)),
  deletePostApi: (params: { postId: string }) => {
    return requester.delete(`${URL_API.DELETE_POST}/${params.postId}`, {}, setConfig(config));
  }
};

export default postApi;
