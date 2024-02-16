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
};
</script>

<template>
  <header>
    <div class="container">
      <div class="menu">
        <app-logo class="logo" />
        <slot name="menuOpt"></slot>
      </div>
      <slot name="asideControl"></slot>
    </div>
    <slot name="filterBar"></slot>
  </header>
</template>

<style lang="scss" scoped>
@use "../assets/partials/var" as *;

header {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: $bg-color;
  box-shadow: 0 20px 10px $bg-color;
  font-size: 1.5rem;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;

    .menu {
      display: flex;
      align-items: center;
      gap: 30px;
      height: 100%;
      font-size: 1.2rem;
      .logo {
        margin-right: 20px;
      }
    }
  }
}
</style>
