<template>
  <header class="header">
    <div class="container header-container">
      <button class="mobile-menu-btn" @click="toggleMobileMenu">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50">
          <path
            d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"
          ></path>
        </svg>
      </button>
      <!-- Add overlay -->
      <div v-if="isMobileMenuVisible" class="mobile-menu-overlay" @click="toggleMobileMenu"></div>

      <div :class="['mobile-menu', { 'mobile-menu--active': isMobileMenuVisible }]">
        <nav>
          <ul class="mobile-menu__list">
            <li>Каталог</li>
            <li>Доставка</li>
            <li>Оплата</li>
            <li>Контакты</li>
            <li>О компании</li>
          </ul>
        </nav>
      </div>

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
import { defineComponent } from 'vue';
import HeaderSearchFilter from './HeaderSearchFilter.vue';

export default defineComponent({
  name: 'AppHeader',
  components: { HeaderSearchFilter },
  data() {
    return {
      isMobileMenuVisible: false,
    };
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuVisible = !this.isMobileMenuVisible;
    },
  },
});
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
  font-size: 14px;
}
.menu {
  color: var(--bc-c-color-1);
  display: none;
  gap: 48px;
}
.mobile-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Add new styles */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.mobile-menu {
  position: fixed;
  top: 0;
  left: -300px;
  width: 300px;
  height: 100vh;
  background: white;
  z-index: 999;
  transition: left 0.3s ease;
  padding: 20px;
}

.mobile-menu--active {
  left: 0;
}

.mobile-menu__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.header nav {
  display: block;
}

.mobile-menu__list li {
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

@media (min-width: 992px) {
  .mobile-menu-btn {
    display: none;
  }
  .menu {
    gap: 24px;
    display: flex;
  }
}

@media (min-width: 1400px) {
  .nav {
    padding-left: 96px;
  }
}
</style>
