import http from '@/utils/http'
import { SuccessResponse } from '@/globalType/util.type'

const URL = '/login'

const authApi = {
  login: (params: { username: string; password: string }) => {
    const data = http.post<SuccessResponse<ILogin>>(URL, params)
    // console.log(data)
    return data
  }
}
export default authApi
