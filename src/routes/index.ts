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
      ...ArticleRoutes,

      {
        path: 'about',
        name: 'about',
        component: () => import('@web/views/about/about.vue'),
      },
    ],
  },
]
const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
})

export default router
