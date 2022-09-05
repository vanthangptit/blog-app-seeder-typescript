
export interface ILoginParams {
  account: string
  password: string
}

export interface ILoginResponse {
  data?: IDataLogin
  status: number
  message: string
  errorCode?: string
}

export interface IDataLogin {
  accessToken: string
  username: string
}
