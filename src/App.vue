<script>
// import MyComp from './components/MyComp.vue';
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

  components: {},

  created() {
    // store.fetchMovies();
    // ...
  },
};
</script>

<template>
  <input type="text" v-model="store.searchText" @input="store.fetchFilms()" />
</template>

<style lang="scss" scoped></style>
