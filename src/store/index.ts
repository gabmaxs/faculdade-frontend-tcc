import { createStore } from 'vuex'

const user = localStorage.getItem('loggedUser')

export default createStore({
  state: {
    user: user ? JSON.parse(user) : {}
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
  },
  getters: {
    isTheUserLoggedIn: state => !!state.user.access_token,
    getUser: state => state.user,
    getToken: state => state.user.access_token
  }
})
