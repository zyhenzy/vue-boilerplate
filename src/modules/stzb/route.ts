import HeroView from "./views/Hero.vue";
import ConditionView from "./views/Condition.vue";
import AccountView from "./views/Account.vue";

/**
 * 条件路由
 */
export const stzbRoute = [
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
