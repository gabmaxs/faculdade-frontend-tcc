export default {
    state: {
      ingredientList: []
    },
    mutations: {
      setList(state, payload) {
        state.ingredientList = payload
      },
      removeList(state) {
        state.list = []
      },
      setIngredient(state, payload) {
          state.ingredientList.push(payload)
      }
    },
    actions: {
    },
    getters: {
      getList: state => state.ingredientList,
      getListQuantity: state => state.ingredientList.length
    }
  }