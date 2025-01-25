import { useCookie, useRouter, useRuntimeConfig } from '#app'
import { useToken } from '#imports'
import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios'

const createAxiosInstance = (): AxiosInstance => {
  const config = useRuntimeConfig()
  const router = useRouter()
  const token = useToken()

  const instance = axios.create({
    //baseURL: process.env.BASE_URL, // runtimeConfig
    baseURL: config.public.baseUrl,
    timeout: 10000,
  })

  instance.interceptors.request.use(
    (requestConfig: InternalAxiosRequestConfig) => {
      if (token.hasToken()) {
        requestConfig.headers.set('Authorization', `Bearer ${token.get()}`)
      }
      return requestConfig
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    }
  )

  // Add a response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        console.error('Unauthorized! Redirecting to login...')
        token.remove()
        router.replace('/auth')
      }
      return Promise.reject(error)
    }
  )

  return instance
}

let axiosInstance: AxiosInstance

export const useAxios = (): AxiosInstance => {
  if (!axiosInstance) {
    axiosInstance = createAxiosInstance()
  }
  return axiosInstance
}
