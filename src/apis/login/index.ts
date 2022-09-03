import requester from '../requester';
import { TEST_MODE, LOGIN } from '@constants/index';
import { ILoginParams } from '@models/ILogin';
import { AxiosRequestConfig } from 'axios';

const { URL_API } = LOGIN;

export const getToken = () => {
  let accessToken = localStorage.getItem('access_token');

  if (!accessToken) {
    const userData:string | null = localStorage.getItem('userData');

    if (userData && userData.length) {
      accessToken = JSON.parse(<string>userData).id_token;
    }
  }

  return !TEST_MODE ? accessToken : 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibG9uZ25kIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI3NTNiODQ2Ny03NGI2LTRmZDctODg2My05NWIxNDVjNWFjNTMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJsb25nbmRAZWFzdGVybnN1bi52biIsImVtYWlsX3ZlcmlmaWVkIjoiVHJ1ZSIsInRlbmFudCI6Im1hc3RlciIsImZ1bGxuYW1lIjoiTG9uZyBOZ3V5ZW4iLCJkYXRhX3pvbmUiOiJlYXN0ZXJuc3VuLnZuIiwiZXhwIjoxNjYxOTU5NDI2LCJpc3MiOiJlYXN0ZXJuc3VuIiwiYXVkIjoiZWFzdGVybnN1biJ9.gqdUnbUi7udARgKlvzWDL1TupC6Ex065FU8IIWIFw-A';
};

const config:AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
};

const loginApi = {
  loginApi: (params: ILoginParams) => requester.get(URL_API.LOGIN_API, params, config)
};

export default loginApi;
