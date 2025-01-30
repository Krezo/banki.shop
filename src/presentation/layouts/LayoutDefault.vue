<template>
  <div class="page-layout">
    <AppHeader />
    <main class="page-layout--content">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import AppHeader from '../components/shared/header/AppHeader.vue';
import { RouterView } from 'vue-router';
import AppFooter from '../components/shared/footer/AppFooter.vue';

export default Vue.extend({
  components: {
    AppHeader,
    RouterView,
    AppFooter,
  },
});
</script>

<style scoped>
.page-layout {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}
.page-layout--content {
  flex: 1;
}
</style>
