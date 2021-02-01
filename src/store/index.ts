import { createStore } from 'vuex'

const user = localStorage.getItem('user')

export default createStore({
  state: {
    user: user ? JSON.parse(user) : {}
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      localStorage.setItem("user", JSON.stringify(payload))
    },
    removeUser(state) {
      state.user = {}
      localStorage.removeItem("user")
    }
  },
  actions: {
  },
  getters: {
    isTheUserLoggedIn: state => !!state.user.token,
    getUser: state => state.user,
    getToken: state => state.user.token
  }
})
