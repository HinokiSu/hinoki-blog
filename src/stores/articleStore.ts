import { IArticle, IArticles } from '@web/interfaces/IArticle'
import { httpGet } from '@web/plugins/axios'
import { defineStore } from 'pinia'

interface IState {
  articleList: IArticle[]
}
export const ArticleStore = defineStore('article', {
  state: (): IState => ({
    articleList: [],
  }),

  getters: {},

  actions: {
    async getAllArticle() {
      try {
        const result = await httpGet({ url: `/article/all` })
        console.log(result)
      } catch (error) {
        console.log(`Error: ${error}`)
      }
    },
  },
})
