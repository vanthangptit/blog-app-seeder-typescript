import requester from '../requester';
import { GUEST_CONTACT } from '@src/constants';
import { IGuestContactParams } from '@models/IContact';
import { setConfig } from '@apis/setConfig';

const { URL_API } = GUEST_CONTACT;

const contactApi = {
  guestContactApi: (params: IGuestContactParams) => {
    return requester.post(URL_API.GUEST_CONTACT_API, params, setConfig({ isAuthorization: true }));
  }
};

export default contactApi;
