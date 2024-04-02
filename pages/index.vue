<script>
import FormLogin from "~/components/FormLogin";

export default {
  layout: "login",
  components: {
    FormLogin,
  },
  data() {
    return {
      isLoading: false,
      loginErrorMessage: "",
    };
  },
  computed: {},
  methods: {
    async onLogin({ username, password }) {
      try {
        this.isLoading = true;
        this.loginErrorMessage = "";
        await this.$store.dispatch("auth/Login", { username, password });
        this.$router.push("/dashboard");
      } catch (error) {
        this.loginErrorMessage = "Invalid username or password.";
      } finally {
        this.isLoading = false;
      }
    },
    handleClickTab(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<template>
  <div class="login-page">

    <header class="title">E-COM</header>
    <section class="content">
      <form-login
        :is-loading="isLoading"
        :error-message="loginErrorMessage"
        @login="onLogin"
      />
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import "~assets/styles/variables";

.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5vh;
  background-color: $colorWhite;
  .yamaha-logo-wrapper {
    max-width: 320px;
  }
  .title {
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    color: $colorPrimary;
    margin-bottom: 30px;
    font-weight: 600;
  }
  .content {
    width: 350px;
    display: flex;
    justify-content: center;
  }
}
</style>
