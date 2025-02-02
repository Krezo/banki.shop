<template>
  <div class="picture-list-container">
    <div>
      <div class="" v-if="loading">Loading...</div>
      <div v-else-if="pictures.length == 0">Картины не найдены</div>
      <div v-else class="picture-list row">
        <div
          v-for="picture in pictures"
          :key="picture.id"
          class="picture-item col-6 col-md-6 col-lg-4 col-xl-3"
        >
          <PictureItem :picture="picture" @modal="showPictureModal(picture)" />
        </div>
      </div>
    </div>
    <AppModal v-model="modalVisible">
      <PictureItemModal
        v-show="modalPicture"
        :picture="modalPicture"
        @close="modalVisible = false"
      />
    </AppModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Picture } from "@/domain/entities/Picture";
import PictureItem from "./PictureItem.vue";
import { cartStoreHelper } from "../../../store";
import PictureItemModal from "./PictureItemModal.vue";
import AppModal from "../../shared/modal/AppModal.vue";

export default defineComponent({
  components: { PictureItem, PictureItemModal, AppModal },
  data: () => ({
    modalVisible: false,
    modalPicture: null as Picture | null,
  }),
  name: "PictureList",
  computed: {
    cartItems() {
      return cartStoreHelper.state.items;
    },
  },
  methods: {
    showPictureModal(p: Picture) {
      this.modalPicture = p;
      this.modalVisible = true;
    },
  },
  props: {
    pictures: {
      type: Array as PropType<Picture[]>,
      required: true,
      validator: (value: Picture[]) => {
        return Array.isArray(value);
      },
    },
    loading: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
});
</script>

<style scoped>
.picture-list {
  display: grid;
  gap: 30px;
}

.picture-item {
  min-height: 200px;
}
</style>
