import { RouteConfig } from 'vue-router';
import PictureShop from '@/presentation/pages/PictureShopPage.vue';

const shopRoutes: RouteConfig[] = [
  {
    path: '/',
    name: 'Shop',
    component: PictureShop,
  },
];

export { shopRoutes };
