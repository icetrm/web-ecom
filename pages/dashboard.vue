<script>
import { mapGetters } from "vuex";
export default {
  props: {},
  components: {},
  data() {
    return {
      headers: [
        {
          text: 'Category',
          align: 'start',
          sortable: false,
          value: 'name',
        }
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
        await this.$store.dispatch("category/FetchCategories", {});

      } catch (error) {
        console.log("[Fetch] Get api Categories failure", error);
      }
    },
  },
};
</script>

<template>
  <div class="dashboard-page">
    <v-data-table :headers="headers" :items="categories" :items-per-page="-1" class="elevation-1"></v-data-table>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-page {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}
</style>
