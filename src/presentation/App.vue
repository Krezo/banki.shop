<template>
  <RouterView></RouterView>
</template>

<script lang="ts">
import { RouterView } from "vue-router";
import { cartStoreHelper } from "./store";
import { CartActionType } from "./store/cartStore";

export default {
  data() {
    return {};
  },
  components: {
    RouterView,
  },
  created() {
    cartStoreHelper.dispatch(CartActionType.FETCH_CART);
  },
};
</script>
