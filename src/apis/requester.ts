import axios, { AxiosResponse } from 'axios';

const responseBody = (response: AxiosResponse) => response.data;

const requester = {
  get: (url: string, params = {}, config = {}) => axios.get(url, { params, ...config }).then(responseBody),
  post: (url: string, data = {}, config = {}) => axios.post(url, data, config).then(responseBody),
  put: (url: string, data = {}, config = {}) => axios.put(url, data, config).then(responseBody),
  delete: (url: string, params = {}, config = {}) => axios.delete(url, { params, ...config }).then(responseBody)
};

export default requester;
