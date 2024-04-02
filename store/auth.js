import { constant, storageKey } from '../scripts/constants'

export const state = () => ({
  loggedIn: false,
  userInfo: {
    username: 'Guest'
  }
})

export const mutations = {
  SET_LOGIN(state, { isLogin = true, token = '', refreshToken = '' }) {
    state.loggedIn = isLogin;
    if (isLogin) {
      this.$axios.setHeader(constant.authorization, `Bearer ${token}`)
      this.$cookies.set(storageKey.token, token)
      this.$cookies.set(storageKey.refresh, refreshToken)
    } else {
      this.$axios.setHeader(constant.authorization, false)
      this.$cookies.remove(storageKey.token)
      this.$cookies.remove(storageKey.refresh)
      this.$cookies.remove(storageKey.info)
    }
  },
  SET_USER_INFO(state, info) {
    const { authorities, username, companyTh, formType } = info;
    const { role } = authorities[0];
    const data = { role, username, companyTh, formType };
    const encode = JSON.stringify(data);
    state.userInfo = data;
    this.$cookies.set(storageKey.info, encode);
  },
  SET_AUTH_STATE(state, { token, refreshToken, userInfo }) {
    state.loggedIn = token && refreshToken
    state.userInfo = userInfo
  }
}

export const actions = {
  async Login({ commit, dispatch }, { username, password }) {
    try {
      const uri = `/auth/jwt/login`
      const authentication = { username, password }
      const tokens = await this.$axios.$post(uri, authentication)
      commit('SET_LOGIN', tokens)
      dispatch('FetchUserInfo')
    } catch (error) {
      throw error
    }
  },
  async Logout({ commit }) {
    commit('SET_LOGIN', { isLogin: false })
  },
  async RefreshToken({ commit, dispatch }) {
    try {
      const refreshToken = this.$cookies.cookies[storageKey.refresh]
      const uri = `/auth/jwt/refresh`
      const headers = { headers: { Authorization: refreshToken } }
      const tokens = await this.$axios.$post(uri, null, headers)
      const data = { isLogin: true, ...tokens }
      commit('SET_LOGIN', data)
      return data
    } catch (error) {
      dispatch('Logout')
      this.$router.push('/')
      throw error
    }
  },
  async FetchUserInfo({ commit }) {
    try {
      const uri = `/auth/jwt/info`
      const data = await this.$axios.$get(uri)
      commit('SET_USER_INFO', data)
    } catch (error) {
      throw error
    }
  },
  ApplyAuthState({ commit }) {
    const token = this.$cookies.cookies[storageKey.token]
    const refreshToken = this.$cookies.cookies[storageKey.refresh]
    const info = this.$cookies.cookies[storageKey.info]
    const userInfo = info ? JSON.parse(info) : {}
    const data = {
      token,
      refreshToken,
      userInfo
    }
    commit('SET_LOGIN', data)
    commit('SET_AUTH_STATE', data)
  }
}

export const getters = {
  isLogin(state) {
    return state.loggedIn
  },
  getUsername(state) {
    return state.userInfo.username
  },
  getUserInfo(state) {
    return state.userInfo
  }
}
