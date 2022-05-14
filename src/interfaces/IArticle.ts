import { ICategory } from './ICategory'

export interface IArticle {
  _id?: string
  title?: string
  description?: string
  classification?: ICategory[]
  markdown?: string
  createdAt?: string
  totalVisits?: number
}

export interface IArticles {
  articles: IArticle[]
}

export interface IHttpArticles {
  articles: IArticle[]
  message: string
}
