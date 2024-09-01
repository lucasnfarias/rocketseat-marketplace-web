import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(
      '@rocketseat-marketplace/accessToken',
    ) // get stored access token
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}` // set in header
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 3000)),
    )

    return config
  })
}
