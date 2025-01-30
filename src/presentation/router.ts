import { RouterOptions } from 'vue-router';
import LayoutDefault from '@/presentation/layouts/LayoutDefault.vue';
import { shopRoutes } from './router/shop';
import { homeRoutes } from './router/home';

export const routerConfig: RouterOptions = {
  routes: [
    {
      path: '/',
      component: LayoutDefault,
      children: [...shopRoutes, ...homeRoutes],
    },
  ],
  mode: 'history',
};
