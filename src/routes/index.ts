import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes = <RouteRecordRaw[]>[
  {
    path: '/',
    component: () => import('@web/layouts/main-layout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@web/views/home/index.vue'),
      },
    ],
  },
]
const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
})

export default router
