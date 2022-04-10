import { ICategories, ICategory } from '@web/interfaces/ICategory'
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
        const result = <ICategories>await httpGet({ url: `/category/all` })
        this.categoryList = result.categories
      } catch (error) {
        console.log(`Error: ${error}`)
      }
    },

    async getCategoryById(id: string) {
      try {
        const result = <ICategory>await httpGet({ url: `/category/${id}` })
        this.categoryData = result
      } catch (error) {
        console.log(`Error: ${error}`)
      }
    },
  },
})
