<script>
import { mapGetters } from "vuex";
// import ResizeMixin from "~/scripts/mixins/resizeHandler";
import AppFooter from "~/components/AppFooter";
import AppContent from "~/components/AppContent";

export default {
  components: {
  },
  middleware: ["visit", "authz"],
  // mixins: [ResizeMixin],
  data() {
    return {
      drawer: true,
      mini: true,
    }
  },
  computed: {
    ...mapGetters({
      menus: "menu/getSideMenu",
      username: "auth/getUsername",
    }),
    // sidebarWidth() {
    //   return this.isCollapse ? "64px" : "220px";
    // },
  },
  methods: {
    onClickMenu(menu) {
      const { link } = menu
      this.$router.push(link);
    }
  }
};
</script>

<template>
  <v-app class="app-container">

    <v-app-bar app color="primary" height="70px">
      <app-header :username="username" is-logged-in />
    </v-app-bar>

    <v-main>

      <v-container fluid>
        <div class="app-container">
          <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent>
            <v-list-item class="px-2">
              <v-btn icon @click.stop="mini = !mini">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense>
              <v-list-item v-for="item in menus" :key="item.title" link @click="onClickMenu(item)">
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
          <app-content>
            <div class="nuxt-wrappet">
              <nuxt />
            </div>
          </app-content>
        </div>
        <!-- <app-content>
          <div class="app-container">
            <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent>
            <v-list-item class="px-2">
              <v-btn icon @click.stop="mini = !mini">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense>
              <v-list-item v-for="item in menus" :key="item.title" link @click="onClickMenu(item)">
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
            <div class="nuxt-wrappet">
              <nuxt />
            </div>
          </div>

        </app-content> -->
      </v-container>
    </v-main>

    <v-footer app>
      <app-footer />
    </v-footer>
  </v-app>
</template>

<style lang="scss">
@import "~assets/styles/variables";

.app-container {
  display: flex;
  flex-direction: row;
  height: 85vh;

  .nuxt-wrappet {
    flex: 1 1 auto;
    flex-direction: column;
    padding: 1rem;
  }
}
</style>
