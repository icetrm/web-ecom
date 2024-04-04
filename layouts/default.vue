<script>
import { mapGetters } from "vuex";
import AppFooter from "~/components/AppFooter";
import AppContent from "~/components/AppContent";

export default {
  components: {
  },
  middleware: ["visit", "authz"],
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
  },
  methods: {
    onClickMenu(menu) {
      const { link } = menu
      this.$router.push(link);
    },
    async onSignOutClicked() {
      await this.$store.dispatch("auth/Logout");
      this.$router.push("/");
    }
  }
};
</script>

<template>
  <v-app>
    <v-app-bar app color="primary" height="70px">
      <app-header :username="username" is-logged-in />
    </v-app-bar>

    <v-main>

      <v-container fluid>
        <div class="app-container">
          <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent>
            <v-list-item :style="{ justifyContent: mini ? `center` : `flex-end` }">
              <v-list-item-avatar>
                <avatar :name="username" />
              </v-list-item-avatar>

              <v-list-item-title>{{ username }}</v-list-item-title>

              <v-btn icon @click.stop="mini = !mini">
                <v-icon>{{ mini ? `mdi-chevron-right` : `mdi-chevron-left` }}</v-icon>
              </v-btn>
            </v-list-item>
            <v-list-item :style="{ display: mini ? `none` : `block` }">
              <v-btn rounded block height="20px" color="error" @click="onSignOutClicked">
                Logout
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

  .user-wrapper {
    align-items: center;
  }

  .nuxt-wrappet {
    flex: 1 1 auto;
    flex-direction: column;
    padding: 1rem;
  }
}
</style>
