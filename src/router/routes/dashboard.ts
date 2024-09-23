import type { RouteRecordRaw } from 'vue-router'

const routeName = 'dashboard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/overview',
    name: routeName,
    meta: {
      title: '数据图表',
      icon: 'line-chart',
    },
    component: () => import('@/views/login/index.vue'),
    // children: [],
  },
  {
    path: '/analysis',
    name: 'analysis',
    meta: {
      title: '数据分析',
      icon: 'dashboard',
    },
    component: () => import('@/views/about/index.vue'),
    // children: [],
  },
]
export default routes
