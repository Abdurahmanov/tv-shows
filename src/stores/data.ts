import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ShowData, GroupedShows } from '@/types/show';

export const useDataStore = defineStore('data', () => {
  const data = ref<GroupedShows | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const searchData = ref<ShowData[] | null>(null);
  const searchLoading = ref(false);
  const searchError = ref<string | null>(null);

  const url = 'https://api.tvmaze.com';

  const groupByGenre = (shows: any[]) => {
    const groupedShows = new Map<string, any[]>();

    shows.forEach((show) => {
      show?.genres.forEach((genre: string) => {
        if (!groupedShows.has(genre)) {
          groupedShows.set(genre, []);
        }
        groupedShows.get(genre)?.push(show);
      });
    });

    groupedShows.forEach((shows) => {
      shows.sort((a, b) => b?.rating?.average - a?.rating?.average);
    });

    return Object.fromEntries(groupedShows);
  };

  const fetchData = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${url}/shows`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const shows = await response.json();
      data.value = groupByGenre(shows);
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchDataById = async (id: string) => {
    error.value = null;

    try {
      const response = await fetch(`${url}/shows/${id}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (err: any) {
      error.value = err.message;
      return null;
    }
  };

  const fetchSearchData = async (query: string) => {
    searchLoading.value = true;
    searchError.value = null;

    try {
      const response = await fetch(`${url}/search/shows?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const results: { show: ShowData }[] = await response.json();
      searchData.value = results
        .map(({ show }) => {
          return {
            id: show.id,
            name: show.name,
            image: show.image,
            rating: show.rating,
            network: show.network,
            genres: show.genres,
          };
        })
        .slice(0, 5);
    } catch (err: any) {
      searchError.value = err.message;
    } finally {
      searchLoading.value = false;
    }
  };

  return {
    data,
    loading,
    error,
    searchData,
    searchLoading,
    searchError,
    fetchData,
    fetchDataById,
    fetchSearchData,
  };
});
