import axios from 'axios'
import { handleResponse } from '@/helpers'
import { API_URL } from "@/API_URL"

function searchRecipes(ingredients: string[], page = 1) {
  return handleResponse(axios.get(`${API_URL}/recipe?page=${page}`, {
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