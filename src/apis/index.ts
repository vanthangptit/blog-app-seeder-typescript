import contactApi from './contact';
import loginApi from './login';
import userApi from './user';
import postApi from './post';

const api = {
  ...contactApi,
  ...loginApi,
  ...userApi,
  ...postApi
};

export default api;
