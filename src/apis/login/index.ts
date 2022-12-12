import requester from '../requester';
import { LOGIN } from '@src/constants';
import { ILoginParams } from '@models/ILogin';
import { AxiosRequestConfig } from 'axios';

const { URL_API } = LOGIN;

const config:AxiosRequestConfig = {
  headers: {
    'content-type': 'application/json'
  }
};

const loginApi = {
  loginApi: (params: ILoginParams) => requester.post(URL_API.LOGIN_API, JSON.stringify(params), config)
};

export default loginApi;
