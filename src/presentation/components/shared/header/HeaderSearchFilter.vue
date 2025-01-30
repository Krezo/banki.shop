<template>
  <div class="header-search-filter">
    <div class="input-container">
      <input v-model="searchInput" class="input" placeholder="Поиск по названию картины" />
    </div>
    <button class="button" @click="searchPicture">Найти</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { pictureStoreHelper } from '../../../store';
import { PictureMutationType } from '../../../store/pictureStore';

export default defineComponent({
  data: () => ({
    searchInput: '',
  }),
  watch: {
    searchInput(searchTitle: string) {},
  },
  methods: {
    searchPicture() {
      pictureStoreHelper.commit(PictureMutationType.SET_FILTER_TITLE, this.searchInput);
    },
  },
  name: 'HeaderSearchFilter',
});
</script>

<style>
.header-search-filter {
  display: flex;
  height: 48px;
  align-items: stretch;
  font-size: 14px;
}
.input-container {
  border: 1px solid #e1e1e1;
  padding: 14px 60px 16px 13px;
}
.input {
  border: none;
  font-size: 14px;
  line-height: 21px;
}
.input::placeholder {
  color: #9f9f9f;
}
.button {
  height: 100%;
  color: var(--bc-c-absolute-white);
  background: var(--bs-c-primary);
  padding: 13px 36px;
}
</style>
