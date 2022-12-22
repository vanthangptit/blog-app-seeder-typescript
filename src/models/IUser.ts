
export interface IUserParams {
  firstName: string
  lastName: string
  username: any
  email: string
  password: any
  confirmPassword: any
}

export interface IUserResponse {
  status: number
  message: string
  errorCode?: string
}
