<script>
export default {
  data() {
    return {
      searchText: "",
    };
  },

  emits: ["searching"],

  methods: {
    submit() {
      this.$emit("searching", this.searchText);
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <font-awesome-icon class="icon" :icon="['fas', 'magnifying-glass']" />
    <input type="text" v-model="searchText" @input="submit()" placeholder="Search.." />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: flex-end;
}
.icon {
  margin-left: 20px;
  border-bottom: 2px solid #575757;
  padding-bottom: 5px;
  padding-right: 0.5rem;
  color: #575757;
  // height: 100%;
}

input {
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #575757;
  margin-right: 20px;
  padding-bottom: 2px;
  font-size: inherit;
  color: inherit;

  &:focus-visible {
    outline: none;
  }
}
</style>
