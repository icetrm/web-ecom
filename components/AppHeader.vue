<script>
export default {
  components: {},
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
    username: {
      type: String,
      default: "Guest",
    },
  },
  methods: {},
};
</script>

<template>
  <header :class="{ '--user-header': isLoggedIn }" class="app-header">
    <template v-if="isLoggedIn" class="top-wrapper">
      <header class="title">E-COM</header>
    </template>
    <template v-else>
    </template>
  </header>
</template>

<style lang="scss">
@import "~assets/styles/variables";

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: $colorWhite;

  .top-wrapper {

    .title {
      margin: 0 0 0 1rem;
    }
  }


  @include relative;
}
</style>
