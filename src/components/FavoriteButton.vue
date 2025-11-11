<template>
  <button
    @click.stop.prevent="toggleFav"
    :aria-label="!isFav ? 'Add to Favorites' : 'Remove from Favorites'"
  >
    {{ !isFav ? text.add : text.remove }}
  </button>
</template>

<script setup lang="ts">
import { useFavoritesStore } from '@/stores/favorites';
import { computed, defineProps } from 'vue';

const props = defineProps({
  show: {
    type: Object,
    required: true,
  },
  text: {
    type: Object,
    default: () => ({
      add: '🫶',
      remove: '❤️',
    }),
  },
});

const favStore = useFavoritesStore();
const isFav = computed(() => favStore.isFavorite(props.show.id));

const toggleFav = () => {
  favStore.toggleFavorite(props.show);
};
</script>
