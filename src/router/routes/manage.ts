import { type RouteRecordRaw } from 'vue-router'

const routeName = 'manage'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/manage',
    name: routeName,
    meta: {
      title: '选品管理',
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
]

export default routes
