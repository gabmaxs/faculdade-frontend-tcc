import recipeService from './recipeService'
import categoryService from './categoryService'
import userService from './userService'

import axios from 'axios'
import store from '@/store'

axios.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
        if(error.response.status == 403 && store.getters.isTheUserLoggedIn) {
            store.commit("removeUser")
            error.response.data.message = "Sessão expirada!"
        }
        throw error
    }
)

export { recipeService, categoryService, userService }