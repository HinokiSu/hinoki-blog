import { IArticle, IArticles } from '@web/interfaces/IArticle'
import { httpGet } from '@web/utils/axios'
import { defineStore } from 'pinia'

interface IState {
  articleList: IArticle[]
  articleData: IArticle
}
export const useArticleStore = defineStore('article', {
  state: (): IState => ({
    articleList: [],
    articleData: {},
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

    async getArticleById(id: string) {
      try {
        const result = <IArticles>await httpGet({ url: `/article/${id}` })
        this.articleData = result.articles[0]
      } catch (error) {
        console.log(`Error Info: get article #${id} faild. \n Error: ${error}`)
        throw error
      }
    },

    recycleArticleData() {
      this.articleData = {}
    },
  },
})
