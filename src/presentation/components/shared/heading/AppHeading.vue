<template>
  <component :is="`h${level}`" :class="['app-heading', `app-heading--${level}`]">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppHeading',
  props: {
    level: {
      type: Number,
      default: 1,
      validator: (value: number) => value >= 1 && value <= 6,
    },
  },
});
</script>

<style scoped>
.app-heading {
  font-family: var(--font-primary);
}
.app-heading--2 {
  font-size: 24px;
  font-weight: bold;
}
</style>
