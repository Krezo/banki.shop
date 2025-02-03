import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/presentation/App.vue';

import { routerConfig } from './presentation/router';
import { store } from './presentation/store';

import '@/presentation/assets/style/main.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const router = new VueRouter(routerConfig);

Vue.use(VueRouter);

new Vue({
  render: (h) => h(App),
  router: router,
  store,
}).$mount('#app');
