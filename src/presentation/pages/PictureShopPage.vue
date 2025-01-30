<template>
  <div class="container">
    <AppHeading class="title" :level="2">Картины эпохи Возрождения</AppHeading>
    <PictureList :pictures="filteredPictures" :loading="loadingPicture" />
  </div>
</template>

<script lang="ts">
import PictureList from '@/presentation/components/feature/Picture/PictureList.vue';
import AppHeading from '@/presentation/components/shared/heading/AppHeading.vue';
import { PictureActionType, PictureGetterType } from '../store/pictureStore';
import { pictureStoreHelper } from '../store';

export default {
  components: { AppHeading, PictureList },
  name: 'PictureShopPage',
  data: () => ({}),
  computed: {
    filteredPictures() {
      return pictureStoreHelper.getter(PictureGetterType.FILTERED_PICTURES);
    },
    loadingPicture() {
      return pictureStoreHelper.getter(PictureGetterType.IS_LOADING);
    },
  },
  methods: {
    async fetchPictures() {
      pictureStoreHelper.dispatch(PictureActionType.FETCH_PICTURES);
    },
  },
  mounted() {
    this.fetchPictures();
  },
};
</script>

<style scoped>
.title {
  color: #343030;
  margin-top: 45px;
  margin-bottom: 39px;
}
</style>
