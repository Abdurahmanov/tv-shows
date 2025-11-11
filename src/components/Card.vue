<template>
  <router-link :to="`/show/${show.id}`" class="link">
    <div class="img-wrapper">
      <img :src="show.image?.medium" :alt="show.name" />
      <p class="rating" :aria-label="`rating ${show.rating?.average}`">
        <span>⭐ {{ show.rating?.average ?? 'N/A' }}</span>
      </p>
      <FavoriteButton :show="show" class="favorite-btn" />
    </div>
    <p>{{ show.name }}</p>
    <p>Network: {{ show.network?.name }}</p>
  </router-link>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import FavoriteButton from '@/components/FavoriteButton.vue';
import type { ShowData } from '@/types/show';

defineProps<{ show: ShowData }>();
</script>

<style scoped lang="scss">
.link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transition: 0.3s;

  &:hover {
    opacity: 0.7;
  }

  p {
    margin: 0;
  }
}

.rating {
  position: absolute;
  bottom: 1rem;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  span {
    background-color: rgba(85, 85, 85, 0.8);
    border-radius: 0.2rem;
    padding: 0.2rem 0.4rem;
  }
}

.img-wrapper {
  position: relative;

  img {
    display: block;
    object-fit: contain;
    width: 100%;
  }
}

.favorite-btn {
  position: absolute;
  padding: 0.5rem;
  top: 0;
  right: 0;
  font-size: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: scale(1.1);
  }
}
</style>
