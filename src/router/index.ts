import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Layout from '../components/layout/Layout.vue'
import { stzbRoute } from '@/modules/stzb/route'
import { chartRoute } from '@/modules/chart/route'
import { es6Route } from '@/modules/es6/route'
import { aigcRoute } from '@/modules/aigc/route'

const REDIRECT_NAME = 'about' // 重定向路由

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: REDIRECT_NAME },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
      },
      {
        path: '/test',
        name: 'test',
        component: () => import('../views/TestView.vue'),
      },
      ...stzbRoute,
      ...es6Route,
      ...aigcRoute
    ]
  },
  ...chartRoute,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
