import HeroView from "./views/Hero.vue";
import ConditionView from "./views/Condition.vue";

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
]
