<script>
// import MyComp from './components/MyComp.vue';
import FilmCard from "./FilmCard.vue";

import { store } from "../store/index.js";
import { getLanguage } from "language-flag-colors";

export default {
  data() {
    return {
      store,
    };
  },

  emits: ["filmClicked"],

  methods: {
    lang() {
      if (!getLanguage(store.filmOpened.film.original_language)) return;
      if (getLanguage(store.filmOpened.film.original_language).ids.locale.split("-")[1]) {
        return getLanguage(store.filmOpened.film.original_language).ids.locale.split("-")[1].toLowerCase();
      } else {
        return getLanguage(store.filmOpened.film.original_language).countryCode;
      }
    },

    getBackdrop() {
      return `https://image.tmdb.org/t/p/w1280${store.filmOpened.film.backdrop_path}`;
    },

    getVoteGradient() {
      return `background: linear-gradient(to right, rgb(255, 255, 0) ${store.filmOpened.film.vote_average * 10}%, rgb(255, 255, 255) ${store.filmOpened.film.vote_average * 10}%); background-clip: text`;
    },

    handleCardClick(film) {
      this.$emit("filmClicked", film);
    },
  },

  components: { FilmCard },

  created() {
    // ...
  },
};
</script>

<template>
  <figure>
    <img :src="getBackdrop()" onerror="this.src = '/img-not-found.png'" alt="" />
    <div class="info-wrapper">
      <ul>
        <li>
          <strong>{{ store.filmOpened.film.title }}</strong>
        </li>
        <li v-if="store.filmOpened.film.overview" class="overview">{{ store.filmOpened.film.overview }}</li>
        <li class="lang"><strong>Lingua: </strong><span :class="`fi fi-${lang()}`"></span></li>
        <li class="vote" :style="getVoteGradient()">★★★★★</li>
      </ul>
    </div>
  </figure>
  <p v-if="store.filmOpened.cast.length">
    CAST:
    <span v-for="actor in store.filmOpened.cast">
      <span v-show="actor.name">{{ actor.name }}</span>
      {{ " " }}<span v-show="actor.character">({{ actor.character }})</span>
    </span>
  </p>
  <p v-if="store.filmOpened.crew.length">
    CREW:
    <span v-for="member in store.filmOpened.crew">
      <span v-show="member.name">{{ member.name }}</span>
      {{ " " }}<span v-show="member.role">({{ member.role }})</span>
    </span>
  </p>

  <p>Titolo originale: {{ store.filmOpened.film.original_title }}</p>

  <div v-if="store.filmOpened.similar.length">
    <h2>Contenuti Simili</h2>
    <div class="row nowrap">
      <div v-for="film in store.filmOpened.similar" class="col founded-film">
        <FilmCard @click="handleCardClick(film)" :film="film" :key="film.id" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/partials/var" as *;

@import "/node_modules/flag-icons/css/flag-icons.min.css";

ul {
  list-style: none;
}

figure {
  position: relative;

  img {
    width: 100%;
    aspect-ratio: 1880 / 450;
    object-fit: cover;
    object-position: right 20%;
  }

  .info-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;

    width: 580px;

    padding: $space-m;

    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);

    font-size: 1.2rem;

    ul {
      display: flex;
      flex-direction: column;
      gap: 15px;
      height: 100%;

      .vote {
        margin-top: auto;
        color: transparent;
        width: fit-content;

        margin-top: auto;
        font-size: 2rem;
      }

      .overview {
        font-style: italic;

        display: -webkit-box;
        //   max-width: 200px;
        -webkit-line-clamp: 7;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      //   .lang {
      //     // margin-top: auto;
      //   }
    }
  }
}
p {
  font-style: italic;
  filter: brightness(0.6);
  max-width: 940px;
  margin-top: $space-m;

  > span:not(:last-child)::after {
    content: ", ";
  }
}

h2 {
  margin-top: calc($space-m * 2);
}

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
</style>
