import axios, { AxiosError, AxiosRequestConfig } from 'axios'

import { getAccessToken, setAccessToken } from '@/zustand/auth.store'

interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
}

/**
 * Crea una instancia de Axios configurada para manejar peticiones HTTP
 * tanto para endpoints públicos como privados.
 * - Acepta Bearer token cuando está presente.
 * - Refresca el token automáticamente cuando es necesario.
 */

const api = axios.create({
  baseURL: 'http://192.168.1.68:3000/api/v1',
})

api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) config.headers.set('Authorization', `Bearer ${token}`)

  return config
})

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryAxiosRequestConfig

    if (error.response?.status === 401 && !originalRequest._retry && !!getAccessToken()) {
      originalRequest._retry = true

      try {
        const response = await axios.post('http://192.168.1.68:3000/api/v1/auth/refresh-token', {}, { withCredentials: true })

        const newToken = response.data.data.accessToken

        // setea el nuevo token
        setAccessToken(newToken)

        // asegurarse que headers esté definido
        if (!originalRequest.headers) originalRequest.headers = {}

        originalRequest.headers['Authorization'] = `Bearer ${newToken}`

        return api(originalRequest)
      } catch (err) {
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  },
)

export default api
