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
  <v-form ref="formData" class="form-login">
    <v-text-field v-model="formData.username" label="username" required @input="" @blur=""></v-text-field>
    <v-text-field v-model="formData.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'" name="input-10-1" label="password"
      @click:append="show1 = !show1"></v-text-field>

    <v-btn block class="mr-4" @click="onSubmitForm">
      submit
    </v-btn>
  </v-form>
</template>

<style lang="scss" scoped>
@import "~assets/styles/variables";

.form-login {
  width: 100%;
  background-color: $colorWhite;

  .button-login {
    width: 100%;
  }

}
</style>
