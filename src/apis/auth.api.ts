import http from '@/utils/http'
import { SuccessResponse } from '@/globalType/util.type'

const URL = '/api/auth/'

const authApi = {
  login: async (params: { username: string; password: string }) => {
    const res = await http.post<SuccessResponse<ILogin>>(URL + 'login', params)
    return res.data
  },
  register: async (params: IAccountTable) => {
    const res = await http.post<SuccessResponse<IAccountTable>>(URL + 'register', params)
    return res.data
  },
  logout: async () => {
    const res = await http.post<SuccessResponse<ILogin>>(URL + 'logout')
    return res.data
  }
}
export default authApi
