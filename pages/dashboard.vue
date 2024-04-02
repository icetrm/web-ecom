<script>
import { mapGetters } from "vuex";
export default {
  props: {},
  components: {},
  data() {
    return {
      isLoading: false,
      dialog: false,
      form: {
        title: 'Add Category',
        name: ''
      },
      headers: [
        {
          text: 'Category',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Actions', align: 'end', value: 'actions', sortable: false },
      ]
    };
  },
  computed: {
    ...mapGetters({
      categories: "category/getCategories",
    }),
  },
  mounted() {
    this.fetchCategories()
  },
  methods: {
    async fetchCategories() {
      try {
        this.isLoading = true;
        await this.$store.dispatch("category/FetchCategories", {});

      } catch (error) {
        console.log("[Fetch] Get Categories failure", error);
      } finally {
        this.isLoading = false;
      }
    },
    async saveCategories() {
      try {
        this.isLoading = true;
        const body = { name: this.form.name }
        await this.$store.dispatch("category/SaveCategories", body);

      } catch (error) {
        console.log("[Save] Save Categories failure", error);
      } finally {
        this.isLoading = false;
      }
    },
    close() {
      this.dialog = false
      // this.$nextTick(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem)
      //   this.editedIndex = -1
      // })
    },
    save() {
      // if (this.editedIndex > -1) {
      //   Object.assign(this.desserts[this.editedIndex], this.editedItem)
      // } else {
      //   this.desserts.push(this.editedItem)
      // }
      this.saveCategories()
      this.close()
    },
    editItem (item) {
        // this.editedIndex = this.desserts.indexOf(item)
        // this.editedItem = Object.assign({}, item)
        // this.dialog = true
      },

      deleteItem (item) {
        // this.editedIndex = this.desserts.indexOf(item)
        // this.editedItem = Object.assign({}, item)
        // this.dialogDelete = true
      },
  },
};
</script>

<template>
  <div class="dashboard-page">
    <div class="top-wrapper">
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="create-btn-wrapper" color="primary" v-bind="attrs" v-on="on">
            New Item
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ form.title }}</span>
          </v-card-title>

          <v-card-text v-if="dialog && isLoading">
            Please stand by
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>

          <v-card-text v-else>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field v-model="form.name" label="Name"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="close">
              Cancel
            </v-btn>
            <v-btn color="primary" text @click="save">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-data-table :headers="headers" :items="categories" :items-per-page="-1" :loading="isLoading"
      loading-text="Loading... Please wait" class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.dashboard-page {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  .top-wrapper {
    display: flex;
    justify-content: end;

    .create-btn-wrapper {
      margin: 1rem 0;
      width: 150px;
      height: 50px;
      font-size: large;
    }
  }

}
</style>
