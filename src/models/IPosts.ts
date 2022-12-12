export interface IPostParams {
  _id?: string
  title: string
  shortUrl: string
  postType: string
  excerpt: string
  imageUrl: string
  description?: string
}

export interface IPostCreateResponse {
  message: string
  status: string
  errorCode?: string
}
