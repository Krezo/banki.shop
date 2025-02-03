import { RouterOptions } from 'vue-router';
import LayoutDefault from '@/presentation/layouts/LayoutDefault.vue';
import { shopRoutes } from './router/shop';

export const routerConfig: RouterOptions = {
  routes: [
    {
      path: '/',
      component: LayoutDefault,
      children: [...shopRoutes],
    },
  ],
  mode: 'history',
};
