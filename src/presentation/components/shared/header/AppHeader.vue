<template>
  <header class="header">
    <div class="container header-container">
      <nav class="nav">
        <ul class="menu">
          <li>Каталог</li>
          <li>Доставка</li>
          <li>Оплата</li>
          <li>Контакты</li>
          <li>О компании</li>
        </ul>
      </nav>
      <div class="search-filter">
        <HeaderSearchFilter />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import HeaderSearchFilter from './HeaderSearchFilter.vue';

export default {
  components: { HeaderSearchFilter },
};
</script>

<style scoped>
.header {
  height: 96px;
  padding: 20px;
  border-bottom: 1px solid #e1e1e1;
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav {
  padding-left: 96px;
  font-size: 14px;
}
.menu {
  color: var(--bc-c-color-1);
  display: flex;
  gap: 48px;
}
</style>
