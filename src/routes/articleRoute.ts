import { RouteRecordRaw } from 'vue-router'

export const ArticleRoutes: RouteRecordRaw[] = [
  {
    // 显示所有文章
    path: 'articles',
    name: 'articles',
    component: () => import('@web/views/article/articles.vue'),
  },
  {
    path: 'article/:id',
    name: 'article-detail',
    component: () => import('@web/views/article/article-detail.vue'),
  },
]
