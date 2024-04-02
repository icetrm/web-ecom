export const state = () => ({
    categories: []
})

export const mutations = {
    SET_CATEGORIES(state, categories) {
        state.categories = categories
    }
}

export const actions = {
    async FetchCategories({ commit }, { }) {
        try {
            const uri = `/api/category`
            const { data } = await this.$axios.$get(uri)
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
