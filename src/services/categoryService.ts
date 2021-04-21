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

async function getCategoryName(categoryId: number) {
    try {
        const {data} = await getCategoryById(categoryId)
        return data.data.name
    }
    catch(e) {
        console.log(e)
        return ""
    }
}

const categoryService = {
    getCategoryById,
    getCategories,
    getCategoryName
}

export default categoryService