<script>
// import MyComp from './components/MyComp.vue';
// import {store} from './store/index.js'
import { getLanguage } from "language-flag-colors";

export default {
  data() {
    return {
      // store,
      // ...
    };
  },

  props: {
    film: Object,
  },

  methods: {
    lang() {
      if (getLanguage(this.film.original_language).ids.locale.split("-")[1]) {
        return getLanguage(this.film.original_language).ids.locale.split("-")[1].toLowerCase();
      } else {
        return getLanguage(this.film.original_language).countryCode;
      }
    },

    getPoster() {
      return `https://image.tmdb.org/t/p/w342/${this.film.poster_path}`;
    },

    getVoteGradient() {
      return `background: linear-gradient(to right, rgb(255, 255, 0) ${this.film.vote_average * 10}%, rgb(0, 0, 0) ${this.film.vote_average * 10}%); background-clip: text`;
    },
  },

  components: {},

  created() {
    // ...
  },
};
</script>

<template>
  <div class="card">
    <ul>
      <li><img :src="getPoster()" alt="" /></li>
      <li>{{ film.title }}</li>
      <li>{{ film.original_title }}</li>
      <li>{{ film.original_language }}</li>
      <li><span :class="`fi fi-${lang()}`"></span></li>
      <li>{{ film.vote_average }}</li>
      <li class="vote" :style="getVoteGradient()">★★★★★</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import "/node_modules/flag-icons/css/flag-icons.min.css";

.card {
  padding: 20px;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
.vote {
  color: transparent;
  width: fit-content;

  font-size: 3rem;
}
</style>
