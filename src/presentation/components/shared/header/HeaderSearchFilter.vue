<template>
  <div class="header-search-filter">
    <div class="input-container">
      <input v-model="searchInput" class="input" @change="searchPicture" placeholder="Поиск " />
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
  padding: 13px 10px 13px 6px;
}
.input {
  border: none;
  max-width: 120px;
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
  padding: 6px;
}

@media (min-width: 576px) {
  .input {
    max-width: none;
  }
  .input-container {
    border: 1px solid #e1e1e1;
    padding: 14px 60px 16px 13px;
  }
  .button {
    height: 100%;
    color: var(--bc-c-absolute-white);
    background: var(--bs-c-primary);
    padding: 13px 36px;
  }
}
</style>
