<script>
// import MyComp from './components/MyComp.vue';
import { store } from "../store/index.js";
import { getLanguage } from "language-flag-colors";

export default {
  data() {
    return {
      store,
    };
  },

  methods: {
    lang(value) {
      if (getLanguage(value).ids.locale.split("-")[1]) {
        return getLanguage(value).ids.locale.split("-")[1].toLowerCase();
      } else {
        return getLanguage(value).countryCode;
      }
    },

    getPoster(film) {
      return `https://image.tmdb.org/t/p/w342/${film.poster_path}`;
    },
  },
};
</script>

<template>
  <div v-for="film in store.foundedFilms" class="card">
    <ul>
      <li><img :src="getPoster(film)" alt="" /></li>
      <li>{{ film.title }}</li>
      <li>{{ film.original_title }}</li>
      <li>{{ film.original_language }}</li>
      <li><span :class="`fi fi-${lang(film.original_language)}`"></span></li>
      <li>{{ film.vote_average }}</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import "/node_modules/flag-icons/css/flag-icons.min.css";

.card {
  border: 1px solid black;
}
</style>
