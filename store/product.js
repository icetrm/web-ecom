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
    async SaveProduct({ commit, dispatch, state }, item) {
        try {
            const uri = `/api/product`
            const { id } = item
            if(id) {
                await this.$axios.$put(uri, { id, ...item })
            } else {
                await this.$axios.$post(uri, { ...item })
            }
            dispatch('FetchProductByCategories', state.categoryID )
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
