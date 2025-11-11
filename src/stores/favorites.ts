import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ShowData } from '@/types/show';

export const useFavoritesStore = defineStore('favorites', () => {
  const key = 'tv_favorites';
  const favorites = ref(JSON.parse(localStorage.getItem(key) || '[]'));

  const toggleFavorite = (show: any) => {
    const exists = favorites.value.find((item: ShowData) => item.id === show.id);
    if (exists) {
      favorites.value = favorites.value.filter((item: ShowData) => item.id !== show.id);
    } else {
      favorites.value.push({
        id: show.id,
        name: show.name,
        image: show.image,
        rating: show.rating,
        network: show.network,
      });
    }
    localStorage.setItem(key, JSON.stringify(favorites.value));
  };

  const isFavorite = (id: string) => {
    return favorites.value.find((fav: ShowData) => fav.id === Number(id));
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
});
