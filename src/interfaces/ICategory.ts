export interface ICategory {
  _id?: string
  name?: string
}

export interface ICategories {
  categories: ICategory[]
}

export interface IHttpCategory {
  message: string
  categories: ICategory[]
}

export interface ICategoryRouteParams {
  id?: string
  tagName?: string
}
