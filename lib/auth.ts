import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

axios.defaults.withCredentials = true

export const checkAuth = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_URL}/auth/check`)
    return response.data.authenticated || false
  } catch {
    return false
  }
}

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password })
  return response.data
}

export const register = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/register`, { email, password })
  return response.data
}

export const logout = async () => {
  await axios.post(`${API_URL}/auth/logout`)
}

