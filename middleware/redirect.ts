import { abortNavigation, defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useToken } from '~/composables/useToken'

export default defineNuxtRouteMiddleware(async (to) => {
  const { hasToken } = useToken()

  if (to.path === '/') {
    if (hasToken()) {
      return navigateTo('/dashboard')
    }

    return navigateTo('/auth')
  }

  //if (to.path === '/auth' && hasToken()) {
  //  return navigateTo('/dashboard')
  //}
})
