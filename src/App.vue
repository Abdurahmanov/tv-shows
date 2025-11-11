<template>
  <div class="app">
    <Header />
    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  color: rgba(255, 255, 255, 0.87);
}

.app {
  min-height: 100vh;
  background: #1c202b;
}

.container {
  padding: 1rem;
}

.back {
  color: inherit;
  text-decoration: none;
}
</style>
