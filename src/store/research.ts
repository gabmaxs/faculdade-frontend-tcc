import { v4 as uuidv4 } from 'uuid'

export default {
    state: {
      ingredientList: [{name:"", quantity: null, measure: '', uuid: uuidv4(), dirty: false}],
      options: {category: null, min_time: null, max_time: null}
    },
    mutations: {
      setList(state, payload) {
        state.ingredientList = payload
      },
      resetStore(state) {
        state.ingredientList = [{name:"", quantity: null, measure: '', uuid: uuidv4(), dirty: false}]
      },
      setIngredient(state, payload) {
        payload.uuid = uuidv4()
          state.ingredientList.push(payload)
      },
      removeIngredient(state, payload) {
        const newList = state.ingredientList.filter(item => item.uuid != payload)
        state.ingredientList = newList
      },
      setOptions(state, payload) {
        state.options = payload
      }
    },
    actions: {
    },
    getters: {
      getList: state => state.ingredientList,
      getListQuantity: state => state.ingredientList.length,
      getOptions: state => state.options
    }
  }