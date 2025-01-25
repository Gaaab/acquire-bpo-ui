import { useCookie, useRuntimeConfig, type CookieOptions } from '#app'

export const useToken = <T = string | null | undefined>(options: CookieOptions<T> & { readonly?: false } = {}) => {
  const config = useRuntimeConfig()
  const token = useCookie(config.public.cookieTokenName, options)

  const get = () => {
    return token.value
  }

  const set = (value: T) => {
    token.value = value
  }

  const hasToken = () => {
    return !!token.value
  }

  const remove = () => {
    token.value = null as T
    //useCookie<T>(config.public.cookieTokenName, { ...options, maxAge: -1 }).value = null as T
  }

  return { get, set, remove, hasToken, token }
}
