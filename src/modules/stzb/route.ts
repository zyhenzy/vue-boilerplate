import type { RouteRecordRaw } from 'vue-router';

const HeroView = () => import('./views/HeroView.vue');
const ConditionView = () => import('./views/ConditionView.vue');
const AccountView = () => import('./views/AccountView.vue');

export const stzbRoute: RouteRecordRaw[] = [
  {
    path: '/hero',
    name: 'hero',
    component: HeroView,
  },
  {
    path: '/condition',
    name: 'condition',
    component: ConditionView,
  },
  {
    path: '/account/:id',
    name: 'Account',
    component: AccountView,
    meta: {
      title: '账号',
      hidden: true
    }
  },
]
