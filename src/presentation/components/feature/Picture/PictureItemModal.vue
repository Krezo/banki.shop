<template>
  <div class="picture-item-modal">
    <div>
      <div ref="swiper" class="swiper">
        <div class="swiper-wrapper">
          <div
            v-for="(image, index) in picture.images"
            class="swiper-slide"
            :key="picture.id + index"
          >
            <img :src="image" alt="slider_img" />
          </div>
        </div>
        <div class="swiper-button-prev slide-btn"></div>
        <div class="swiper-button-next slide-btn"></div>
      </div>
    </div>
    <div class="modal-body">
      <h3 class="title">{{ picture.title }}</h3>
      <p class="description">{{ picture.description }}</p>
      <div class="price-container">
        <div v-if="picture.oldPrice" class="price-old">
          {{ `${formatStringNumber(picture.oldPrice)} $` }}
        </div>
        <div class="price">
          {{ `${formatStringNumber(picture.price)} $` }}
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="modal-button" @click="close">Закрыть</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { formatStringNumber } from '@/shared/utils/utils';
import { Picture } from '@/domain/entities/Picture';
import Swiper, { Navigation, Pagination } from 'swiper';

export default defineComponent({
  name: 'PictureItemModal',
  props: {
    picture: {
      type: Object as PropType<Picture>,
      required: true,
    },
  },
  emits: ['close'],
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        loop: true,
      },
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    formatStringNumber,
  },
  mounted() {
    new Swiper(this.$refs.swiper as HTMLDivElement, {
      // configure Swiper to use modules
      modules: [Navigation, Pagination],
      // Optional parameters
      loop: true,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  },
});
</script>

<style scoped>
.slide-btn {
  color: var(--bs-c-primary);
}
.title {
  color: #343030;
  line-height: 1.5;
  font-size: 18px;
}
.picture-item-modal {
  background: var(--bc-c-absolute-white);
  max-width: 500px;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

.modal-body {
  padding: 16px;
}

.swiper-slide img {
  width: 100%;
}

.description {
  margin: 16px 0;
}

.price-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.price-old {
  text-decoration: line-through;
  color: #888;
}

.price {
  font-size: 1.5em;
  font-weight: bold;
}

.modal-footer {
  padding: 16px;
  border-top: 1px solid #eaeaea;
  text-align: right;
}

.modal-button {
  color: var(--bc-c-absolute-white);
  background: var(--bs-c-primary);
  padding: 13px 36px;
}
</style>
