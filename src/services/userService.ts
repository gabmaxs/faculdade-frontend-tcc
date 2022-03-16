import axios from 'axios'
import { API_URL } from "@/API_URL"
import jsonWebTokenService from "jsonwebtoken"
import store from '@/store'

function createUserSession({data}) {
  const token = data.access_token
  const decoded = jsonWebTokenService.decode(token)
  store.commit("setUser",{
    id: decoded.id,
    name: decoded.name,
    email: decoded.email,
    token: token
  })
}

async function login(user: any) {
  const response = await axios.post(`${API_URL}/auth/login`, JSON.stringify(user), {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
  if(response.status === 200) createUserSession(response.data)
  
  return response
}

async function register(user: any) {
  const response = await axios.post(`${API_URL}/auth/register`, JSON.stringify(user), {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
  if(response.status === 201) createUserSession(response.data)
  
  return response
}

function getProfile(token: string) {
  return axios.get(`${API_URL}/user/profile`, {
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
}

function saveProfile(user: any, token: string) {
  return axios.put(`${API_URL}/user/profile`, JSON.stringify(user), {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    } 
  })
}

function getLikedRecipes(token: string) {
  return axios.get(`${API_URL}/user/recipe/like`, {
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
}

const userService = {
    login,
    register,
    getProfile,
    saveProfile,
    getLikedRecipes
}

export default userService