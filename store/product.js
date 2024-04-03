export const state = () => ({
    productByCategory: [],
    categoryID: null
})

export const mutations = {
    SET_CATEGORY_ID(state, id) {
        state.categoryID = id
    },
    SET_PRODUCTBYCATEGORIES(state, product) {
        state.productByCategory = product
    }
}

export const actions = {
    async FetchProductByCategories({ commit }, id) {
        try {
            const uri = `/api/product/${id}`
            const { data } = await this.$axios.$get(uri)
            commit('SET_PRODUCTBYCATEGORIES', data)
            commit('SET_CATEGORY_ID', id)
        } catch (error) {
            throw error
        }
    },
    async DeleteProduct({ commit, dispatch, state }, id) {
        try {
            const uri = `/api/product?id=${id}`
            await this.$axios.$delete(uri)
            dispatch('FetchProductByCategories', state.categoryID )
        } catch (error) {
            throw error
        }
    }
}

export const getters = {
    getProductByCategory(state) {
        return state.productByCategory
    }
}
