import { Mutex } from 'async-mutex'
import http from '@/apis/http'
import { SuccessResponse } from '@/globalType/util.type'

export function saveAccessTokenToLS(token: string) {
  localStorage.setItem('access_token', token)
}

export const getAccessTokenFromLS = () => {
  const data = localStorage.getItem('access_token') || ''
  return data
}

export const clearLocalStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  // console.log(result)
  return result ? JSON.parse(result) : null
}

export const saveProfileToLS = (profile: IAccountTable) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

interface AccessTokenResponse {
  accessToken: string
}

const mutex = new Mutex()

const URL = '/api/auth/'

export const authApi = {
  login: async (params: { username: string; password: string }) => {
    const res = await http.post<ILogin>(URL + 'login', params)
    return res.data
  },
  register: async (params: IAccountTable) => {
    const res = await http.post<SuccessResponse<IAccountTable>>(URL + 'register', params)
    return res.data
  },
  logout: async () => {
    const res = await http.post<SuccessResponse<ILogin>>(URL + 'logout')

    return res.data
  },
  refreshToken: async (): Promise<string | null> => {
    return mutex.runExclusive(async () => {
      try {
        const response = await http.get<SuccessResponse<AccessTokenResponse>>(URL + 'refresh')
        console.log(response)
        if (response.data && response.data.data.accessToken) {
          saveAccessTokenToLS(response.data.data.accessToken)
          return response.data.data.accessToken
        }
        return null
      } catch (error) {
        clearLocalStorage()
        return null
      }
    })
  },
  forgetPassword: async (email: string) => {
    const res = await http.post<SuccessResponse<string>>(URL + 'forgot-password', email)
    return res.data
  },
  resetPassword: async (params: { newPassword: string; token: string }) => {
    const res = await http.post<SuccessResponse<string>>(URL + 'reset-password', params)
    return res.data
  }
}
export default authApi
