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
  <div class="container">
    <div class="row">
      <div id="founded-films" v-for="film in store.foundedFilms" class="col">
        <FilmCard :film="film" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/partials/var" as *;

.row {
  justify-content: center;
  align-items: center;

  #founded-films {
    padding-top: $space-m;
    padding-bottom: $space-m;
  }
}
</style>
