import axios, { AxiosError, AxiosInstance } from 'axios'
import { saveProfileToLS, clearLocalStorage, getAccessTokenFromLS, saveAccessTokenToLS } from './auth'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS() || ''
    this.instance = axios.create({
      baseURL: 'http://localhost:8080/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = `Bearer ${this.accessToken}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        console.log(url)

        if (url === '/login' || url === '/register') {
          this.accessToken = response.data.data.accessToken
          saveAccessTokenToLS(this.accessToken)
          const user = response.config.data
          saveProfileToLS(JSON.parse(user).username)
        } else if (url === '/logout') {
          this.accessToken = ''
          clearLocalStorage()
        }
        return response
      },
      (error: AxiosError) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any | undefined = error.response?.data
        const message = data?.message || error.message
        console.log(message)

        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
