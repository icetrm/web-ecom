<script>

export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      formData: {
        username: "",
        password: "",
      },
      show1: false,
    };
  },
  computed: {
    isAllowSubmit() {
      const { username, password } = this.formData;
      return username === "" || password === "";
    },
  },
  watch: {
    errorMessage(value) {
    },
  },
  methods: {
    onSubmitForm() {
      const { username, password } = this.formData;
      this.$emit("login", { username, password });
    },
    clearPasswordField() {
      this.$refs.formPassword.resetField();
    },
  },
};
</script>

<template>
  <div class="form-login">
    <v-card elevation="2" class="card-wrapper">
      <v-form ref="formData">
        <v-text-field v-model="formData.username" label="username" required @input="" @blur=""></v-text-field>
        <v-text-field v-model="formData.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'" name="input-10-1" label="password"
          @click:append="show1 = !show1"></v-text-field>
      </v-form>
      <v-btn block color="primary" @click="onSubmitForm">
        Login
      </v-btn>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
@import "~assets/styles/variables";

.form-login {
  width: 100%;
  
  .card-wrapper {
    padding: 1rem;
  }
}
</style>
