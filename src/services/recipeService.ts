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

function sendRecipe(recipe: any, token: string) {
  const formData = new FormData()
  formData.append("image",recipe.image)
  formData.append("recipe",JSON.stringify({
    name: recipe.name,
    category_id: recipe.category_id,
    number_of_servings: recipe.number_of_servings,
    cooking_time: recipe.cooking_time,
    how_to_cook: recipe.how_to_cook,
    list_of_ingredients: recipe.list_of_ingredients
  }))
  console.log(formData)

  return axios.post(`${API_URL}/recipe`, formData, {
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
      "Content-Type": 'application/json'
    }
  })
}

const recipeService = {
  searchRecipes,
  getRecipe,
  sendRecipe
}

export default recipeService