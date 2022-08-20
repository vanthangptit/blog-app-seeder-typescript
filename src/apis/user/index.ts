import requester from '../requester';
import { getToken } from '@apis/login';
import { USER } from '@src/constants';
import { IUserParams } from '@models/IUser';
import { AxiosRequestConfig } from 'axios';

const { URL_API } = USER;

const config:AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
};

const userApi = {
  // getDataUserApi: (params: IRegisterParams) => requester.get(URL_API.GET_DATA_API, params, config),
  // getUserByIdApi: (id: string) => requester.get(`${URL_API.GET_USER_ID_API}/${id}`, { }, config),
  addUserApi: (params: IUserParams) => requester.post(URL_API.ADD_USER_API, params, config),
  // editUserApi: (params: IFDataUserApi) => requester.put(URL_API.EDIT_USER_API, params, config),
  // deleteUserApi: (params: IFDeleteApi) => requester.delete(URL_API.DELETE_USER_API, params, config)
};

export default userApi;
