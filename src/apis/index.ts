import contactApi from './contact';
import loginApi from './login';
import userApi from './user';

const api = {
  ...contactApi,
  ...loginApi,
  ...userApi
};

export default api;
