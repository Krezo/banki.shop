import { RouteConfig } from 'vue-router';
import HomePage from '@/presentation/pages/HomePage.vue';

const homeRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'Home',
    component: HomePage,
  },
];

export { homeRoutes };
