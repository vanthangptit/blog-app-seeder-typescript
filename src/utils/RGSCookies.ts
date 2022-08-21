import Cookies from 'js-cookie';
import { ACCESS_TOKEN, USERNAME_COOKIE } from '@src/constants';

export const getAccessTokenCookie = () => {
  return Cookies.get(ACCESS_TOKEN);
};

export const setAccessTokenCookie = (accessToken: string) => {
  return Cookies.set(ACCESS_TOKEN, accessToken, { expires: 1 });
};

export const removeAccessTokenCookie = () => {
  return Cookies.remove(ACCESS_TOKEN);
};

export const setUsernameCookie = (username: any) => {
  return Cookies.set(USERNAME_COOKIE, username, { expires: 1 });
};

export const getUsernameCookie = () => {
  return Cookies.get(USERNAME_COOKIE);
};

export const removeUsernameCookie = () => {
  return Cookies.remove(USERNAME_COOKIE);
};
