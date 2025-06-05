/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios'
import instance from '../http'
import { notification } from 'antd'
import authApi, { clearLocalStorage } from '../auth.api'

const NO_RETRY_HEADER = 'x-no-retry'

const responseInterceptor = (response: any) => {
  return response
}

const responseInterceptorError = async (error: AxiosError) => {
  const originalRequest = error.config
  if (
    error.response &&
    error.response.status === 401 &&
    originalRequest &&
    !originalRequest.headers?.[NO_RETRY_HEADER] &&
    originalRequest.url !== '/api/auth/login'
  ) {
    originalRequest.headers![NO_RETRY_HEADER] = 'true'

    const newAccessToken = await authApi.refreshToken()

    if (newAccessToken) {
      originalRequest.headers!.Authorization = `Bearer ${newAccessToken}`

      return instance.request(originalRequest)
    } else {
      clearLocalStorage()
      notification.error({
        message: 'Phiên đăng nhập hết hạn',
        description: 'Vui lòng đăng nhập lại.'
      })
    }
  }
  console.log(error)
  return Promise.reject(error)
}

export { responseInterceptor, responseInterceptorError }
