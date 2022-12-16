export interface IPostParams {
  title: string
  shortUrl: string
  excerpt: string
  postType: string
  imageUrl: string
  description?: string
  postId?: string
}

export interface IPostForm {
  title: string
  shortUrl: string
  excerpt: string
}

export interface IPostAuthor {
  exp: any
  iat: any
  firstName: string
  lastName: string
  userId: string
  username: string
}

export interface IPost {
  author: IPostAuthor
  description?: string
  excerpt: string
  imageUrl: string
  postType: string
  shortUrl: string
  title: string
  createdAt: string
  updatedAt: string
  __v: any
  _id: string
}

export interface IPostCreateResponse {
  message: string
  status: number
  errorCode?: string
  post: IPost
}
