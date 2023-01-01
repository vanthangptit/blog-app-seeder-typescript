import Cookies from 'js-cookie';
import { ACCESS_TOKEN } from '@src/constants';
import { AxiosRequestConfig } from 'axios';

interface IParams {
  isAuthorization?: boolean
  isContentType?: boolean
}

export const setConfig = ({ isAuthorization, isContentType } : IParams) => {
  const config: AxiosRequestConfig = {};

  if (isAuthorization) {
    config.headers = {
      Authorization: 'Bearer ' + Cookies.get(ACCESS_TOKEN)
    };
  }

  if (isContentType) {
    config.headers = {
      'content-type': 'application/json'
    };
  }

  // eslint-disable-next-line no-console
  console.log('config: ', config);

  return config;
};
