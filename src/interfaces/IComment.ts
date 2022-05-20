import { IVisitor } from './IVisitor'

export type IComment = {
  _id: string
  visitor: IVisitor
  content: string
  article_id: string
  createdAt: string
  child_comments: IChildComment[]
}

export type IParentComment = {
  article_id: string
  visitor_id: string
  content: string
  createdAt: string
  child_comments: []
}

export type IChildComment = {
  visitor: IVisitor
  content: string
  reply_to_visitor: string
  createdAt: string
}

export type IHttpComment = {
  message: string
  comments: IComment[]
}

export type IHttpCommentTotal = {
  message: string
  total: number
}

export type IReplyComment = {
  visitor_id?: string
  reply_to_visitor?: string
  content?: string
  createdAt?: string
}
