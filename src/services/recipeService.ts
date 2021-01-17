import axios from 'axios'
import { handleResponse } from '@/helpers'

function searchRecipes(ingredients: string[], page = 1) {
  return handleResponse(axios.get(`http://tcc.test/api/recipe?page=${page}`, {
    params: {
      ingredients: ingredients
    },
    headers: {
      Accept: "application/json"
    }
  }))
}

const recipeService = {
  searchRecipes
}

export default recipeService