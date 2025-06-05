/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAccessTokenFromLS } from '@/apis/auth.api'

const requestInterceptor = (config: any) => {
  const token = getAccessTokenFromLS()
  if (token && config.headers && config.url !== '/api/auth/refresh') {
    config.headers.Authorization = `Bearer ${token}`
  }
  if (!config.headers.Accept && config.headers['Content-Type']) {
    config.headers.Accept = 'application/json'
    config.headers['Content-Type'] = 'application/json; charset=utf-8'
  }
  return config
}

const requestInterceptorError = (error: any) => Promise.reject(error)

export { requestInterceptor, requestInterceptorError }
