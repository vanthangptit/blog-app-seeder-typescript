
export const TEST_MODE = process.env.REACT_APP_TEST_MODE;
export const API_CONTACT_URL = process.env.REACT_APP_API_CONTACT_URL;
export const API_USER_URL = process.env.REACT_APP_API_USER_URL;
export const AWS_S3_URL = process.env.REACT_APP_AWS_S3_URL;

export const ACCESS_TOKEN = 'accessToken';
export const USERNAME_COOKIE = 'username';

export const COMMON_ACTION_TYPES = {
  SET_TOKEN: 'APPS/SET_TOKEN',
  GET_TOKEN: 'APPS/GET_TOKEN',
  REMOVE_TOKEN: 'APPS/REMOVE_TOKEN'
};

export const USER = {
  ACTION_TYPES: {
    ADD_USER: 'APPS/ADD_USER'
  },
  URL_API: {
    ADD_USER_API: `${API_USER_URL}/register`
  }
};

export const GUEST_CONTACT = {
  ACTION_TYPES: {
    GUEST_CONTACT_API: 'APPS/CONTACT_API'
  },
  URL_API: {
    GUEST_CONTACT_API: `${API_CONTACT_URL}`
  }
};

export const LOGIN = {
  ACTION_TYPES: {
    LOGIN_API: 'APPS/LOGIN'
  },
  URL_API: {
    LOGIN_API: `${API_USER_URL}/login`
  }
};

export const SITES_URL = {
  HOME: '/',
  ABOUT: '/about',
  BLOG: '/blog',
  CREATE_POST: '/create-post',
  BLOG_DETAIL: '/blog/detail',
  CONTACT: '/contact',
  LOGIN: '/login',
  REGISTER: '/register',
  ACCOUNT: '/account',
  DASHBOARD: '/dashboard'
};

export const LAYOUT = {
  widthNavDesktop: 330,
  widthNavMobile: 260
};
