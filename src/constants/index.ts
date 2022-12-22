
export const API_CONTACT_URL = process.env.REACT_APP_API_CONTACT_URL;
export const API_USER_URL = process.env.REACT_APP_API_USER_URL;
export const API_POST_URL = process.env.REACT_APP_API_POST_URL;
export const AWS_S3_REGION = process.env.REACT_APP_AWS_S3_REGION;
export const AWS_S3_NAME = process.env.REACT_APP_AWS_S3_NAME;
export const AWS_S3_IDENTITY_POOL_ID = process.env.REACT_APP_AWS_S3_IDENTITY_POOL_ID;
export const AWS_S3_URL = process.env.REACT_APP_AWS_S3_URL;
export const AWS_S3_URL_BLOG = process.env.REACT_APP_AWS_S3_URL_BLOG;
export const MODE_CV = process.env.REACT_APP_MODE_CV === 'true';

export const ACCESS_TOKEN = 'accessToken';
export const USERNAME_COOKIE = 'username';

export const SEARCH = {
  ACTION_TYPES: {
    SEARCH_POST: 'APPS/SEARCH_POST'
  },
  URL_API: {
    SEARCH_POST: `${API_POST_URL}/search`
  }
};

export const POST = {
  ACTION_TYPES: {
    GET_ALL_POST: 'APPS/GET_ALL_POST',
    GET_BY_URL_POST: 'APPS/GET_BY_URL_POST',
    GET_BY_CREATOR_POST: 'APPS/GET_BY_CREATOR_POST',
    CREATE_POST: 'APPS/CREATE_POST',
    EDIT_POST: 'APPS/EDIT_POST',
    DELETE_POST: 'APPS/DELETE_POST'
  },
  URL_API: {
    GET_ALL_POST: `${API_POST_URL}/all`,
    GET_BY_URL_POST: `${API_POST_URL}/get-by-short-url`,
    GET_BY_CREATOR_POST: `${API_POST_URL}/get-by-creator`,
    CREATE_POST_API: `${API_POST_URL}/create-blog`,
    EDIT_POST_API: `${API_POST_URL}/edit-blog`,
    DELETE_POST: `${API_POST_URL}/delete-blog`
  }
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
  BLOG: '/featured',
  CREATE_POST: '/create-post',
  EDIT_POST: '/edit-post/:shortUrl',
  BLOG_DETAIL: '/blog/:shortUrl',
  My_BLOG: '/my-blog',
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

export const TYPE_BLOG = [
  {
    label: 'Your Life',
    value: 'life'
  },
  {
    label: 'Society',
    value: 'society'
  },
  {
    label: 'History',
    value: 'history'
  },
  {
    label: 'Travelling',
    value: 'travel'
  },
  {
    label: 'Learn about',
    value: 'learn'
  },
  {
    label: 'True Love',
    value: 'love'
  },
  {
    label: 'Poems',
    value: 'poem'
  },
  {
    label: 'Review',
    value: 'review'
  }
];

export const PAGE_SIZE_DEFAULT = 9;
export const PAGE_DEFAULT = 0;
export const MAINTENANCE_BG_COLOR = '#d85537';
export const MAINTENANCE_COLOR = '#fff';
