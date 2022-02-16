import { ICategory } from './ICategory'

export interface IArticle {
  _id?: string
  title?: string
  description?: string
  classification?: ICategory[]
  html?: string
  updatedAt?: string
}

export interface IArticles {
  articles: IArticle[]
}
