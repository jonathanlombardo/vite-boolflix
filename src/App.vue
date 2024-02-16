<script>
import AppHeader from "./components/AppHeader.vue";
import HeaderOpt from "./components/HeaderOpt.vue";
import AppMain from "./components/AppMain.vue";
import { store } from "./store/index.js";

export default {
  data() {
    return {
      store,
      searchRandering: true,
      // ...
    };
  },

  computed: {
    filteredGenres() {
      let filteredGenres;
      if (store.filter.serie) {
        filteredGenres = store.genresSeries;
      } else if (store.filter.movie) {
        filteredGenres = store.genresMovies;
      } else {
        filteredGenres = store.genresFilms;
      }

      return filteredGenres;
    },
  },

  props: {
    // ...
  },

  methods: {
    searchFilms(text) {
      store.tmdbQuary = text;
      store.fetchFilms();
    },

    closeFilmPreview() {
      store.filmOpened.show = false;
    },

    filterFilms(id) {
      console.log(id);
      store.filter.genreID = id;
    },

    async resetHome() {
      for (let value of Object.keys(store.filter)) {
        store.filter[value] = false;
      }

      store.tmdbQuary = "";

      this.searchRandering = false;
      await this.$nextTick();
      this.searchRandering = true;
    },
  },

  components: { AppHeader, AppMain, HeaderOpt },

  created() {
    store.fetchGenreFilms();
  },
};
</script>

<template>
  <app-header>
    <template v-if="!store.filmOpened.show" #menuOpt>
      <header-opt @resetHome="resetHome" />
    </template>
    <template #asideControl>
      <search-bar v-if="searchRandering && !store.filmOpened.show" @searching="searchFilms" />
      <font-awesome-icon v-else :icon="['far', 'circle-xmark']" size="xl" @click="closeFilmPreview()" class="icon-btn" />
    </template>
    <template v-if="!store.filmOpened.show && store.filter.showGenres" #filterBar>
      <filter-bar @filter="filterFilms" noFilterString="Tutti i generi" :options="filteredGenres" />
    </template>
  </app-header>

  <app-main />
</template>

<style lang="scss">
@use "./assets/global.scss";
</style>
