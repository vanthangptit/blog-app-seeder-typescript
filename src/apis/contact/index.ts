import requester from '../requester';
import { GUEST_CONTACT } from '@src/constants';
import { AxiosRequestConfig } from 'axios';
import { IGuestContactParams } from '@models/IContact';
import { getToken } from '@apis/getToken';

const { URL_API } = GUEST_CONTACT;

const config:AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
};

const contactApi = {
  guestContactApi: (params: IGuestContactParams) => requester.post(URL_API.GUEST_CONTACT_API, params, config)
};

export default contactApi;
