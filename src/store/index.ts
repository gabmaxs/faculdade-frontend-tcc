import { createStore } from 'vuex'
import User from "./user"
import Research from "./research"

export default createStore({
  modules: {
    User,
    Research
  }
})
