<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else class="wrapper">
      <div v-for="(shows, genre) in data" :key="genre" class="genre-block">
        <h2 class="title">{{ genre }}</h2>
        <div class="carousel">
          <div class="scroll-container" role="region" aria-label="carousel">
            <ul class="carousel-list" role="list">
              <li v-for="show in shows" :key="show.id" class="carousel-item">
                <Card :show="show" class="carousel-card" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';
import Card from '@/components/Card.vue';

const dataStore = useDataStore();

const { data, loading } = storeToRefs(dataStore);

onMounted(() => {
  if (!data?.value) {
    dataStore.fetchData();
  }
});
</script>

<style scoped lang="scss">
.scroll-container {
  display: flex;
  max-width: 100vw;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-padding: 0;
  scrollbar-width: none;
}

.carousel {
  position: relative;

  &-list {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 100%;
    gap: 0.5rem;
  }

  &-item {
    max-width: 210px;
  }

  &-card {
    :deep(img) {
      width: auto;
      max-width: 210px;
      background: gray;
      height: 295px;
    }
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.title {
  margin: 0 0 0.5rem;
}
</style>
