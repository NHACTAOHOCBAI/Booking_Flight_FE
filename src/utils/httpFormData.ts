import { requestInterceptor, requestInterceptorError } from '@/apis/interceptors/request.interceptor'
import { responseInterceptor, responseInterceptorError } from '@/apis/interceptors/response.interceptor'
import axios from 'axios'

const httpFormData = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 10000,
  withCredentials: true
})

httpFormData.interceptors.request.use(requestInterceptor, requestInterceptorError)
httpFormData.interceptors.response.use(responseInterceptor, responseInterceptorError)

export default httpFormData
