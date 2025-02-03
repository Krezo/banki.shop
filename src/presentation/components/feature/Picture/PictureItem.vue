<template>
  <div class="picture-item" :class="{ 'picture-item--sold': picture.sold }" @click="addToCart">
    <div class="header show-model-el" @click="$emit('modal')">
      <img class="picture-item-image" :src="picture.images[0]" alt="" />
    </div>
    <div class="body">
      <h5 class="title show-model-el" @click="$emit('modal')">
        {{ picture.title }}
      </h5>
      <div class="footer" v-if="!picture.sold">
        <div class="price-container">
          <div v-if="picture?.oldPrice" class="price-old">
            {{ `${formatStringNumber(picture.oldPrice)} $` }}
          </div>
          <div class="price">
            {{ `${formatStringNumber(picture.price)} $` }}
          </div>
        </div>
        <button class="buy-button" :class="{ 'buy-button--cart': inCart }">
          <svg
            v-if="inCart"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_21232_57)">
              <path
                d="M16.5315 4.80937L7.63341 14.237L3.34814 10.1924"
                stroke="#F4F6F9"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_21232_57">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <div v-if="loading || loadingCart" class="button-loader-shadow">
            <div class="loader button-loader"></div>
          </div>
          {{ inCart ? 'В корзине' : 'Купить' }}
        </button>
      </div>
      <div class="sold-text" v-else>Продана на аукционе</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Picture } from '@/domain/entities/Picture';
import { formatStringNumber } from '@/shared/utils/utils';
import { cartStoreHelper } from '../../../store';
import { CartActionType, CartGetterType } from '../../../store/cartStore';

export default defineComponent({
  data: () => ({
    loading: false,
  }),
  props: {
    picture: {
      type: Object as PropType<Picture>,
      required: true,
    },
  },
  emits: ['modal'],
  computed: {
    inCart(): boolean {
      return (
        cartStoreHelper.getter(CartGetterType.CART_BOUGHT_IDS).includes(this.picture.id) &&
        !this.loading
      );
    },
    loadingCart() {
      return cartStoreHelper.getter(CartGetterType.IS_LOADING);
    },
  },
  methods: {
    formatStringNumber,
    async addToCart() {
      if (this.inCart || this.loading) {
        return;
      }
      try {
        this.loading = true;
        await cartStoreHelper.dispatch(CartActionType.ADD_TO_CART, this.picture);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style scoped>
.picture-item {
  height: 100%;
  border: 1px solid #e1e1e1;
}
.picture-item--sold {
  opacity: 0.4;
  pointer-events: none;
  user-select: none;
}
.header {
  height: auto;
}
.body {
  padding: 12px;
}
.sold-text {
  color: #343030;
  font-weight: bold;
  font-size: 16px;
  margin-top: 34px;
}
.title {
  color: #343030;
  line-height: 1.5;
  font-size: 16px;
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
  display: flex;
  position: relative;
  background: #382e2b;
  color: #f4f6f9;
  padding: 14px 0;
  flex-basis: 112px;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  gap: 4px;
}
.buy-button--cart {
  background-color: #5b3a32;
}
.button-loader-shadow {
  position: absolute;
  inset: 0;
  opacity: 0.9;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3a3a3ab3;
}

.button-loader-shadow .loader {
  width: 16px;
  height: 16px;
}
.picture-item-image {
  width: 100%;
}
.show-model-el {
  cursor: pointer;
}

@media (min-width: 1400px) {
  .body {
    padding: 20px 24px 24px 24px;
  }
  .title {
    font-size: 18px;
  }
  .header {
    height: 160px;
  }
}
</style>
