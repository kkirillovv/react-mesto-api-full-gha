import { checkResponse } from './CheckResponse.js'

export const BASE_URL = 'api.kirillovk.nomoredomainsrocks.ru'

export const register = async (password, email) => {
  const response = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
  })
  const res = await response.json()
  return checkResponse(response.ok, res)
}

export const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  const res = await response.json()
  return checkResponse(response.ok, res)
}

export const checkToken = async (token) => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    }
  })
    const res = await response.json()
    return checkResponse(response.ok, res)
}