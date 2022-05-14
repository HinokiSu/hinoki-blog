import { IArticle, IHttpArticles } from '@web/interfaces/IArticle'
import { httpGet } from '@web/utils/axios'
import { defineStore } from 'pinia'

interface IState {
  articleList: IArticle[]
  articleData: IArticle
  latestArticleList: IArticle[]
  isFinished: boolean
}
export const useArticleStore = defineStore('article', {
  state: (): IState => ({
    articleList: [],
    articleData: {},
    latestArticleList: [],
    isFinished: false,
  }),

  getters: {
    artilceCount: (state) => state.articleList.length,
  },

  actions: {
    async getAllArticle() {
      try {
        const result = <IHttpArticles>await httpGet({ url: `/article/all` })
        this.articleList = result.articles
      } catch (error) {
        console.log(`Error: ${error}`)
      }
    },

    // 获取最新的文章
    async getLatestArticle() {
      try {
        const result = <IHttpArticles>await httpGet({ url: '/article/latest' })
        this.latestArticleList = result.articles
      } catch (error) {
        console.log(`Error: ${error}`)
      }
    },

    // 根据id查询文章
    async getArticleById(id: string) {
      try {
        const result = <IHttpArticles>await httpGet({ url: `/article/${id}` })
        this.articleData = result.articles[0]
      } catch (error) {
        console.log(`Error Info: get article #${id} faild. \n Error: ${error}`)
        throw error
      }
    },

    // 模糊查询文章标题
    async getArticleFuzzyByTitle(keyword: string) {
      try {
        const result = <IHttpArticles>await httpGet({ url: `/article/search/${keyword}` })
        this.articleList = result.articles
      } catch (error) {
        console.log(`Error Info: get fuzzy article #${keyword} faild. \n Error: ${error}`)
        throw error
      }
    },

    // 根据类别Id查询所有文章
    async getArticlesByCateId(cateId: string) {
      try {
        const result = <IHttpArticles>await httpGet({ url: `/article/category/${cateId}` })
        this.articleList = result.articles
      } catch (error) {
        console.log(`Error Info: get articles by cateId #${cateId} faild. \n Error: ${error}`)
        throw error
      }
    },

    // 分页查询
    async getArticleByPagination(pageNum: number, pageSize: number) {
      try {
        const result = <IHttpArticles>await httpGet({ url: `/article/pagination/${pageNum}/${pageSize}` })
        if (result.articles.length !== 0) {
          this.isFinished = false
          const newData = result.articles
          this.articleList = this.articleList.concat(newData)
        } else {
          this.isFinished = true
        }
      } catch (error) {
        console.log(`Error Info: get articles by pagination faild. \n Error: ${error}`)
        throw error
      }
    },

    recycleArticleData() {
      this.articleData = {}
    },
  },
})
