import axios from 'axios'
import { API_URL } from "@/API_URL"

function searchRecipes(ingredients: string[], page = 1) {
  return axios.get(`${API_URL}/recipe?page=${page}`, {
    params: {
      ingredients: ingredients
    },
    headers: {
      Accept: "application/json"
    }
  })
}

function getRecipe(recipeId: number) {
  return axios.get(`${API_URL}/recipe/${recipeId}`, {
    headers: {
      Accept: "application/json"
    }
  })
}

const recipeService = {
  searchRecipes,
  getRecipe
}

export default recipeService