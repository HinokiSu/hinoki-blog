import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { ArticleRoutes } from './articleRoute'

const routes = <RouteRecordRaw[]>[
  {
    path: '/',
    component: () => import('@web/layouts/main-layout.vue'),
    redirect: 'home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@web/views/home/index.vue'),
      },
      ...ArticleRoutes

      
    ],
  },
]
const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
})

export default router
