import axios from 'axios'
import { requestInterceptor, requestInterceptorError } from './interceptors/request.interceptor'
import { responseInterceptor, responseInterceptorError } from './interceptors/response.interceptor'

const http = axios.create({
  baseURL: 'localhost:8000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true
})



http.interceptors.request.use(requestInterceptor, requestInterceptorError)
http.interceptors.response.use(responseInterceptor, responseInterceptorError)

export default http
