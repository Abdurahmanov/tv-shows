<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-if="data">
        <div>
          <router-link to="/" class="back">← Back to Home</router-link>
        </div>
        <h1>{{ data.name }}</h1>
        <div class="wrapper">
          <div class="img-block">
            <img :src="data.image?.original" :alt="data.name" />
          </div>
          <div class="info-block">
            <p v-html="sanitizedSummary" />

            <h3 class="info-title">Info</h3>

            <table>
              <tbody>
                <tr>
                  <td>Genres:</td>
                  <td>{{ data.genres.length ? data.genres?.join(' | ') : 'N/A' }}</td>
                </tr>
                <tr>
                  <td>Language:</td>
                  <td>{{ data.language ?? 'N/A' }}</td>
                </tr>
                <tr>
                  <td>Status:</td>
                  <td>{{ data.status ?? 'N/A' }}</td>
                </tr>
                <tr>
                  <td>Premiered:</td>
                  <td>{{ data.premiered ?? 'N/A' }}</td>
                </tr>
                <tr>
                  <td>Rating:</td>
                  <td>⭐ {{ data.rating?.average ?? 'N/A' }}</td>
                </tr>
                <tr>
                  <td>Network:</td>
                  <td>{{ data.network?.name ?? 'N/A' }}</td>
                </tr>
              </tbody>
            </table>
            <FavoriteButton :show="data" :text="favoriteText" class="favorite-btn" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import DOMPurify from 'dompurify';
import type { ShowData } from '@/types/show';

import { useDataStore } from '@/stores/data';
import FavoriteButton from '@/components/FavoriteButton.vue';

const route = useRoute();

const dataStore = useDataStore();

const loading = ref(false);
const data = ref<ShowData | null>(null);

const id = route.params.id as string;

const sanitizedSummary = computed(() => DOMPurify.sanitize(data.value?.summary || ''));

const favoriteText = {
  add: 'Add to Favorites ❤️',
  remove: 'Remove from Favorites 💔',
};

const onFetchData = async (showId: string) => {
  loading.value = true;
  data.value = await dataStore.fetchDataById(showId);
  loading.value = false;
};

onMounted(async () => {
  await onFetchData(id);
});

watch(
  () => route.params.id,
  async (newId) => {
    console.log('Route param changed:', newId);
    await onFetchData(newId as string);
  },
);
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media screen and (min-width: 1024px) {
    flex-wrap: nowrap;
  }
}

.img-block {
  max-height: 50vh;

  img {
    display: block;
    width: 100%;
    object-fit: contain;
    height: 100%;
  }

  @media screen and (min-width: 1024px) {
    max-height: initial;
    max-width: 600px;
    background: gray;
    width: 600px;
  }
}

.info {
  &-block p {
    margin: 0;
  }

  &-block {
    width: 100%;

    @media screen and (min-width: 1024px) {
      width: calc(100% - 600px - 1rem);
    }
  }

  &-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  &-title {
    margin: 1.5rem 0 0.5rem;
  }
}

table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;

  td {
    padding: 1rem 0.5rem;
    vertical-align: top;
  }

  tr:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.25);
    background-clip: padding-box;
  }
}

.favorite-btn {
  font-size: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  border: 1px solid #6cc788;
  background: transparent;
  color: #fff;
  padding: 0.5rem 1rem;
  opacity: 0.7;
  transition: opacity 0.3s;

  &:hover {
    opacity: 1;
  }
}
</style>
