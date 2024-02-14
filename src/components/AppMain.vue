<script>
// import MyComp from './components/MyComp.vue';
import { store } from "../store/index.js";

export default {
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <div v-for="film in store.foundedFilms" class="card">
    <ul>
      <li>{{ film.title }}</li>
      <li>{{ film.original_title }}</li>
      <li>{{ film.original_language }}</li>
      <li>{{ film.vote_average }}</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.card {
  border: 1px solid black;
}
</style>
