<script>
import FilmCard from "./FilmCard.vue";
import FilmOverview from "./FilmOverview.vue";
import { store } from "../store/index.js";

export default {
  data() {
    return {
      store,
    };
  },

  computed: {
    filterFoundedFilms() {
      let filteredFilms;
      if (store.filter.serie) {
        filteredFilms = store.foundedSeries;
      } else if (store.filter.movie) {
        filteredFilms = store.foundedMovies;
      } else {
        filteredFilms = store.foundedFilms;
      }

      if (!store.filter.genreID) return filteredFilms;

      return filteredFilms.filter((film) => {
        return film.genreIds.includes(store.filter.genreID);
      });
    },

    filterPopFilms() {
      let filteredFilms;
      if (store.filter.serie) {
        filteredFilms = store.popSeries;
      } else if (store.filter.movie) {
        filteredFilms = store.popMovies;
      } else {
        filteredFilms = store.popFilms;
      }

      if (!store.filter.genreID) return filteredFilms;

      return filteredFilms.filter((film) => {
        return film.genreIds.includes(store.filter.genreID);
      });
    },

    filterNewFilms() {
      let filteredFilms;
      if (store.filter.serie) {
        filteredFilms = store.newSeries;
      } else if (store.filter.movie) {
        filteredFilms = store.newMovies;
      } else {
        filteredFilms = store.newFilms;
      }

      if (!store.filter.genreID) return filteredFilms;

      return filteredFilms.filter((film) => {
        return film.genreIds.includes(store.filter.genreID);
      });
    },

    filterLovedFilms() {
      let filteredFilms;
      if (store.filter.serie) {
        filteredFilms = store.lovedFilms;
      } else if (store.filter.movie) {
        filteredFilms = store.lovedMovies;
      } else {
        filteredFilms = store.lovedFilms;
      }

      if (!store.filter.genreID) return filteredFilms;

      return filteredFilms.filter((film) => {
        return film.genreIds.includes(store.filter.genreID);
      });
    },
  },

  components: { FilmCard, FilmOverview },

  methods: {
    openFilm(film) {
      store.filmOpened.film = film;
      store.filmOpened.show = true;
    },
  },

  created() {
    store.fetchPopFilms();
    store.fetchNewFilms();
    store.fetchLovedFilms();
  },
};
</script>

<template>
  <div v-if="!store.filmOpened.show">
    <div v-if="!store.tmdbQuary && store.isLoading" class="container">
      <h1>Loading...</h1>
    </div>
    <div v-if="store.tmdbQuary" class="container">
      <h2 v-if="!filterFoundedFilms.length && !store.isLoading">Nessun risultato</h2>
      <div class="row wrap">
        <div v-for="film in filterFoundedFilms" class="col founded-film">
          <FilmCard @click="openFilm(film)" :film="film" :key="film.id" />
        </div>
      </div>
    </div>
    <div v-else-if="!store.isLoading" class="container">
      <div v-if="filterPopFilms.length">
        <h2>Popolari su netflix</h2>
        <div class="row nowrap">
          <div v-for="film in filterPopFilms" class="col founded-film">
            <FilmCard @click="openFilm(film)" :film="film" :key="film.id" />
          </div>
        </div>
      </div>
      <div v-if="filterNewFilms.length">
        <h2>Novità su netflix</h2>
        <div class="row nowrap">
          <div v-for="film in filterNewFilms" class="col founded-film">
            <FilmCard @click="openFilm(film)" :film="film" :key="film.id" />
          </div>
        </div>
      </div>
      <div v-if="filterLovedFilms.length">
        <h2>I più votati</h2>
        <div class="row nowrap">
          <div v-for="film in filterLovedFilms" class="col founded-film">
            <FilmCard @click="openFilm(film)" :film="film" :key="film.id" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="container">
      <film-overview />
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
