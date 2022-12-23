import requester from '../requester';
import { LOGIN } from '@src/constants';
import { ILoginParams } from '@models/ILogin';
import { setConfig } from '@apis/setConfig';

const { URL_API } = LOGIN;

const loginApi = {
  loginApi: (params: ILoginParams) => {
    return requester.post(URL_API.LOGIN_API, JSON.stringify(params), setConfig({ isContentType: true }));
  }
};

export default loginApi;
