<template>
  <header class="header">
    <div class="search-wrapper">
      <router-link class="link" to="/">
        <span class="logo" />
      </router-link>
      <Search />
    </div>
    <router-link class="link favorites" to="/favorites" />
  </header>
</template>

<script setup lang="ts">
import Search from './Search.vue';
</script>

<style scoped lang="scss">
.header {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #212633;
  box-shadow: 1px 1px 12px black;
  position: sticky;
  top: 0;
  z-index: 1;
  gap: 1rem;
}

.link {
  text-decoration: none;
  color: inherit;
}

.logo:after {
  content: 'TVSD';
  font-weight: bold;
  font-size: 2rem;

  @media screen and (min-width: 1024px) {
    content: 'TV Shows Dashboard';
  }
}

.favorites {
  font-size: 2rem;
  transition: transform 0.3s;

  &:after {
    content: '🤍';
  }

  &:hover:after {
    content: '❤️';
  }
}

.search-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
