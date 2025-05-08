import http from '@/utils/http'
import { SuccessResponse } from '@/globalType/util.type'

const URL = '/login'

const authApi = {
  login: async (params: { username: string; password: string }) => {
    const res = await http.post<SuccessResponse<ILogin>>(URL, params)
    return res.data
  }
}
export default authApi
