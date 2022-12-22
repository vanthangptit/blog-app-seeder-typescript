import contactApi from './contact';
import loginApi from './login';
import userApi from './user';
import postApi from './post';
import searchApi from './search';

const api = {
  ...contactApi,
  ...loginApi,
  ...userApi,
  ...postApi,
  ...searchApi
};

export default api;
