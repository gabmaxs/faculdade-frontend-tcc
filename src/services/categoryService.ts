import axios from 'axios'
import { API_URL } from "@/API_URL"

function getCategoryById(categoryId: number) {
    return axios.get(`${API_URL}/category/${categoryId}`, {
      headers: {
        Accept: "application/json"
      }
    })
  }

const categoryService = {
    getCategoryById
}

export default categoryService