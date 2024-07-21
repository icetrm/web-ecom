<script>
import { mapGetters } from "vuex";
export default {
    props: {},
    components: {},
    async asyncData({ params }) {
        const category = params.category
        return { category }
    },
    data() {
        return {
            isLoading: false,
            dialog: false,
            dialogDelete: false,
            isEdit: false,
            dailogForm: {
                title: 'Add Product',
                item: {
                    id: null,
                    title: "",
                    description: "",
                    price: 0.0,
                    discountPercentage: 0.0,
                    rating: 0.0,
                    stock: 0,
                    brand: "",
                    categoryID: this.category
                }
            },
            headers: [
                {
                    text: 'Title',
                    align: 'start',
                    sortable: false,
                    value: 'title',
                },
                {
                    text: 'Description',
                    align: 'start',
                    sortable: false,
                    value: 'description',
                },
                {
                    text: 'Price',
                    align: 'start',
                    sortable: false,
                    value: 'price',
                },
                {
                    text: 'Discount(%)',
                    align: 'start',
                    sortable: false,
                    value: 'discountPercentage',
                },
                {
                    text: 'Rating',
                    align: 'start',
                    sortable: false,
                    value: 'rating',
                },
                {
                    text: 'Stock',
                    align: 'start',
                    sortable: false,
                    value: 'stock',
                },
                {
                    text: 'Brand',
                    align: 'start',
                    sortable: false,
                    value: 'brand',
                },
                { text: 'Actions', align: 'end', value: 'actions', sortable: false },
            ],
        };
    },
    computed: {
        ...mapGetters({
            products: "product/getProductByCategory",
            categories: "category/getCategories",
        }),
    },
    mounted() {
        if (this.category) {
            this.fetchProductByCategories(this.category)
        }
    },
    watch: {
        isEdit(value) {
            console.log(value)
            this.dailogForm.title = value ? 'Edit Product' : 'Add Product'
        }
    },
    methods: {
        initialData() {
            this.isEdit = false
            this.dailogForm.item = {
                id: null,
                title: "",
                description: "",
                price: 0.0,
                discountPercentage: 0.0,
                rating: 0.0,
                stock: 0,
                brand: "",
                categoryID: this.category
            }
        },
        async fetchProductByCategories(id) {
            try {
                this.isLoading = true;
                await this.$store.dispatch("product/FetchProductByCategories", id);

            } catch (error) {
                console.log("[Fetch] Fetch Product failure", error);
            } finally {
                this.isLoading = false;
            }
        },
        async saveProduct() {
            try {
                this.isLoading = true;
                const { item } = this.dailogForm;
                await this.$store.dispatch("product/SaveProduct", item);

            } catch (error) {
                console.log("[Save] Save Product failure", error);
            } finally {
                this.isLoading = false;
            }
        },
        async deleteProduct() {
            try {
                this.isLoading = true;
                const { id } = this.dailogForm.item
                await this.$store.dispatch("product/DeleteProduct", id);

            } catch (error) {
                console.log("[Delete] Delete Product failure", error);
            } finally {
                this.isLoading = false;
            }
        },
        editItem(item) {
            this.isEdit = true
            this.dailogForm.item = { ...item }
            this.dialog = true
        },
        deleteItem(item) {
            this.dailogForm.item = { ...item }
            this.dialogDelete = true
        },
        close() {
            this.dialog = false
            this.initialData()
        },
        save() {
            this.saveProduct()
            this.close()
        },
        deleteItemConfirm() {
            this.deleteProduct()
            this.closeDelete()
        },
        closeDelete() {
            this.dialogDelete = false
            this.initialData()
        },
    }
}
</script>

<template>
    <div class="category-page">
        {{ categories ? categories?.find(x => x.id == category)?.name ?? '' : '' }}
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
                                    <v-text-field v-model="dailogForm.item.title" label="Title"></v-text-field>
                                    <v-text-field v-model="dailogForm.item.description"
                                        label="Description"></v-text-field>
                                    <v-text-field v-model="dailogForm.item.price" label="Price" value="10.00"
                                        prefix="฿"></v-text-field>
                                    <v-text-field v-model="dailogForm.item.discountPercentage" label="Discount(%)"
                                        value="10.00" suffix="%"></v-text-field>
                                    <v-text-field v-model="dailogForm.item.rating" label="Rating" value="10.00"
                                        prefix=""></v-text-field>
                                    <v-text-field v-model="dailogForm.item.stock" label="Stock" value="10.00"
                                        prefix=""></v-text-field>
                                    <v-text-field v-model="dailogForm.item.brand" label="Brand"></v-text-field>
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
            <v-dialog persistent v-model="dialogDelete" max-width="500px">
                <v-card>
                    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
        <v-data-table :headers="headers" :items="products" :items-per-page="-1" :loading="isLoading"
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

.category-page {
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
