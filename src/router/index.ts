import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../components/layout/Layout.vue'
import {stzbRoute} from "@/modules/stzb/route";
import {chartRoute} from "@/modules/chart/route";

const REDIRECT_NAME = 'about' // 重定向路由

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', redirect: REDIRECT_NAME},
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/AboutView.vue'),
        },
        ...stzbRoute,
        ...chartRoute
      ]
    }
  ],
})

export default router
