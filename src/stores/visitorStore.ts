import { ILoginVisitor, IRegisterVisitor, IVisitor } from '@web/interfaces/IVisitor'
import { httpGet, httpPost } from '@web/utils/axios'
import { defineStore } from 'pinia'

interface IState {
  visitorData: IVisitor
}

export const useVisitorStore = defineStore('visitor', {
  state: (): IState => ({
    visitorData: {},
  }),
  getters: {},
  actions: {
    // 注册 visitor
    async registerVisitor(visitor: IRegisterVisitor) {
      try {
        const res = await httpPost({
          url: `/visitor/register`,
          data: visitor,
        })
        console.log('regisiter', res)
      } catch (error) {
        console.log(`Error: ${error}`)
      }
    },

    // 登录 visitor
    async loginVisitor(visitor: ILoginVisitor) {
      try {
        const res = await httpPost({
          url: `/visitor/login`,
          data: visitor,
        })

        console.log('login', res)
      } catch (error) {
        console.log(`Error: ${error}`)
      }
    },
  },
})
