import { RouteRecordRaw } from 'vue-router'

export const ArchiveRoutes: RouteRecordRaw[] = [
  {
    path: 'archive',
    name: 'archive',
    component: () => import('@web/views/archive/archive.vue'),
  },
  {
    path: 'archive/:id',
    name: 'archive-detail',
    component: () => import('@web/views/archive/archive-detail.vue'),
  },
]
