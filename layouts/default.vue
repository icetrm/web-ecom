<script>
import { mapGetters } from "vuex";
import ResizeMixin from "~/scripts/mixins/resizeHandler";
// import AppHeader from "~/components/AppHeader";
import AppFooter from "~/components/AppFooter";
import AppContent from "~/components/AppContent";
// import AppSideMenu from "~/components/AppSideMenu";

export default {
  components: {
  },
  middleware: ["visit", "authz"],
  mixins: [ResizeMixin],
  data() {
    return {
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Photos', icon: 'mdi-image' },
        { title: 'About', icon: 'mdi-help-box' },
      ],
    }
  },
  computed: {
    ...mapGetters({
      // sideMenu: "menu/getSideMenu",
      // isCollapse: "menu/isCollapseSidebar",
      username: "auth/getUsername",
      // userInfo: "auth/getUserInfo",
    }),
    sidebarWidth() {
      return this.isCollapse ? "64px" : "220px";
    },
  },
};
</script>

<template>
  <v-app class="layout-container">

    <v-app-bar app color="primary">
      <app-header :username="username" is-logged-in />
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <app-content>
          <nuxt />
        </app-content>
      </v-container>
    </v-main>

    <v-footer app>
      <app-footer />
    </v-footer>
  </v-app>
</template>

<style lang="scss">
@import "~assets/styles/variables";
$heightHeader: 50px;

.app-container {
  flex: 1 1 auto;
  min-height: 100vh;

  .layout-container {
    margin-top: $heightHeader;
  }

}
</style>
