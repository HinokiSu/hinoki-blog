import { ICategories, ICategory, IHttpCategory } from '@web/interfaces/ICategory'
import { httpGet } from '@web/utils/axios'
import { defineStore } from 'pinia'

interface IState {
  categoryList: ICategory[]
  categoryData: ICategory
}

export const useCategoryStore = defineStore('category', {
  state: (): IState => ({
    categoryList: [],
    categoryData: {},
  }),

  getters: {},

  actions: {
    async getCategories() {
      try {
        const result = <IHttpCategory>await httpGet({ url: `/category/all` })
        this.categoryList = result.categories
      } catch (error) {
        console.log(`Error: ${error}`)
      }
    },

    async getCategoryById(id: string) {
      try {
        const result = <IHttpCategory>await httpGet({ url: `/category/${id}` })
        this.categoryData = result.categories[0]
      } catch (error) {
        console.log(`Error: ${error}`)
      }
    },

    recycleData() {
      this.categoryList.length = 0
      this.categoryData = {}
    },
  },
})
