import axios from 'axios'
import { handleResponse } from '@/helpers'
import { API_URL } from "@/API_URL"

function getCategoryById(categoryId: number) {
    return handleResponse(axios.get(`${API_URL}/category/${categoryId}`, {
      headers: {
        Accept: "application/json"
      }
    }))
  }

const categoryService = {
    getCategoryById
}

export default categoryService