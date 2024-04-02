export const state = () => ({
    categories: [],
    categorie: {}
})

export const mutations = {
    SET_CATEGORIES(state, categories) {
        console.log("SET_CATEGORIES")
        state.categories = categories
    }
}

export const actions = {
    async SaveCategories({ commit, dispatch }, { name }) {
        try {
            const uri = `/api/category`
            const body = { name }
            await this.$axios.$post(uri, body)
            dispatch('FetchCategories')
        } catch (error) {
            throw error
        }
    },
    async DeleteCategories({ commit, dispatch }, id) {
        try {
            const uri = `/api/category?id=${id}`
            await this.$axios.$delete(uri)
            dispatch('FetchCategories')
        } catch (error) {
            throw error
        }
    },
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
