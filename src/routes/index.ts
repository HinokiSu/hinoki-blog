import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { ArchiveRoutes } from './archiveRoute'
import { ArticleRoutes } from './articleRoute'

const routes = <RouteRecordRaw[]>[
  {
    path: '/',
    component: () => import('@web/layouts/main-layout.vue'), // 主布局
    redirect: 'home',
    children: [
      {
        // 首页
        path: 'home',
        name: 'home',
        component: () => import('@web/views/home/index.vue'),
      },
      // 文章路由
      ...ArticleRoutes,
      // 类别路由
      ...ArchiveRoutes,
      {
        // 关于页面路由
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
