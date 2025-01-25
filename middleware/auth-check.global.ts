import { defineNuxtRouteMiddleware, navigateTo, storeToRefs } from '#imports'
import { useToken } from '~/composables/useToken'
import { useAuthStore } from '~/store'

export default defineNuxtRouteMiddleware(async (to) => {
  // skip middleware on server
  if (import.meta.server) return

  const { hasToken } = useToken()

  const authStore = useAuthStore()

  const { user } = storeToRefs(authStore)

  if (!hasToken() && !to.fullPath.includes('/auth')) {
    return navigateTo('/auth')
  }

  if (hasToken() && !user.value?.id) {
    await authStore.getSelf()
    return navigateTo('/dashboard')
  }
})
