import axios from 'axios'
import { handleResponse } from '@/helpers'
import { API_URL } from "@/API_URL"

function login() {
    return handleResponse(axios.get(`${API_URL}/auth/login`, {
      headers: {
        Accept: "application/json",
        ContentType: "application/json"
      }
    }))
  }

const userService = {
    login
}

export default userService