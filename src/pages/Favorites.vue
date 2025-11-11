<template>
  <div>
    <div>
      <router-link to="/" class="back">← Back to Home</router-link>
    </div>
    <h2>Favorites</h2>
    <div v-if="favStore.favorites?.length === 0">No favorites yet.</div>
    <div class="grid">
      <Card v-for="show in favStore.favorites" :key="show.id" :show="show" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFavoritesStore } from '@/stores/favorites';
import Card from '@/components/Card.vue';

const favStore = useFavoritesStore();
</script>

<style scoped lang="scss">
.grid {
  display: grid;
  gap: 1.5rem 0.5rem;
  grid-template-columns: repeat(auto-fill, minmax(calc(50% - 0.5rem), 1fr));

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(calc(33% - 0.5rem), 1fr));
  }

  @media screen and (min-width: 1024px) {
    gap: 1.5rem 1rem;
    grid-template-columns: repeat(auto-fill, minmax(calc(20% - 1rem), 1fr));
  }
}
</style>
