import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAxios, useToken } from '~/composables'
import type { Credentials, LoginResponse } from '~/types'

export const useAuthStore = defineStore('AUTH_STORE', () => {
  const axios = useAxios()
  const token = useToken()

  const user = ref<any | undefined>(undefined)

  const login = async (credentials: Credentials): Promise<LoginResponse> => {
    const { data }: { data: LoginResponse } = await axios.post('auth/login', credentials)

    user.value = data.user
    token.set(data.token)

    return data
  }

  const getSelf = async () => {
    const { data } = await axios.get('user/self')
    user.value = data
    return data
  }

  return {
    user,
    login,
    getSelf,
  }
})
