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
    <template v-if="isLoggedIn" class="top-wrapper">
      <header class="title">E-COM</header>
      <!-- <div class="user-wrapper">
        <avatar :name="username" />
        <span>{{ username }}</span>
      </div> -->
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
    .user-wrapper {
      display: flex;
      align-items: center;
    }

    .title {
      margin: 0 0 0 1rem;
    }
  }


  @include relative;
}
</style>
