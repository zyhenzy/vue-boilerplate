import type { RouteRecordRaw } from 'vue-router';

const ChartView = () => import('./views/Chart.vue');

export const chartRoute: RouteRecordRaw[] = [
  {
    path: '/chart',
    name: 'chart',
    component: ChartView,
  },
];
