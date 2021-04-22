import { createStore, createLogger } from 'vuex'
import User from "./user"
import Research from "./research"

export default createStore({
  modules: {
    User,
    Research
  },
  plugins: [createLogger()]
})
