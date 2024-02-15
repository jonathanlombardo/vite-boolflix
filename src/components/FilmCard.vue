<script>
// import MyComp from './components/MyComp.vue';
// import {store} from './store/index.js'
import { getLanguage } from "language-flag-colors";

export default {
  props: {
    film: Object,
  },

  methods: {
    lang() {
      if (!getLanguage(this.film.original_language)) return;
      if (getLanguage(this.film.original_language).ids.locale.split("-")[1]) {
        return getLanguage(this.film.original_language).ids.locale.split("-")[1].toLowerCase();
      } else {
        return getLanguage(this.film.original_language).countryCode;
      }
    },

    getPoster() {
      return `https://image.tmdb.org/t/p/w342${this.film.poster_path}`;
    },

    getVoteGradient() {
      return `background: linear-gradient(to right, rgb(255, 255, 0) ${this.film.vote_average * 10}%, rgb(255, 255, 255) ${this.film.vote_average * 10}%); background-clip: text`;
    },
  },
};
</script>

<template>
  <div class="card">
    <div><img :src="getPoster()" alt="" onerror="this.src = '/img-not-found.png'" /></div>

    <div class="info-wrapper">
      <ul>
        <li>
          <strong>{{ film.title }}</strong>
        </li>
        <li v-if="film.overview" id="overview"><strong>Descrizione: </strong>{{ film.overview }}</li>
        <li><strong>Titolo originale: </strong>{{ film.original_title }}</li>
        <li><strong>Lingua: </strong><span :class="`fi fi-${lang()}`"></span></li>
        <li class="vote" :style="getVoteGradient()">★★★★★</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/partials/var" as *;

@import "/node_modules/flag-icons/css/flag-icons.min.css";

.card {
  position: relative;
  //   border-radius: 10px;
  overflow: hidden;
  cursor: pointer;

  img,
  .info-wrapper {
    width: 342px;
    height: 513px;
    object-fit: fill;
  }

  .info-wrapper {
    opacity: 0;
    transition: 0.2s;
    position: absolute;
    top: 0;

    padding: $space-m;

    background-color: rgba(0, 0, 0, 0.8);

    color: white;
    font-size: 1.2rem;

    ul {
      list-style: none;

      display: flex;
      flex-direction: column;
      //   justify-content: space-between;
      height: 100%;

      li {
        margin-bottom: 15px;
        strong {
          display: block;
          //   border-bottom: 1px solid white;
          margin-bottom: 3px;
        }
        &.vote {
          color: transparent;
          width: fit-content;

          margin-top: auto;
          font-size: 3rem;
        }

        &#overview {
          display: -webkit-box;
          //   max-width: 200px;
          -webkit-line-clamp: 7;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
    }

    &:hover {
      opacity: 1;
    }
  }
}
</style>
