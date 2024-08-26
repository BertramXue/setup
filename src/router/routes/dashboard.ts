import type { RouteRecordRaw } from 'vue-router'

const routeName = 'dashboard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: routeName,
    meta: {
      title: '数据分析',
      sort: 2,
      icon: 'dashboard',
    },
    component: () => import('@/views/login/index.vue'),
    // children: [],
  },
]
export default routes
