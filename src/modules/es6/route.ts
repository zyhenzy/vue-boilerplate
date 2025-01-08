import type { RouteRecordRaw } from 'vue-router';

const PromiseView = () => import('./views/PromiseView.vue');

export const es6Route: RouteRecordRaw[] = [
  {
    path: '/promise',
    name: 'promise',
    component: PromiseView,
  },
];
