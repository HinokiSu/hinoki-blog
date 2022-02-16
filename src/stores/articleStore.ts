import { IArticle, IArticles } from '@web/interfaces/IArticle'
import { httpGet } from '@web/utils/axios'
import { defineStore } from 'pinia'

interface IState {
  articleList: IArticle[]
}
export const useArticleStore = defineStore('article', {
  state: (): IState => ({
    articleList: [],
  }),

  getters: {},

  actions: {
    async getAllArticle() {
      try {
        const result = <IArticles>await httpGet({ url: `/article/all` })
        this.articleList = result.articles
        console.log(result)
      } catch (error) {
        console.log(`Error: ${error}`)
      }
    },

    // get the latest articles, the default limit returns 3 articles
    async getLatestArticle() {
      try {
        const result = <IArticles>await httpGet({ url: '/article/latest' })
        this.articleList = result.articles
      } catch (error) {
        console.log(`Error: ${error}`)
      }
    },
  },
})
