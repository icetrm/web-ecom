<script>
import AppHeader from '~/components/AppHeader'
import AppFooter from '~/components/AppFooter'

export default {
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<template>
  <v-container id="login-container">
    <v-main>
      <transition
        name="fade"
        mode="out-in">
        <nuxt/>
      </transition>
    </v-main>
    <v-footer app height="30px">
      <app-footer />
    </v-footer>
  </v-container>
</template>

<style lang="scss">
@import '~assets/styles/variables';

#login-container {
  flex: 1 1 auto;
  min-height: 100vh;

  .el-header {
    background-color: #a52a2a;
    color: $colorFontLight;
  }

  .el-footer {
    background-color: $colorBackground;
    color: $colorFontDark;
    text-align: center;
    border-top: 1px solid $colorBorder;
  }

  .el-main {
    justify-content: center;
    background-color: $colorWhite;
    color: $colorFontDark;
  }
}
</style>
