const user = localStorage.getItem('user')

export default {
    state: {
      user: user ? JSON.parse(user) : {},
      likedRecipes: []
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
  }