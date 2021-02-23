import axios from 'axios'
import { API_URL } from "@/API_URL"

function getCategoryById(categoryId: number) {
    return axios.get(`${API_URL}/category/${categoryId}`, {
        headers: {
            Accept: "application/json"
        }
    })
}

function getCategories() {
  return axios.get(`${API_URL}/category`, {
      headers: {
          Accept: "application/json"
      }
  })
}

const categoryService = {
    getCategoryById,
    getCategories
}

export default categoryService