export const state = () => ({
    categories: []
})

export const mutations = {
    SET_CATEGORIES(state, categories) {
        state.categories = categories.map((item) => {
            return { 'name': item }
        })
    }
}

export const actions = {
    async FetchCategories({ commit }, { }) {
        try {
            const uri = `https://dummyjson.com/products/categories`
            const data = await this.$axios.$get(uri, {
                headers: {}
            });

            commit('SET_CATEGORIES', data)
        } catch (error) {
            throw error
        }
    },
}

export const getters = {
    getCategories(state) {
        return state.categories
    },
}
