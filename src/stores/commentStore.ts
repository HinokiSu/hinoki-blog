import { IComment, IHttpComment, IHttpCommentTotal, IReplyComment } from '@web/interfaces/IComment'
import { IParentComment } from '@web/interfaces/IComment'
import { markdownBaseParser } from '@web/plugins/md-it'
import { httpGet, httpPost } from '@web/utils/axios'
import { defineStore } from 'pinia'

interface IState {
  commentList: IComment[]
  commentTotal: number
  replyComment: {
    visitorId?: string
    replyToNickname?: string
  }
  replyCommentId: string
}

export const useCommentStore = defineStore('comment', {
  state: (): IState => ({
    commentList: [],
    commentTotal: 0,
    replyComment: {},
    replyCommentId: '',
  }),

  getters: {},

  actions: {
    // 根据文章id获取所有评论
    async getCommentsByArticleId(articleId: string) {
      try {
        const res = <IHttpComment>await httpGet({ url: `/comment/${articleId}` })
        this.commentList = res.comments
      } catch (error) {
        console.log(`Error: ${error}`)
      }
    },

    // 根据文章id获取评论数（父子级）
    async getCommentTotalByArticleId(articleId: string) {
      try {
        const res = <IHttpCommentTotal>await httpGet({ url: `/comment/count/${articleId}` })
        this.commentTotal = res.total
      } catch (error) {
        console.log(`Error: ${error}`)
      }
    },

    // 添加父级评论
    async addCommentByArticleId(comment: IParentComment) {
      try {
        console.log('comment', comment)
        const res = <IHttpComment>await httpPost({
          url: `/comment/add`,
          data: comment,
        })

        console.log(res)
      } catch (error) {
        console.log(`Error: ${error}`)
      }
    },

    // 回复评论
    async replyCommentByArticleId(comId: string, replyCommet: IReplyComment) {
      try {
        const res = await httpPost({
          url: `/comment/reply/${comId}`,
          data: replyCommet,
        })
        console.log('reply', res)
      } catch (error) {
        console.log(`Error: ${error}`)
      }
    },

    // 解析评论(父子级)的评论内容
    getParsedMarkdownContent() {
      // TODO: 待优化
      this.commentList.map((item) => {
        item.content = markdownBaseParser().render(item.content || '')
        if (JSON.stringify(item.child_comments[0]) !== '{}') {
          item.child_comments.map((cItem) => {
            cItem.content = markdownBaseParser().render(cItem.content || '')
          })
        }
      })
    },
  },
})
