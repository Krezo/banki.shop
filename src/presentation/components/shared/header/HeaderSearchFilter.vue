<template>
  <div class="header-search-filter">
    <div class="input-container">
      <input
        v-model="searchInput"
        class="input"
        placeholder="Поиск по названию картины"
      />
    </div>
    <button class="button" @click="searchPicture">Найти</button>
    <button class="menu-icon">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        aria-hidden="true"
        class="DocSearch-Search-Icon"
      >
        <path
          d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
          stroke="currentColor"
          fill="none"
          fill-rule="evenodd"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { pictureStoreHelper } from "../../../store";
import { PictureMutationType } from "../../../store/pictureStore";

export default defineComponent({
  data: () => ({
    searchInput: "",
  }),
  watch: {
    searchInput(searchTitle: string) {},
  },
  methods: {
    searchPicture() {
      pictureStoreHelper.commit(
        PictureMutationType.SET_FILTER_TITLE,
        this.searchInput
      );
    },
  },
  name: "HeaderSearchFilter",
});
</script>

<style>
.header-search-filter {
  display: flex;
  height: 48px;
  align-items: center;
  font-size: 14px;
}
.input-container {
  display: none;
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
  display: none;
  height: 100%;
  color: var(--bc-c-absolute-white);
  background: var(--bs-c-primary);
  padding: 13px 36px;
}

.menu-icon {
  display: inline-flex;
}
@media (min-width: 992px) {
  .button,
  .input-container {
    display: block;
  }
  .menu-icon {
    display: none;
  }
  .header-search-filter {
    align-items: stretch;
  }
}
</style>
