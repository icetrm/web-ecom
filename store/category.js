export const state = () => ({
    categories: []
})

export const mutations = {
    SET_CATEGORIES(state, categories) {
        state.categories = categories
    }
}

export const actions = {
    async FetchCategories({ commit }) {
        try {
            const uri = `/api/category`
            const { data } = await this.$axios.$get(uri)
            commit('SET_CATEGORIES', data)
        } catch (error) {
            throw error
        }
    },
    async SaveCategories({ commit, dispatch }, item) {
        try {
            const uri = `/api/category`
            const {id, name} = item
            if(id) {
                await this.$axios.$put(uri, { id, name})
            } else {
                await this.$axios.$post(uri, { name})
            }
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
    }
}

export const getters = {
    getCategories(state) {
        return state.categories
    }
}
