
export interface IGuestContactParams {
  firstName?: string
  lastName?: string
  email: string
  message: string
}

export interface IGuestContactResponse {
  status: number
  message: string
  errorCode?: string
}
