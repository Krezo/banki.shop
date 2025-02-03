<template>
  <transition name="fade">
    <div v-if="value" class="modal-overlay" @mousedown.self="close">
      <div class="modal-container">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppModal',
  props: {
    title: {
      type: String,
      default: 'Modal Title',
    },
    value: {
      type: Boolean,
    },
  },
  emits: ['input'],
  methods: {
    close() {
      this.$emit('input', false);
    },
  },
});
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* .modal-container {
  background: white;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transform: translateY(-50px);
  opacity: 0;
  transition: all 0.3s ease-in-out;
} */

/* Animation styles */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 1s ease;
}

.modal-fade-enter, .modal-fade-leave-to /* .modal-fade-leave-active in <2.1.8 */ {
  transform: translateY(-50px);
  opacity: 0;
}
</style>
