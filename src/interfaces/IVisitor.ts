export interface IVisitor {
  _id?: string
  nickname?: string
  email?: string
}

export interface IBaseVisitor {
  nickname?: string
  email?: string
}

export interface IRegisterVisitor extends IBaseVisitor {
  password?: string
}

export interface ILoginVisitor {
  email: string
  password: string
}

export interface IHttpVisitor extends IHttpMessage {
  visitor: IVisitor
}

export interface IHttpMessage {
  message: string
}
