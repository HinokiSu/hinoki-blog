import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@web/views/Home.vue'),
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('@web/views/Article.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@web/views/About.vue'),
  },
]
const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
})

export default router
