import Cookies from 'js-cookie';
import { ACCESS_TOKEN } from '@src/constants';

export const getToken = () => {
  return Cookies.get(ACCESS_TOKEN);
};
