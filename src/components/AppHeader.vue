<script>
import { store } from "../store/index.js";
import AppLogo from "./AppLogo.vue";

export default {
  data() {
    return {
      store,
    };
  },

  components: {
    AppLogo,
  },

  methods: {
    searchFilms(text) {
      store.tmdbQuary = text;
      store.fetchFilms();
    },
  },
};
</script>

<template>
  <header class="container">
    <app-logo />
    <search-bar @searching="searchFilms" class="searchbar" />
  </header>
</template>

<style lang="scss" scoped>
header {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
}
</style>
