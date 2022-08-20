import requester from '../requester'
import { GUEST_CONTACT } from '@src/constants'
import { AxiosRequestConfig } from 'axios'
import { getToken } from '@apis/login'
import { IGuestContactParams } from '@models/IContact'

const { URL_API } = GUEST_CONTACT

const config:AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
}

const contactApi = {
  guestContactApi: (params: IGuestContactParams) => requester.post(URL_API.GUEST_CONTACT_API, params, config),
}

export default contactApi
