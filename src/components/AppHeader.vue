<script>
import { store } from "../store/index.js";
import AppLogo from "./AppLogo.vue";

export default {
  data() {
    return {
      store,
    };
  },

  components: {
    AppLogo,
  },

  methods: {
    searchFilms(text) {
      store.tmdbQuary = text;
      store.fetchFilms();
    },

    handleClickHome() {
      store.filter.serie = false;
      store.filter.movie = false;
      store.tmdbQuary = "";
    },

    handleClickSerie() {
      store.filter.serie = true;
      store.filter.movie = false;
    },

    handleClickMovie() {
      store.filter.serie = false;
      store.filter.movie = true;
    },
  },
};
</script>

<template>
  <header class="container">
    <div class="menu">
      <app-logo class="logo" />
      <div @click="handleClickHome()" class="menu-opt" :class="!store.filter.serie && !store.filter.movie ? 'active' : ''">Home</div>
      <div @click="handleClickSerie()" class="menu-opt" :class="store.filter.serie ? 'active' : ''">Serie Tv</div>
      <div @click="handleClickMovie()" class="menu-opt" :class="store.filter.movie ? 'active' : ''">Film</div>
    </div>
    <search-bar @searching="searchFilms" class="searchbar" />
  </header>
</template>

<style lang="scss" scoped>
header {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;

  .menu {
    display: flex;
    align-items: center;
    gap: 30px;
    height: 100%;
    font-size: 1.2rem;
    .logo {
      margin-right: 20px;
    }

    .menu-opt {
      color: #575757;
      cursor: pointer;
      // height: 100%;
      line-height: 50px;

      &.active {
        color: white;
        box-shadow: 0 5px 0 white;
      }
    }
  }
}
</style>
