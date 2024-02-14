<script>
import AppHeader from "./components/AppHeader.vue";
import AppMain from "./components/AppMain.vue";
import { store } from "./store/index.js";

export default {
  data() {
    return {
      store,
      // ...
    };
  },

  props: {
    // ...
  },

  methods: {
    // ...
  },

  components: { AppHeader, AppMain },
};
</script>

<template>
  <app-header />
  <app-main />
  <!-- <input type="text" v-model="store.searchText" @input="store.fetchFilms()" /> -->
</template>

<style lang="scss" scoped></style>
