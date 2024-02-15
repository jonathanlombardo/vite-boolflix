<script>
import FilmCard from "./FilmCard.vue";
import { store } from "../store/index.js";

export default {
  data() {
    return {
      store,
    };
  },

  components: { FilmCard },

  methods: {
    // ...
  },
};
</script>

<template>
  <div class="row">
    <FilmCard v-for="film in store.foundedFilms" :film="film" />
  </div>
</template>

<style lang="scss" scoped>
.row {
  display: flex;
}
</style>
