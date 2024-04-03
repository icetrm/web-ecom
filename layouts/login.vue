<script>
import AppFooter from '~/components/AppFooter'

export default {
  components: {}
}
</script>
<template>
  <v-app class="login-container">
    <v-main>
      <transition name="fade" mode="out-in">
        <v-container fluid>
          <app-content>
            <nuxt />
          </app-content>
        </v-container>
      </transition>
    </v-main>
    <v-footer app>
      <app-footer />
    </v-footer>
  </v-app>
</template>

<style lang="scss">
@import '~assets/styles/variables';

.login-container {
  flex: 1 1 auto;
  min-height: 100vh;
}
</style>
