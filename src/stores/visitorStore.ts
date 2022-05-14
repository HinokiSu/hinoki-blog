import { IHttpVisitor, ILoginVisitor, IRegisterVisitor, IVisitor } from '@web/interfaces/IVisitor'
import { httpGet, httpPost } from '@web/utils/axios'
import { defineStore } from 'pinia'

interface IState {
  visitorData: IVisitor
  visitorStatus: boolean
}

export const useVisitorStore = defineStore('visitor', {
  state: (): IState => ({
    visitorData: {},
    visitorStatus: false,
  }),
  getters: {
    getVisitor: (state) => {
      if (Object.keys(state.visitorData).length === 0) {
        state.visitorData = JSON.parse(localStorage.getItem('visitor') || '{}')
      }
      return state.visitorData
    },
    getLoginStatus: (state) => {
      if (Object.keys(state.visitorData).length !== 0) {
        state.visitorStatus = true
      }
      return state.visitorStatus
    },
  },
  actions: {
    // 获取本地
    getLocalVisitor() {
      this.visitorData = JSON.parse(localStorage.getItem('visitor') || '{}')
    },
    // 注册 visitor
    async registerVisitor(visitor: IRegisterVisitor) {
      try {
        const res = await httpPost({
          url: `/visitor/register`,
          data: visitor,
        })
      } catch (error) {
        console.log(`Error: ${error}`)
      }
    },

    // 登录 visitor
    async loginVisitor(visitor: ILoginVisitor) {
      const res = <IHttpVisitor>await httpPost({
        url: `/visitor/login`,
        data: visitor,
      })
      // 存储到 localStorage
      localStorage.setItem('visitor', JSON.stringify(res.visitor))
      this.visitorData = res.visitor
    },
  },
})
