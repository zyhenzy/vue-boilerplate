import type { RouteRecordRaw } from 'vue-router';

const ChatView = () => import('./views/ChatView.vue');

export const aigcRoute: RouteRecordRaw[] = [
  {
    path: '/aigc',
    name: 'aigc',
    component: ChatView,
  }
]
