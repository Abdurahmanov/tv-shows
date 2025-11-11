<template>
  <div class="search-block" ref="searchBlockRef">
    <input
      v-model="searchValue"
      @focus="onFocus"
      @input="onInput"
      type="search"
      placeholder="Search by name"
      class="input"
      name="search"
    />
    <div class="suggestion-block" v-show="isFocused" :class="{ loading: searchLoading }">
      <ul class="suggestion-list">
        <li class="suggestion-item loading" v-if="searchLoading">Loading...</li>
        <li
          class="suggestion-item empty"
          v-else-if="!searchData || searchData?.length === 0 || searchValue === ''"
        >
          Begin typing to see the results
        </li>
        <li class="suggestion-item" v-else v-for="show in searchData" :key="show.id">
          <router-link :to="`/show/${show.id}`" class="suggestion-link" @click="onClose">
            {{ show.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue';
import { storeToRefs } from 'pinia';

import { debounce } from '@/utils/debounce';
import { useDataStore } from '@/stores/data';
import { useClickOutside } from '@/utils/useClickOutside';

const dataStore = useDataStore();

const { searchData, searchLoading } = storeToRefs(dataStore);

const searchValue = ref('');
const isFocused = ref(false);
const searchBlockRef = ref<HTMLElement | null>(null);

const onClose = () => {
  isFocused.value = false;
};

useClickOutside(
  searchBlockRef,
  () => {
    onClose();
  },
  isFocused,
);

const onSearch = async (value: string) => {
  if (value) {
    await dataStore.fetchSearchData(value);
  }
};

const debouncedSearch = debounce((value: string) => {
  onSearch(value);
}, 300);

const onInput = () => {
  debouncedSearch(searchValue.value);
};

const onFocus = () => {
  isFocused.value = true;
};

defineExpose({
  searchValue,
});
</script>

<style scoped lang="scss">
.input {
  height: 40px;
  width: 100%;
  font-size: 1rem;
  padding: 0 1rem;
  border: 0;
  outline: none;
  border-radius: 0.25rem;
  background-color: #fff;

  @media screen and (min-width: 1024px) {
    width: 300px;
  }
}

.search-block {
  position: relative;
}

.suggestion {
  &-block {
    position: absolute;
    top: 45px;
    left: 0;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-height: 300px;
    overflow-y: auto;
    z-index: 10;
    padding: 0.5rem 0;
    width: 100%;
  }

  &-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  &-item {
    border-bottom: 1px solid #d3d3d3;
    color: rgba(0, 0, 0, 0.8);

    &:last-child {
      border-bottom: none;
    }

    &.empty,
    &.loading {
      padding: 0.5rem 1rem;
    }
  }

  &-link {
    text-decoration: none;
    color: inherit;
    width: 100%;
    display: block;
    padding: 0.5rem 1rem;

    &:hover {
      background-color: #f5f5f5;
    }
  }
}
</style>
