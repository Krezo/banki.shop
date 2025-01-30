<template>
  <div class="picture-item">
    <div class="header">
      <img :src="picture.images[0]" alt="" />
    </div>
    <div class="body">
      <h5 class="title">{{ picture.title }}</h5>
      <div class="footer">
        <div class="price-container">
          <div v-if="picture?.oldPrice" class="price-old">
            {{ `${formatStringNumber(picture.oldPrice)} $` }}
          </div>
          <div class="price">{{ `${formatStringNumber(picture.price)} $` }}</div>
        </div>
        <button class="buy-button">Купить</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Picture } from '@/domain/entities/Picture';
import { formatStringNumber } from '@/shared/utils/utils';

export default defineComponent({
  props: {
    picture: {
      type: Object as PropType<Picture>,
      required: true,
    },
  },
  methods: {
    formatStringNumber,
  },
});
</script>

<style scoped>
.picture-item {
  border: 1px solid #e1e1e1;
}
.header {
  height: 160px;
}
.body {
  padding: 20px 24px 24px 24px;
}
.title {
  color: #343030;
  line-height: 1.5;
  font-size: 18px;
}
.footer {
  margin-top: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.price {
  color: #343030;
  font-weight: bold;
  font-size: 16px;
}
.price-old {
  font-size: 14px;
  color: #a0a0a0;
  text-decoration: line-through;
}
.buy-button {
  background: #382e2b;
  color: #f4f6f9;
  padding: 14px 30px;
}
</style>
