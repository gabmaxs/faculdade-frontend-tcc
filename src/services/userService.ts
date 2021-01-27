import axios from 'axios'
import { handleResponse } from '@/helpers'
import { API_URL } from "@/API_URL"

function login(user: any) {
  return handleResponse(axios.post(`${API_URL}/auth/login`, JSON.stringify(user), {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  }))
}

const userService = {
    login
}

export default userService