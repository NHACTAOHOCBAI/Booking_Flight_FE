import axios from 'axios';
import { requestInterceptor, requestInterceptorError } from './interceptors/request.interceptor';
import { responseInterceptor, responseInterceptorError } from './interceptors/response.interceptor';

const httpFormData = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 10000,
  withCredentials: true
});

httpFormData.interceptors.request.use(requestInterceptor, requestInterceptorError);
httpFormData.interceptors.response.use(responseInterceptor, responseInterceptorError);

export default httpFormData;