import { type RouteRecordRaw } from 'vue-router'

const routeName = 'manage'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: routeName,
    meta: {
      title: '产品管理',
      sort: 1,
      icon: 'exception',
    },
    component: () => import('@/views/selection/index.vue'),
    // children: [
    //   {
    //     path: '404',
    //     name: `${routeName}-404`,
    //     meta: {
    //       title: '404',
    //       sort: 0,
    //       icon: 'question',
    //     },
    //     component: () => import('@/views/exception/404.vue'),
    //   },
    // ],
  },
  {
    path: '/shopManage',
    name: 'shopManage',
    meta: {
      title: '店铺管理',
      sort: 2,
      icon: 'exception',
    },
    component: () => import('@/views/shopManage/index.vue'),
    // children: [
    //   {
    //     path: '404',
    //     name: `${routeName}-404`,
    //     meta: {
    //       title: '404',
    //       sort: 0,
    //       icon: 'question',
    //     },
    //     component: () => import('@/views/exception/404.vue'),
    //   },
    // ],
  },
]

export default routes
