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


async function sendRecipeImage({id},{image}, token: string) {
  console.log("salvando imagem...")
  const formData = new FormData()
  formData.append("image", image)

  return axios.post(`${API_URL}/recipe/${id}/image`, formData, {
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
}

function sendRecipe(recipe: any, token) {
  return axios.post(`${API_URL}/recipe`, JSON.stringify(recipe), {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
}

async function saveRecipe(recipe: any, token: string) {
  const response = await sendRecipe(recipe, token)

  console.log("obj", {recipe, ...response.data.data})
  
  if(response.status === 201) await sendRecipeImage(response.data.data, recipe, token)

  return response
}

const recipeService = {
  searchRecipes,
  getRecipe,
  saveRecipe
}

export default recipeService