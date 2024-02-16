<script>
// import MyComp from './components/MyComp.vue';
// import {store} from './store/index.js'

export default {
  data() {
    return {
      // store,
      // ...

      activeIndex: -1,
    };
  },

  props: {
    noFilterString: {
      type: String,
      default: "No Filter",
    },

    options: Array,
  },

  emits: ["filter"],

  methods: {
    handleOptClick(opt, index) {
      this.activeIndex = index;
      this.$emit("filter", opt.id);
    },

    handleNoFilterClick() {
      this.activeIndex = -1;
      this.$emit("filter", false);
    },
  },

  components: {},

  created() {
    // ...
  },
};
</script>

<template>
  <div class="filter-bar container">
    <ul class="">
      <li :class="activeIndex === -1 ? 'active' : ''" @click="handleNoFilterClick()">{{ noFilterString }}</li>
      <li :class="activeIndex === index ? 'active' : ''" v-for="(opt, index) in options" @click="handleOptClick(opt, index)">{{ opt.name }}</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.filter-bar {
  // position: relative;
  // top: -20px;
  font-size: 1.2rem;

  ul {
    list-style: none;

    display: flex;
    gap: 30px;
    overflow-x: auto;
    scrollbar-width: thin;

    li {
      cursor: pointer;
      padding-bottom: 10px;
      padding-top: 10px;
      filter: brightness(0.4);

      text-wrap: nowrap;

      &.active {
        filter: brightness(1);
      }
    }
  }
}
</style>
