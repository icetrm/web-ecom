<script>
import { mapGetters } from "vuex";
export default {
  props: {},
  components: {},
  data() {
    return {
      isLoading: false,
      dialog: false,
      dialogDelete: false,
      isEdit: false,
      dailogForm: {
        title: 'Add Category',
        item: {
          id: null,
          name: ''
        }
      },
      headers: [
        {
          text: 'Category',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Actions', align: 'end', value: 'actions', sortable: false },
      ],
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
  watch: {
    isEdit(value) {
      this.dailogForm.title = value ? 'Edit Category' : 'Add Category'
    }
  },
  methods: {
    initialData() {
      this.isEdit = false
      this.dailogForm.item = {
        id: null,
        name: ''
      }
    },
    async fetchCategories() {
      try {
        this.isLoading = true;
        await this.$store.dispatch("category/FetchCategories");

      } catch (error) {
        console.log("[Fetch] Get Categories failure", error);
      } finally {
        this.isLoading = false;
      }
    },
    async saveCategories() {
      try {
        this.isLoading = true;
        const { item } = this.dailogForm;
        await this.$store.dispatch("category/SaveCategories", item);

      } catch (error) {
        console.log("[Save] Save Categories failure", error);
      } finally {
        this.isLoading = false;
      }
    },
    // async deleteCategories() {
    //   try {
    //     this.isLoading = true;
    //     const { id } = this.dailogForm.item
    //     await this.$store.dispatch("category/DeleteCategories", id);

    //   } catch (error) {
    //     console.log("[Delete] Delete Categories failure", error);
    //   } finally {
    //     this.isLoading = false;
    //   }
    // },
    close() {
      this.dialog = false
      this.initialData()
    },
    save() {
      this.saveCategories()
      this.close()
    },
    editItem(item) {
      this.isEdit = true
      this.dailogForm.item = { ...item }
      // this.editedIndex = this.desserts.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    onSelectCategory(category) {
      const { id } = category
      this.$router.push(`/category/${id}`);
    }
  }
}
</script>

<template>
  <div class="dashboard-page">
    <div class="top-wrapper">
      <v-dialog persistent v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="create-btn-wrapper" color="primary" v-bind="attrs" v-on="on">
            New Item
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ dailogForm.title }}</span>
          </v-card-title>

          <v-card-text v-if="dialog && isLoading">
            Please stand by
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>

          <v-card-text v-else>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field v-model="dailogForm.item.name" label="Name"></v-text-field>
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
    <v-col v-for="(category, i) in categories" :key="i" cols="12">
      <v-card class="v-card-category-list" @click="onSelectCategory(category)">
        <v-card-title class="v-card-title-wrapper">
          {{ category.name }}
          <div>
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
          </div>
        </v-card-title>

        <v-card-subtitle>
        </v-card-subtitle>

      </v-card>
    </v-col>
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

  .v-card-category-list {

    .v-card-title-wrapper {
      display: flex;
      justify-content: space-between;

    }

  }


}
</style>
