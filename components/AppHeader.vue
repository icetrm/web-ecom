<script>
import Avatar from "~/components/Avatar";

export default {
  components: {
    Avatar,
  },
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
  methods: {
    async onSignOutClicked() {
      await this.$store.dispatch("auth/Logout");
      this.$router.push("/");
    },
  },
};
</script>

<template>
  <header :class="{ '--user-header': isLoggedIn }" class="app-header">
    <template v-if="isLoggedIn">
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
  justify-content: center;

  .title {
    margin: 0 0 0 1rem;
  }

  @include relative;
}
</style>
