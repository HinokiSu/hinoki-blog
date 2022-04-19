import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import { ArchiveRoutes } from './archiveRoute'
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
      ...ArchiveRoutes,
      {
        path: 'about',
        name: 'about',
        component: () => import('@web/views/about/about.vue'),
      },
    ],
  },
]
const router = createRouter({
  // history: createWebHashHistory('/'),
  history: createWebHistory('/'),
  routes,
})

export default router
