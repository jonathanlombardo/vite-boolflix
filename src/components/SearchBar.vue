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
  <input type="text" v-model="searchText" @input="submit()" />
</template>

<style lang="scss" scoped></style>
