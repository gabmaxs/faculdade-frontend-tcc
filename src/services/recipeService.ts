import axios from 'axios'
import { API_URL } from "@/API_URL"

function searchRecipes(ingredients: string[], {page = 1, category, min_time, max_time}) {
  return axios.get(`${API_URL}/recipe?page=${page}`, {
    params: {
      ingredients: ingredients,
      category,
      min_time,
      max_time
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

function saveRecipe(recipe: any, token) {
  return axios.post(`${API_URL}/recipe`, JSON.stringify(recipe), {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
}

function getMeasure() {
  return axios.get(`${API_URL}/measure`, {
    headers: {
      Accept: "application/json"
    }
  })
}

const recipeService = {
  searchRecipes,
  getRecipe,
  saveRecipe,
  getMeasure
}

export default recipeService