<script>
import FilmCard from "./FilmCard.vue";
import { store } from "../store/index.js";

export default {
  data() {
    return {
      store,
    };
  },

  computed: {
    filterFoundedFilms() {
      if (store.filter.serie) return store.foundedSeries;
      if (store.filter.movie) return store.foundedMovies;
      return store.foundedFilms;
    },

    filterPopFilms() {
      if (store.filter.serie) return store.popSeries;
      if (store.filter.movie) return store.popMovies;
      return store.popFilms;
    },

    filterNewFilms() {
      if (store.filter.serie) return store.newSeries;
      if (store.filter.movie) return store.newMovies;
      return store.newFilms;
    },

    filterLovedFilms() {
      if (store.filter.serie) return store.lovedFilms;
      if (store.filter.movie) return store.lovedMovies;
      return store.lovedFilms;
    },
  },

  components: { FilmCard },

  methods: {
    // ...
  },

  created() {
    store.fetchPopFilms();
    store.fetchNewFilms();
    store.fetchLovedFilms();
  },
};
</script>

<template>
  <div class="container">
    <h1 v-if="!store.tmdbQuary && store.isLoading">Loading...</h1>
  </div>
  <div v-if="store.tmdbQuary" class="container">
    <h2 v-if="!filterFoundedFilms.length && !store.isLoading">Nessun risultato</h2>
    <div class="row wrap">
      <div v-for="film in filterFoundedFilms" class="col founded-film">
        <FilmCard :film="film" />
      </div>
    </div>
  </div>
  <div v-else-if="!store.isLoading" class="container">
    <h2>Popolari su netflix</h2>
    <div class="row nowrap">
      <div v-for="film in filterPopFilms" class="col founded-film">
        <FilmCard :film="film" />
      </div>
    </div>
    <h2>Novità su netflix</h2>
    <div class="row nowrap">
      <div v-for="film in filterNewFilms" class="col founded-film">
        <FilmCard :film="film" />
      </div>
    </div>
    <h2>I più votati</h2>
    <div class="row nowrap">
      <div v-for="film in filterLovedFilms" class="col founded-film">
        <FilmCard :film="film" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/partials/var" as *;

.row.nowrap {
  flex-wrap: nowrap;
  overflow-x: auto;
  padding-bottom: 5px;
  margin-bottom: $space-m;
  margin-top: $space-m;
  scrollbar-width: thin;
  scrollbar-color: #343434 #1b1b1b;

  &:hover {
    scrollbar-color: #575757 #1b1b1b;
  }
}

.row.wrap {
  justify-content: center;
  align-items: center;

  .founded-film {
    padding-top: $space-m;
    padding-bottom: $space-m;
  }
}
</style>
