<script>
import { store } from "../store/index.js";

export default {
  data() {
    return {
      store,
    };
  },

  methods: {
    searchFilms(text) {
      store.searchText = text;
      store.fetchFilms();
    },
  },
};
</script>

<template>
  <header>
    <div>logo</div>
    <search-bar @searching="searchFilms" />
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 50px;
  border-bottom: 1px solid black;
}
</style>
