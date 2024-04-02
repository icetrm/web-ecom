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
  <!-- <el-container id="app-container">
    <el-header height="50px">
      <app-header :username="username" is-logged-in />
    </el-header>
    <el-container class="layout-container">
      <el-aside :width="sidebarWidth">
        <app-side-menu
          :is-collapse="isCollapse"
          :list="
            userInfo.formType ? sideMenu.filter((x) =>
              x.type && userInfo.formType ? x.type.toUpperCase() == userInfo.formType.toUpperCase() : true
            ) : []
          "
        />
      </el-aside>
      <el-container :style="{ 'margin-left': sidebarWidth }">
        <el-main>
          <app-content>
            <nuxt />
          </app-content>
        </el-main>
        <el-footer height="30px">
          <app-footer />
        </el-footer>
      </el-container>
    </el-container>
  </el-container> -->
  <v-app class="layout-container">

    <v-app-bar app>
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

  .el-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: #a52a2a;
    color: $colorFontLight;
  }

  .el-footer {
    background-color: rgba(0, 0, 0, 0.04);
    color: $colorFontDark;
    text-align: center;
  }

  .el-aside {
    transition: width 0.3s, left 0.3s;
    position: fixed;
    top: $heightHeader;
    bottom: 0;
    left: 0;
    z-index: 600;
    background-color: rgba(0, 0, 0, 0.04);
    box-shadow: inset -1px 0 0 $colorBorder;
    color: $colorFontDark;
  }

  .el-main {
    background-color: $colorWhite;
    color: $colorFontDark;
    padding: 15px;
  }
}
</style>
