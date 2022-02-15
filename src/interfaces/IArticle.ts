export interface IArticle {
  title?: string
  descriptation?: string
  classification?: IClassification[]
  html?: string
  updatedAt?: string
}

export interface IArticles {
  articles: IArticle[]
}

export interface IClassification {
  _id: string
  name: string
}
