
export interface IGuestContactParams {
  fullName?: string
  email: string
  message: string
}

export interface IGuestContactResponse {
  status: number
  message: string
  errorCode?: string
}
