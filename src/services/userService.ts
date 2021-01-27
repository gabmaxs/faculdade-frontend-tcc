import axios from 'axios'
import { handleResponse } from '@/helpers'
import { API_URL } from "@/API_URL"
import jsonWebTokenService from "jsonwebtoken"
import store from '@/store'

function createUserSession({data}) {
  const token = data.access_token
  const decoded = jsonWebTokenService.decode(token)
  store.commit("setUser",{
    id: decoded.id,
    name: decoded.name,
    email: decoded.email
  })
}

async function login(user: any) {
  const response = await handleResponse(axios.post(`${API_URL}/auth/login`, JSON.stringify(user), {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  }))
  if(response.status === 200) createUserSession(response.data)
  
  return response
}

const userService = {
    login
}

export default userService