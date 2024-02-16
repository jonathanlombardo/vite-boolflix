<script>
// import MyComp from './components/MyComp.vue';
import { store } from "../store/index.js";

export default {
  data() {
    return {
      store,
    };
  },

  emits: ["resetHome"],

  methods: {
    handleClickHome() {
      this.$emit("resetHome");
    },

    handleClickAll() {
      store.filter.serie = false;
      store.filter.movie = false;
    },

    handleClickSerie() {
      store.filter.serie = true;
      store.filter.movie = false;
    },

    handleClickMovie() {
      store.filter.serie = false;
      store.filter.movie = true;
    },

    handleClickGenre() {
      store.filter.showGenres = !store.filter.showGenres;
    },
  },

  components: {},
};
</script>

<template>
  <div @click="handleClickHome()" class="menu-opt always-active">Home</div>
  <div @click="handleClickGenre()" class="menu-opt always-active">Generi <font-awesome-icon :icon="store.filter.showGenres ? 'angle-up' : 'angle-down'" /></div>
  <div @click="handleClickAll()" class="menu-opt" :class="!store.filter.serie && !store.filter.movie ? 'active' : ''">Film e Serie</div>
  <div @click="handleClickSerie()" class="menu-opt" :class="store.filter.serie ? 'active' : ''">Serie Tv</div>
  <div @click="handleClickMovie()" class="menu-opt" :class="store.filter.movie ? 'active' : ''">Film</div>
</template>

<style lang="scss" scoped>
.menu-opt {
  color: #575757;
  cursor: pointer;
  line-height: 50px;

  display: flex;
  align-items: center;
  gap: 1ch;

  &.active {
    color: white;
    box-shadow: 0 5px 0 white;
  }

  &.always-active {
    color: white;
  }
}
</style>
